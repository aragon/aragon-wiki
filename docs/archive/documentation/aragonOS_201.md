<center>
# aragonOS

*Reflects [aragonOS](https://github.com/aragon/aragonOS) 2.0.1 implementation. Updated Jan. 14th, 2018.*

An [exokernel](https://en.wikipedia.org/wiki/Exokernel)-inspired architecture for modular, upgradeable, and secure DAOs
</center>

## Introduction

This exokernel-inspired architecture enables modular, upgradeable, and secure Decentralized Autonomous Organizations (DAOs). It implements a UNIX-inspired permissioning system with smart contracts to allow for safe and efficient control over software resources.

Smart contracts, an essential component of the Ethereum ecosystem, can define the rules and penalties around an agreement. They can also make decisions and enforce prior commitments, such as transfering large amounts of funds. However, such significant responsibilities make smart contracts a prime target for attacks. Testing and auditing them are not absolute remedies because, inevitably, humans make mistakes.

So, how does one guarantee DAOs that run efficiently and securely? And how do we provide upgrading capabilities to these DAOs, to ensure the safety and evolution of the Ethereum ecosystem?

We present our secure decentralized operating system: _aragonOS_.

This document provides a technical overview about the architecture. For a less technically-oriented introduction to aragonOS, you can check the [announcement blog post](https://blog.aragon.one/introducing-aragonos-say-hi-to-modular-and-extendable-organizations-8555af1076f3).

## 1. Kernel and the Access Control List

The **Access Control List** (ACL) is the filter which determines whether an [entity](#entity) has a certain role in the context of an app. It either permits or prohibits performing actions, such as an update, in a given context, as well as determining the entities with power over that permission.

The ACL permissioning system is inspired by UNIX. ACLs control the permissions afforded to a user in the system and can ease the transfer of said permissions. Similar to the `sudo` command in UNIX, users can escalate permissions, but with more flexibility and granularity.

A reference implementation of the Kernel and its ACL can be found here: [`Kernel.sol`](https://github.com/aragon/aragonOS/blob/dev/contracts/kernel/Kernel.sol).

### Apps and Actions

**App**s are smart contracts that rely on the Kernel—the core of the operating system—for maintaining their ACL and upgrading their code. Apps can interact with users and other smart contracts by implementing **Action**s, where each action is a publicly-accessible function that may or may not be protected by the ACL. Any actions that are protected are only allowed to be executed if the caller is permitted by the ACL. Because apps are upgradeable, we expect them to exist for a long period of time and be safely responsible for owning assets on behalf of the DAO (e.g. tokens and ENS names).

App instances are identified by their deployed Ethereum addresses. More than one instance of a particular app can be installed in a DAO at a time (e.g. multiple [Token Manager](../dev/apps/token-manager) instances can be installed to control multiple tokens).

### Roles

Another feature in ensuring security within the ecosystem is the ease of delegating responsibilities for autonomous execution. Apps can define any number of **Role**s, where each role grants access to one or more of the app's actions as part of the app's ACL. Any entity wishing to perform an action protected by the ACL must have the necessary permissions by having a role that is capable of executing that action.

Roles are always unique to each app. Having a given role in one app does not grant the permission to perform that same role in other apps.

An entity can have many roles in one app.

Example:

```
contract TokenApp is App {
	bytes32 constant public MINT_ROLE = 0x1234;
	function mint(address _receiver, uint256 _amount) auth(MINT_ROLE) { … }
}
```

`TokenApp` is an app that defines one action, `mint()`, whose execution is controlled by `MINT_ROLE`.

### Entity

An **Entity** is any actor that is represented by an Ethereum address, such as a multisig (an account that needs multiple signatures before executing an action), an app (for example, a voting app that only executes an action if token holders vote favorably), or a simple private key controlled account.

The system can delegate permissions to groups of entities by implementing a Group app. As in other apps, it can rely on the ACL for protecting important functions, such as adding or removing members of the group. When group members want to execute a specific action, the Group app acts as a proxy contract that performs the action on behalf of the group.

### Permissions

A **Permission** is defined as the ability to perform actions (grouped by roles) in a certain app instance (identified by its address).

We refer to a **Permission Instance** as an entity holding a certain permission.

When a permission is created, a **Permission Manager** is set for that specific permission. The permission manager is able to grant or revoke permission instances for that permission.

#### Create Permission

```
kernel.createPermission(address entity, address app, bytes32 role, address manager)
```

`createPermission()` will fail if that permission has pre-existing permission instances.

This action is identical to [`grantPermission()`](#grant-permission) except it allows the creation of a new permission if it doesn’t exist yet.

A role in the ACL protects access to `createPermission()` as this important function could be used in malicious ways. When the Kernel is initialized, it also creates the permission that grants the initializing address the ability to create new permissions.

Note that creating permissions is made mandatory by the ACL: all actions requiring yet-to-be-created permissions are disallowed by default. Any permission checks on non-existent permissions are failed automatically.

#### Grant Permission

```
kernel.grantPermission(address entity, address app, bytes32 role)
```

Grants `role` in `app` for an `entity`. Only callable by the `manager` of a certain permission. This `entity` would then be allowed to call all actions that their `role` can perform on that particular `app` until the permission manager revokes their role with `revokePermission()`.

The `grantPermission()` action doesn’t require protection with the ACL because an entity can only make changes to a permission if it is the permission's `manager`.

#### Revoke Permission

```
kernel.revokePermission(address entity, address app, bytes32 role)
```

Revokes `role` in `app` for an `entity`. Only callable by the `manager` of a certain permission.

The `revokePermission()` action doesn’t need to be protected by the ACL either, as an entity can only make changes if it is the `manager` for a given permission.

#### Set Permission Manager

```
kernel.setPermissionManager(address newManager, address app, bytes32 role)
```

Changes the permission manager to `newManager`. Only callable by the `manager` of a certain permission.

The new permission manager replaces the old permission manager, resulting in the old manager losing any management power over that permission.

[`createPermission()`](#create-permission) executes a special case of this action to set the initial manager for the newly created permission. From that point forward, the manager can only be changed with `setPermissionManager()`.

#### Events

[`createPermission()`](#create-permission), [`grantPermission()`](#grant-permission), and [`revokePermission()`](#revoke-permission) all fire the same `SetPermission` event that Aragon clients are expected to cache and process into a locally stored version of the ACL:

```
SetPermission(address indexed from, bytes32 indexed role, address indexed to, bool allowed)
```

[`setPermissionManager()`](#set-permission-manager) fires the following event:

```
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager)
```

#### Example

As an example, the following steps show a complete flow for user "Root" to create a new DAO with the basic permissions set so that a [Voting app](../../dev/apps/voting.md) can manage the funds stored in a [Vault app](../../dev/apps/vault.md):

1. Deploy the Kernel
2. Executing `kernel.initialize(rootAddress)` creates the "permissions creator" permission under the hood:
`createPermission(rootAddress, kernelAddress, PERMISSIONS_CREATOR_ROLE, rootAddress)`
3. Deploy the Voting app
4. Grant the Voting app the ability to call `createPermission()`:
`grantPermission(votingAppAddress, PERMISSIONS_CREATOR_ROLE, kernelAddress)` (must be executed by `rootAddress`)
5. Deploy the Vault app, which has a action called `transferTokens()`
6. Create a new vote via the Voting app to create the `TRANSFER_TOKENS_ROLE` permission
`createPermission(votingAppAddress, vaultAppAddress, TRANSFER_TOKENS_ROLE, votingAppAddress)`
7. If the vote passes, the Voting app then has access to all actions in the Vault protected by `TRANSFER_TOKENS_ROLE`, which in this case is just `transferTokens()`
8. Fund transfers from the Vault can now be controlled via votes from the Voting app. Each time a user wishes to transfer funds, they can create a new vote via the Voting app to propose an execution of the Vault's `transferTokens()` action. If, and only if, the vote passes, will the `transferTokens()` action be executed.

Note that the Voting app is also able to revoke or regrant the `TRANSFER_TOKENS_ROLE` permission as it is that permission's manager on `vaultAppAddress`.

#### Adding Permissions

Apps have the choice of which actions to protect behind the ACL, as some actions may make sense to be completely public. Protecting an action behind the ACL is done in the smart contract by simply adding the authentication modifier [`auth()`](https://github.com/aragon/aragonOS/blob/a1b6694cdb33443c6ad8f2a8fd3badf82dbd720a/contracts/apps/App.sol#L6) (passing the role required as a parameter) to the action. On executing the action, the `auth()` modifier checks with the Kernel whether the entity performing the call holds the required role or not.

#### Escalating Permissions

Consider kernel **K**, an entity **E**_0_, and an app **A**. **E**_0_ wants to perform action **A**_act_ on app **A**. The client knows, from [information provided as part of the app's metadata](#additional-packaging-requirements), that in order to perform **A**_act_, an entity is required to have **A**_role_. Since **E**_0_ doesn't hold **A**_role_, the client should know that **E**_0_ cannot directly call **A**_act_, but that a list of entities [**E**_1_, **E**_2_, ...] do have that role on app **A**. The client should then show the user the multiple possible forwarding paths to pass the call to **E**_1_, **E**_2_, etc, such that **E**_0_ is able to perform **A**_act_ through another, higher-privileged, entity.

Calculating a forwarding path requires knowing what [forwarders](#forwarders) entity **E**_0_ can escalate actions through. The user or contract performing this action could then choose their preferred route to forward permissions in order to perform **A**_act_. For example, **E**_1_ may be a Voting app **V**, so the action would be to create a new vote that, in case of being approved, would call **A**_act_. Since **V** has role **A**_role_, it has permission to execute **A**_act_, and therefore we would have successfully completed a permission escalation.

Permission escalations can be multiple levels deep. For example, imagine a user wants to invoke an action that requires a vote. If the only entity with permission to create a vote is the [Token Manager app](../dev/apps/token-manager), then the user will have to forward their action first through the Token Manager and then through the Voting app. The Token Manager only allows a sender to forward actions if the sender owns tokens, so in this case, the user will also need to hold tokens before being able to start a vote.

Note that a permission escalation can occur instantly or be delayed and require further action from other entities, like in the case of the Voting app.

<center><img src="../images/permission_escalation.png"></center>

##### Forwarders

In order to make permission escalation easier, we define a common interface for **Forwarder**s:

```
contract Forwarder {
   bool isForwarder = true;
   function canForward(address sender, bytes evmCallScript) view returns (bool);
   function forward(bytes evmCallScript);
}
```

If a user wants to enact an action it cannot perform directly, it can check if there are forwarders. This checks for privileged entities that are accessible to any of the user's addresses for forwarding the action to.

##### EVM Call Script

The `evmCallScript` parameter in the [Forwarder's](#forwarders) interface allows for executing multiple calls with just one transaction. This is useful, for example, in the case of votings, as it allows approving multiple actions with just one vote.

An `evmCallScript` is the concatenation of multiple `evmCallAction`s. A `evmCallAction` payload is:

``[ to (address: 20 bytes) ] [ calldataLength (uint32: 4 bytes)  ] [ calldata (calldataLength bytes) ]``

When executed, actions in the `evmCallScript` are executed one at a time using the `CALL` opcode. If any one of the actions fails (i.e. `CALL` returns 0), the entire execution is reverted.

A reference implementation for EVM Call Script can be found here: [`EVMCallScript.sol`](https://github.com/aragon/aragonOS/blob/dev/contracts/common/EVMCallScript.sol).

## 2. Upgradeability

Upgradeability of the system is achieved by using the [`DelegateProxy`](https://github.com/aragon/aragonOS/blob/dev/contracts/common/DelegateProxy.sol) pattern. Kernel and apps ([`KernelProxy`](#21-kernel-upgradeability) and [`AppProxy`](#22-app-space-upgradeability)) both use `DelegateProxy` with some added functionality.

<center><img src="../images/delegateproxy.png"></center>

Given that new versions of apps or the kernel run in the exact same context as previous versions, the old storage layout must be taken into account. Inheriting from the old contract's storage before adding new storage variables is considered a safe practice. It is recommended to make sure the upgrade doesn't break the storage before pushing a new version. We will work on tooling to prevent issues with storage when upgrading.

### 2.1. Kernel upgradeability

For the [Kernel](#1-kernel-and-the-access-control-list) to be easily upgradeable, cheaply deployable, and more efficient, we use a proxy-type construct. Deploying a new DAO is done by deploying a [`KernelProxy`](https://github.com/aragon/aragonOS/blob/dev/contracts/kernel/KernelProxy.sol) contract that just delegates all calls to a kernel implementation at a given address, while still maintaining its own storage. Upgrading the kernel implementation in the proxy is as easy as changing its reference to another implementation's address.

Note that, although this action is fairly easy to complete, it is extremely critical to the DAO and should be protected accordingly.

### 2.2. App-space upgradeability

As apps can be used as entities (e.g. a voting app), it is important that each app is able to keep its address fixed to maintain its identity even if an upgrade changes the underlying logic. Keeping a fixed address also simplifies the upgrade process—otherwise, each upgrade would also require any associated permissions in the ACL to be updated to the app's new address.

One way of achieving this is through the concept of an [`AppProxy`](https://github.com/aragon/aragonOS/blob/dev/contracts/apps/AppProxy.sol) contract (inspired by [augur-core’s `Delegators`](https://github.com/AugurProject/augur-core/blob/develop/source/contracts/libraries/Delegator.sol)). Deploying an app via an `AppProxy` contract only requires a reference to the Kernel and the app identifier. When the app receives a call, it gets intercepted by the proxy's fallback function. At this point, the proxy asks the Kernel for the latest address of the app code for a given app identifier and version. The AppProxy contract then forwards the call by `delegatecall`ing into this address.

<center><img src="../images/appproxy_delegatecall.png"></center>

It should be noted that multiple `AppProxy` contracts can be installed in a DAO for the same app identifier (e.g. multiple [Fundraising](./apps/fundraising) `AppProxy` instances can be attached to the same Kernel to control multiple types of funding). As the Kernel keeps a centralized record of the latest version of the code for each app identifier, changing one reference in the Kernel effectively updates all instances of that app in that organization. These upgrades could then be delegated to another contract, e.g. the Aragon Network, in case organizations don’t want to handle manual upgrades of their own apps.

#### Set App Code

```
kernel.setAppCode(bytes32 appId, address appCode)
```

This action updates the implementation code registered for a given `appId`, such that all future calls to the app will use the new app code. If multiple app instances are installed for the given `appId`, they are all updated at the same time with this action.

Note that all calls to an app will fail if an `appId` has not been set for its `appCode`.

## 3. Initialization

The contracts that get deployed for each Kernel and app don't contain any business logic due to them relying on a proxy-like architecture for upgradeability. The proxy contracts are merely a way to point to the logic when called.

However, this architecture impedes the ability to call the Solidity constructor. Constructors are run only on contract creation but not stored as part of the account code.

We instead use a 'regular function' to perform initialization on each proxy. This function can only be called after the `AppProxy` contract has been deployed. To impede attacks in which a malicious actor tries to front-run an initialization transaction between the deployment and the legit initialization transaction, `AppProxy` allows you to pass an initialization payload that will only be executed on deployment, allowing for atomic initializations of apps.

It is important that this initialization function can only be called once per proxy. Instead of just saving a boolean when a component has been initialized, we store the block number when the initialization occurred. Clients can then use this to know from which block they should filter for events.

## 4. App discoverability and package versioning

Technically, an app **A** is nothing more than a simple [`AppProxy`](#22-app-space-upgradeability) contract holding a reference to a kernel **K** and an `appId`. If **A** doesn’t have any permissions, both incoming and outgoing, set in **K**, **A** is effectively irrelevant to the DAO as nothing can call it and it cannot call anything. So the notion of installing an app is replaced with the notion of creating permissions for an app (i.e. defining what entities can do with the app and what the app can do in other apps).

All relevant apps in a DAO should be discoverable by traversing its ACL, checking if any addresses are `AppProxy`s, and checking if those `AppProxy`s have a reference to the DAO’s kernel. If that is the case, then the apps matching those `AppProxy`s' `appId`s are considered installed in the DAO.

Application identifiers (`appId`s) should be the [`namehash`ed](https://www.npmjs.com/package/eth-ens-namehash) ENS name for the app's deployed contract:

```
appId = namehash(“voting.aragonpm.eth”)
```

An app's `appId` can be used as the identifier for its full package (including the app's frontend and other artifacts).

Aragon owns and provides `aragonpm.eth` as a domain for developers to register their packages under. However, the system is designed to be domain agnostic: for example, district0x could decide to have all their packages under `packages.district.eth`.

### App Repos

After discovering an entity in the DAO that is an app, we can fetch its `appId` and use ENS to resolve its Repo contract:

```
repo = Resolver(ens.resolver(appId)).addr(appId)
```

Repo contracts conform to the original Aragon Versioning Protocol but add more on-chain checks for version upgrades.

Each Repo has an owner which is an Ethereum address that can create new versions of the package. This ownership right can be transferred to another address by the owner.

A Repo keeps versioned state over:

  - Smart contract app code (`contractAddress`): the app code is the address of the deployed version of the app. The Kernel determines which version of the app it uses by pointing to the app code address associated with that version.
  - Package content (`contentURI`): defined by a location ID of where the other components of the package (e.g. frontend) are hosted (IPFS, Swarm, etc.) and the content hash for fetching it.

By versioning both the app code address and the package content, we can build in additional expectations for the semantic versioning of apps:

  - **Patch**: Minor changes to the package contents (e.g. frontend). Update can be performed silently for users.
  - **Minor**: Major changes to the package contents, but still works with the current smart contract code. Users should be notified of the update.
  - **Major**: Any change to the smart contract app code with or without an accompanying frontend upgrade. User interaction is needed to upgrade.

  A correct version upgrade for a package is defined by the following rules:

  - Only one member of the version is increased by 1. The version components to the left of the raised member must stay the same and the components to the right must be 0.
    - Example: From 2.1.3 the only allowed raises are to 3.0.0 (major version), 2.2.0 (minor version), and 2.1.4 (patch version).
  - Changes to the app code address can only be done if the raise changes the major version (upgrading it to x.0.0 by the above rule).

  By having this check performed at the smart contract level, we can load the correct version of the frontend just by looking at an instance of an app. This is done by checking that the version of a smart contract is linked to a given app by getting its `appId` and `appCode`.

### Additional Packaging Requirements

The package that is stored off-chain must contain a standard [manifest.json](https://w3c.github.io/manifest/).

We also introduce a specific `eth.json` file with the following keys, to help connect an app's frontend to its smart contracts:

  - `abi`: Standard [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
  - `bytecode`: Initialization code for deploying the app code to the network.
  - `functions`: An array of all the relevant function signatures for the contract, with its [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format) description, argument names, and whether the function is protected by the ACL or not (and which role is required, if protected). These can be automatically generated on package publish.
  - `permissions`: An array of permissions the app needs to have over other entities in order to work. This will probably be dependent on initialization parameters. For example: a Finance app will need permissions over the Vault it is initialized with.
  - `verification`: An object providing the needed information to independently verify the source code of the deployed code. Required values include: `deployTxId`, `sourceCode`, and the compiler settings, solc version, and optimization settings.

An initial implementation of the contracts supporting package management can be found in the [apm-contracts repo](https://github.com/aragon/apm-contracts).
