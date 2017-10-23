# aragon-core

`aragon-core` is the home of the smart contracts used to run Aragon organizations. It contains abstractions for the kernel, the DAO, forwarders and apps.

Documentation for the different parts of aragon-core can be found in this wiki:

- **Kernel**: the initial part of the [AragonOS document](../AragonOS/#1-kernel-and-the-access-control-list) goes in-depth on how the Kernel works.
- **Apps**: this [section of the wiki](./apps) contains all the documentation for the default aragon-core apps.

The project structure is as follows:

- `contracts/apps` contains all of the default apps shipped with a basic Aragon organization. These will be moved to their own repository as they mature.
- `contracts/common` contains different interfaces, e.g. for forwarders, and utility contracts, e.g. for EVM callscripts.
- `contracts/kernel` contains kernel-related contracts, such as the basic default kernel and the kernel proxy.
- `contracts/misc` contains misc. contracts, such as the Truffle migrations contract.
