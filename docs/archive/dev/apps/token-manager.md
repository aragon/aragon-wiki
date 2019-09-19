# [Token Manager](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager)

_**Code in Github:**_ [aragon-apps/apps/token-manager](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager)

Token Manager is an abstraction layer over the concept of the MiniMeToken controller. The controller of a MiniMeToken is an address that can mint and destroy tokens, it also gets a 'hook' call on every transfer and approval giving the controller the chance to note it and decide whether to let the transfer through.

Its most important features are minting new tokens and locking token transferability over time (vesting).

One Token Manager instance can manage one MiniMe token.

### Modes

Token Manager can handle two modes or use-cases. The mode is set on initialization and cannot be changed.

- **Native token mode**: The managed token can be minted arbitrarily.
- **Wrapped token mode**: The managed token acts as a wrapper to another ERC20 token. The managed token can only be minted by staking (wrapping) units of the wrapped token. At any time a holder of the wrapper token can exchange it back for the original token (unless there is vesting).


### Initialization

There are two different initializers depending on the mode.

#### Native
```
tokenManager.initializeNative(address token)
```

Parameters:

- **Token**: The token being managed. The Token Manager should have already been set as the `controller` for the token.

#### Wrapped
```
tokenManager.initializeWrapped(address wrapperToken, address wrappedToken)
```

Parameters:

- **Wrapper token**: Same as token above.
- **Wrapped token**: Address of the token that will be wrapped

### Mode specific functionality

#### Native mode

##### Mint tokens
```
tokenManager.mint(address receiver, uint256 amount)
```

Creates new tokens and assigns them to the receiver.

##### Issue tokens
```
tokenManager.issue(uint256 amount)
```

Creates new tokens that are assigned to the Token Manager. Those can be later assigned.

#### Wrapper mode

Wrapper mode works under the assumption that the wrapped token is a trusted ERC20 implementation, meaning transfers are performed normally (no fees on token transfers like) and balances constant if no operations are made.

##### Wrap tokens
```
tokenManager.wrap(uint256 amount)
```

Requires an existing ERC20 allowance to the Token Manager address for at least that amount of tokens. It will transfer the wrapped tokens to the Token Manager and mint an equal amount of wrapper tokens for the sender.

Will fail if sender hasn't created the allowance or doesn't have enough wrapped token balance.

##### Unwrap tokens
```
tokenManager.unwrap(uint256 amount)
```

It will burn the wrapper tokens and transfer the user the same amount in wrapped tokens.

Will fail if sender doesn't own that many tokens.

### Generic functionality

#### Assign tokens
```
tokenManager.assign(address receiver, uint256 amount)
```

Transfers tokens from Token Manager balance to `receiver`. Token Manager can own tokens as a result of an `issue` operation on native mode or just because the Token Manager received a normal token transfer.

#### Assign vested tokens
```
tokenManager.assignVested(address receiver, uint256 amount, { Vesting parameters })
```

Performs an assign but attaches rules on when the receiver can transfer her tokens. Next section goes in depth into how vesting works.

#### Revoke vesting
```
tokenManager.revokeVesting(address holder, uint256 vestingId)
```

Revokes a vesting from a holder (if vesting is revokable).

### Vesting

Assigning tokens with vesting performs a normal ERC20 token transfer operation but then the holder will only be able to perform transfers according to a vesting calendar.

MiniMe tokens perform a check with their controller before doing a token transfer. This hook is used by the Token Manager to check whether a holder can transfer the desired tokens.

By making the holders the direct owners of the tokens, they are able to use tokens for actions that check the token balance such as voting, while at the same time being able to lock transferability of them. Vested holders are also allowed to forward transactions through the TokenManager.

#### Vesting parameters

- Start: timestamp in seconds that marks the beginning of the vesting schedule (can be a past or future date).
- Cliff: timestamp for the first moment in which any assigned tokens can be transferred. The amount of tokens that gets unlocked in the cliff is directly proportional to the overall vesting schedule.
- Vesting: timestamp for the moment all tokens assigned are transferable.
- Revokable: whether the Token Manager can revoke a token grant in the middle of the vesting. When that happens, tokens that are not vested yet are transferred back to the Token Manager.

#### Calculating transferable tokens

A token holder can have multiple vestings at the same time. For checking whether an amount of tokens can be transferred, the contract will check for all the vestings a holder has how many tokens can be transferred at that moment (note that some of the tokens may have been assigned without vesting).

For every vesting, the amount:

- From start to cliff, 0 tokens are transferable.
- From cliff to vesting, the amount of transferable tokens is interpolated using this formula: `transferable = tokens * (now - start) / (vesting - start)`
- After vesting, all tokens are transferrable.

### Forwarder

Token Manager allows holders of its underlying token to execute external actions by identifying themselves as token holders. This can be used for allowing token holders to perform a particular action in the DAO (e.g create a vote) without the ACL having to know anything about tokens.

For this, Token Manager conforms to the [aragonOS Forwarder interface](../../documentation/aragonOS/#forwarders) and forwards calls to holders that own at least one token.

### Limitations

- In order to avoid an attack in which too many token vestings are added to a holder to cause an out of gas, the amount of token vestings a holder is limited to 50.
