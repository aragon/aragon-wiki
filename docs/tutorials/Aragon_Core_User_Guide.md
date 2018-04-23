## Aragon Core User Guide
#### Documentation Version 1.0.5.1
#### Aragon Core Version 0.5

### 0. Prerequisites

In addition to a working laptop or desktop computer with a decent internet connection, you will need the following to start using Aragon Core:

- Up-to-date Brave, Chrome/Chromium, or Firefox web browser installed.
- Up-to-date MetaMask browser extension installed. Use the "Old UI", not the “Beta UI”. If you are currently using the Beta UI, you can switch to the Old UI by toggling the UI switch on the Settings page of your MetaMask extension.
- Test ether for the Ethereum Rinkeby test network. This test ether is used to pay for gas when creating and participating in DAOs. You can try the [Rinkeby faucet](https://faucet.rinkeby.io/) or post your Ethereum Rinkeby testnet address in the [#faucet channel on Aragon Chat](https://aragon.chat/faucet) to receive test ether for free. If you post your faucet request in the Aragon Chat, please wait patiently for an Aragon team member to see your message.

### Create a new Democracy DAO

**Step 1. Navigate to [app.aragon.one](http://app.aragon.one) in your web browser and click “Create a new organization”**

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/welcome.png)

**Step 2. Select “Token project with Democracy” then click “Next”**

A “Token project with Democracy” is a DAO where the vote cast by a token holder is weighted proportionally to their ownership stake of DAO tokens. For example, if a tokenholder owns 5% of the tokens minted by the DAO then their vote will count as 5% of the total votes on a given proposal.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/choosedemo.png)

**Step 3. Claim a domain name then click “Next”**

Aragon Core uses the Ethereum Name System (ENS) to assign names to DAOs. This name currently cannot be changed, so choose wisely!

TODO: note character limits

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/thedaoname.png)

**Step 4. Set the parameters of your Democracy DAO then click “Next”**

“Support” is the number for what percent of the tokens that participated in a vote must approve a proposal for that proposal to pass. For example, if “Support” is set to 51%, then 51% of tokens that vote on a proposal must approve the proposal for it to pass.

“Min. Quorum” is short for “Minimum Acceptance Quorum. “Min. Quorum” is the number for what percent of the total outstanding supply of token must approve a proposal for the vote to be considered valid. For example, if the Min. Quorum is set to 20%, then 20% of the outstanding token supply must vote to approve a proposal for the vote to be considered valid. If a vote does not make quorum, then it will fail, even if more tokens voted to approve the proposal than voted against it. For example, if the Min. Quorum is set to 20% and 10% of the outstanding token supply votes against the proposal but only 15% vote in support, then the proposal will fail because it has not reached the Min. Quorum threshold.

“Vote Duration” is the length of time that the vote will be open for participation. For example, if the Vote Duration is set to 24 Hours (H), then tokenholders have 24H to participate in the vote. After the 24 hours is over, if the vote has not been approved by a majority of tokenholders and/or does not make quorum, then the vote will automatically fail. If the vote makes quorum and receives approval by a majority of tokenholders by the end of the Vote Duration, then the vote will automatically pass.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/democracysettings.png)

**Step 5. Choose token name and symbol then click “Next”**

TODO: note character limits

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daotokens.png)

**Step 6. Sign organization creation transactions**

Now you need to sign two transactions in MetaMask to create your organization. Open MetaMask if the wallet window does not open automatically. Set the gas limit for each transaction at 6,660,000 to ensure that the transactions succeed. The second transaction may show up in MetaMask as a transaction with a blue dot next to it, indicating that it needs to be signed. Click the blue dot to open the transaction and sign it.

![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/images/user_guide/daomm1.png)

