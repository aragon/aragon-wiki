# Aragon Core smart contracts bug bounty

A bug bounty for the smart contracts in Aragon Core is now live. We intend for hackers to look for smart contract vulnerabilities in our system that can lead to loss of funds or locked DAOs.

## Rewards

Vulnerability reports will be scored using the  [CVSS v3](https://www.first.org/cvss/) standard. The reward amounts for different types of vulnerabilities are:

!!! bug "**Critical** (CVSS 9.0 - 10.0)"
    $5,000 - $50,000

!!! danger "**Major** (CVSS 7.0 - 8.9)"
    $2,500 - $5,000

!!! fail "**Medium** (CVSS 4.0 - 6.0)"
    $1,000 - $2,500

!!! warning "**Low** (CVSS 1.0 - 3.9)"
    $500-$1,000

Rewards will be awarded at the sole discretion of Aragon. Quality of the report and reproduction instructions can impact the reward. Rewards will be paid out in ETH.

For this initial bug bounty program there is a **maximum bounty pool of $250,000**.

## Scope

In scope for the bug bounty are all the smart contract components of Aragon Core. They can be found on three main repositories:

!!! abstract "**aragonOS 4** ([https://github.com/aragon/aragonOS](https://github.com/aragon/aragonOS))"
    Smart contract framework and core of the system.

    - Solidity code under the `contracts` directory:
        - Excluding `contracts/lib/`, except for `contracts/lib/math` contracts
        - Excluding `contracts/test/`

!!! abstract "**aragon-apps** ([https://github.com/aragon/aragon-apps](https://github.com/aragon/aragon-apps))"
    Contracts for aragonOS apps that Aragon develops that are used in DAOs.

    - Solidity code under `apps/**/contracts` (`voting`, `vault`, `finance`, `token-manager`, `survey`)
        - Excluding `contracts/test`
    - Solidity code under `shared/minime/contracts`

!!! abstract "**dao-kits** ([https://github.com/aragon/dao-kits](https://github.com/aragon/dao-kits))"
    On-chain deployment scripts for Aragon DAOs.

    - Solidity code for the following kits: `bare`, `beta-base`, `democracy`, `multisig`, `survey`
        - Excluding `contracts/test`

## Areas of interest

These are some examples of vulnerabilities that would be interesting:

- Bypassing ACL rules to get unauthorized access to an app.
- A user of an app performing an action that could freeze or lock the contract.
- Being able to escalate permissions using the Voting app or Token Manager without a proper vote being successful.

## Out of scope

- Side-effects of properly authenticated smart contract upgrades or contract upgrades that change the storage layout of a contract.
- Revocation of permissions or completely changing how a DAO operates due to an important permission being granted using the proper process.
- Any frontend applications or client-side code interacting with the contracts, as well as testing code.
- Mismatch of the functionality of the contracts and outdated spec documents.

## Resources

- Reference and documentation for aragonOS 3 can be found here ([https://hack.aragon.org/docs/aragonos-ref.html](https://hack.aragon.org/docs/aragonos-ref.html)) and a list of the changes that have been made for aragonOS 4 ([https://github.com/aragon/aragonOS/wiki/aragonOS-4:-Updates-to-aragonOS-and-aragon-apps](https://github.com/aragon/aragonOS/wiki/aragonOS-4:-Updates-to-aragonOS-and-aragon-apps)).
- Documentation on how aragonOS apps should be developed: [https://hack.aragon.org/docs/aragonos-building.html](https://hack.aragon.org/docs/aragonos-building.html)

## Eligibility

- Only unknown vulnerabilities will be awarded with a bounty, in case of duplicate reports, the first report will be awarded the bounty.
- Public disclosure of the vulnerability before explicit consent from Aragon to do so, will make the vulnerability ineligible for a bounty.
- Attempting to exploit the vulnerability in a public Ethereum network will also make it ineligible for a bounty.

## Reporting

- In order to report a vulnerability, please write an email to security@aragon.org with [BUG BOUNTY] in the subject of the email.
- For sensitive vulnerabilities, please the encrypt the email using this [PGP key](rsc/security.asc) (Fingerprint: `B6D5 1396 4B9C 62B7`)
- We will make our best effort to reply in a timely manner and provide a timeline for resolution.
- Please include a detailed report on the vulnerability with clear reproduction steps. The quality of the report can impact the reward amount.
