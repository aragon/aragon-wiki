# Aragon Community multisig – Beef beef [0xbeefbeef03c7e5a1c29e0aa675f8e16aee0a5fad](https://etherscan.io/address/0xbeefbeef03c7e5a1c29e0aa675f8e16aee0a5fad)

Required signatures: 4/6

## Signers

#### Aragon Foundation Multisig

[Address](https://etherscan.io/address/0xcafe1a77e84698c83ca8931f54a755176ef75f2c). [Read more](foundation.md).



#### Joe Urgo

CEO [District0x](http://district0x.io) & [Dapp daily](https://dappdaily.com) author.

[Address](https://etherscan.io/address/0x75d83a0ae1543fd4b49594023977e1daf5a954c5). [Proof](https://etherscan.io/tx/0x796538ed7dd4d76953b045c6341129f8976fefeb160de72618dc28c50138cc5a). [Keybase](https://keybase.io/joeu).



#### Kenny Rowe

COO of Dai Foundation. Governance at [MakerDAO](http://makerdao.com).

[Address](https://etherscan.io/address/0x939428c249a738990d4fb938509a5c43f3ecedcf). [Proof](https://etherscan.io/tx/0x2aea9d83c32328932bef2df2790539ddbcb489f140854d4cc2c063176135a6d6). [Keybase](https://keybase.io/kennyrowe).



#### Jake Brukhman

Cofounder of [CoinFund](http://coinfund.io).

[Address](https://etherscan.io/address/0xD4bE3593eb07F97de7E27bE56Ff7aD2f27a72364). [Proof](https://etherscan.io/tx/0x9af0ffb13ab3de609ac3b8314d4fa4737106cc7844a6f7bd125a4876239a4db1). [Keybase](https://keybase.io/jbrukh).



#### Mihai Alisie

Founder of [AKASHA](https://akasha.world), cofounder of [Ethereum](https://ethereum.org) and [Bitcoin Magazine](https://bitcoinmagazine.com/)

[Address](https://etherscan.io/address/0xfdbeebf23663577804248126559addb6785a5f8f). [Proof](https://etherscan.io/tx/0xe16626c5995b5633dc07b3bcc123bc046385abbdfb5b47c3da0e5eece74f19e4). [Keybase](https://keybase.io/mihaialisie).


#### Griff Green

Founder of [Giveth](https://giveth.io) and cofounder of the [White Hat Group](https://mashable.com/2017/07/26/ethereum-stolen-white-hat-group-rescued.amp)

[Address](https://etherscan.io/address/0x839395e20bbb182fa440d08f850e6c7a8f6f0780). [Proof](https://etherscan.io/tx/0x53e2d8f9f5ba85f1ea9966af7db621ce08cd4b3732b331ba97247c0a29c6e388). [Keybase](https://keybase.io/griffgreen).

### Proof notes

The proofs are a hex-encoded PGP signature that contains an English string representing his agreement with being part of the multisig, as well as his ownership of the address he will use for it.

To verify them (this example uses a macOS system):

- Obtain the data attached to the Ethereum transaction from the proof. Convert it to ASCII.
- If you have Keybase installed, just run `keybase pgp verify -m "{proof_message_here}"`
  - If you do not have Keybase installed, you can go to the multisig participant's Keybase profile, obtain his PGP key, and verify using GPG/PGP



## Responsibilities

- The community multisig will serve ANT holders and the broader crypto community to ensure Aragon's stated mission is carried.
- The community multisig will be responsible for deploying the Aragon Network code (provided by AragonDev, Aragon core developers group) once it is considered secure to do it and it matches the original expectations of it.
- Solving hypothetic deadlock problems in the Aragon Foundation multisig to ensure resources won't get locked and the project will continue its course.



## Rationale

- Deploying the Aragon Network is a huge responsibility, and that's why we consider it a community effort. AragonDev will provide the bytecode for such network, but without support from the community it won't be deployed.

- In case of a deadlock, the Aragon multisig will be a 5/7 multisig assuming that the Aragon Foundation multisig cannot sign. Support from the community multisig can solve the deadlock within the Aragon Multisig.
