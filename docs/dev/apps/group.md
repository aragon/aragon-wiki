# [Group](https://github.com/aragon/aragon-apps/tree/master/apps/group)

_**Code in Github:**_ [aragon-apps/apps/group](https://github.com/aragon/aragon-apps/tree/master/apps/group)

Group is a very simple app that keeps track of the membership status of entities to a list.

By being a member of the list, an entity is allowed to execute actions on behalf of the group. By granting permissions to perform an action to the group, it is effectively granting this permission to all the members in the group (and future members).

### Initialization

A Group is initialized only with a human readable name. This is needed for identification purposes, given that the only other context the group possesses. The selected name for the group cannot be changed.

### Group lifecycle

#### Adding members
```
group.addMember(address entity)
```

Updates membership status of `entity` to member.

Will fail if `entity` is already a group member.

#### Removing members
```
group.removeMember(address entity)
```

Updates membership status of `entity` to non-member.

Will fail if `entity` is not a group member.

#### Checking membership

```
group.isGroupMember(address entity)
```

At any time group membership for any entity can be checked by calling this method which will return true or false depending on membership status.

#### Forwarding

[Forwarding](../AragonOS/#forwarders) using the common interface executes the provided [EVM call script](../AragonOS/#evm-call-script) if the sender is a member of the group.

### Future improvements

In this first implementation, any group member can immediately execute any action in name of the group. The natural evolution of this app will be to add the possibility for Groups to need the confirmation of multiple Group members before performing an action (similar to a multisig wallet)
