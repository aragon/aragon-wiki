# How to verify cryptographic hashes and signatures

## Background

The Aragon community makes use of popular cryptography tools - such as [Keybase](https://keybase.io) and [Gnu Privacy Guard](https://www.gnupg.org/) (GPG) - to ensure the security and integrity of the [Aragon Governance Proposal](https://wiki.aragon.org/documentation/governance/) (AGP) process. For example, proposals in the [AGP Voting apps](https://mainnet.aragon.org/#/governance.aragonproject.eth/0xcfee4d3078f74197ce77120dbfe6d35f443cab1c) are linked to proposals on GitHub using the cryptographic hash of the final proposal (a process called "hashing"), and Aragon Association (AA) board members cryptographically sign their votes approving or rejecting proposals using the keypair linked to their Keybase account (a process called "signing"). 

This guide will show the reader how to use these tools to verify information presented to them throughout the AGP process. Note that this guide was written for Linux users but can be adapted with similar tools for other operating systems.

## Cryptographic hashes

### About cryptographic hashes
A cryptographic hash function is a one-way mathematical function that can be performed on any piece of text (or "pre-image") to produce a compressed string of data often referred to as a "hash" or "fingerprint".

For example, the hash of the word "hash", using the cryptographic hash function SHA-256, is `d04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa` and always will be. However if even one letter is changed, then the hash will be completely different. For example, the SHA-256 hash of the word "sash" is `2ffb6e3b73cce5c2327d349550a72e7ac6877e7aaff8e7c33e7fb386f884adef`.

Like a fingerprint, hashes are intended to be nearly unique, so that only a specific pre-image can produce a specific hash.`*` Also like a fingerprint, hashes are "one-way", meaning that just as you can use a finger to produce a fingerprint but you cannot use a fingerprint to re-produce the whole finger, you can use a pre-image to produce a hash but you cannot use a hash to re-produce the pre-image.

These qualities make hashes uniquely suitable for information security applications, for example to guarantee that a piece of text hasn't changed over time, or to prove that it has changed by showing that the hash of the original text does not match the hash of the modified text. Hashes can also be used to compress data in a way that can be matched with the original text later.

The primary way that the Aragon community uses hashes in its governance process is to ensure that the text of the proposal that is being voted on by ANT holders matches the text of the proposal approved by AA board members. This prevents a proposal from being modified in such a way that would violate the original intent of the proposal, or at least to enable anyone to notice if the proposal has been modified and to sound the alarm.

`*` Hashes are only "nearly" unique because it is theoretically possible for two different pieces of information to produce the same hash. This is referred to as a "collision". However, for the most secure hashing algorithms available, this is nearly impossible with current state of the art computers.

### Example: Verifying AGP-1

On November 12, 2018, the AA board members submitted their votes approving AGP-1 for a final vote by ANT holders. You can see the AA board members' votes here on GitHub:

https://github.com/aragon/AGPs/tree/master/signatures/AGP-1

As mentioned above, the votes are signed. We will review how to verify the signature in the next section. Here we will verify the hash of the proposal that was approved by the board members.

In the vote, the hash of the proposal is mentioned:

> I hereby confirm that, as a Board Member of the Aragon Association, agree to proposing AGP-1 (with hash 4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479) to be voted under an Aragon Network vote starting Thursday, November 15th at 00:00 UTC, and lasting for 48 hours

Here the SHA-256 hash of AGP-1 is said to be `4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479`.

We then go to the AGP Voting app where ANT holders vote on Meta track proposals:

https://mainnet.aragon.org/#/governance.aragonproject.eth/0xcfee4d3078f74197ce77120dbfe6d35f443cab1c

Vote #0 says:

> Should the Aragon project adopt AGP-1 as the Aragon Governance Proposal process?
> https://raw.githubusercontent.com/aragon/AGPs/8c945258fc58c842752a49946514815a4fdd971d/AGPs/AGP-1.md

To get the hash of the AGP-1 proposal being voted on we only have to enter two commands in our terminal:

`wget https://raw.githubusercontent.com/aragon/AGPs/8c945258fc58c842752a49946514815a4fdd971d/AGPs/AGP-1.md`

`sha256sum AGP-1.md`

To result is returned:

> 4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479  AGP-1.md

This matches the hash that was signed and approved by the AA board members, providing a strong, cryptogrographic link between the proposal approved by the AA board members and the proposal linked in the AGP Voting app.

## Cryptographic signatures

### About cryptographic signatures

