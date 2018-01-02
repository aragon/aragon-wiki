## Aragon Community Meeting 07 Write-Up for December

### Oliver - Glue

#### node-aragon

- Transaction pathing is done (tests pending)
- Started work on splitting node-aragon in two and renaming it to aragon.js

#### Aragon CLI

Aragon CLI is the primary development tool for bootstrapping and publishing Aragon apps.

- Finished the initial refactor!
  - New UX
  - New commands (bootstrap for creating projects from templates)
  - Better configuration of RPC providers amongst other options
  - Better error reporting
- Started initial work on commands to bootstrap a development environment (as opposed to reading lengthy guides and doing it manually)

#### DApp

- Did a small patch to make the notification panel animation a bit faster

#### Radspec

Radspec is an alternative DSL to Natspec, but unlike Natspec, it is safe to use and it supports external calls via Web3.

- Published the repository
- Finished the lexer and the parser
- Almost finished the evaluator
- Radspec is close to being ready for initial use

#### APM

- Did an initial prototype on APM as an Aragon app. This will allow people to easily have a governance layer over their package repositories, such as deciding who and when people can publish packages.

#### Misc

- Migrated all my tasks to Flow
- Celebrated Yule 🎄

### Next

#### Finish Radspec 1.0.0

There's a few missing things for Radspec to be done, such as groupings (`(` and `)`) and if-statements (`cond ? a : b`).


#### Tests for transaction pathing

Testing node-aragon is hard because it needs a full DAO. Work on this is underway, but I want to finish it to ensure nothing breaks in newer versions.

#### node-aragon initial release

There's a few unimplemented RPC calls in node-aragon that need to be implemented for the initial release, and I want to finish these as well (notifications, app contexts, ...)
