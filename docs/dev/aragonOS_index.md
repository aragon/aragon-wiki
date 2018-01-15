# [aragon/aragonOS](https://github.com/aragon/aragonOS)

`aragonOS` repository is the home of the smart contracts used to run Aragon Core organizations. It contains abstractions for the kernel, the DAO and the apps.

The initial part of the [aragonOS document](../documentation/aragonOS/#1-kernel-and-the-access-control-list) goes in-depth on how the Kernel works.

The project structure is as follows:


- [**`contracts/kernel`**](https://github.com/aragon/aragonOS/tree/dev/contracts/kernel) contains kernel-related contracts, such as the basic default kernel and the kernel proxy.
- [**`contracts/common`**](https://github.com/aragon/aragonOS/tree/dev/contracts/common) contains different interfaces, e.g. for forwarders, and utility contracts, e.g. for EVM callscripts.
- [**`contracts/apps`**](https://github.com/aragon/aragonOS/tree/dev/contracts/apps) contains contracts that can be used by apps to interact with the kernel.
- [**`contracts/misc`**](https://github.com/aragon/aragonOS/tree/dev/contracts/misc) contains misc. contracts, such as the Truffle migrations contract.
