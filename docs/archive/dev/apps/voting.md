# [Voting](https://github.com/aragon/aragon-apps/tree/master/apps/voting)

_**Code in Github:**_ [aragon-apps/apps/voting](https://github.com/aragon/aragon-apps/tree/master/apps/voting)

The Voting app is an entity that will execute a set of actions on other entities if token holders of a particular token decide to do so.

### App initialization

The Voting app is instantiated with a certain set of parameters that won’t be changeable for the lifetime of the app:

- Token: address of the MiniMe token whose holders have voting power proportional to their holdings.
- Support required: what % of the votes need to be positive for the vote to be executed. Making it 50% would be a 'simple democracy'.
- Minimum acceptance quorum: minimum % of all token supply that needs to approve in order for the voting to be executed.
- Voting time: number of seconds a vote will be opened, if not closed prematurely for outstanding support.

The only parameter that can be changed is 'Minimum acceptance quorum' for protecting against the case in which there is not enough voter turnout.

### A Note on Percentages
If you are a front end user you can skip this section, but if you are a developer and want to manipulate the [Voting contract](https://github.com/aragon/aragon-apps/blob/master/apps/voting/contracts/Voting.sol) directly these are some notes you should consider.

The variables "Support required" and "Minimum acceptance quorum" are percentages that are expressed between zero and a maximum of 10^18 (that represents 100%). As a consequence, it's important to consider that 1% is actually represented by 10^16.

Moreover you should pass to the smart contract the actual number, not the scientific notation so:
- 10^16   is  10000000000000000   (or 1 with 16 zeros)
- 10^18   is  1000000000000000000  (or 1 with 18 zeros)

Here are a few percentages you can use

Percentage | Scientific Notation | actual input passed to the smart contract
------------ | ------------- |  -------------
0%     | 0         | 0
1%     | 10^16         | 10000000000000000
10%   | 10*10^16   | 100000000000000000
20%   | 20*10^16   | 200000000000000000
25%   | 25*10^16   | 250000000000000000
50%   | 50*10^16   | 500000000000000000
60%   | 60*10^16   | 600000000000000000
70%   | 70*10^16   | 700000000000000000
75%   | 75*10^16   | 750000000000000000
100% | 100*10^16 | 1000000000000000000


### Vote lifecycle

#### Creation
```
votingApp.newVote(bytes _executionScript, string _metadata)
```

A new vote is initialized with:

- Execution script: [EVM call script](../../documentation/aragonOS/#evm-call-script) to be executed on vote approval, contains a series of addresses and calldata payloads that will be executed.
- Metadata: An arbitrary string that can be used to describe the voting.

The voting app conforms to the [aragonOS Forwarder interface](../../documentation/aragonOS/#forwarders). A generic forward action will create a vote with the provided execution script and empty metadata.

When a vote is created a reference to the previous block number is saved as the snapshot block for the vote. The reason the previous block number is used is to avoid double voting in the same block the vote is created. Whenever a vote is casted, the MiniMeToken associated with the app is checked for the token balance of the voter at the snapshot block.

#### Casting votes
```
votingApp.vote(uint256 _voteId, bool _supports)
```

In order for casting a vote all these conditions must be met:

- Sender had a positive token balance in the token at the vote snapshot block.
- Vote hasn't expired.
- Vote hasn't been already executed.

If the casted vote is in support of the vote, the number of tokens held by the sender at the snapshot block will be added to the vote `yea` counter. In case a vote is against, it will add it to the `nay` counter.

After any casted votes, the contract checks whether a vote already has the complete support to be executed (even if everyone else voted against, the vote would still be approved), in that case the vote is executed and closed.


#### Executing voting
```
votingApp.executeVote(uint256 _voteId)
```

After a vote has expired time-wise (and no more votes are allowed), the result of the vote can be executed by anyone if it was approved. For a vote to be considered approved both conditions must be true:

- The percentage of `yea` out of the total number of votes is greater than or equal the 'Support required' global parameter.
- `yea` support is greater than or equal the 'Minimum acceptance quorum' global parameter.

#### Changing acceptance minimum quorum
```
votingApp.changeMinAcceptQuorumPct(uint256 _minAcceptQuorumPct)
```

At any time, the minimum acceptance quorum for the new votes can be modified.

Any open votes will maintain the value minimum acceptance quorum was when they were created.

#### Forwarding

[Forwarding](https://hack.aragon.org/docs/forwarding-intro) using the common interface executes a `votingApp.newVote(...)` action. ACL is checked for whether the sender has permissions to create a vote.
