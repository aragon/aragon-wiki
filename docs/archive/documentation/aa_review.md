## Aragon Association Board of Directors AGP Review Procedure (deprecated)

As detailed in AGP-1, when an AGP moves to Stage V the Aragon Association Board of Directors will review the final draft AGP and vote to either reject the proposal or approve it and add it to the ballot of AGPs to be voted on during the next vote cycle.

This is the procedure that the board will follow to submit their officially recorded votes:

1. After AGP Editors move an AGP to Stage V, the AGP will be added to the agenda for the next Aragon Association Board of Directors AGP-1 vote.

2. The board will download the raw version of the AGP as identified by the last commit when the status was changed to Stage V (e.g. `wget https://raw.githubusercontent.com/aragon/AGPs/8c945258fc58c842752a49946514815a4fdd971d/AGPs/AGP-1.md`) and review the AGP in full.

3. Each board member will publish a PGP signed statement to the corresponding AGP folder within the [signatures folder](https://github.com/aragon/AGPs/tree/master/signatures) in the AGPs repo acknowledging their approval or disapproval of the AGP.

    **Yes vote**  
    `keybase pgp sign -m "I hereby confirm that, as a Board Member of the Aragon Association, I agree to proposing AGP-X (with SHA-256 hash Y) to be voted under an Aragon Network vote starting YYYY-MM-DD at 00:00 UTC, and lasting for 48 hours" -c > AGP-X_approval.sig`

    **No vote**  
    `keybase pgp sign -m "I hereby confirm that, as a Board Member of the Aragon Association, I disagree to proposing AGP-X (with SHA-256 hash Y) to be voted under an Aragon Network vote starting YYYY-MM-DD at 00:00 UTC, and lasting for 48 hours" -c > AGP-X_disapproval.sig`

4. There are two possible outcomes from the board vote:

    - If the board unanimously agrees to put the AGP to a vote, then an AGP Editor will update the AGP status to Stage VI and it will be added to the list of AGPs that will be voted on during the next ANT vote cycle, located in the current votes file within the [votes folder](https://github.com/aragon/AGPs/tree/master/votes) in the AGPs repo. 

    - If the board disagrees, then an AGP Editor will update the AGP status to Stage IV and the author will have the option to either modify and try to have it approved again for the next vote or withdraw the proposal.
