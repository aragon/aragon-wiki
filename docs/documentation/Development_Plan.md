<center>
<img src="../../images/logo_text_under_dark.png">
# Development Plan
version 1.0

<img src="../../images/development_plan/01.png">
</center>

## **Introduction**

Aragon is everything you need to run organizations (companies, NGOs, foundations, open
source projects...) on the Ethereum blockchain. It implements features like a cap table,
token transfers, voting, roles, fundraising and accounting. Aragon organizations are easily
customizable, and they are also extensible by installing third party modules.

Aragon organizations will be able to opt-in into the Aragon Network, which will provide
services like upgradeability and a decentralized court arbitration system for Aragon
organizations.

For more information, please refer to our website our dapp white paper and our Network
whitepaper.

This document describes how Aragon Dev plans to develop the Aragon dapp, the Aragon
Network and how Aragon Dev is positioned in the larger context of the Aragon project. 

## **History & Vision**
<center>
<img src="../../images/development_plan/02.png" width="50%"><img src="../../images/development_plan/03.png" width="50%">
</center>

Luis and Jorge have been dreaming of a decentralized world for years. They met via Twitter
when they were only 15 years old, and immediately started building products together.

At the age of 17, they prototyped a fully decentralized Internet replacement by using mesh
networks, blockchain technology and protocols like Bluetooth LE and WiFi Direct.

Stampery—Luis’ latest company—made blockchain timestamping accessible, and has
worked with institutions like the Estonian government, Microsoft and Telefonica. It
participated in TechCrunch Disrupt and was backed by billionaire Tim Draper.

Luis has also been recognized as a 30 Under 30 by Forbes and Innovator Under 35 by the
MIT.

Before building Aragon, Luis and Jorge were in Silicon Valley working on solving the problem
of patent trolls with Unpatent. After figuring out how broken the underlying infrastructure of
innovation is—patent trolls thriving, Donald Trump winning the elections, bureaucracy
eating entrepreneurship—they decided to focus all of their time in building the
infrastructure that new companies and organizations will run on top of. 

<center>
<img src="../../images/development_plan/04.png">
</center>

When talking about Aragon, taking a step back and thinking about the why of organizational
structures like companies is a sane move.
Firms or companies exist in order to create value by using resources to create products or
provide services.
However, intermediaries and third parties such as governments decrease the output of
those organizations by imposing restrictions and creating complex regulatory frameworks.
Aragon was born to disintermediate the creation and maintenance of companies and other
organizational structures.

Luis and Jorge were very inspired by Nobel prize Ronald Coase and his amazing paper The
Nature of the Firm and Yochai Benkler's Linux and the Nature of the Firm. Both explore the
concept of company.

At Aragon Dev, we believe that the blockchain and the Internet are changing the incentives
for companies to exist, and we are building tools for the next generation of companies that
will take advantage of these changes.

However, for decentralized organizations to be widespread, we need to make sure that they
are easy to use, upgradeable/durable and able to resolve human disputes.

We want to solve—either us or partnering with others—those points in order to make
decentralized organizations widespread.

And, thanks to the Aragon dapp and the Aragon Network, we can solve those points.

## **Organizational Structure**

<center>
<img src="../../images/development_plan/05.png">
</center>

**Aragon Community**, defining the community members contributing to the dapp and Network
and the Aragon Network Token holders.

**Aragon MTU**, from now on, _**the Foundation**_, a non-profit organization based in Estonia, will
serve as the umbrella organization responsible for allocating resources to other bodies for
future cryptocurrency research and development going forward. The board of the
Foundation consists of Luis Cuende and Jorge Izquierdo. The Foundation will focus on
overarching the mission and will enable operating organizations to accomplish the day-to-
day work.

The Foundation will also serve as a governance entity that will listen the Community until
the Aragon Network is fully operational, from where the full governance of the Network will
be transferred to the ANT holders.

**Aragon Dev**, a for-profit corporation that will be founded after the token sale is finished, and
will serve the Foundation and employ a team that will work on the Aragon platform. It will
also serve as a service provider for the Aragon Network.

**Funding Priorities** It is intended that the Foundation will deploy the revenue from the token
sale as depicted in the Intended Use of Revenue document, but it reserves the right to make
changes if it deems them necessary.

## **Development Milestones**

We will divide development milestones in the form of releases.
Each release may have multiple deployment stages, from being in alpha stage—running on
the test network—to begin in the production stage—running on the main network—going
through multiple testing, security and QA stages.

### 0.1 — The Initial Release
<center>
<img src="../../images/development_plan/06.png">
</center>
This the first release on macOS after months of work and weeks of privately-conducted
community testing. Featured all the basic functionality that an organization needs to
operate. It was not made public.
___
<h3>Release Calendar</h3>

- **Private Alpha**: February 2017

### 0.2 — The Public Release
<center>
<img src="../../images/development_plan/07.png">
</center>
This was the first public release. Working in both macOS, Linux and Windows. Introduced a
new UI styling and Kovan testnet support.

For more information, read the launch post.
___
<h3>Release Calendar</h3>

- **Private Alpha**: February 2017
- **Public Alpha**: March 2017

### 0.3 — The Governance Release
<center>
<img src="../../images/development_plan/08.png">
</center>
This version added the Bring your own token functionality, that allows using Aragon with any
ERC20 token as a governance token—ERC20 is a token standard allows everyone to
interface with a variety of tokens in a common way. It also added two new bylaws, specific
address only and ask oracle contract for confirmation—stepping stone for more dynamic
bylaws.

