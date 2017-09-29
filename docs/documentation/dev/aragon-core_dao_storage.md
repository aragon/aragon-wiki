In order to have a consistent storage layer for everything running on the DAOs context (DAO, Kernel and Organs), a specific DAO Storage layer was designed.

It has a very simple basic API:

```
contract DAOStorage {
    function storageSet(bytes32 key, uint256 value) internal;
    function storageGet(bytes32 key) constant internal returns (uint256);
}
```

It allows for storing only `uint256` for a given `bytes32` key.

- Key is a `bytes32` because it can be a `sha3` hash.
- Stored values are `uint256` because it is the basic `slot` for 1 `sstore` in the EVM. Other important types like `address` can be casted to and from a `uint256`.

### Keys

Used keys by the DAO are the result of `sha3` hashes to avoid collisions in storage. Storage keys are defined by the hash of a primary key (organ specific), a secondary key (defines the specific slot for storage in the organ), followed by an optional additional set of bytes that specifies the value of the secondary key (for mapping type storage).

The key is calculated as follows:

`storageKey = sha3(PRIMARY_KEY_BYTE, SECONDARY_KEY_BYTE, [additional data if any])`

The current table for DAO storage slots is:

| Storage key             |        Organ       | Primary key | Secondary key | extraData       | Returns                                                                                |
|-------------------------|:------------------:|:-----------:|:-------------:|-----------------|----------------------------------------------------------------------------------------|
| Self reference          |         DAO        |     `0x00`    |      `0x00`     |                 | Address of the DAO                                                                     |
| Kernel reference        |         DAO        |     `0x00`    |      `0x01`     |                 | Address of the Kernel                                                                  |
| Function registry       |       Kernel       |     `0x01`    |      `0x00`     | `bytes4 funcSig`  | Address of contract that handles [funcSig] + 2 ^ 8 ^ 20 bit on whether is organ or app |
| Used signed payloads    |       Kernel       |     `0x01`    |      `0x01`     | `[payload hash]`  | Bool on whether the hash of a preauthed payload was already used                       |
| Token balance           |        Vault       |     `0x02`    |      `0x00`     | `[token address]` | Accounted token balance for [token address]                                            |
| Halt time               |        Vault       |     `0x02`    |      `0x01`     |                 | Time at which the Vault Organ was halted (timestamp)                                   |
| Halt duration           |        Vault       |     `0x02`    |      `0x02`     |                 | Duration of Vault Organ halts (in seconds)                                             |
| Scape hatch             |        Vault       |     `0x02`    |      `0x03`     |                 | Address of the scape hatch                                                             |
| Token blacklist         |        Vault       |     `0x02`    |      `0x03`     | `[token address]` | Bool on whether the [token] is blacklisted                                             |
| Ether token             |        Vault       |     `0x02`    |      `0x05`     |                 | Address of the used ETH wrapping token                                                 
