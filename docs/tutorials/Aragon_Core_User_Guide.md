# Aragon Core User Guide
<h4> Documentation Version 1.0.5.1</h>
<h4>Aragon Core Version 0.5</h>

## Prerequisites

In addition to a working laptop or desktop computer with a decent internet connection, you will need the following to start using Aragon Core:

- Up-to-date [Brave](https://brave.com/), [Chrome](https://www.google.com/chrome/)/[Chromium](https://www.chromium.org/getting-involved/download-chromium), [Firefox](https://www.mozilla.org/firefox/), or [Opera](https://www.opera.com/download) web browser installed.
- Up-to-date [MetaMask](https://metamask.io/) browser extension installed. Use the "Old UI", not the “Beta UI”. If you are currently using the Beta UI, you can switch to the Old UI by toggling the UI switch on the Settings page of your MetaMask extension. To use Aragon on testnet, switch the network setting in MetaMask to Rinkeby Test Network.
- Test ether for the Ethereum Rinkeby test network. This test ether is used to pay for gas when creating and participating in DAOs on testnet. You can try the [Rinkeby faucet](https://faucet.rinkeby.io/) or post your Ethereum Rinkeby testnet address in the [#faucet channel on Aragon Chat](https://aragon.chat/faucet) to receive test ether for free. If you post your faucet request in the Aragon Chat, please wait patiently for an Aragon team member to see your message.

## Create a new Democracy DAO

#### Step 1. Navigate to [app.aragon.one](http://app.aragon.one) in your web browser and click “Create a new organization”

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/welcome.png)

#### Step 2. Select “Token project with Democracy” then click “Next”

A “Token project with Democracy” is a DAO where the vote cast by a token holder is weighted proportionally to their ownership stake of DAO tokens. For example, if a tokenholder owns 5% of the tokens minted by the DAO then their vote will count as 5% of the total votes on a given proposal.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/choosedemo.png)

#### Step 3. Claim a domain name then click “Next”

Aragon Core uses the Ethereum Name System (ENS) to assign names to DAOs.

_Note: This name currently cannot be changed._

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/thedaoname.png)

#### Step 4. Set the parameters of your Democracy DAO then click “Next”

“Support” is the number for what percent of the tokens that participated in a vote must approve a proposal for that proposal to pass. For example, if “Support” is set to 51%, then 51% of tokens that vote on a proposal must approve the proposal for it to pass.

“Min. Quorum” is short for “Minimum Acceptance Quorum. “Min. Quorum” is the number for what percent of the total outstanding supply of token must approve a proposal for the vote to be considered valid. For example, if the Min. Quorum is set to 20%, then 20% of the outstanding token supply must vote to approve a proposal for the vote to be considered valid. If a vote does not make quorum, then it will fail, even if more tokens voted to approve the proposal than voted against it. For example, if the Min. Quorum is set to 20% and 10% of the outstanding token supply votes against the proposal but only 15% vote in support, then the proposal will fail because it has not reached the Min. Quorum threshold.

“Vote Duration” is the length of time that the vote will be open for participation. For example, if the Vote Duration is set to 24 Hours (H), then tokenholders have 24H to participate in the vote. After the 24 hours is over, if the vote has not been approved by a majority of tokenholders and/or does not make quorum, then the vote will automatically fail. If the vote makes quorum and receives approval by a majority of tokenholders by the end of the Vote Duration, then the vote will automatically pass.

_Note: These parameters cannot currently be changed._

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/democracysettings.png)

#### Step 5. Choose token name and symbol then click “Next”

_Note: The token name and symbol cannot currently be changed._

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daotokens.png)

#### Step 6. Sign organization creation transactions

Now you need to sign two transactions in MetaMask to create your organization. Open MetaMask if the wallet window does not open automatically. Set the gas limit for each transaction at 6,660,000 to ensure that the transactions succeed. The second transaction may show up in MetaMask as a transaction with a blue dot next to it, indicating that it needs to be signed. Click the blue dot to open the transaction and sign it.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daomm1.png)

#### Step 7. Click “Get Started”

Your new Democracy DAO is ready to go!

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/orgready.png)

## Explore the Democracy DAO

### Home app

The Home app welcomes you to your DAO and offers you several options for different actions you can take to interact with your DAO. You can also use the menu on the left-hand side of the screen to view the different apps that are currently installed for your DAO. Aragon Core currently has the Home, Token Manager, Voting, Finance, and Settings apps installed, with a Permissions and Apps Manager coming soon.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daohome.png)

### Token Manager app

The Token Manager is the app you use to mint new tokens and assign them to yourself or other Ethereum accounts.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daotokenmanager.png)

You can mint new tokens by following these steps:

#### Step 1. Click “Assign Tokens” button

Enter the address of the recipient of the tokens and the number of new tokens you want to mint and assign to that address, then click “Assign Tokens”.

_Note: If you assign more tokens to other members than you have issued to yourself, you could lose control of your DAO to the other token holders. To maintain control, you will have to always control more tokens than are necessary for a vote to both reach the Min. Quorum and Support thresholds._

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daoaddmember.png)

