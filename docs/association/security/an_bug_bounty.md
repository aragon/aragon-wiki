# Aragon Network smart contracts bug bounty

A bug bounty for the smart contracts of the Aragon Network is now live. We intend for hackers to look for smart contract vulnerabilities in our system that can lead to loss of funds or locked components.

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

Rewards will be awarded at the sole discretion of the Aragon Association. Quality of the report and reproduction instructions can impact the reward. Rewards are denominated in USD and will be paid out in ETH.

For this initial bug bounty program, there is a **maximum bounty pool of $250,000**.

The bug bounty program is ongoing and has been running since November 25th, 2019.

## Reporting

!!! note "Reporting a found vulnerability"
    Please responsibly disclose any findings to the development team. You may find instructions on how to do so in the [security overview page](../).

    Failure to do so will result in a finding being ineligible for any bounties.

## Scope

In scope for the bug bounty are all the smart contract components of the Aragon Network. They can be found in the following repositories:

!!! abstract "**Aragon Court** ([v1](https://github.com/aragon/aragon-court/tree/v1.0.0) and [future minor versions](https://github.com/aragon/aragon-court/releases))"
    Dispute resolution protocol.

    - Solidity code under the `contracts` directory:
        - Excluding `contracts/lib/os/` 
        - Excluding `contracts/test/`
        - Excluding `contracts/standards/`

!!! abstract "**Aragon Network deployment** ([v1](https://github.com/aragon/aragon-network-deploy/tree/rc-1.0.0) and [future minor versions](https://github.com/aragon/aragon-network-deploy/releases))"
    Deployment commands for the Aragon Network components
    
    - JS code under the `src` directory:
        - Excluding `src/helpers/`
        - Excluding `src/commands/`

## Out of scope

!!! question "What we consider out of scope for this bug bounty"
    - Any frontend applications or client-side code interacting with the contracts, as well as testing code.
    - Mismatch of the functionality of the contracts and outdated spec documents.

## Areas of interest

!!! tip "These are some examples of vulnerabilities that would be interesting"
    - Locking or freezing any of the Aragon Network contracts.
    - Manipulating the decision process of the dispute resolution protocol.
    - Stealing tokens or manipulating the token generation process.

## Resources

!!! snippet "Documentation and resources for hackers"
    - Aragon Court [technical specification](https://github.com/aragon/aragon-court/tree/development/docs).


## Eligibility

!!! success "Terms for eligible bounties"
    - Only unknown vulnerabilities will be awarded a bounty; in case of duplicate reports, the first report will be awarded the bounty.
    - Public disclosure of the vulnerability, before explicit consent from Aragon to do so, will make the vulnerability ineligible for a bounty.
    - Attempting to exploit the vulnerability in a public Ethereum network will also make it ineligible for a bounty.
