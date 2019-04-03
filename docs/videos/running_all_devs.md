# Running the All Aragon Devs call

## Step 1. Create draft notes file for the next call
Note: After the first All Aragon Devs call, this step should be performed right after the call.

Create a new [hackmd](https://hackmd.io) document titled “All Aragon Devs #X”, with the number of the call.

- Use the [notes template](template.md) and add the agenda to the "Agenda" section.
- Set both read and write permissions to "public", and add a link to this document to the matching calendar event
- Send this document to established teams or members to allow them to add their own agenda items directly

Create another hackmd document, this one titled “All Aragon Devs #X (agenda)”, with the number of the call.

- Use the [public agenda template](public_agenda.md) and add the agenda to the "Agenda" section.
- Set both read and write permissions to "owner"
- Publish the document on hackmd, and use this link when publicly sharing the agenda

## Step 2. Review proposed agenda items

- Check alldevs email address throughout the week for proposed agenda items. Review proposed items and respond with [accepted](all_devs_accepted.md) or [rejected](all_devs_rejected.md) templates.
- Add approved agenda items to the documents above, and add the email addresses of the proposers to the matching calendar event.

## Step 3. Prepare for the livestream

Open Youtube with the Aragon account and copy the Livestream key.

  - Creator Studio -> Livestreaming -> Stream now -> Stream name/key.

## Step 4. Running the livestream

Open designated [Jitsi](https://meet.jit.si) channel (currently [aragondev](https://meet.jit.si/aragondev)), and paste the notes hackmd document.

Start livestream in Jitsi when the meeting is scheduled to start.

  - More actions menu button -> Start livestream

Welcome viewers and participants on the call. “Before we begin..” Designate a note taker if one has not volunteered already. Tell everyone on the call that a link to the notes is in the Jitsi chat, and anyone is welcome to add notes as well.

  - Document meeting attendees, agenda items, notes from discussions.

Do roll call and introduce anyone new to the call.

Run through each agenda item and pass to item owner to lead. Conclude each item discussion by repeating and documenting action items.

Keep meeting running on time. The goal is to have all agenda items addressed by the scheduled end time.

If all agenda items are covered before the scheduled end time, the meeting is done early.

Thank participants and viewers for attending, then stop the livestream.

## Step 5. Post-livestream follow-up

Under `/docs/videos/meeting_notes/all_aragon_devs`, create a notes file titled “alldevs[date].md”, with the date of the next call in `YYYYMMDD` format e.g. `alldevs20181008.md`.

Copy + paste the notes and video recording link to the notes document. Polish and fill out any remaining empty sections accordingly.

Update the `mkdocs.yml` file of the wiki with a relative link to the file under the Videos > Meetings > All Aragon Devs > Meeting notes section.

Go into the YouTube Creator Studio > Video Manager > Videos, click the arrow button next to the call video, and click "Download MP4". Upload the video file to the Aragon Association cloud storage instance for backup.

Go to Step 1 and create the agenda for the next call.
