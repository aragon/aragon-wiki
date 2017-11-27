## Aragon Community Meeting 06 Write-Up for November

### Oliver - Glue

#### Workshop in Madrid
I went to Madrid to work with Brett, Luis and Jorge on identity. I also got time to work on aragon-dev-cli.

#### aragon-dev-cli
- Added scaffolding support, so it is now possible to create projects faster
	- Also created two templates (react and bare).
- Started doing a *big* refactor of the CLI internals which will give the CLI a new look and feel, but also make it easier to implement new features
- Started working a bit on a new command: playground. It spins up a development environment with APM set up and a DAO for testing purposes.

#### natspec lite (radspec)
The way natspec works now is insecure, since any valid JavaScript goes.

The current library simply evaluates the JavaScript expressions, which is a threat to dapps, since comments in code could potentially alter the UI and trick the user.

Since we rely on natspec for describing transactions in Aragon, we started working on a stripped-down version.

- The basic syntax is down
- AST traversal is done
- The parser is almost complete

This project will be released in December.

#### General planning

I've worked closely with Jorge to identify potential issues and new features, such as a governance layer for APM repositories.

### Next

#### aragon-dev-cli
- Finish refactor
- Finish playground command

#### node-aragon
- Split the library and rename the two new parts to `@aragon/wrapper` and `@aragon/client` respectively
- Finish transaction pathing
- Start work on remaining RPC calls
