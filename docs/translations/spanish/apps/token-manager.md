
# [Token Manager](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager)

_**Code in Github:**_ [aragon-apps/apps/token-manager](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager)

Token Manager es una capa de abstracción sobre el concepto de MiniMeToken controller. The controller of a MiniMeToken 
es una dirección que puede acuñar y destruir tokens, también recibe una llamada 'enganche' en cada transferencia y aprobación, lo que le da al controlador la oportunidad de observarlo y decidir si permite la transferencia.

Sus características más importantes son la fabricación de nuevos tokens y la capacidad de transferencia de tokens de bloqueo a lo largo del tiempo (adquisición de derechos).

Uno Token Manager instancia puede administrar uno MiniMe token.

### Modos

Token Manager puede manejar dos modos o casos de uso. El modo está configurado en la inicialización y no se puede cambiar.

- **Native token mode**: El token administrado se puede acuñar arbitrariamente.
- **Wrapped token mode**: El token administrado actúa como un contenedor a otro token ERC20. El token administrado solo puede acuñarse estacando (envolviendo) las unidades del token envuelto. En cualquier momento, un titular del token del contenedor puede cambiarlo por el token original (a menos que exista una consolidación).


### Inicialización

Hay dos inicializadores diferentes según el modo.

#### Nativo
```
tokenManager.initializeNative(address token)
```

Parámetros:

- **Token**: El token siendo administrado. El Token Manager ya debería haberse configurado como el `controller` para el token

#### Envuelto
```
tokenManager.initializeWrapped(address wrapperToken, address wrappedToken)
```

Parámetros:

- **Wrapper token**: Igual que el token anterior.
- **Wrapped token**: Dirección del token que será envuelto

### Funcionalidad específica de modo

#### Modo nativo

##### Fichas de menta
```
tokenManager.mint(address receiver, uint256 amount)
```

Crea nuevos tokens y los asigna al receptor.

##### Issue tokens
```
tokenManager.issue(uint256 amount)
```

Crea nuevos tokens que están asignados al Token Manager. Esos pueden ser asignados más tarde.

#### Modo de envoltura

El modo Wrapper funciona bajo la suposición de que el token envuelto es una implementación ERC20 de confianza, lo que significa que las transferencias se realizan normalmente (no se aplican tarifas en transferencias de tokens como) y se mantiene constante si no se realizan operaciones.

##### Wrap tokens
```
tokenManager.wrap(uint256 amount)
```

Requiere una asignación de ERC20 existente en la dirección del Administrador de tokens para al menos esa cantidad de tokens. Transfiere los tokens envueltos al Token Manager y acuña una cantidad igual de tokens de contenedor para el remitente.

Fallará si el remitente no ha creado la concesión o no tiene suficiente saldo de token envuelto.

##### Unwrap tokens
```
tokenManager.unwrap(uint256 amount)
```

Quemará los tokens de envoltura y transferirá al usuario la misma cantidad en tokens envueltos.

Fallará si el remitente no posee tantos tokens.

### Funcionalidad genérica

#### Asignar tokens
```
tokenManager.assign(address receiver, uint256 amount)
```

Transfiere tokens desde Token Manager balance a `receiver`. Token Manager puede poseer tokens como resultado de una operación `issue` en modo nativo o simplemente porque Token Manager recibió una transferencia token normal.

#### Asignar tokens con derechos
```
tokenManager.assignVested(address receiver, uint256 amount, { Vesting parameters })
```

Realiza una asignación pero establece reglas sobre cuándo el receptor puede transferir sus tokens. La siguiente sección profundiza en cómo funciona la consolidación.

#### Revocar la concesión
```
tokenManager.revokeVesting(address holder, uint256 vestingId)
```

Revoca un vesting de un titular (si la consolidación es revocable).

### Adquisición

La asignación de tokens con vesting realiza una operación normal de transferencia de tokens ERC20, pero luego el titular solo podrá realizar transferencias de acuerdo con un calendario de concesión.

Los tokens MiniMe realizan una comprobación con su controlador antes de realizar una transferencia de token. El gestor de tokens utiliza este gancho para comprobar si un titular puede transferir los tokens deseados.

Al hacer que los titulares sean los propietarios directos de los tokens, pueden usar tokens para acciones que verifican el saldo del token, como votar, y al mismo tiempo pueden bloquear la transferibilidad de los tokens. Los titulares con derechos también pueden reenviar transacciones a través de TokenManager.

#### Parámetros de derechos

- Start: marca de tiempo en segundos que marca el comienzo del calendario de adjudicación (puede ser una fecha pasada o futura).
- Cliff: marca de tiempo para el primer momento en que se puede transferir cualquier token asignado. La cantidad de tokens que se desbloquea en el acantilado es directamente proporcional al calendario general de adjudicación.
- Vesting: marca de tiempo por el momento todos los tokens asignados son transferibles.
- Revokable: si el Administrador de tokens puede revocar una concesión de token en el medio de la concesión. Cuando eso sucede, los tokens que aún no han sido creados se vuelven a transferir al Token Manager.

#### Cálculo de tokens transferibles

Un token holder puede tener múltiples vesting al mismo tiempo. Para verificar si se puede transferir una cantidad de tokens, el contrato verificará todas las concesiones que tiene un titular de cuántos tokens pueden transferirse en ese momento (tenga en cuenta que algunos de los tokens pueden haber sido asignados sin derechos).

Para cada adjudicación, la cantidad:

- Desde el inicio hasta el acantilado, 0 tokens son transferibles.
- Desde el acantilado hasta la consolidación, la cantidad de tokens transferibles se interpola usando esta fórmula: `transfer = tokens * (now - start) / (vesting - start)`
- Después de la concesión, todos los tokens son transferibles.

### Promotor

Token Manager permite a los titulares de su token subyacente ejecutar acciones externas identificándose como titulares de token. Esto se puede usar para permitir que los titulares de tokens realicen una acción particular en el DAO (por ejemplo, crear un voto) sin que la ACL tenga que saber nada sobre los tokens.

Para esto, Token Manager se ajusta a la [AragonOS Forwarder interface](../AragonOS/#forwarders) y reenvía las llamadas a titulares que poseen al menos un token.

### Limitaciones

- Con el fin de evitar un ataque en el que se agreguen demasiados token vestings a un holder para causar un out de gas, la cantidad de token vestings que un holder está limitado a 50.
