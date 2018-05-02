## Aragon Community Meeting 11 Write-Up for April 2018

### Brett - EVM/Solidity/\* Engineer

Starting this month, we've begun structuring our development work into 6-week cycles with 2-week sprints. April 16th - 29th was the first sprint in this set up; it had all sorts of problems, but we hope to improve the process, make it more transparent, and ensure it allows us to work sustainably.

#### [Aragon Dapp (@aragon/aragon)](https://github.com/aragon/aragon)

- Added an interim setting to change the ETH and IPFS node URLs; mostly useful for the dev cli right now

#### [Aragon Apps (@aragon/aragon-apps)](https://github.com/aragon/aragon-apps)

- Additional audit changes and fixes
- CI is fully green now!

#### [AragonOS (@aragon/aragonOS)](https://github.com/aragon/aragonOS)

- Additional audit changes and fixes
- Helped @bingen investigate and resolve a change that made our proxy implementations 50% more expensive to deploy (`bytes32` constants in solc bloat the byte code!)

### Next

#### Dev process

- Monitor and adjust as necessary; we finish our first 6-week cycle at the end of May

#### [AragonOS](https://github.com/aragon/aragonOS)

- (Finally) close the WHG audit
- Communicate and help with second round of smart contract audits
- (Again) begin work towards a 4.0!

#### [Aragon Apps](https://github.com/aragon/aragon-apps)

- Additional features to the background scripts, e.g. notifications support and block caching
- Identity app
- Bug fixes found by the community for the 0.5 release

#### [Aragon Dapp](https://github.com/aragon/aragon)

- Add permissions background script
- Add more identity functionality (e.g. ENS reverse resolving and better UI components)
