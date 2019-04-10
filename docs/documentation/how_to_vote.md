# How to vote in an Aragon Network Vote

## Background
Once per quarter, the Aragon community gets together to make key decisions affecting the future of the project as part of the Aragon Governance Proposal (AGP) process. Originally defined in [AGP-1: The Aragon Governance Proposal Process](https://github.com/aragon/AGPs/blob/master/AGPs/AGP-1.md), and grounded in the values of [AGP-0: The Aragon Manifesto](https://github.com/aragon/AGPs/blob/master/AGPs/AGP-0.md), the AGP process defines a way for community members to present proposals that introduce some change to an important area of the project, and then vote together to approve or reject the proposals.

You can learn more about the AGP process on the [Governance](documentation/governance.md) page of the wiki.

## Voting methods

During each Aragon Network Vote, Aragon Network Token ([ANT](documentation/aragon_network_token.md)) holders have an opportunity to cast their votes to approve or reject proposals that have made it through the AGP process and onto the final ballot. ANT is a token on the Ethereum network, with access controlled by a private key corresponding to the owner of each token. Votes are cast by using the private key of an account holding ANT to sign a transaction authorizing a vote to be cast with the ANT. No ANT is transferred by this vote transaction, and voting can be done with keys kept completely offline in so-called "cold storage".

!!! info "Note"
    The exact details of which AGP voting app to use and what data to use for raw transactions is published in a "Final details" blog post before each Aragon Network Vote. Visit the [Aragon project blog](https://blog.aragon.org/tag/governance-proposals/) to find the most recent "Final details" blog post with specific information about the vote you want to participate in, then cast your vote for each proposal you want to vote on.

!!! warning "Note"
    If you store your ANT on an exchange, then unless the exchange has explicitly enabled functionality to vote from your exchange account, you must first withdraw your ANT to an Ethereum account that you control the private key to or have the authority to vote from **before the vote starts** so that you can properly sign the vote transaction. After the vote has started, you can transfer the ANT back to the exchange account.

These are the methods currently available to cast a vote:

### Voting with keys stored in a Web3 mobile browser wallet

Since the release of Aragon 0.6.3, the Aragon web client has been designed to be fully responsive. This means it is possible to create and participate in Aragon organizations using one of the growing number of Web3-compatible mobile browsers. 

To participate in an Aragon Network Vote from your mobile device, make sure that your Ethereum account in your Web3 mobile browser is holding ANT at the time an Aragon Network Vote starts. Then you can navigate to the AGP voting app in your Web3 mobile browser, click on the proposal you want to vote on, click the voting option you support, then sign and broadcast your vote transaction. Do this for each proposal you want to vote on to finish casting your votes.

### Voting with keys stored in MetaMask

See section 2.2.3.3 of the [Aragon User Guide](tutorials/Aragon_User_Guide.md#223-voting-app) for instructions on voting with keys stored in MetaMask. You can also watch a video example [here](https://www.youtube-nocookie.com/embed/1nmkPFZid_c).

When voting using MetaMask the signer should show you the VOTE function identifier right on top of the 0 ETH amount:

<p align="center">
<img src="documentation/doc_images/vote_metamask.png" width="300" /> </center>
</p>

### Voting with keys stored in a Ledger hardware wallet
Currently the only way to vote with a Ledger wallet is by using [Frame](https://frame.sh) or MetaMask as the Ethereum provider. The instructions are much the same as the above instructions for “Voting with keys stored in MetaMask” except that the final signing step will be performed by confirming the transaction on your Ledger wallet.

See the instructions MetaMask has published for using Ledger with MetaMask [here](https://medium.com/metamask/metamask-now-supports-ledger-hardware-wallets-847f4d51546).

To vote with Frame, first install the Frame desktop app from [https://frame.sh](https://frame.sh) and select "Mainnet" in the connection settings as the network you want to use. If you are using the Aragon Desktop client, that is all you need. If you are using the Aragon web client with Chrome/Chromium or Firefox, then you need to install the Frame browser extension, links to which can also be found on [https://frame.sh](https://frame.sh). Next, plug in your hardware wallet, enter your PIN, and open the Ethereum app. Navigate to the AGP voting app in Aragon, then open Frame and give the Aragon client permission to access your Ethereum accounts via Frame. Now you can vote and confirm the transaction on your Ledger hardware wallet via the Frame interface.

### Voting with keys stored in a Trezor hardware wallet
Currently the only way to vote with a Trezor wallet is by using [Frame](https://frame.sh) or MetaMask as the Ethereum provider. The instructions are much the same as the above instructions for “Voting with keys stored in MetaMask” except that the final signing step will be performed by confirming the transaction on your Trezor wallet.

See the instructions MetaMask has published for using Trezor with MetaMask [here](https://medium.com/metamask/trezor-integration-in-metamask-a8eaeae7f499).

To vote with Frame, first install the Frame desktop app from [https://frame.sh](https://frame.sh) and select "Mainnet" in the connection settings as the network you want to use. If you are using the Aragon Desktop client, that is all you need. If you are using the Aragon web client with Chrome/Chromium or Firefox, then you need to install the Frame browser extension, links to which can also be found on [https://frame.sh](https://frame.sh). Next, plug in your hardware wallet, enter your PIN, and open the Ethereum app. Navigate to the AGP voting app in Aragon, then open Frame and give the Aragon client permission to access your Ethereum accounts via Frame. Now you can vote and confirm the transaction on your Trezor hardware wallet via the Frame interface.

### Voting with keys stored offline (but not in a Ledger or Trezor)
If you are voting with keys that are stored offline (but not in a Ledger or Trezor), for example in a paper wallet or offline USB stick, you can follow MyCrypto’s guide “[How To Make An Offline Transaction](https://support.mycrypto.com/offline/making-offline-transaction-on-mycrypto.html)” to create an offline transaction using your offline keys. You may also find the guide “[How To Run MyCrypto Offline and Locally](https://support.mycrypto.com/offline/running-mycrypto-locally.html)” helpful if you are unfamiliar with how to use MyCrypto offline.

If you have any trouble connecting to the default node used by the Aragon client, you can also use the raw vote transaction data to cast your vote using MyCrypto with any of the supported signing options. For example, the raw transaction data for the vote to ratify AGP-1 looked like this:

**Raw transaction YES vote:**
```
To address: 0xcfee4d3078f74197ce77120dbfe6d35f443cab1c
Value: 0 ETH
Data: 0xdf133bca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000
Gas limit: 120000
```

**Raw transaction NO vote:**
```
To address: 0xcfee4d3078f74197ce77120dbfe6d35f443cab1c
Value: 0 ETH
Data: 0xdf133bca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
Gas limit: 120000
```

This is what each field in the raw transaction data translates to:

<p align="center">
<img src="documentation/doc_images/vote_data.png" width="700" /> </center>
</p>

## Troubleshooting
If you are having any trouble voting, leave a message in the [Aragon Chat #feedback channel](https://aragon.chat/channel/feedback) describing what happened. At their soonest availability, a community member will try to help you troubleshoot your issue and cast your vote.
