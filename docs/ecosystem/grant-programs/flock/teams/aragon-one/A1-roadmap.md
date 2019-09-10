# Aragon Flock proposal: Aragon One <img align="right" src="https://wiki.aragon.org/design/logo/aragon_one/png/aragon-one-lineart-black-transparent.png" height="80px" />

## Summary

Aragon One is the founding team of the Aragon project and has been working on its development since the beginning. The team intends to continue the work on the project.

To cover our operation costs and continue creating a thriving Aragon ecosystem, Aragon One requests:

- $4 million paid in DAI (or other stable assets) for 2019, for operational costs.
- 1,675,000 ANT vested over the next 4 years, for the long-term incentivization of the current team and future employees.

## Deliverables

We are splitting deliverables across initiatives, which are grouped by topic. All deliverables that don’t fit into these initiatives have been split into their own categories (e.g. aragonOS, aragonSDK).

### I01 – Identity experience

The goal is to build an identity experience that is seamless and allows individuals and organizations to create and manage their decentralized, self-soverign identities, ensuring pseudonymity, while being secure and frictionless to use across apps in the Aragon platform and the broader Ethereum ecosystem. This identity-related information should include several attributes like name, ENS domain, avatar, bio.

Focus areas for this initiative:

- **Individual identity**: Allow individuals to create and manage their user profile, mapping their address to a human readable ENS name that can be used to interact with apps within the organization.

- **Organization identity & membership support**: Allow users to create and manage their organizations’ profiles, providing an intuitive way to add members to a given organization and granting them permissions & privileges.

Related GitHub issues:
<https://github.com/aragon/design/issues/9>
<https://github.com/aragon/aragon-ui/issues/156>
<https://github.com/aragon/design/issues/3>
<https://github.com/aragon/design/issues/13>
<https://github.com/aragon/design/issues/5>

### I02 – Agent application

This application will enable organizations to interact natively with other web3 applications (including other Aragon organizations).