It introduced delegate voting and creation of custom, complex stock classes.

It featured new iconography, notable startup time improvements and web browser support
for using it with Ethereum browsers/clients like Mist, Parity, MetaMask, Status etc.
___
<h3>Release Calendar</h3>

- **Alpha**: April 2017

### 0.4 — The Money Release
This release will focus on adding:

**Economic abstraction**

Companies will be able to hold and interact with any standard value-holding token

**Improved budgeting and accounting**

Organizations will be in itself the organization's bank account.

**Dividends**

Dividend sharing with shareholders, if desired.

**Fundraising tokens**

Company will be able to raise funds in the form of tokens, not necessarily ether. More
flexible founding routes.

**Funds vault**

Final funds vault API, the only part of the company that is not expected to change. This will
make upgradeability easier, being able to redeploy significant parts of the organization while
maintaining its access to the funds.
___
<h3>Release Calendar</h3>

- **Alpha**: June 2017
- **Bug bounty (mainnet)**: From July to September 2017
- **Private Beta (mainnet)**: October 2017

This will be the first release that gets deployed to the mainnet.

After 3 months of public bug bounties in the mainnet, we will start allowing the first
companies to be created using Aragon in the mainnet. 

### 0.5 — The Modular Release
<center>
<img src="../../images/development_plan/09.png">
_Blockchain projects that have already manifested interest_
</center>

This release will focus on adding:

**Organization-wide encrypted datastores**

Using a connector for IPFS/Swarm, we will provide a second layer that will give storage
capabilities to the dapp. This way, new features and UX sugar will be able to be added to the
organizations. Example: setting a company’s logo, or implementing an organization-wide
identity system, instead of public ones.

**Front-end modules API**

This will let developers build modules for Aragon that extend its functionality.

**Core modules API**

The API will let the developer trigger actions inside the organization itself, and access more
low-level capabilities.

**Module developer incentives plan**

We will provide a module store and incorporate an incentives system for developers to be
rewarded.
___
<h3>Release Calendar</h3>

- **Alpha**: September 2017
- **Private Beta (mainnet)**: December 2017 

### 0.6 — The Upgradeable Release
<center>
<img src="../../images/development_plan/10.png">
</center>

This release will focus on adding:

**Full upgradeability**

Organizations that will be able to run as long as the Ethereum blockchain runs. No matter if
big chunks of functionality are swapped.

**Different upgrade tracks**

We will provide different upgrade options.  This is what we are targeting:

- Automatic upgrades: The network will automatically upgrade the organization.
- Delegated upgrades: A representative appointed by the org will upgrade it.
- Upgrades by voting: A majority of voting power will approve upgrades.
___
<h3>Release Calendar</h3>

- **Alpha**: December 2017
- **Bug bounty (mainnet)**: January 2018
- **Private Beta (mainnet)**: February 2018 

### 0.7 — The Network Release
<center>
<img src="../../images/development_plan/11.png">
</center>

This release will focus on adding:

**Basic network-wide governance**

Which power the network will have over organizations, governance votings to decide on
service providers, payouts functionality.

**ANT token minting**

The network will be responsible for the minting policy of ANT, it will be decided through the
governance of the network. Some of its responsibilities will be to decide the issueing rate,
the price and how companies pay for the subscription to the network.

**Initial Aragon Dev proposal**

First proposal by Aragon Dev to Aragon Network for funding and further development
milestones.

**Integrate upgradeability**

Provide upgradeability as a network service for all Aragon Network organizations.
___
<h3>Release Calendar</h3>

- **Alpha**: March 2018
- **Bug bounty (mainnet)**: April 2018
- **Production deploy (mainnet)**: May 2018 

### 0.8 — The Court Release
<center>
<img src="../../images/development_plan/12.png">
</center>

This release will focus on adding:

**Aragon Jurisdiction**

Provide a decentralized court, Aragon Jurisdiction, as network service or work with a
decentralized court project to make it work with the network.

**Orgs in the AN respond to ANJ**

Organizations in the Aragon Network start being under the Aragon Jurisdiction.

**Constitution proposal**

First proposal for the basic laws that all companies will be act under.
___
<h3>Release Calendar</h3>

- **Alpha**: Q3 2018
- **Bug bounty (mainnet)**: Q3-Q4 2018
- **Production deploy (mainnet)**: Q4 2018 

### 0.9 — The Unknown Release
<center>
<img src="../../images/development_plan/13.png">
</center>

This is a wildcard release. The ecosystem is evolving very quickly and we don't know what
interesting features we may want to add that will make the 1.0 release more appealing.

Some ideas of what we might work on here:

**Privacy-focused companies**

_**zkSnarks**_ could provide companies with way more privacy. Private voting and ownership are
very interesting concepts we are researching about.

**Different governance mechanisms**

Until now Aragon companies and the Network will be simple liquid democracy based
entities.  

We are closely following research and experimentation on other governance mechanisms
such as **Futarchy**.

### 1.0 — The Release
<center>
<img src="../../images/development_plan/14.png">
</center>

We expect to start marketing Aragon to the mainstream with this release. To achieve that
mission, we will have to place an important focus on design and user experience.
