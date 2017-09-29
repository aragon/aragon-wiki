The kernel is responsible for receiving the transaction in the different accepted forms, check whether the action is allowed to be performed and gets and dispatches the transaction to the correct component.

Before going into detail on how the different parts work, this graph is an overview of the flow of a transaction in the kernel:

![kernel architecture flow](/images/kernel-arch.png?raw=true)

## Transaction entrypoints

Given that the logic for Aragon DAOs lives in components that are dispatched by the Kernel, it allows for functions in Aragon DAOs to be executed in a number of different ways.

### Ether transactions

#### Vanilla Ether transaction

This is the 'normal' transaction scheme. If the transaction has value associated, then that ether is tokenized into a special EtherToken.

Payload for the DAO call is in the transaction data parameter.

#### Preauthorized Ether transaction

The idea for this kind of transaction is that someone might want to preauthorize the execution of a certain payload on their behalf.

The workflow for this would be:

- Calculate the transaction data of the call you would make directly using a 'Vanilla Ether transaction'.
- Use `Kernel.personalSignedPayload(payload, nonce)` with a random number as nonce.
- Sign the hash obtained with the authorizing account private key.
- Provide the signature and the payload to the entity that will dispatch the call on your behalf.
- That entity will be able to execute the original payload on your behalf sending the payload and the signature values to `Kernel.preauthDispatch`

### Token transactions

We firmly believe that tokens should be able to be used as well as Ether for executing computation on smart contracts. We implemented these two methods for calling functions in Aragon DAOs by sending tokens to her.

**Important:** tokens are arbitrary contracts that can run malicious code. Some sort of whitelist has to be implemented for the tokens that are allowed to execute transactions in the DAO. There is an attack possible where you can create a fake token contract and make transactions to the DAO as another person. Only tokens with trusted code (that doesn't allow impersonation) should be added to this whitelist.

#### approveAndCall

`approveAndCall` isn't part of the original ERC20 standard, but it is a common interface some tokens integrate (including MiniMe).

The idea is that a sender can make and `approve` for another address and in the same call, it will do a call to that address providing it with a given payload.

This allows the receiving end to transfer the tokens to itself and knowing that a given transaction payload came from an address that send a certain amount of tokens with it.

#### ERC223

[Still being discussed](https://github.com/ethereum/EIPs/issues/223) but the idea is that when ERC223 token transfers are made to a contract, it will execute a function in the receiving contract called `tokenFallback`.

This function can provide the contract with some payload data to be executed in the DAO.

## Permissions oracle

Before dispatching any transaction, the Kernel will check with another address whether the a given payload is allowed to be executed by a certain sender, sending x amount of y tokens.

The interface for a contract that wants to act as the Permissions Oracle is the following:

```
contract IPermissionsOracle {
    function canPerformAction(address sender, address token, uint256 value, bytes data) constant returns (bool);
}
```

In the case of Aragon DAOs, this Permissions Oracle is the BylawsApp.

## Function registry

Applications and organs must be registered for the DAO to know where to correctly route every transaction.

Low level this works by saving for every function signature what the component address is and whether it is an organ or an application.

High level registry for apps and organs is done throught the MetaOrgan.

## Dispatching

Depending on the result of the function registry on whether certain payload is executed by an organ or an app, the app will be dispatched:

- Organ: the call is dispatched using a `delegatecall`. This means, the organ logic will be executed in the DAOs context and could make any action/edit any storage.
- Application: the call is dispatched using a `call`. This means every app lives in its own sandbox and won't be able to perform actions on the DAO unless explicitely allowed by the PermissionsOracle.
