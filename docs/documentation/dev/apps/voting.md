# Voting

The voting app is an entity that will execute a set of actions on other entities if token holders of a particular token decide to do so.

### App initialization

The Voting app is instantiated with a certain set of parameters that won’t be changeable for the lifetime of the app:

- Token: address of the MiniMe token whose holders have voting power proportional to their holdings.
- Support required: what % of the votes need to be positive for the vote to be executed. Making it 50% would be a 'simple democracy'.
- Minimum acceptance quorum: minimum % of all token supply that needs to approve in order for the voting to be executed.
- Voting time: number of seconds a vote will be opened, if not closed prematurely for outstanding support.

For percentages `10 ^ 18` is interpreted as `100` to allow fine tuning. This means expressing 50% is `50 * 10 ^ 16` or 1/3 of the quorum is `(10 ^ 18) / 3`.

The only parameter that can be changed if 'Minimum acceptance quorum' for protecting against the case in which there is not enough voter turnout.

### Voting lifecycle

#### Creation
```
votingApp.newVote(bytes _executionScript, string _metadata)
```

A new vote is initialized with:

- Execution script: [EVM call script](../../AragonOS_document/#evm-call-script) to be executed on vote approval, contains a series of addresses and calldata payloads that will be executed.
- Metadata: An arbitrary string that can be used to describe the voting.

Voting conforms to the [AragonOS Forwarder interface](../../AragonOS_document/#forwarders). A generic forward action will create a vote with the provided execution script and empty metadata.

When a vote is created a reference to the previous block number is saved as the snapshot block for the vote. The reason the previous block number is used is to avoid double voting in the same block the vote is created. Whenever a vote is casted, the MiniMeToken associated with the app is checked for the token balance of the voter at the snapshot block.

#### Casting votes
```
votingApp.vote(uint256 _votingId, bool _supports)
```

In order for casting a vote all these conditions must be met:

- Sender had a positive token balance in the token at the voting snapshot block.
- Voting hasn't expired.
- Voting hasn't been already executed.

If the casted vote is in support of the voting, the number of tokens held by the sender at the snapshot block will be added to the voting `yea` counter. In case a vote is against, it will add it to the `nay` counter.

After any casted votes, the contract checks whether a voting already has the complete support to be executed (even if everyone else voted against, the vote would still be approved), in that case the vote is executed and closed.


#### Executing voting
```
votingApp.executeVote(uint256 _votingId)
```

After a voting has expired time-wise (and no more votes are allowed), the result of the voting can be executed by anyone if it was approved. For a voting to be considered approved both conditions must be true:

- The percentage of `yea` out of the total number of votes is greater than or equal the 'Support required' global parameter.
- `yea` support is greater than or equal the 'Minimum acceptance quorum' global parameter.

#### Changing acceptance minimum quorum
```
votingApp.changeMinAcceptQuorumPct(uint256 _minAcceptQuorumPct)
```

At any time, the minimum acceptance quorum for the new votes can be modified.

Any open votes will maintain the value minimum acceptance quorum was when they were created.

#### Forwarding

[Forwarding](../../AragonOS_document/#forwarders) using the common interface executes a `votingApp.newVote(...)` action. ACL is checked for whether the sender has permissions to create a vote.
