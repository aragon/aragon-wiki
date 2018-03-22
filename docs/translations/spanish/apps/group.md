# [Group](https://github.com/aragon/aragon-apps/tree/master/apps/group)

_**Code in Github:**_ [aragon-apps/apps/group](https://github.com/aragon/aragon-apps/tree/master/apps/group)


Group es una aplicación muy simple que realiza un seguimiento del estado de membresía de las entidades en una lista.

Al ser miembro de la lista, una entidad puede ejecutar acciones en nombre del grupo. Al otorgar permisos para realizar una acción al grupo, se está otorgando efectivamente este permiso a todos los miembros del grupo (y futuros miembros).

### Inicialización

Un grupo se inicializa solo con un nombre legible por humanos. Esto es necesario para propósitos de identificación, dado que el único otro contexto que el grupo posee. El nombre seleccionado para el grupo no se puede cambiar.

### Group ciclo vital

#### Agregar miembros
```
group.addMember(address entity)
```

Actualiza el estado de membresía de `entity` al miembro.

Fallará si `entity` ya es un miembro del grupo.

#### Eliminando miembros
```
group.removeMember(address entity)
```

Actualiza el estado de membresía de `entity` a no miembro.

Fallará si `entity` no es un miembro del grupo.

#### Comprobando membresía

```
group.isGroupMember(address entity)
```

En cualquier momento, la membresía grupal de cualquier entidad puede verificarse llamando a este método, que dará como resultado verdadero o falso según el estado de la membresía.

#### Reenvío

[Reenvío](../../AragonOS/#forwarders) usando la interfaz común ejecuta el proporcionado [EVM call script](../../AragonOS/#evm-call-script) si el remitente es un miembro del grupo.

### Mejoras futuras


En esta primera implementación, cualquier miembro del grupo puede ejecutar inmediatamente cualquier acción en nombre del grupo. La evolución natural de esta aplicación será agregar la posibilidad de que los Grupos necesiten la confirmación de múltiples miembros del Grupo antes de realizar una acción. (similar to a multisig wallet)