#### Step 2. Create vote to assign tokens

Even though you are the only tokenholder, the Democracy DAO still requires a tokenholder vote for every action. Click “Sign Transaction” to sign the transaction that creates a new vote to assign the new token you want to mint. 

Note: Creating a vote will currently automatically make your account vote “Yes” on the proposal. You can change your vote by opening the vote in the Voting app, clicking the “No” button, and signing the transaction to change your vote to “No”.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daoaddmembervote.png)

#### Step 3. Sign and send transaction to create the “Assign Tokens” vote

After clicking “Sign Transaction”, a notification will pop-up in MetaMask. Open MetaMask, then sign and send the transaction to create the vote.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daoaddmembervotesign.png)

#### Step 4. Check out the newest member of your DAO!

Since you are the only tokenholder, the vote will automatically pass and the token automatically assigned to the account you added in Step 1. A good start to a new Democracy DAO!

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daoaddmemberapprove.png)

### Voting app

The voting app makes it easy for you to poll your fellow DAO tokenholders about their position on an infinite range of topics. Votes initiated by other Aragon apps also show up in the Voting app. For example, assigning tokens using the Token Manager or moving funds from the Finance app are each actions that require a vote by tokenholders in a Democracy DAO.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daovoting.png)

Follow these steps to create a new vote and poll your community about a topic you care about:

#### Step 1. Click “New Vote"

Fill out the question you want to poll your community about and click “Begin Vote”.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewvote.png)

#### Step 2. Sign transaction to create new vote

Click the “Sign Transaction” button, then open your MetaMask wallet to sign and send the transaction.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewvotesign.png)

#### Step 3. Ask the other DAO token-holders to review and vote on the proposal

Rally your fellow DAO tokenholders outside the app - for example, by email, forum, chat room, or good old fashioned face-to-face - and ask them to review and vote on the proposal. Tokenholders can visit the Vote app to see the list of open votes and cast their ballot accordingly.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daoviewvote.png)

#### Step 4. Other token-holders cast their vote

In this case, the other tokenholder in the organization does not support deploying the DAO to mainnet quite yet. They sent a follow-up email saying that they’re waiting to receive the results of the last round of security audits before setting a date for the mainnet launch.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewvoteno.png)

#### Step 5. Review the vote

Since there are only two token-holders in this DAO, and the Support parameter is set to 51%, the even split between yes and no on the example question of whether or not the DAO should be deployed to mainnet next week has resulted in a stalemate vote. Once the vote duration expires, the status of the vote will change to “Rejected”.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewvotestalemate.png)

### Settings app

The Settings app is where you can find the internal addresses for your DAO, as well as request test tokens and troubleshoot issues you are having with Aragon Core. If you want to send test ether or tokens to your DAO, make sure to use the Finance app address.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daosettings2.png)

### Finance app

The Finance app is the app that provides tokenholders with access to the funds held by their DAO. The Finance app shows current balance in ether and tokens as well as the transaction history of the DAO. You can also use the Finance app to initiate a new transfer of funds.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daofinance.png)

Follow these steps to create a new transfer from the Finance app:

#### Step 1. Request to have some test tokens sent to your DAO

Go to the Settings app and press the “Request test tokens” button. Open MetaMask to sign and send the transaction. About a minute or so after your transaction is confirmed, test tokens will be sent to the Finance app address of your DAO. You can then create a new transfer to send these tokens to another address.

[](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daosettings1.png)

#### Step 2. Click “New Transfer” to initiate a new transfer from the Finance app

Enter the Ethereum Rinkeby testnet address of the recipient and the amount of tokens to send them, along with an optional reference note about what the transfer is for. Then click “Submit Transfer”.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewtransfer.png)

#### Step 3. Sign the transaction to create the New Transfer vote

As mentioned before, all actions in the Democracy DAO require a vote by tokenholders. Click “Sign Transaction” then open MetaMask to sign and send the transaction that creates the New Transfer vote.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewtransfersign.png)

#### Step 4. Ask the other tokenholder in the DAO to review and vote on the transfer

The payment is intended to compensate the other tokenholder in the DAO for contracting work they did, so they waste no time reviewing and voting to approve the transfer.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daonewtransfervote.png)

#### Step 5. The vote transaction is signed and sent to approve the transfer

In blockchain we trust. Amen.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daotransfervotesign.png)

#### Step 6. Review the transfer in the Finance app

Go back to the Finance app to see a record of the transfer and a link to the transaction record on the blockchain.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daofinancereview.png)

## Create a Multisig DAO [WIP]

A “Token project with Multisig” is a DAO where the resources of the DAO are controlled by members of a multisig contract. For example, in a 2-of-2 multisig DAO, two signatures from two different specified accounts are required for a proposal to pass. 

If more tokens are minted for additional accounts, then the number of signatures required will increase as well. For example, starting with a 2-of-2 multisig and issuing one token to a new account will make the DAO a 3-of-3 multisig.

Each token-holder in a multisig organization can only hold one token at a time. An error will be shown and the transaction will fail if you attempt to mint additional tokens for existing token-holders.
