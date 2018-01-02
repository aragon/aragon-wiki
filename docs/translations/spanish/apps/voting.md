
# Voting

The Voting app es una entidad que ejecutará un conjunto de acciones en otras entidades si los titulares de tokens de un token en particular deciden hacerlo.

### App inicialización

The Voting app se crea una instancia con un cierto conjunto de parámetros que no serán modificables durante la vida de la aplicación:

- Simbólico: dirección del token MiniMe cuyos titulares tienen poder de voto proporcional a sus tenencias.
- Soporte requerido: qué% de los votos deben ser positivos para que se realice la votación. Hacerlo al 50% sería una 'democracia simple'.
- Cuórum de aceptación mínimo:% mínimo de todo el suministro de tokens que debe aprobarse para que se pueda ejecutar la votación.
- Tiempo de votación: número de segundos que se abrirá un voto, si no se cierra prematuramente para un apoyo excepcional.

Para los porcentajes `10 ^ 18` se interpreta como` 100` para permitir el ajuste fino. Esto significa que expresar 50% es `50 * 10 ^ 16` o 1/3 del quórum es` (10 ^ 18) / 3`.

El único parámetro que se puede cambiar si es 'Cuórum de aceptación mínima' para proteger contra el caso en el que no hay suficiente participación de votantes.

### Ciclo de vida del voto

#### Creación
```
votingApp.newVote(bytes _executionScript, string _metadata)
```

Un nuevo voto se inicializa con:

- Script de ejecución: [EVM call script](../../AragonOS/#evm-call-script) para ser ejecutado al aprobar el voto, contiene una serie de direcciones y cargas útiles de calldata que se ejecutarán.
- Metadatos: una cadena arbitraria que se puede usar para describir la votación.

The voting app se ajusta a la [AragonOS Forwarder interface](../../AragonOS/#forwarders). Una acción de reenvío genérica creará un voto con la secuencia de comandos de ejecución proporcionada y los metadatos vacíos.

Cuando se crea un voto, se guarda una referencia al número de bloque anterior como el bloque de instantáneas para el voto. La razón por la que se usa el número de bloque anterior es para evitar el doble voto en el mismo bloque donde se crea el voto. Cada vez que se realiza una votación, se comprueba el MiniMeToken asociado a la aplicación para el saldo del token del votante en el bloque de instantáneas.

#### Casting votes
```
votingApp.vote(uint256 _voteId, bool _supports)
```

Para emitir un voto, todas estas condiciones deben cumplirse:

- El emisor tiene un saldo positivo de fichas en el token en el bloque de instantáneas de votos.
- El voto no ha expirado.
- El voto no ha sido ya ejecutado.

Si el voto emitido es a favor de la votación, se agregará a la votación el número de tokens en poder del emisor en el bloque de instantáneas `yea` mostrador. En caso de que un voto sea en contra, lo agregará al `nay` mostrador.

Después de cualquier voto emitido, el contrato verifica si un voto ya cuenta con el respaldo completo para ser ejecutado (incluso si todos los demás votaron en contra, el voto aún sería aprobado), en ese caso la votación se ejecuta y se cierra.


#### Ejecutando votación
```
votingApp.executeVote(uint256 _voteId)
```

Después de que una votación haya expirado en el tiempo (y no se permiten más votos), el resultado de la votación puede ser ejecutado por cualquier persona si fue aprobado. Para que una votación se considere aprobada, ambas condiciones deben ser verdaderas:

- El porcentaje de `yea` del número total de votos es mayor o igual que el 'Support required' parámetro global.
- `yea` el soporte es mayor o igual que el 'Minimum acceptance quorum' parámetro global.

#### Cambio de quórum mínimo de aceptación
```
votingApp.changeMinAcceptQuorumPct(uint256 _minAcceptQuorumPct)
```

En cualquier momento, se puede modificar el quórum mínimo de aceptación para los nuevos votos.

Cualquier voto abierto mantendrá el quórum mínimo de aceptación de valor cuando se crearon.

#### Reenvío

[Reenvío](../../AragonOS/#forwarders) usando la interfaz común ejecuta un `votingApp.newVote(...)` acción. ACL se verifica si el remitente tiene permisos para crear un voto.
