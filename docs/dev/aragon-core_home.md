# aragon-core

`aragon-core` is the home of the smart contracts used to run Aragon organizations. It contains abstractions for the kernel, the DAO and apps.

The initial part of the [AragonOS document](https://wiki.aragon.one/dev/AragonOS/) goes in-depth on how the Kernel works.

The project structure is as follows:


- `contracts/kernel` contains kernel-related contracts, such as the basic default kernel and the kernel proxy.
- `contracts/common` contains different interfaces, e.g. for forwarders, and utility contracts, e.g. for EVM callscripts.
- `contracts/apps` contains contracts that can be used by apps to interact with the kernel.
- `contracts/misc` contains misc. contracts, such as the Truffle migrations contract.
