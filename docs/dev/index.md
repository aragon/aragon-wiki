# Aragon Development Overview

## [node-aragon](https://github.com/aragon/node-aragon)
*Owned by [onbjerg](https://github.com/onbjerg)*

Glue between aragonOS (Solidity contracts) and the Aragon dapp.

What it provides:

* A way for developers to receive Ethereum events and reduce them to a state

* Caching for application states

* A way for developers to sandbox applications (over RPC in e.g. WebWorkers or iframes)

* A way for developers to create *raw* transactions that are externally signed

    * Permission escalation as defined in aragonOS is handled in this step

* A way for developers to see, install and uninstall applications (through an API in the wrapper)

    * Also fetches metadata (manifest.json, generated artifacts file) from APM and the underlying storage provider (e.g. IPFS, Swarm, …)

* A way for developers to see, create and manage permissions for entities and apps (through an API in the wrapper)

* "Smart" synchronisation

* Utilities for transactions

    * Human-readable descriptions from transactions

    * Encoding of transaction paths to signable transactions

More generally:

* A way to interact with the kernel and application proxies (i.e. read events, read state via calls and create *raw* transactions)

* A way to swap implementations of the kernel and applications

* A way to manipulate and describe Ethereum transactions (and EVM callscripts)

What it does not provide:

* **A way for developers to sign transactions. **Transactions must be signed externally.

* **A general purpose Web3 wrapper.**

* **Any UI or DOM.** Displaying the front-end of applications, the signer etc. is not the purpose of node-aragon

## [aragon-ui](https://github.com/aragon/aragon-ui)
*Owned by [bpierre](github.com/bpierre)*

UI toolkit for Aragon applications and websites.

What it provides:

* Components for developers to create Aragon apps that look native to the platform.

* Styles that are specific to the Aragon platform: colors, fonts, icons, standard transitions, etc.

* It is composed of a set of base components (Text, Button) and components specific to an environment (e.g. Header for websites, ModalPanel for Aragon dapps). These might be separated at some point in the future.

* Its goal is to make it so that app developers can build an app using only Aragon UI: no custom styles, no custom behaviours. Ideally, all the core apps will just use the Aragon UI components, without any form of customization.

* It doesn’t provide anything to interact with aragonOS: that’s the purpose of node-aragon.

* But it does provide a great integration with the node-aragon API.

* It should be extensible by app authors to a certain extent (styles only, or using the components as a base).

* Aragon UI contains app that is used to demonstrate all the components and their documentation.

What it is not:

* Aragon UI is not a framework that provides everything to build an app: it is a dependency like any other, apart from some specific webpack setup that is required.

* Aragon UI is not required in any way to build an app.

* Aragon UI is not a CSS framework: it’s a set of Vue.js components.

Components list (temporary names):

* Text

* Button

* Input (text, date, amount, etc.)

* CheckBox

* RadioGroup

* RadioButton

* DropDown

* Header

* Footer

* PreFooter

* Loader

* ModalPanel

* Icon

* A set of layout components

* Table

* List

* ExpandableBox

* A set of visualization components: graph, progress, repartition

* Tooltip

* Tabs

## [apm-contracts](https://github.com/aragon/apm-contracts)
*Owned by [izqui](http://github.com/izqui)*

Contracts that implement the Aragon Package Manager spec and the Aragon Versioning Protocol.

The Aragon Package Manager allows for management and discoverability of applications to be run in the context of aragonOS organizations.

Its main goals are:

* Being able to find packages with human-readable names.

* Update publishing in a secure way. Leveraging Ethereum accounts for authentication, allows to use complex governance mechanisms to push updates.

* Finding the client-side counterparty to a smart contract. If a smart contract exposes a reference to the package (appId concept in aragonOS), the Package Manager can be used to look-up for the dApp frontend code for that version of the smart contract.

## [aragon-apps](https://github.com/aragon/aragon-apps)
*Owned by [izqui](http://github.com/izqui) et al.*

* Frontend for Aragon apps

* Smart contracts for Aragon apps

* Apps with frontend:

    * Token manager (Ownership)

    * Voting

    * Fundraising

    * Finance

* Apps without frontend (adding flag in manifest?):

    * Vault

## [dapp](https://github.com/aragon/aragon)
*Owned by all of us ❤️*

Umbrella for the final dapp, also called the wrapper. Puts together all different moving parts into something that just works.

What it provides:

* Self upgradeability using APM

* The left navigation bar that uses node-aragon to list all the installed apps

* Fetch installed apps (including aragon-apps) from storage layer (e.g. IPFS for now)

* Notification center

    * Should also fire notifications in the desktop

    * Should also implement three states for transactions

        * Pending: On click, it asks the app that emitted the notification to display some info on the transaction

        * Done: On click, it asks the app that emitted the notification to display some info on the transaction

        * Error: On click, it asks the app to repopulate the form that was submitted to create that transaction, and shows the user an error message

* Signer view, node-aragon provides transaction payload

* User on-boarding

* Special apps:

    * Permissions app

    * Settings app

## Bonus: [design](https://scene.zeplin.io/project/59a827960d4c4cb2274007f5)
*Owned by [luisivan](https://github.com/luisivan)*

* Design for the wrapper

    * Side navigation

    * Notification center

    * Right-side popover

* Design for all default apps

* Design for all UI components
