# How to verify cryptographic hashes and signatures

## Background

The Aragon community makes use of popular cryptography tools - such as [Keybase](https://keybase.io) and [Gnu Privacy Guard](https://www.gnupg.org/) (GPG) - to ensure the security and integrity of the [Aragon Governance Proposal](https://wiki.aragon.org/documentation/governance/) (AGP) process. For example, proposals in the [AGP Voting apps](https://mainnet.aragon.org/#/governance.aragonproject.eth/0xcfee4d3078f74197ce77120dbfe6d35f443cab1c) are linked to proposals on GitHub using the cryptographic hash of the final proposal (a process called "hashing"), and Aragon Association (AA) board members cryptographically sign their votes approving or rejecting proposals using the keypair linked to their Keybase accounts (a process called "signing").

This guide will show the reader how to use these tools to verify information presented to them throughout the AGP process. Note that this guide was written for Linux users but can be adapted with similar tools for other operating systems.

## Cryptographic hashes

### About cryptographic hashes
A cryptographic hash function is a one-way mathematical function that can be performed on any piece of text (or "pre-image") to produce a compressed string of data often referred to as a "hash" or "fingerprint".

For example, the hash of the word "hash", using the cryptographic hash function SHA-256, is `d04b98f48e8f8bcc15c6ae5ac050801cd6dcfd428fb5f9e65c4e16e7807340fa` and always will be. However if even one letter is changed, then the hash will be completely different. For example, the SHA-256 hash of the word "sash" is `2ffb6e3b73cce5c2327d349550a72e7ac6877e7aaff8e7c33e7fb386f884adef`.

Like a fingerprint, hashes are intended to be nearly unique, so that only a specific pre-image can produce a specific hash.`*` Also like a fingerprint, hashes are "one-way", meaning that just as you can use a finger to produce a fingerprint but you cannot use a fingerprint to re-produce the whole finger, you can use a pre-image to produce a hash but you cannot use a hash to re-produce the pre-image. The hash function only works _one way_.

These qualities make hashes uniquely suitable for information security applications, for example to guarantee that a piece of text hasn't changed over time, or to prove that it has changed by showing that the hash of the original text does not match the hash of the modified text. Hashes can also be used to compress data in a way that can be matched with the original text later.

The primary way that the Aragon community uses hashes in its governance process is to ensure that the text of the proposal that is being voted on by ANT holders matches the text of the proposal approved by AA board members. This prevents a proposal from being modified in such a way that would violate the original intent of the proposal, or at least to enable anyone to notice if the proposal has been modified and to sound the alarm.

!!! info "`*`"
    Hashes are only "nearly" unique because it is theoretically possible for two different pre-images to produce the same hash. This is referred to as a "collision". However, for the most secure hashing algorithms available, this is basically impossible with current state of the art computers.

### Example: Verifying the AGP-1 proposal

On November 12, 2018, the AA board members submitted their votes approving AGP-1 for a final vote by ANT holders. You can see the AA board members' votes here on GitHub:

[https://github.com/aragon/AGPs/tree/master/signatures/AGP-1](https://github.com/aragon/AGPs/tree/master/signatures/AGP-1)

As mentioned above, the votes are signed. We will review how to verify the signature in the next section. Here we will verify the hash of the proposal that was approved by the board members.

In this vote by board member Jorge Izquierdo, the hash of the proposal is mentioned:

> I hereby confirm that, as a Board Member of the Aragon Association, agree to proposing AGP-1 (with hash 4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479) to be voted under an Aragon Network vote starting Thursday, November 15th at 00:00 UTC, and lasting for 48 hours

Here the SHA-256 hash of AGP-1 is said to be `4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479`.

We then go to the AGP Voting app where ANT holders vote on Meta track proposals:

[https://mainnet.aragon.org/#/governance.aragonproject.eth/0xcfee4d3078f74197ce77120dbfe6d35f443cab1c](https://mainnet.aragon.org/#/governance.aragonproject.eth/0xcfee4d3078f74197ce77120dbfe6d35f443cab1c)

Vote #0 says:

> Should the Aragon project adopt AGP-1 as the Aragon Governance Proposal process?
> https://raw.githubusercontent.com/aragon/AGPs/8c945258fc58c842752a49946514815a4fdd971d/AGPs/AGP-1.md

To get the hash of the AGP-1 proposal being voted on we only have to enter two commands in our terminal:

`wget https://raw.githubusercontent.com/aragon/AGPs/8c945258fc58c842752a49946514815a4fdd971d/AGPs/AGP-1.md`

`sha256sum AGP-1.md`

To result is returned:

> 4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479  AGP-1.md

This matches the hash that was signed and approved by Jorge, providing a strong, cryptogrographic link between the proposal he voted to approve and the proposal linked in the AGP Voting app.

## Cryptographic signatures

### About cryptographic signatures

Cryptographic signatures (also called "digital signatures") are a special kind of signature used to prove that a piece of data is associated with a specific cryptographic key. By associating the public half of a public-private key pair with a specific person you can then associate data signed with the private half of the key pair with that same person. For example, if Alice tells you that her public key is `0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B`, and she sends you a signed message that can be matched to that key using the proper tool, then you can be reasonably certain that Alice actually signed the message.

The Aragon community uses digital signatures as part of its governance process to verify statements made by other community members. In some situations, it's good enough to just see that a specific account posted a comment in a forum. But in other situations, a stronger assurance is necessary that the message is actually coming from the intended sender and not an impersonator. In these cases, digital signatures can be used to prove that a message came from a specific sender.

### Example: Verifying the Aragon Association board vote on AGP-1

Continuing from the example in the section above about cryptographic hashes, we will return to the vote submitted by board member Jorge Izquierdo. Keep in mind that the techniques here work for anyone, we are just using Jorge as an example.

Here is the full text of the vote, including the signature:

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

I hereby confirm that, as a Board Member of the Aragon Association, agree to proposing AGP-1 (with hash 4f0e9d7782fa5c1ca82ada0aba7b80cd64ba372859c5052216fe65daa1b81479) to be voted under an Aragon Network vote starting Thursday, November 15th at 00:00 UTC, and lasting for 48 hours
-----BEGIN PGP SIGNATURE-----

wsFcBAEBCAAQBQJb6dl7CRC21ROWS5xitwAAPU8QABeNotnqOmodW9HP0gg2yZ/k
Nkn0R/W2NGA+T8GqWrkvDba/WanaMZ4AOghDnetSJw4y9LKfFtrXExIw3ZYuaShy
na37QbZvQ6251zyRcWZOmNoEeRN24IcsQYOdutoHCRpzPRRzF1giMFvXxiVjJkx1
JHhOakCkc8wqbLL8IuyCY2dYCIt9GMRcrdI2qHeIUdu4DnMsRhrhd8AfFuxc53/I
lALEScKg33qXZf8oDNpPQRhjFd72/BPl9ihENCYA1DZwgDJceEeqG8kndxLj4VZg
4jX0ehSfdIxNHOU+wg1h7EOACOYSQFPp4MriqQFBX2aKisNZ/XMltn1ACrU4OR8s
zjBowjiQv6dq7lmvHKvqnpb7AZZh5RIyQcdsSYeRmZM8eOSxE+K+yunNW+LJJ2JQ
lqN74F9Z0roNPUv6Pz2adYlqTAQ5Tact40Fb6kYlNu2Ppv0HhKDm0GqQvBUeM8/4
JjRxsyKwZCmtlqpeNg9PNTGYS2vpFsRQkydlZ7Shlm6MgbFHvroDq8ILlUcRAYax
j/Xamc+EqWcAH5/4cLkFepe4oOYfBGD7Ku5Citg4QxmNllTpPsQvJKN3JHsst9Py
u7X4uk16VqeQUbL6zoc3Vp+HelPf79261XQ9Mh04eGYXNmenuvwnI/Ja2ImAFw7Q
nZzAdr05O2SPqomEiFVX
=uQOa
-----END PGP SIGNATURE-----
```

You can see the beginning of the message at the top, the message that's being signed in the middle, and the signature at the bottom. This signature can be verified using any program that implements the Pretty Good Privacy (PGP) protocol, such as the Keybase and GPG programs mentioned earlier.

To verify this signature with Keybase, go to [https://keybase.io/verify](https://keybase.io/verify), paste in the full signed message, and click verify. You'll see that Keybase shows a valid signature from the key owned by user [@ji](https://keybase.io/ji), and you'll see that the user @ji has verified social media accounts including on Twitter, GitHub, Reddit, Hacker News, and even his own personal domain.

Using this collection of verifications, if you know that AA board member Jorge Izquierdo also uses these verified social media profiles and websites, then you can also be reasonably certain that the signature on the vote message was actually produced by him. This is one of the strongest assurances of digital identity available today.

If you prefer to verify the signature yourself rather than use Keybase's hosted tool, then you can download Jorge's public key and add it to your GPG keyring by entering:

`curl https://keybase.io/ji/pgp_keys.asc | gpg --import`

Then copy the signed message, paste it into a text document, and save it as a `.txt` file on your computer, for example calling the file `jorge_vote.txt`. Then run the command:

`gpg --verify jorge_vote.txt`

The result will be a message that says:

```
gpg: Signature made Mon 12 Nov 2018 11:50:19 AM PST using RSA key ID 4B9C62B7
gpg: Good signature from "Aragon Security <security@aragon.org>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 1A94 EED3 BDDE 885A 671D  F10D B6D5 1396 4B9C 62B7
```

Since the result says "good signature", it means that the message was signed by Jorge's key that you just added to your keyring. (In this case, the "WARNING" message can be ignored since all it is telling us is that we have not yet set a trust level for Jorge's key. This is an advanced use of GPG that we won't go into here.)
