# Brett's Audit

_This was an internal audit by [Brett Sun/@sohkai](https://github.com/sohkai), Aragon’s EVM Engineer of the `aragonOS` and `aragon-apps` that power the v0.5 release of Aragon._

_[Original report in Github](https://github.com/sohkai/aragonOS/blob/brett-audit/audit.md)_

_Date: Jan 22-23 2018_

## Overview

- Reviewed `aragonOS` @ [8073ed1438c5fa65c45bd0c14cc5433e273656f9](https://github.com/aragon/aragonOS/commit/8073ed1438c5fa65c45bd0c14cc5433e273656f9)
- Reviewed `aragon-apps` @ [e8e931e4ff389bfc6d8682f99c067f808f321366](https://github.com/aragon/aragon-apps/commit/e8e931e4ff389bfc6d8682f99c067f808f321366); linked as submodule in the [repo](https://github.com/sohkai/aragonOS/tree/brett-audit)
    - Will wait until `aragon-apps` is upgraded to `aragonOS 3.0.0` before running Oyente and unit tests as some contracts in `aragonOS` have moved in `3.0.0` (causing compile issues)
- Slight, non-logical modifications were made to some contracts for running [Solgraph](#solgraph) (see [cd431a899af22b6f67787a8fc6cf7e1c60f8a6a7](https://github.com/sohkai/aragon-apps/commit/cd431a899af22b6f67787a8fc6cf7e1c60f8a6a7)); **these changes should not be adopted**
- Slight, non-logical modifications were made to some contracts for running [Oyente](#oyente) (see [475b72f81c1a6fd136391ff1bf3a93228fb57d91](https://github.com/sohkai/aragonOS/commit/475b72f81c1a6fd136391ff1bf3a93228fb57d91)); **these changes should not be adopted**


## General comments

- No linting errors
- All unit tests passing (`aragonOS` only; see note above)
- Uses industry-standard library contracts for common operations, including OpenZeppelin and MiniMe
- As a scale, I'm using:
    - High-severity: anything that can result in loss of funds for users, or otherwise achieve highly damaging effects on user DAOs
    - Mid-severity: exploitable issues, but either preventable in some way, technically difficult (or impossible) to solve for every one in the ecosytem, or very low probability of actually being exploited
    - Low-severity: nice-to-haves, very low incentive attacks

### Out of scope

I have, for the most part, ignored:

- Any contracts in `lib` folders
- Any contracts in `factory` folders (they're mostly for demonstration right now)
- An exhaustive look through the unit tests to see if they miss any obvious functionality (100% code and branch coverage is a good start but is usually not the whole story)


## aragonOS Issues

### Mid-severity

- `AppProxy` should fail on construction if `_kernel` is not a contract
    - `aragonOS/contracts/apps/AppProxy.sol`:
        - Kernel-less apps are impossible: the fallback function will always fail on `kernel.getAppCode(appId)` if `kernel == 0` or if the kernel address is not a contract.
    - `aragonOS/contracts/apps/AragonApp.sol`:
        - `canPerform()` would not require the `address(kernel) == 0` check anymore as the proxy would fail to be created before that point
    - `aragonOS/contracts/apm/ApmRegistry.sol`:
        - `initialize()`'s `require(kernel != address(0));` check can be removed
- `AppProxy` may use garbage data as its `target`:
    - `aragonOS/contracts/apps/AppProxy.sol`:
        - If the `AppProxy`'s `kernel` is set to a non-kernel contract address, `kernel.getAppCode(appId)` will return garbage data [due to how the fallback works](https://github.com/ethereum/solidity/issues/2630). This means that in `delegatedFwd(target, msg.data)`, `target` could potentially be delegating to a malicious contract. As far as I know, exploiting this would be extremely difficult, but it should be clear in the surrounding documentation that the `kernel` **MUST** be carefully set.
- `KernelProxy` should fail on construction if `_kernelImpl` is not a contract
    - `aragonOS/contracts/kernel/KernelProxy.sol`:
        - `delegatedFwd(kernelImpl, msg.data)` will always fail if `kernelImpl == 0` or is not a contract. In such a case, it would also be impossible to run `upgradeKernel()`.
- `KernelProxy`s' initialization can be front-runned:
    - `aragonOS/contracts/kernel/KernelProxy.sol`:
        - `initialize()` is public and accessible to anyone after the proxy is deployed. This should at least be highlighted in documentation for `Kernel.initialize()` and the `KernelProxy` so as to make sure users always create and initialize these proxies in one atomic transaction, but a better solution would be to introduce the same `initializePayload` that is in `AppProxy`.
- `Kernel.revokePermission()` can be front-runned:
    - `aragonOS/contracts/kernel/KernelProxy.sol`:
        - There are many possible outcomes when `revokePermission()` races with an entity wishing to perform an action associated with the revoked role. As in all front-running cases, the entity learning of the revocation has the upper hand as he can send his transactions with much higher gas prices. I don't see any good way around this, as this is a pretty general problem plaguing all systems implementing revocable controls. It may be a good idea to note this in the comments and associated documentation. The best way around the problem is just to never give permissions to an entity you don't entirely trust, but this is obviously not very practical (yet).

### Low-severity

- `APMRegistry.NewRepo` event should index its `id` and `repo` fields
    - `aragonOS/contracts/apm/ApmRegistry.sol`
- `Repo` should use `pragma solidity 0.4.18;`
    - `aragonOS/contracts/apm/Repo.sol`
- `AppProxy` should fail if `_appId` is `bytes32(0)`
    - `aragonOS/contracts/apps/AppProxy.sol`:
        - A valid `appId` will  never be `bytes32(0)`
- `AragonApp` could be split into `AragonApp` and `InitializableAragonApp`
    - `aragonOS/contracts/apps/AragonApp.sol`:
        - Apps that don't need to initialize don't need to inherit from `Initializable`. However, doing this would make it difficult for an app to include the ability to initialize later on, although it's debatable whether or not that functionality would be desirable (what does it mean for already created apps if the app changes to require initialization?).
- `EtherToken`'s `wrap()`, `wrapAndCall()`, and `withdraw()` should be made external
    - `aragonOS/contracts/common/EtherToken.sol`:
        - I don't see many use cases for subclassing this contract (since it's specific to ETH) so any functions not used internally could be made `external`
- `EtherToken`'s `wrap()` could also take a receiver address
    - `aragonOS/contracts/common/EtherToken.sol`:
        - Seems odd that `wrap()` always deposits to the `msg.sender` while `wrapAndCall()` allows you to choose who to send it to
- `EtherToken.withdraw()` includes an unnecessary check:
    - `aragonOS/contracts/common/EtherToken.sol`:
        - Strictly speaking, `require(balances[msg.sender] >= _amount)` is unnecessary since `balances[msg.sender].sub(_amount)` will also do this check
- `DelegateProxy.delegatedFwd()` could take a `gas` parameter:
    - `aragonOS/contracts/common/DelegateProxy.sol`:
        - It may be useful to provide a control over how much gas is provided to the `delegatecall` in case of gas price changes or particular uses (e.g. super large returns or gas-restricted calls). I don't think this is a pressing concern, however, and it may be suggesting additional flexibility for the sake of flexibility.
- `IForwarder.isForwarder()` should be made external
    - `aragonOS/contracts/common/IForwarder.sol`:
        - There's no reason to ever use `isForwarder()` internally... right?
- `Initializable` library instances can be initialized:
    - `aragonOS/contracts/common/Initializable.sol`:
        - Not a big deal because library contracts' states are meaningless, but it'd still be nice if `Initializable` provided a way for these library contracts to be initialized on creation (e.g. by providing a constructor that sets `initializationBlock`)
- `ENSSubdomainRegistrar.createNameAndPoint()` should accept an `owner` parameter
    - `aragonOS/contracts/ens/ENSSubdomainRegistrar.sol`:
        - Mirror `createName()`'s interface and increase flexibility
- Nomenclature:
    - `aragonOS/contracts/common/EVMCallScript.sol`:
        - `EVMCallScriptRunner.LogScriptCall` event should be named `ScriptCall` to adhere to the same pattern as all other events (no `Log` prefix)
    - `aragonOS/contracts/kernel/IKernel.sol`:
        - Function names and arguments have a naming mismatch; names are called in terms of `permission`s whereas arguments are always called in terms of `role`s
        - `ChangePermissionManager` event could have its `manager` parameter renamed as `newManager` for clarity
- Comments:
    - `aragonOS/contracts/apps/AppProxy.sol` and `aragonOS/contracts/kernel/KernelProxy.sol`:
        - Fallback function: a note indicating that no `return` statement is needed for `delegatedFwd()` to return a `bytes32` value would be nice (it is puzzling at first glance why the comments say they return data but the function signatures and bodies don't contain `return`s; it's additionally puzzling because Solidity disallows fallbacks from returning). Also, I believe it's more than just a `bytes32` being returned now (post Byzantium); it should be the entire return?
    - `aragonOS/contracts/common/DelegateProxy.sol`:
        - Would be nice to have an `@returns` comment
    - `aragonOS/contracts/common/IForwarder.sol`:
        - Would be nice to have some comments documenting the interface
    - `aragonOS/contracts/common/Initializable.sol`:
        - `initialized()`: `Function to be called by subclassed contract to signal it has been initialized.` may better reflect the intended usage of `initialized()`
    - `aragonOS/contracts/kernel/IKernel.sol`:
        - Might be nice to move some of the comments detailing functions from `aragonOS/contracts/kernel/Kernel.sol` to the interface contract
    - `aragonOS/contracts/kernel/Kernel.sol`:
        - It may be useful to have a detailed example for each complex mapping, e.g: `mapping (address => mapping (address => mapping (bytes32 => bool))) permissions` could have `(entity => (app => (role => hasPermission)))`
        - Remove all instances of `parent` and replace with `manager`
        - `setAppCode()`: suggest changing `@dev` comment to `@dev Changes implementation address for all installed apps with \`_appId\`. This must be called for \`_appId\` before any apps of \`_appId\` work properly.

- `solc` build warning:

```bash
aragonOS/contracts/apm/Repo.sol:78:5: Warning: Function state mutability can be restricted to pure
    function isValidBump(uint16[3] _oldVersion, uint16[3] _newVersion) public view returns (bool) {
```

(All other build warnings are either from 3rd party or test contracts, and of low severity)

- Unused library code: `aragonOS/contracts/lib/zeppelin/math/Math.sol`
- Check and update library contracts for latest versions (e.g. Zeppelin, MiniMe) if any bug fixes have been introduced
- In general, it may be a good idea to introduce ETH / ERC20 escape hatches for non-Vault contracts (e.g. see [Escapable](https://github.com/Giveth/Donation-Doubler/blob/master/contracts/Escapable.sol), or an even simpler contract that just exposes a [function allowing `owner` to withdraw any ETH or ERC20 token owned by the contract](https://github.com/Giveth/minime/blob/master/contracts/MiniMeToken.sol#L497))
    - Alternatively, contracts could revert in the fallback function and ERC223/677 callbacks, but ERC20 tokens could still be locked up


## aragon-apps Issues

### Low-Severity

- General
    - Given that most storage arrays in the apps are never iterated, they could be implemented with `mapping (bytes32 => ...)`s instead, where the key is `keccak256('<type>', currentNumOfType)`. The main advantage of this is being able to avoid any index manipulation targeted for humans (i.e. forcing some arrays to start at `1` because `0` doesn't make intuitive sense). Also, a pseudorandom `bytes32` value arguably makes more sense as an identifier than an incrementing `uint`. Clients could listen to the logs (or rebuild the hashes, if `currentNumOfType` is known) to build their UIs.
- Finance
    - `aragon-apps/apps/finance/contracts/Finance.sol`:
        - Should add clarifications as to whether a token must be added to the budget before being allowed to create payments
            - l204 has a comment stating this to be the case, but the associated `require()` does not actually complete this check
        - Comments may be beneficial for mappings (e.g. `token => budget` for `budgets`)
        - `tokenStatement` should be renamed `tokenStatements`
        - Consider increasing the minimum `periodDuration` to be greater than one second
            - Extremely small `periodDurations` can cause the app to be onerous to maintain
        - Deposit logic may benefit from being abstracted into internal `_deposit()` and `_depositFrom()` methods
            - Improve DRYness when the combo of `_recordIncomingTransaction()` and `token.transfer()` or `token.transferFrom()` are used
        - `newPayment()` acts differently for one-time, immediate payments than repeating payments when the payment fails
            - One time payments cause a revert if they cannot be immediately executed while repeating payments will log a `PaymentFailure` event. It may be beneficial for both cases to match so as to avoid unexpected behaviour for users. One way of accomplishing this would be to cache a one-time payment if it cannot be immediately executed.
        - `setBudget()` should check that `_amount` is greater than or equal to the current period's expenses
            - Changing a budget to be smaller than the current period's expenses will likely be confusing for clients and should be avoided
        - Remove payment date check from `executePayment()` and `receiverExecutePayment()`
            - `require(nextPaymentTime(_paymentId) <= getTimestamp())` is already checked in `_executePayment()`
        - `view` getters can be made `external`
        - `nextPaymentTime()` (l402): `payment` should be a `storage` variable
        - `nextPaymentTime()`'s casting from uint256 to uint64 (l410) should have an associated `require(nextPayment <= MAX_UINT64)`
        - `getTimestamp()` should return `uint64` to conform with other dates
        - `_canMakePayment()` should be `view`
- TokenManager
    - `aragon-apps/apps/token-manager/contracts/TokenManager.sol`:
        - `transferable` and `logHolders` could be grouped together to save some storage
        - `assignVested()` could be renamed to `assignVesting()` to clarify that it creates a vesting for an entity rather than assigning already vested tokens to an entity
        - `allHolders()` and `spendableBalanceOf()` could be made external
        - `isBalanceIncreaseAllowed()` should use `.add()`: `return token.balanceOf(_receiver).add(_inc) <= maxAccountTokens`
        - `transferableBalance()`'s `_time` parameter should be of `uint64` for consistency with other dates
        - `calculateNonVestedTokens()` should sanitize its time inputs: `require(start <= cliff && cliff <= vesting)`
        - `calculateNonVestedTokens()`'s `vestedTokens` calculation could be simplified to `uint256 vestedToken = tokens.mul((time - start) / (vesting - start))` (assuming sanity checks above were performed)
        - `_assign()` should also call `_logHolderIfNeeded(_receiver)`
- Voting
    - `aragon-apps/apps/voting/contracts/Voting.sol`:
        - Add veto role: give an entity the ability to decide a vote unianimously
            - Example use case: give certain entities (e.g. President) extra power to decide votes more quickly (allows them to have more power without being assigned other permissions).
            - Example use case: in a stalemate due to not reaching `minAcceptQuorumPct`, a DAO may want to restart a vote with a lower `minAcceptQuorumPct`. At that point, the previous vote could be vetoed to be unsuccessful to allow a new vote to start right away, rather than having to wait for it to expire.
        - Allow `minAcceptQuorumPct` to be provided when creating a new vote
            - The main utility I could gather from allowing this parameter to be modified was that a DAO may choose different levels of importance for different votes (of the same type, i.e. time and required support), where size of quorum is a proxy for importance. However, given the current implementation, it would require multiple steps to change the `minAcceptQuorumPct` for a single vote (you'd have to change it, create a vote, and then change it back).
            - Implementing this could be done via an overload, storing the quorum percentage given on initialization as the default percentage. `forward()` should always use the default percentage.
        - In `struct Vote`, `startDate` and `executed` could be grouped together to save some storage
        - `struct Vote`'s `totalVoters` could be renamed to `totalPossible` to avoid confusion over whether it holds the total number of individual voters or total possible votes
        - `canExecute()` should use `.add()` (l153): `uint256 totalVotes = vote.yea.add(vote.nay)`
        - `view` getters can be made `external`
        - `_isVoteOpen()` should cast up rather than down: `return now < uint256(vote.startDate).add(uint256(voteTime)) && !vote.executed;`
        - `_isValuePct()` could be renamed to `_isAtLeastPct()` for clarity
        - `_isValuePct()` should use `.mul()` (l268): `uint256 m = _total.mul(_pct)`


## Tools

### Solgraph

- Only `EtherToken.sol` was flagged for having an untrusted `transfer()` to another contract (see [Oyente](#oyente) for a note on this).
- Noted that solgraph is non-exhaustive and only assumes contracts to be untrusted if they send funds to an external contract. However, it can be useful for quickly telling which contracts are likely to be more complicated, as well as helping visualize the interdependencies between functions in a contract.

#### Test details

Created function graphs via:

```bash
# Globstar and multiple variable substitutions may have to be turned on in your shell

# aragonOS
for contract in contracts/**/*.sol; do
    echo 'Graphing' ${contract}
    mkdir -p solgraph/${${contract#contracts/}%/*}
    solgraph ${contract} | dot -Tpng > solgraph/${${contract#contracts/}%\.sol}.png
done

# aragon-apps
mkdir -p solgraph/aragon-apps

for contract in aragon-apps/apps/**/contracts/*.sol; do
    echo 'Graphing' ${contract}
    solgraph ${contract} | dot -Tpng > solgraph/aragon-apps/${${contract#*/contracts/}%\.sol}.png
done
```

**Note**: currently requires [my fork of `solgraph`](https://github.com/sohkai/solgraph/tree/master) (install via `npm install -g git+https://github.com/sohkai/solgraph.git`)

### Oyente

- In non-lib files, Oyente only reported a single potential error: [EtherToken.sol](https://github.com/sohkai/aragonOS/tree/brett-audit/oyente/results/common) (transaction order dependency)
    - On analysis, this does not seem to be a real problem. The only time re-ordering would have an effect would be if someone tried to take out more than their total balance in multiple (different value) transactions. The total amount withdrawn would be indeterminate but no contract invariants would be invalidated. Re-entrancy shouldn't be a problem either, as all state changes happen before the call to `transfer()`.
- Oyente also reported a potential re-entrancy error in [MiniMeToken.sol](https://github.com/sohkai/aragonOS/blob/brett-audit/oyente/results/lib/minime/MiniMeToken)
    - On analysis, this does not seem to be a real problem
- Note that Oyente wasn't able to parse interface files, but even if it could, it wouldn't find any issues in them

#### Test details

Ran tests using supplied docker image:

```bash
# Globstar may have to be turned on in docker's bash

docker pull luongnguyen/oyente
docker run -i -d -t luongnguyen/oyente # Find name of container via docker ps

docker cp ./contracts <name>:/contracts
docker attach <name>

# Upgrade solc to 0.4.19
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo install solc=1:0.4.19-0ubuntu1~zesty

# aragonOS
(docker)>
    for contract in /aragonOS/**/*.sol; do
        echo 'Testing' ${contract}

        dirname=${contract%/*}
        dirname=/aragonOS/oyente/${dirname#/aragonOS/}
        mkdir -p ${dirname}

        filename=${contract%\.sol}
        filename=/aragonOS/oyente/${filename#/aragonOS/}
        python oyente.py -s ${contract} 2> ${filename}
    done

# aragon-apps will be tested after updating to use aragonOS 3.0.0

docker cp <name>:/aragonOS/oyente oyente/results/
```

**Note**: tests were run after being compiled with solc=0.4.19 (contracts were modified to all allow
`^0.4.18` compiler versions). Some Oyente modules also had to be modified to include
`allow-path=/aragonOS` whenever `solc` was run. Maybe this could be done better in the future with
[standard json](https://github.com/melonproject/oyente/issues/200) support.


## Future Considerations

- E2E integration tests for a full-scale DAO deployment with installed apps would be nice, especially covering common use cases (e.g. setting up the Voting app to control a Token Manager or Vault)
