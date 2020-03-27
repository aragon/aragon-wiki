# Aragon client smart contracts bug bounty

A bug bounty for the smart contracts in the Aragon client is now live. We intend for hackers to look for smart contract vulnerabilities in our system that can lead to loss of funds or locked DAOs.

## Rewards

Vulnerability reports will be scored using the  [CVSS v3](https://www.first.org/cvss/) standard. The reward amounts for different types of vulnerabilities are:

!!! bug "**Critical** (CVSS 9.0 - 10.0)"
    $5,000 - $50,000

!!! danger "**Major** (CVSS 7.0 - 8.9)"
    $2,500 - $5,000

!!! fail "**Medium** (CVSS 4.0 - 6.9)"
    $1,000 - $2,500

!!! warning "**Low** (CVSS 1.0 - 3.9)"
    $500 - $1,000

Rewards will be awarded at the sole discretion of the Aragon Association. Quality of the report and reproduction instructions can impact the reward. Rewards are denominated in USD and will be paid out in ETH.

For this initial bug bounty program, there is a **maximum bounty pool of $250,000**.

The bug bounty program is ongoing and has ran since October 17th, 2018.

## Reporting

!!! note "Reporting a found vulnerability"
    Please responsibly disclose any findings to the development team. You may find instructions on how to do so in the [security overview page](../).

    Failure to do so will result in a finding being ineligible for any bounties.

## Scope

In scope for the bug bounty are all the smart contract components of the Aragon client. They can be found in the following repositories:

!!! abstract "**aragonOS 4** ([aragonOS@4.0.0](https://github.com/aragon/aragonOS/tree/v4.0.0) and [future patch versions](https://github.com/aragon/aragonOS/releases))"
    Smart contract framework and the core of the system.

    - Solidity code under the `contracts` directory:
        - Excluding `contracts/lib/ens/`
        - Excluding `contracts/test/`

!!! abstract "**aragon-apps** (on the [master branch](https://github.com/aragon/aragon-apps/tree/master))"
    Contracts for Aragon apps developed by the Aragon Association and are installed by default in most Aragon organizations.

    - Solidity code under `apps/**/contracts` (`agent`, `finance`, `payroll`, `survey`, `token-manager`, `vault`, `voting`)
        - Excluding `contracts/example/`
        - Excluding `contracts/test/`

!!! abstract "**dao-templates** (on the [master branch](https://github.com/aragon/dao-templates/tree/master), [Aragon 0.8 tag](https://github.com/aragon/dao-templates/tree/aragon-v0.8), [Aragon 0.7 tag](https://github.com/aragon/dao-templates/tree/aragon-v0.7), and [Aragon 0.6 tag](https://github.com/aragon/dao-templates/tree/aragon-v0.6))"
    On-chain deployment templates for Aragon DAOs.

    - Solidity code in the `templates/**/contracts` and `shared/contracts/`
        - Excluding `templates/**/contracts/test` and `shared/contracts/test`

!!! abstract "**dandelion** in each of their app and template repos"
    Dandelion organization template (**dandelion-org** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Dandelion voting app (**dandelion-voting-app** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Delay app (**delay-app** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Redemptions app (**redemptions-app** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Time Lock app (**time-lock-app** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Token Oracle app (**token-oracle** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

    Token Request app (**token-request-app** on the []())

    - Solidity code under the `contracts` directory:
      - Excluding `contracts/examples/`, `contracts/misc/`, and `contracts/test/`

!!! abstract "**fundraising** (on the [v1.0.0 tag](https://github.com/AragonBlack/fundraising/tree/v1.0.0))"
    Contracts for Aragon Fundraising developed by Aragon Black.

    - Solidity code under `apps/**/contracts` (`aragon-fundraising`, `batched-bancor-market-maker`, `presale`, `tap`)
        - Excluding `apps/bancor-formula`
        - Excluding `contracts/test/`
    - Solidity code under `templates/multisig`
        - Excluding `contracts/test/`

!!! abstract "**MiniMe Token (Aragon fork)** (on the [master branch](https://github.com/aragon/minime/tree/master))"
    Governance token deployed for most Aragon organizations.

    - Solidity code under the `contracts` directory:
        - Excluding `contracts/test/`

You can find their deployed addresses on live networks in our [deployment documentation](https://github.com/aragon/deployments).

## Out of scope

!!! question "What we consider out of scope for this bug bounty"
    - Side-effects of properly authenticated smart contract upgrades or contract upgrades that change the storage layout of a contract.
    - Revocation of permissions or completely changing how a DAO operates due to important permission being granted through the proper processes.
    - Any frontend applications or client-side code interacting with the contracts, as well as testing code.
    - Mismatch of the functionality of the contracts and outdated spec documents.

## Areas of interest

!!! tip "These are some examples of vulnerabilities that would be interesting"
    - Bypassing ACL rules to get unauthorized access to an app.
    - A user of an app performing an action that could freeze or lock the contract.
    - Being able to escalate permissions using the Voting app or Token Manager without a proper vote being successful.

## Resources

!!! snippet "Documentation and resources for hackers"
    - [Reference and documentation for aragonOS 4](https://hack.aragon.org/docs/aragonos-ref.html) as well as a [list of the changes that have been made for aragonOS 4 from aragonOS 3](https://github.com/aragon/aragonOS/wiki/aragonOS-4:-Updates-to-aragonOS-and-aragon-apps).
    - [Documentation on how aragonOS apps should be developed](https://hack.aragon.org/docs/aragonos-building.html).
    - [Documentation for our smart contract deployments to live networks](https://github.com/aragon/deployments).


## Eligibility

!!! success "Terms for eligible bounties"
    - Only unknown vulnerabilities will be awarded a bounty; in case of duplicate reports, the first report will be awarded the bounty.
    - Public disclosure of the vulnerability, before explicit consent from Aragon to do so, will make the vulnerability ineligible for a bounty.
    - Attempting to exploit the vulnerability in a public Ethereum network will also make it ineligible for a bounty.
