# [Rocket.Chat](https://rocket.chat/)

### Projects currently using this platform

- [MakerDAO](https://makerdao.com/)
- [Storj](https://storj.io/)
- [Basic Attention Token](https://basicattentiontoken.org/index/)

### Pros
- [Slack Import](https://rocket.chat/docs/administrator-guides/import/slack): Import your current data, users and channels to Rocket Chat
- [Registration](https://rocket.chat/docs/user-guides/registration): Multiple options can be used: Manual registration using email. OAuth registration using GitHub, GitLab, Google, Facebook, Twitter, LinkedIn, Meteor
- Room Info: Easily set Topic, Announcement & Description for every channel individually. Any room can be set as Private, Read Only or Archived
- [Off-The-Record](https://rocket.chat/docs/user-guides/off-the-record): OTR - encrypted conversations
- [Search history](https://rocket.chat/docs/user-guides/searching-messages): Not limited to just last 10,000 messages in the platform
- [Notifications](https://rocket.chat/docs/user-guides/notifications): Seperate settings for Audio, Desktop, Mobile, Email & Unread alert
- [Roles](https://rocket.chat/docs/administrator-guides/permissions): Roles Available - Admin, Moderator, Owner, User, Bot. Multiple permission available that can be set
- [Permissions](https://rocket.chat/docs/) Granular permissions for different uses classes
- [UI and Theming](https://rocket.chat/docs/developer-guides/ui-and-theming): Projects can have customized, personalized themes set for themselves
- [Slack Bridge](https://rocket.chat/docs/administrator-guides/import/slack/slackbridge): Allows you to mirror the messages received in a Slack channel or private group into Rocket.Chat in real-time
- Messages can be [pinned](https://rocket.chat/docs/user-guides/pinning-messages) and [starred](https://rocket.chat/docs/user-guides/starring-messages)
- [Reactions](https://rocket.chat/docs/user-guides/reactions): Quickly respond to any message with an emoji reaction
- [Server Deployment required](https://rocket.chat/docs/installation/minimum-requirements): Be in control of your own data
- [Supports integrations via WebHooks](https://rocket.chat/docs/administrator-guides/integrations)
- [End-to-End Encryption](https://github.com/RocketChat/Rocket.Chat/pull/7181) has a Pull Request at Github
- Will likely integrate the same Matrix network that Riot uses into their backend at some point

### Cons
- [Slack Import](https://rocket.chat/docs/administrator-guides/import/slack): Can't import DM's and private channels
- [OTR](https://rocket.chat/docs/user-guides/off-the-record) requires both participants requires both sides to be online
- [OTR](https://rocket.chat/docs/user-guides/off-the-record): Improvements to End-to-End Encryption Implemenation still needed
- [Requires a Server Deployment](https://rocket.chat/docs/installation/minimum-requirements): [Manual or PaaS options available](https://rocket.chat/docs/installation/paas-deployments) for deployment
- Server Deployment will incur monthly costs, ballpark approximation could be $50/month
- Centralized Server Deployment can create a single-point of failure for a Project
- Mobile Apps for Android and iOS are available, have received bad reviews from users
- [UI and Theming](https://rocket.chat/docs/developer-guides/ui-and-theming) is still an incomplete feature