[Related GitHub issue](https://github.com/aragon/design/issues/20)

[Related forum post](https://forum.aragon.org/t/actor-app-arbitrary-actions-from-daos/275)

### I03 – App Center experience

The App Center will allow users to discover, get and manage apps developed by Aragon and third party app developers, using the aragonSDK and the platform infrastructure. Having an App Center will also facilitate the creation of custom organizations and the customization of already deployed ones.

Focus areas for this initiative:

- **Upgrading apps**: Provide users with a secure way to install new app versions, fixes for features or enhancements to already installed/in use apps.

- **Browsing, installing & uninstalling apps**: Enhance app discovery and app management for end users.

- **Monetization/incentivisation model for app developers**: Provide app developers with different monetisation models to create revenue from the apps they publish in the Aragon App Center.

Related GitHub issues: 
<https://github.com/aragon/design/issues/17>
<https://github.com/aragon/aragonOS/issues/151>

### I04 – Flexible permissions

The aim of this initiative is to increase the richness and flexibility of the existing aragonOS permissioning system, allowing users to set and manage different thresholds for permissions on specific actions and delegate organizational responsibilities through permissions.

Focus areas for this initiative:

- **Stateful permissions**: Allow users to set and manage time-based and use-based permissions.

- **UI for conditional permissions**: the ACL in aragonOS 4 supports conditional permissions through permission parametrization, the Permissions app should display and allow to edit parameters.

- **Budgeting app**: Enable organizations to plan and control their financial resources by setting time based permissions like budgeting.

[Related GitHub issue](https://github.com/aragon/aragonOS/issues/340)

### I05 – Responsive experience

Improve the overall user experience of the platform and core apps by making the UI render well on any form factor, mobile wallet and browser, so users can seamlessly create, access and manage organizations.

Focus areas for this initiative:

- **Responsive UI**: Make the platform and core apps responsive so Aragon can be used from mobile browsers such as Status or Coinbase Wallet.

- **Native mobile app**: Build native (probably React Native makes the most sense) mobile Aragon clients so we can benefit from device and OS specific capabilities.

[Related GitHub issue](https://github.com/aragon/design/issues/4)

### I06 – Blockchain abstraction

The aim of this initiative is to lower the barrier of entry for adoption by allowing new users to immediately access functionality and perform actions without having to pay transactions fees.

Focus areas for this initiative:

- Meta-transactions & relayers
- Improving onboarding for organizations

[Related GitHub issue](https://github.com/aragon/aragonOS/pull/442)

### I07 – New voting architecture

Redesign the current voting architecture and experience to accommodate new voting mechanisms and support for existing standard tokens in Aragon Voting apps.

Focus areas for this initiative:

- **Voting with ERC20 tokens**: Enable users to vote using ERC20 tokens.

- **Solidify Research on Transaction and Vote relayers as a network service**: Current research has shown that Meta-transactions and EVM storage proofs could provide a way to improve the cost and user experience of voting by relying on a network of bonded transaction and vote relayers. This research would explore the potential of Transaction and Vote Relaying as another fee generating service maintained by the Aragon Network.

- **UX & technical research**: Create a plan to research the needs and run a pilot with 0x – Use case: AGP-1 + Representative Council(s)
- Research and develop new Voting mechanisms.

### I08 – Dispute resolution (Aragon Network)

#### Agreements app

Aragon Agreements are a core component of the Aragon Network, they enable users to define human readable obligations and lock collateral to provide assurances to their counter-parties.

#### Proposal agreements

Proposal Agreements enhance the Aragon Client enabling organizations to leverage agreements to improve governance outcomes by requiring members to collateralized an agreement in order to submit proposals. Subjective proposal agreements can help avoid 51% attacks in DAOs by making sure that only proposals that are valid by the organization’s charter can be voted on and executed.

#### Aragon Court

The Aragon Court is a service protocol designed to incentivize honest arbitration of agreements in exchange for arbitration fees. The court operates as an arbitration oracle which can be referenced in an agreement and used to resolve disputes. This deliverable includes the Aragon Court protocol, an interface for users of the court to review and manage agreements and disputes, and an interface for jurors to participate in the arbitration process. Fees are generated for the Aragon Network and participating jurors whenever an agreement adds the court as an arbiter and when creating or appealing a dispute.

#### Solidify Research and Propose Policies for ANT Monetary Policy

ANT is intended to be used for governance and as the native currency for the network. In order to optimize ANT for these uses adjustments to ANT’s monetary policy may be necessary. This research would (1) explore the impact of creating a liquidity reserve and treasury bonds to tightly couple the networks assets with the valuation of ANT and (2) the feasibility of shifting the realization value appreciation to unit count rather than unit price using a scalar value token structure.

### aragonOS

#### Global emergency failsafe

Provide an opt-in failsafe for organizations and individual apps to safely freeze their state during times of emergency

As a new system built on highly experimental technology, it is highly desirable to include failsafes in the event of security breaches or other emergency events. Organizations should be able to opt-in their entire organization or a particular set of applications to a failsafe that freezes their state and execution when triggered.

[Related GitHub issue](https://github.com/aragon/aragonOS/issues/151)

#### Decouple aragonPM implementation

Logically separate aragonPM’s implementation from aragonOS

Rather than being a core part of aragonOS, aragonPM is a use case that is built on top of the framework.

### aragonSDK

#### Continuously improve developer experience

We should reduce time for developers to start using the aragonSDK (<https://github.com/aragon/aragon-cli/issues/203>) and also add features they request to it.

#### Increase capabilities of app sandbox

Provide more APIs for Aragon app developers to use, including both UI controls (e.g. notifications, toast messages) as well as messaging and data controls (e.g. network state, action triggers). Aragon apps should also be extended to allow for multiple contracts to be used with one frontend (“monolithic apps”).

#### Split aragonUI and Lorikeet

Push Lorikeet as an ecosystem-wide project, while still providing an Aragon-opinionated experience with aragonUI.

#### Maintain developer documentation and port it over to the new website design system

Take care of reviewing developer documentation when needed, and design and implement a new developer portal that aligns with the current design system we use for aragon.org.

### Aragon Infrastructure

Maintain and continue improving the infrastructure that supports the client: the Ethereum nodes, IPFS nodes and apm-serve. Some of these improvements include:

- Monitoring tools and pager type systems so we are the first to know when something is down
- Increase reliability and uptime of the system
- Improve performance and lower down infrastructure costs

Also, we commit to administering DNS and ENS domains, and maintaining the software for the Aragon forum, the Aragon chat, and the Aragon project blog. We expect the Aragon Association to cover costs related to hosting, servers and set up, and we just commit to maintainance when needed.

### Aragon Community

- Assist with user questions and feedback across official channels
- Assist in the transition to decentralized governance
- Help keep the community informed of announcements and recent developments
- Organize meetups to increase awareness of Aragon and foster community
- Contribute to documentation about the Aragon project and products in the wiki

### Aragon Communications

- Extend the new website design language to the rest of the Aragon websites
- Lead coordination with the community and other teams for content creation
- Communicate relevant product and other updates, releases and announcements
- Help integrate other teams into project communications flow as necessary
- Maintain general the Aragon wiki
- Help sponsor and attend relevant events as per the Event Policy
- Lead in spreading awareness of Aragon and decentralized organizations

### Aragon Nest and Flock

- Help with the application processes when needed
- Increase developer mindshare to attract teams to the Nest and Flock programs
- Lead the transition of the Nest program to a DAO
- Establish key non-obvious metrics for increasing Aragon adoption
- Help creating and maintaining a healthy Aragon ecosystem 

## Grant size

### Estimated operating costs for 2019 

We would like to request $4 million paid in DAI to cover the operating costs of 2019.

To justify our request, and keeping in mind we had an average of 13 people in the team, we provide the main historical data of the operating cost for 2018:

- Payroll and business reimbursements: $1.25m
- Travel expenses: $190k, including travel to represent Aragon
- Contractors (lawyers, HR, design): $150k
- Team offsites: $100k
- Infrastructure and services: $10k
- Work equipment: $40k

The estimated operating cost for 2019, keeping in mind we aim to expand the team to 25 is:

- Payroll and business reimbursements: $3m
- Travel expenses: $300k
- Contractors (lawyers, HR): $170k
- Team offsites: $250k
- Infrastructure and services: $25k
- Office: $55k
- Work equipment: $50k
- Video producing: $20k
- Office furniture and renovation costs: $130k

That adds up to $4m.

### ANT package

We would like to request 1,675,000 ANT, with 1-year cliff and 4-year vesting.

This ANT package will be primarily used to incentivize employees, by giving them ANT packages as well. Our current commitments with the team are around 800k ANT, which would represent around 50% of the 1,675,000 ANT we request.

We think this ANT grant will enable us to double our team while maintaining sustainable ANT packages for new employees, and possibly leaving a pool aside for future unexpected use.

We are committed to the Aragon Network in the long-term and therefore want a 4-year vesting schedule.

## Requirements

- Blog access on blog.aragon.org
- Social media access on all Aragon accounts
- Website access on all Aragon domains
- Repo access on the entire @aragon organization
- Unrestricted use of the Aragon trademark
- Publish access to aragonpm.eth
- Access to Aragon servers and cloud infrastructure
- Access to Aragon DNS and ENS domains
- Admin/moderator access on aragon.chat, forum.aragon.org, and /r/AragonProject

## Team

The team is fully remote and distributed across the world, primarily in Europe and America. We have an office in Zug, which we use as a common location to meet and work on-site from time to time. We also hold quarterly offsites to gather together.

### Current team

The current full-time team is comprised of 16 people, distributed as follows:

- Development: 6

  - Brett: [GitHub](https://github.com/sohkai)
  - Pierre: [GitHub](https://github.com/bpierre)
  - Bingen: [GitHub](https://github.com/bingen)
  - Delfi: [GitHub](https://github.com/delfipolito)
  - Gorka: [GitHub](https://github.com/AquiGorka)
  - Paul: [GitHub](https://github.com/drcmda)

- Product Management and UX: 1

  - Paty: [Github](https://github.com/dizzypaty), [Twitter](https://twitter.com/dizzypaty), [website](http://patydavila.com/)

- Community and Communications: 2

  - Tatu: [GitHub](https://github.com/Smokyish), [Twitter](https://twitter.com/Smokyish), [LinkedIn](https://www.linkedin.com/in/smokyish/)
  - John: [GitHub](https://github.com/john-light), [Twitter](https://twitter.com/lightcoin), [LinkedIn](https://www.linkedin.com/in/lightcoin/)
  
- HR: 1
  - Monica: [Twitter](https://twitter.com/monicazng), [LinkedIn](https://www.linkedin.com/in/roumonicazeng)

- Ops: 1

  - Alexa: [GitHub](https://github.com/alexarwr), [Twitter,](https://twitter.com/alexa_rwr) [LinkedIn](https://www.linkedin.com/in/alexarwr/)

- Research: 2

- - Jorge: [GitHub](https://github.com/izqui), [Twitter](https://twitter.com/izqui9)
  - Luke: [GitHub](https://github.com/lkngtn), [Twitter](https://twitter.com/lkngtn), [LinkedIn](https://www.linkedin.com/in/lukasduncan/)

- Product Design: 1

  - Jouni: [GitHub](https://github.com/jounih), [Twitter](https://twitter.com/dharmaone), [LinkedIn](https://www.linkedin.com/in/jounihelminen/)

- Ecosystem Development: 1

  - Maria: [GitHub](https://github.com/mariapao), [Twitter](https://twitter.com/MyPaoG), [LinkedIn](https://www.linkedin.com/in/mariapgg/)

- Management: 1

  - Luis: [GitHub](https://github.com/luisivan), [Twitter](https://twitter.com/licuende)

- Assistant: 1

  - Lorena: [Twitter](https://twitter.com/curritta), [LinkedIn](https://www.linkedin.com/in/lorenagonzalezmontes/)

- Brand Design: 1

  - Adri: [Twitter](https://twitter.com/owisixseven), [Behance](https://www.behance.net/owi_sixseven)

- DevOps: 1 (part-time/contractor)

### Future openings

We plan to hire for the following positions:

- Frontend Developers: 4
- Solidity Developers: 2
- Web3 Developers: 2
- Developer Relations: 1

That will take the team size to 25 people.

## Organization structure

Aragon One AG, a company incorporated in Zug, Switzerland.
