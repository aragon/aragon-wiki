## Aragon Community Meeting 10 Write-Up for March 2018

### Oliver – Thing doer

#### Launched 0.5 🦅💙

- Release notes: [https://github.com/aragon/aragon/releases/tag/0.5.0](https://github.com/aragon/aragon/releases/tag/0.5.0)

- Amazingly proud of the work the arafam has done, and especially the pure willpower the entire team had to make this a polished release 💖

#### [Aragon.js](https://github.com/aragon/aragon.js)

- An extreme amount of gas limit tweaks to onboarding
- Add RPC messages for interacting with external contracts ([aragon/aragon.js#76](https://github.com/aragon/aragon.js/pull/76))
- Make sure the cache works in non-browser environments ([aragon/aragon.js#72](https://github.com/aragon/aragon.js/pull/72))
- Application identifiers ([aragon/aragon.js#77](https://github.com/aragon/aragon.js/pull/77))
- An Aragon RPC message provider for development purposes ([aragon/aragon.js#79](https://github.com/aragon/aragon.js/pull/79))
- Refactored to use APM.js ([aragon/aragon.js#80](https://github.com/aragon/aragon.js/pull/80))
- Changed the way accounts are detected for transaction pathing ([aragon/aragon.js#93](https://github.com/aragon/aragon.js/pull/93))
- Added RPC messages for a few other things
  - The accounts a user currently controls (to allow for per-user notifications and per-user UI)
  - A method to "unwrap" EVM callscripts and describe what each step in the script does in a human way (used in the voting app)
- Bug fix for the way errors are transmitted between the wrapper and the apps

#### [Aragon CLI](https://github.com/aragon/aragon-dev-cli)

- Renamed the CLI to `aragon` (the name `aragon-dev-cli` is now deprecated)
- Implemented new `grant` command together with Jorge, allowing people to grant permissions on APM repositories
- Started work on initial polish ([aragon/aragon-dev-cli#53](https://github.com/aragon/aragon-dev-cli/pull/53) and [aragon/aragon-dev-cli#52](https://github.com/aragon/aragon-dev-cli/pull/52))
  - Ironed out some bugs, edge cases and annoying things we learned from launching Aragon 0.5
  - Better overall feel and performance of CLI
- Started work on `run` command ([aragon/aragon-dev-cli#55](https://github.com/aragon/aragon-dev-cli/pull/55))
  - Makes it easier to test your apps locally, which is essential for the developer experience

#### [Radspec](https://github.com/aragon/radspec)

- Ironed out some issues we found in relation to the launch of 0.5
    - Actually implemented string literals
    - Made sure Web3 provider was configurable
- Implemented ternary if statements
- Implemented modulo operator
- Started work on defining the grammar of Radspec in Nearley to create a more maintainable and well-defined project

#### [APM Serve](https://github.com/aragon/apm-serve)

- Worked on performance improvements together with Pierre ([aragon/apm-serve#5](https://github.com/aragon/apm-serve/pull/5))
- Streamlined some of the code with a small refactor

#### [Dapp](http://app.aragon.one/)

- Small bug fix for app list not loading correctly with Brett ([aragon/aragon#161](https://github.com/aragon/aragon/pull/161))
- Tweaks to signer view to display transaction path correctly for 0.5 ([aragon/aragon#175](https://github.com/aragon/aragon/pull/175))

#### [Apps](https://github.com/aragon/aragon-apps)

- Tweaked the Radspec strings to make them a bit better for 0.5 (although it is still a work in progress - actively looking for community feedback on this one) ([aragon/aragon-apps#162](https://github.com/aragon/aragon-apps/pull/162))

##### Voting

- Describe what a vote does if it was created as the result of trying to perform a different action

#### Writing

- Almost finished guide on "Your First Aragon App", need to implement feedback I've gathered from the team
- Started work on post entitled "Radspec: Safe & Human Transactions"

#### Events

- Attended [EthCC](https://ethcc.io/) in Paris. It was a great no-shilling event with amazing people. Feeling blessed to be working alongside these inspiring individuals!

#### Other

- Lots and lots of code reviews.
    - Like lots.
    - Same goes for most of the dev team and I am super impressed that we managed to review almost every PR while still getting stuff done 👏

### Next

#### Tech

- Create a more robust and fluent developer experience overall by continously improving on [Aragon CLI](https://github.com/aragon/aragon-dev-cli)
- Release "Your First Aragon App" guide
- Create a more maintainable and bulletproof reference implementation of [Radspec](https://github.com/aragon/radspec)
- Start building on the App Center and permissions app with the rest of the team
- Continous improvements to performance, bug fixes and tweaks from community feedback
- Decrease overall bandwidth requirements (e.g. make bundle size smaller by being more conservative about imports in [Aragon.js](https://github.com/aragon/aragon.js))

#### "Soft" things
- Help with v2 of the whitepaper
- Offsite #2
- 0.5 launch post-mortem
- Help decide on new release cycles / better developer workflow
