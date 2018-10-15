<center>
<img src="../../images/logo_text_under_dark.png">
# Development Plan

!!! warning "_**This documentation is currently somewhat outdated**_"

    **Version**: 1.3

<img src="../../images/development_plan/01.png">
</center>

## **Introduction**

Aragon is everything you need to run organizations (companies, NGOs, associations, open source projects...) on the Ethereum blockchain. It implements features like a token manager, a voting app, a finance app, a vault, and a very flexible permission system based off [aragonOS](https://aragon.one/os). Aragon organizations are easily customizable, and they are also extensible by installing third party apps.

Aragon organizations will be able to opt-in into the Aragon Network, which will provide services like a decentralized court arbitration system for them.

For more information, please refer to [our website](https://aragon.one) our dapp white paper and our [Network whitepaper](https://github.com/aragon/whitepaper).

This document describes the plans to develop the Aragon dapp and the Aragon Network. 

## **Organizational Structure**

<center>
<img src="../../images/development_plan/05.png">
</center>

**Aragon Community**, defining the community members contributing to the dapp and Network and the Aragon Network Token holders.

**Aragon Institution MTU**, from now on, _**the Foundation**_, a non-profit organization based in Estonia, will serve as the umbrella organization responsible for allocating resources to other bodies for future cryptocurrency research and development going forward. The board of the Foundation consists of Luis Cuende and Jorge Izquierdo. The Foundation will focus on overarching the mission and will enable operating organizations to accomplish the day-to- day work.

The Foundation will also serve as a governance entity that will listen the Community until the Aragon Network is fully operational, from where the full governance of the Network will be transferred to the ANT holders.

**Aragon One AG**, a Swiss for-profit corporation that serves the Foundation and employs the first team that will work on the Aragon platform and the Aragon Network.

## **Development Milestones**

We will divide development milestones in the form of releases.
Each release may have multiple deployment stages, from being in alpha stage—running on the test network—to begin in the production stage—running on the main network—going through multiple testing, security and QA stages.

### 0.1 — The Initial Release
<center>
<img src="../../images/development_plan/06.png">
</center>
This the first release on macOS after months of work and weeks of privately-conducted community testing. Featured all the basic functionality that an organization needs to operate. It was not made public.
___

!!! info "Release Info"

    [**Release link**](https://github.com/aragon/aragon/releases/tag/0.1)

### 0.2 — The Public Release
<center>
<img src="../../images/development_plan/07.png">
</center>
This was the first public release. Working in both macOS, Linux and Windows. Introduced a new UI styling and Kovan testnet support.

For more information, read [the launch post](https://blog.aragon.one/releasing-aragon-alpha-602284a5380c).
___

!!! info "Release Info"

    [**Release link**](https://github.com/aragon/aragon/releases/tag/0.2)

### 0.3 — The Governance Release
<center>
<img src="../../images/development_plan/08.png">
</center>
This version added the Bring your own token functionality, that allows using Aragon with any ERC20 token as a governance token—ERC20 is a token standard allows everyone to interface with a variety of tokens in a common way. It also added two new bylaws, specific address only and ask oracle contract for confirmation—stepping stone for more dynamic bylaws.

It introduced delegate voting and creation of custom, complex stock classes.

It featured new iconography, notable startup time improvements and web browser support for using it with Ethereum browsers/clients like Mist, Parity, MetaMask, Status etc.
___

!!! info "Release Info"

    [**Release link**](https://github.com/aragon/aragon/releases/tag/0.3)

### 0.4 — The Bridge Release
This release will focus on adding:

**Economic abstraction**

Companies will be able to hold and interact with any standard value-holding token

**Improved budgeting and accounting**

Organizations will be in itself the organization's _bank account_.

**Dividends**

Dividend sharing with shareholders, if desired.

**Fundraising tokens**

Company will be able to raise funds in the form of tokens, not necessarily ether. More flexible founding routes.

**Funds vault**

Final funds vault API, the only part of the company that is not expected to change. This will make upgradeability easier, being able to redeploy significant parts of the organization while maintaining its access to the funds.
___

!!! info "Release Info"

    **Deprecated due to refactor for Aragon 0.3**

    This will be a development version only focusing on smart contracts, iterating between different models for upgradeability, extensibility and security. 

 

### 0.5 — The Architect Release
<center>
<img src="../../images/development_plan/survey.png">
</center>

This release will consist of a total refactor, and will focus on adding:

**Organization-wide identity**

Entities in organizations will be able to register their own usernames in the organization, and also provide offchain metadata for displaying purposes in the UI.

**Full upgradeability**

Organizations that will be able to run as long as the Ethereum blockchain runs. No matter if big chunks of functionality are swapped.

**Totally new permission system**

Extensible permission system to allow any entity to interact with another one using an ACL (Access Control List) that the kernel controls and maintains.

**Switch to an exokernel architecture**

By making the kernel a very simple contract that just keeps the ACL and keep references to the installed apps, we can make it more secure and reduce the lines of code and complexity in apps, since there can be multiple instances of an app, also making upgradeability easier.

**Front-end apps API**

This will let developers build modules for Aragon that extend its functionality.
We will provide an API for developers to access functionality from the Aragon client, and a UI toolkit for them to adhere to our styling and UX patterns.

**Core apps API**

The API will let the developer trigger actions inside the organization itself, and access more low-level capabilities.

**Decentralized package management**

By creating the [Aragon Package Manager](https://hack.aragon.org/docs/package-management.html), which is a decentralized organization built on Aragon itself, we enable the frontend and smart contracts to be seamlessly upgraded by using any governance mechanism compatible with aragonOS.

**Human readable transactions**

Thanks to our work on [Radspec](https://hack.aragon.org/docs/human-readable-txs.html), the Aragon interface can show users a human readable description of the actions the users take on the app.

**Support for templates**

Templates allow users to bootstrap organizations with the proper permissions to replicate multiple existing models such a startup, a democracy, an open source community... with just a click.

**Survey app on mainnet**

The Survey app is an app built on Aragon that enables token holders to signal their support to different proposal. The first one is live on the mainnet now at [https://survey.aragon.org](https://survey.aragon.org).

<img src="../../images/development_plan/09.png">
_Blockchain projects that have already manifested interest_
</center>
___

!!! info "Release Info"

    [**Release blog post**](https://blog.aragon.org/aragon-core-v0-5-the-architect-release-327c7163b89c/)

    [**Release link**](https://github.com/aragon/aragon/releases/tag/0.5)

### 0.6 — The Sweet Release
<center>
<img src="../../images/development_plan/permissions.png">
</center>

This release will focus on adding:

**Permissions app**

This app will allow stakeholders to read and alter permissions on the organization, by using the modular permission system established by aragonOS.

**Identity component**

The identity component will replace all Ethereum addresses with easy to understand identity icons and names for user friendliness, and also serve to autocomplete entities while interacting with the app.

**Stability fixes**

Fix bugs and possible issues, both for users and also developers using our developer tools to create Aragon apps.

### 0.7 — The Network Release
<center>
<img src="../../images/development_plan/11.png">
</center>

This release will focus on adding:

**Basic network-wide governance**

Which power the network will have over organizations, governance votings to decide on service providers, payouts functionality.

**App center**

The App center will allow third party apps to be installed in Aragon in order to enable different organizations to address different needs. Any aragonOS-compatible app will be able to be installed, and recommendations will be given to users.

**ANT token minting**

The network will be responsible for the minting policy of ANT, it will be decided through the governance of the network. Some of its responsibilities will be to decide the minting rate, the price and how companies pay for the subscription to the network.

**Integrate upgradeability**

Provide upgradeability as a network service for all Aragon Network organizations.

### 0.8 — The Court Release
<center>
<img src="../../images/development_plan/12.png">
</center>

This release will focus on adding:

**Aragon Jurisdiction**

Provide a decentralized court, Aragon Jurisdiction, as network service or work with a decentralized court project to make it work with the network.

**Orgs in the AN respond to ANJ**

Organizations in the Aragon Network start being under the Aragon Jurisdiction.

**Constitution proposal**

First proposal for the basic laws that all organizations will be act under.

### 0.9 — The Unknown Release
<center>
<img src="../../images/development_plan/13.png">
</center>

This is a wildcard release. The ecosystem is evolving very quickly and we don't know what interesting features we may want to add that will make the 1.0 release more appealing.

Some ideas of what we might work on here:

**Privacy-focused companies**

_**zkSnarks**_ could provide companies with way more privacy. Private voting and ownership are very interesting concepts we are researching about.

**Different governance mechanisms**

We are closely following research and experimentation on other governance mechanisms such as **Futarchy**.

### 1.0 — The Release
<center>
<img src="../../images/development_plan/14.png">
</center>

We expect to start marketing Aragon to the mainstream with this release. To achieve that mission, we will have to place an important focus on design and user experience.
