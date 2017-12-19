## Preamble

    AGP: 5
    Title: Migration to Open Source Messaging Platform
    Author: Tatu Kärki
    Type: Governance Enhancement / Communication
    Status: Final, v1.1
    Created: 2017-10-10
    Last updated: 2017-12-19
    Requires:

## Abstract

Migrate the community chat to an open source messaging platform.

Initiate discussion within the Ethereum ecosystem and establish a joint effort with other projects in the space to find an alternative that fit the needs of these cryptocurrency projects.

## Specification

### Goals

- Migrate the community from Slack to [Rocket.Chat](https://github.com/RocketChat) or [Riot](https://github.com/vector-im)
- Create a Rocket.Chat client app in collaboration with other Ethereum projects with a project selector if Rocket.Chat is the chosen platform
- Begin the process together with the [Rocket.Chat](https://github.com/RocketChat) team to create _[Rocket.Chat for Cryptocurrency Communities](https://github.com/RocketChat/Rocket.Chat/issues/8284)_

## Description

As Slack was designed for internal use of projects, the tools to run public facing communities are lacking  in features that these projects would benefit from having. Migration to a open source project, [Rocket.Chat](https://rocket.chat/) or [Riot](https://github.com/vector-im), will help us manage and govern our communities more efficiently.  

Our idea is to fork of the [Rocket.Chat Electron app](https://github.com/RocketChat/Rocket.Chat.Electron) and together in collaboration with other interested projects create a new app for the Ethereum community to have a project selector similar to Slack. The selector could be pre-filled with a list of Ethereum community projects for ease of use. This would help community members by only having one app for the projects that choose to use Rocket.Chat instead of other alternative chat apps and thus bringing the community closer to each other by using a shared tool that can be updated by anyone via Pull Requests to the community driven repository. Projects using this could also pool resources together and support the development of Rocket.Chat, as well as making it more usable.

Initially we would like to hear from other projects in the space to see how much interest there is in such a tool and migration process. Setting up Rocket.Chat requires projects to set up their infrastructure for the service, more information can be found in the [Rocket.Chat Documentation](https://rocket.chat/docs/) and there's an [Import tool](https://rocket.chat/docs/administrator-guides/import/slack) that can easily migrate your users and channels to Rocket.Chat (but not DM's and private channels).

[Riot](https://github.com/vector-im) does not require such efforts as Rocket.Chat, but has the option to run your own infrastructure.

### Documents for comparison
Two documents were created so projects can evaluate the features and possibilities provided by the two open source projects, [Rocket Chat](https://github.com/rocketchat) and [Riot](https://github.com/vector-im).

Read about [RocketChat](../archive/documentation/agp5/RocketChat.md).

Read about [Riot](../archive/documentation/agp5/Riot.md).

## Uncertainties

None right now, version 1.0 is finalized!

## Contributions

Thanks to all the [45 participants](https://github.com/aragon/governance/issues/7) who contributed to the discussion.

Big thank you to all the projects that contributed and initially joined in on this migration plan and made it a reality.

- [**Auctus Project**](http://auctus.org/) / [Announcement](https://medium.com/auctus/announcing-our-migration-to-an-open-source-messaging-platform-d061844837d5)
- [**Cofound.it**](https://cofound.it) / [Announcement]()
- [**Decentraland**](https://decentraland.org) / [Announcement](https://twitter.com/decentraland/status/911254767430709248)
- [**FOAM**](https://www.foam.space/) / [Announcement](https://blog.foam.space/announcing-our-involvement-in-the-joint-migration-to-rocket-chat-ee4d99364c39)
- [**Golem**](https://golem.network/) / [Announcement](https://blog.golemproject.net/farewell-to-slack-rocket-here-we-come-d5b82aac6c24)
- [**Indorse**](https://indorse.io) / [Announcement](https://medium.com/joinindorse/announcing-the-indorse-migration-from-slack-to-rocket-chat-e6a643d87f39)
- [**OmiseGO**](https://www.omise.co/) / [Announcement](https://blog.omisego.network/omisego-migrating-to-rocket-chat-11f5ae229191)
- [**Santiment**](https://santiment.net) / [Announcement](https://medium.com/santiment/goodbye-slack-hello-open-source-messaging-platform-c97398a20ce9)
- [**Streamr**](https://www.streamr.com/) / [Announcement](http://blog.streamr.com/2017/09/goodbye-slack-goodbye-scammers-hello-rocket-chat/)

- [**0xproject**](https://0xproject.com) / [Announcement](https://twitter.com/0xproject/status/923273503721140224)

## References

1. [https://github.com/aragon/governance/issues/7](https://github.com/aragon/governance/issues/7)
2. [https://blog.aragon.one/announcing-our-migration-to-an-open-source-messaging-platform-420b25e74284](https://blog.aragon.one/announcing-our-migration-to-an-open-source-messaging-platform-420b25e74284)
3. [https://blog.aragon.one/aragon-chat-is-now-open-d75558df1874](https://blog.aragon.one/aragon-chat-is-now-open-d75558df1874)

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
