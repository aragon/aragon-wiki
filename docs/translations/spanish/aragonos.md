<center>
# AragonOS

*Refleja la implememtación [aragon-core](https://github.com/aragon/aragon-core) 2.0.1. Actualizado el 2 de Enero de 2018.*

Una arquitectura inspirada en [exokernels](https://es.wikipedia.org/wiki/Exon%C3%BAcleo), para DAOs modulares, actualizables y seguras.
</center>

## Introducción

Esta arquitectura inspirada en exokernels habilita la creación de Organizaciones Autónomas Descentralizadas (del inglés, DAOs). Implementa un sistema de permisos inspirados en UNIX con contratos inteligentes que permiten un contol seguro y eficiente de los recursos software.

Los contratos inteligentes, un componente esencial del ecosistema Ethereum, pueden definir las reglas y sanciones alrededor de un acuerdo. También pueden tomar decisiones y reforzar compromisos previos, como la transferencia de grandes cantidades de fondos. Sin embargo, esta importante responsabilidad hace de los contratos inteligentes el primer objetivo de ataque. Testarlos y auditarlos no resulta en una solución absoluta ya que, inevitablemente, los humanos cometen errores. 

Entonces, ¿cómo podemos garantizar que las DAOs funcionan de forma eficiente y segura? Y, ¿cómo podemos proveer capacidades de actualización para estas DAOs, de manera que se mantenga la seguridad y la evolución del ecosistema Ethereum?

Presentamos nuestro sistema operativo seguro y descentralizado: _AragonOS_.

Este documento provee una revisión técnica acerca de su arquitectura. Para una introducción menos técnica puedes revisar el [announcement blogpost](https://blog.aragon.one/introducing-aragonos-say-hi-to-modular-and-extendable-organizations-8555af1076f3).

## 1. Kernel y Lista de Control de Acceso

La **Lista de Control de Acceso** (del inglés, ACL) es el filtro que determina si una [entidad](#entidad) tiene un cierto rol en el contexto de una aplicación. Permite o prohíbe la ejecución de acciones, tales como actualizaciones, en un contexto dado, así como las determinación de las entidades con poder sobre dicho permiso.

El sistema de permisos de la ACL está inspirado en UNIX. Las ACLs controlan los permisos otorgados a un usuario en el sistema y pueden facilitar la transferencia de los permisos mencionados. De manera similar al comando `sudo` en UNIX, los usuarios pueden escalar permisos, pero con más flexibilidad y granularidad.

Una implementación de referencia del Kernel y su ACL puede encontrarse aquí: [`Kernel.sol`](https://github.com/aragon/aragon-core/blob/dev/contracts/kernel/Kernel.sol).

### Aplicaciones y Acciones

Las **Aplicaciones** son contratos inteligentes que se superponen al Kernel—el kernel del sistema operativo—para mantener su ACL y actualizar su código. Las Aplicaciones pueden interactuar con usuarios y otros contratos inteligentes mediante la implementación de **Acciones**, donde cada acción es una función públicamente accesible que puede o no estar protegida por la ACL. Cualquier acción protegida solo puede ser ejecutada si el solicitante está permitido en la ACL. Ya que las Aplicaciones son actualizables, esperamos que existan por un largo período de tiempo y que sean responsables fiables para la posesión de activos en nombre de la DAO (p.ej. tokens y nombres ENS).

Las instancias de una aplicación son identificadas por su dirección Ethereum desplegada.

### Roles

Otra característica para garantizar la seguridad en el ecosistema es la posibilidad de delegación de responsabilidades para la ejecución autónoma. Las Aplicaciones pueden definir un número determinado de **Rol**es, donde cada rol garantiza el acceso a una o más acciones de la aplicación como parte de su ACL. Cualquier entidad que desee realizar una acción protegida por la ACL debe tener los permisos necesarios mediante la posesión de un rol capaz de realizar dicha acción.

Los Roles son siempre únicos para cada aplicación. Disponer de un rol en una aplicación no garantiza el permiso para la posesión del mismo rol en otras aplicaciones.

Una entidad puede tener muchos roles en una aplicación.

Ejemplo:

```
contract TokenApp is App {
	bytes32 constant public MINT_ROLE = 0x1234;
	function mint(address _receiver, uint256 _amount) auth(MINT_ROLE) { … }
}
```

`TokenApp` es una aplicación que define una acción, `mint()`, cuya ejecución está controlada por `MINT_ROLE`.

### Entidad

Una **Entidad** es cualquier actor que esté representado por una dirección Ethereum, como una multisig (una cuenta que necesita múltiples firmas antes de ejecutar una acción), una aplicación (por ejemplo, una aplicación para votaciones que solo ejecuta una acción si los poseedores de los tokens votan favorablemente), o una simplre cuenta controlada por una clave privada.

El sistema puede delegar permisos a grupos de entidades mediante la implementación de un Grupo de Aplicación (lo puedes ver nuestra [referencia de implementación](https://github.com/aragon/aragon-apps/tree/master/apps/group)). Como en otras aplicaciones, puede depender de la ACL para la protección de funciones importantes, tales como añadir o borrar miembros de un grupo. Cuando los miembros de un grupo quieren ejecutar una acción específica, el Grupo de Aplicación actúa como un contrato proxy que realiza la acción en nombre del grupo.

### Permisos

Un **Permiso** está definido como la habilidad de realizar acciones (agrupadas por roles) en determinadas instancias de una aplicación (identificadas por su dirección).

Nos refererimos como **Instancia de un permiso** a una entidad que mantiene un determinado permiso.

Cuando un permiso se crea, un **Gestor de Permisos** se establece para ese permiso específico. El gestor de permisos puede conceder o revocar instancias de permisos para ese permiso.

#### Crear Permiso

```
kernel.createPermission(address entity, address app, bytes32 role, address manager)
```

`createPermission()` fallará si ese permiso tiene una instancia de permiso pre-existente.

Esta acción es idéntica a [`grantPermission()`](#grant-permission) excepto porque permite la creación de un nuevo permiso si el mismo todavía no existe.

Un rol en la ACL protege el acceso a `createPermission()` ya que esta importante función puede ser usada de manera maliciosa. Cuando el Kernel está inicializado, también crea los permisos que otorgan a las direcciones inicializadas la habilidad de crear nuevos permisos.

Nótese que la creación de permisos tiene que ser hecha de manera obligatoria por la ACL. Cualquier comprobación de un permiso que no exista termina automáticamente en falida: p.ej. las acciones que requieran permisos que van a ser creados próximamente, son no permitidas por defecto.

#### Conceder Permiso

```
kernel.grantPermission(address entity, address app, bytes32 role)
```

Concede un `role` en la `app` para una `entity`. Solo puede ser llamada por el `manager` de un cierto permiso. Esta `entity` podría tomar acciones que su `role` pueda realizar en esa `app` particular hasta que el gestor de permisos revocase su rol con `revokePermission()`.

La acción `grantPermission()` no requiere protección con la ACL porque una entidad solo puede hacer cambios a un permiso si es el `manager` de permisos.

#### Revocar Permiso

```
kernel.revokePermission(address entity, address app, bytes32 role)
```

Borra un `role` en la `app` para una `entity`. Solo puede ser llamada por el `manager` de un cierto permiso.

La acción `revokePermission()` tampoco necesita ser protegida por la ACL, ya que una entidad tan solo puede realizar cambios si es el `manager` para un permiso dado.

#### Establecer el Gestor de Permisos

```
kernel.setPermissionManager(address newManager, address app, bytes32 role)
```

Cambia el gestor de permisos a `newManager`. Solo puede ser llamada por el `manager` de un cierto permiso.

El gestor de permisos nuevo reemplaza el gestor de permisos antiguo, resultando en la pérdida de todo poder de gestión sobre ese permiso para el gestor de permisos antiguo.

[`createPermission()`](#create-permission) ejecuta un caso especial de esta acción para establecer el gestor inicial para el nuevo permiso creado. Desde este punto en adelante, el gestor solo puede ser cambiado con `setPermissionManager()`.

#### Events

Tanto [`createPermission()`](#create-permission), [`grantPermission()`](#grant-permission), como [`revokePermission()`](#revoke-permission) disparan el evento `SetPermission` que se espera que los clientes de Aragon registren y procesen en sus versiones locales de la ACL.

```
SetPermission(address indexed from, bytes32 indexed role, address indexed to, bool allowed)
```

[`setPermissionManager()`](#set-permission-manager) dispara el siguiente evento:

```
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager)
```

#### Ejemplo

Como un ejemplo, los siguientes pasos muestran el flujo completo para un usuario "Root" que crea una nueva DAO con los permisos básicos de manera que una Voting app ([referencia de implementación](https://github.com/aragon/aragon-apps/tree/master/apps/voting)) pueda gestionar los fondos almacenados en una Vault app ([referencia de implementación](https://github.com/aragon/aragon-apps/tree/master/apps/vault)):

1. Desplegar el Kernel.
2. Ejecutando `kernel.initialize(rootAddress)` se crea el permiso del "generador de permisos" mediante:
`createPermission(rootAddress, kernelAddress, PERMISSIONS_CREATOR_ROLE, rootAddress)`
3. Desplegar la Voting app
4. Conceder a la Voting app la habilitad de llamar `createPermission()`:
`grantPermission(votingAppAddress, PERMISSIONS_CREATOR_ROLE, kernelAddress)` (debe ser ejecutada por una `rootAddress`)
5. Desplegar la Vault app, que tiene una acción llamada `transferTokens()`
6. Crear un nuevo voto vía la Voting app para crear el permiso `TRANSFER_TOKENS_ROLE` mediante:
`createPermission(votingAppAddress, vaultAppAddress, TRANSFER_TOKENS_ROLE, votingAppAddress)`
7. Si el voto es aprobado, la Voting app tiene acceso a todas las acciones en el Vault protegidos por `TRANSFER_TOKENS_ROLE`, que en este caso es simplemente `transferTokens()`.
8. La transferencia de fondos desde el Vault puede ser ahora ejecutada mediante la creación de votos.

Nótese que la Voting app también tiene la capacidad de revocar o re-conceder el permiso `TRANSFER_TOKENS_ROLE` ya que es el gestor de permisos para `vaultAppAddress`.

#### Añadir Permisos

Las Aplicaciones conservan la decisión de qué acciones proteger detrás de la ACL, ya que puede tener sentido que algunas acciones sean completamente públicas. La protección de una acción detrás de la ACL se hace mediante un contrato inteligente, simplemente añadiendo el modificador de autenticación [`auth()`](https://github.com/aragon/aragon-core/blob/a1b6694cdb33443c6ad8f2a8fd3badf82dbd720a/contracts/apps/App.sol#L6) (pasando el rol requerido como un parámetro) a la acción. Cuando se ejecuta la acción, el modificador `auth()` comprueba con el Kernel si la entidad que está realizando la llamada mantiene el rol requerido o no.

#### Escalar Permisos

Consideremos un kernel **K**, una entidad **E**_0_, y una aplicación **A**. **E**_0_ quiere realizar una acción **A**_act_ en una aplicación **A**. El cliente sabe, por [la información que se provee como parte de los metadatos de la aplicación](#additional-packaging-requirements), que para poder realizar una acción **A**_act_, se requiere que una entidad tenga un **A**_role_. Ya que **E**_0_ no mantiene el **A**_role_, el cliente debería saber que **E**_0_ no puede llamar directamente **A**_act_, pero sí a una lista de entidades [**E**_1_, **E**_2_, ...] que tienen ese rol en la app **A**. El cliente debería entonces mostrar al usuario las múltiples rutas para pasar la llamada a **E**_1_, **E**_2_, etc, de manera que **E**_0_ es capaz de realizar **A**_act_ a través de otra entidad con privelgios mayores.

Calcular una ruta de reenvío requiere saber que la entidad que [reenvía](#forwarders)  **E**_0_ puede esclar acciones. El usuario o contrato que realice esta acción podría entonces elegir su ruta preferida para reenviar permisos para realizar **A**_act_. Por ejemplo, **E**_1_ podría ser una Voting app **V**, de manera que la acción sería crear un nuevo voto que, en caso de ser aprobado, llamase a la acción **A**_act_. Como **V** tiene el rol **A**_role_, tiene permisos para ejecutar **A**_act_, y entonces habría completado satisfactoriamente el escalado de permisos.

El escalado de permisos puede tener muchos niveles de profundidad. Por ejemplo, imagina que un usuario quiere invocar una acción que requiere un voto. Si la única entidad con permisos para la creación de un voto es la aplicación Gestor de Tokens, entonces el usuario tendrá que reenviar su acción primero a través del Gestor de Tokens y luego a tavés de la Voting app. El Gestor de Tokens (ver [referencia de implementación](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager)) solo permite al remitente enviar acciones si el mismo posee tokens, así que en este caso, el usuario necesitará tener tokens antes de poder empezar una votación.

Nótese que el escalado de permisos puede ocurrir instantáneamente o ser retrasado y requiere acciones de otras entidades, como en el caso de la Voting app.

<center><img src="../../images/aragonos/permission_escalation.png"></center>

##### Forwarders

Para hacer el escalado de permisos más sencillo, se define una interfaz común para **Forwarder**s:

```
contract Forwarder {
   bool isForwarder = true;
   function canForward(address sender, bytes evmCallScript) view returns (bool);
   function forward(bytes evmCallScript);
}
```
Si un usuario quiere realizar una acción que no puede hacer directamente, puede comprobar si hay forwarders. Este procedimiento comprueba si hay entidades privilegiadas que son accesibles por cualquiera de los usuarios para reenviar la acción.

##### EVM Call Script

El parámetro `evmCallScript` permite la ejecución de múltiples llamadas con simplemente una transacción. Esto es útil, por ejemplo, en el caso de votaciones, ya que permite la aprobación de múltiples acciones con tan sólo un voto.

Un `evmCallScript` es la concatencación de múltiples `evmCallAction`s. Una carga de pago de una `evmCallAction` puede ser:

``[ to (address: 20 bytes) ] [ calldataLength (uint32: 4 bytes)  ] [ calldata (calldataLength bytes) ]``

Cuando son ejecutadas, las acciones en el `evmCallScript` son ejecutadas una cada vez usando el `CALL` opcode. Si alguna de las acciones fallse (p.ej. `CALL` retorna 0), la ejecución completa es revertida.

La referencia de implementación para EVM Call Script puede ser encontrada aquí: [`EVMCallScript.sol`](https://github.com/aragon/aragon-core/blob/dev/contracts/common/EVMCallScript.sol).

## 2. Capacidad de actualización

La capacidad de actualización del sistema se consigue mediante el uso del patrón [`DelegateProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/common/DelegateProxy.sol). El Kernel y las Aplicaciones ([`KernelProxy`](#21-kernel-upgradeability) y [`AppProxy`](#22-app-space-upgradeability)) usan el `DelegateProxy` con alguna funcionalidad añadida.

<center><img src="../../images/aragonos/delegateproxy.png"></center>

Dada la ejecución de nuevas versiones de aplicaciones o del kernel en el mismo contexto exacto que las versiones anteriores, la disposición del almacenamiento anterior tiene que ser tomada en consideración. Heredar del alamacenamiento del contrato anterior antes de añadir nuevas variables de almacenamiento es considerado una práctica segura. Es recomendado asegurarse de que la actualización no rompe el almacenamiento antes de desplegar la nueva versión. Trabajaremos en herramientas que prevengan problemas con el almacenamiento durante una actualización.

### 2.1. Capacidad de actualización del Kernel

Para que el [Kernel](#1-kernel-and-the-access-control-list) sea fácilmente actualizable, rápidamente desplegable, y más eficiente, usamos un constructo tipo proxy. El despliegue de una nueva DAO se consigue mediante el despliegue de un contrato [`KernelProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/kernel/KernelProxy.sol) que simplemente delega todas las llamadas a una implementacion de un kernel en una dirección dada, mientras que sigue manteniendo su propio alamacenamiento. La actualización de la implementación del kernel en el proxy es tan fácil como cambiar su referncia a otra dirección de implementación.

Nótese que , aunque esta acción es bastante fácil de completar, es extremadamente crítica para la DAO y debería ser protegida en concordancia.

### 2.2. Capacidad de actualización del espacio de aplicaciones

Como las aplicaciones pueden ser usadas como entidades (p.ej. una voting app), es importante que cada aplicación sea capaz de mantener su dirección fija, para así mantener su identidad incluso si hay cambios de actualización por debajo de la lógica. Mantener una dirección fija también simplifica el proceso de actualización—de otra manera, cada actualización también tendría que requerir unos permisos asociados en la ACL para poder ser actualizada a la nueva dirección de la aplicación—.

Un manera de conseguirlo es a través del concepto de un contrato [`AppProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/apps/AppProxy.sol) (inspirado por el [augur-core’s `Delegators`](https://github.com/AugurProject/augur-core/blob/develop/source/contracts/libraries/Delegator.sol)). El despliegue de una aplicación via un contrato `AppProxy` solo requiere una referencia al Kernel y a la identificación de la aplicación. Cuando una aplicación recibe una llamada, es interceptada por la función callback del proxy. En este punto, el proxy pregunta al Kernel por las últimas direcciones del código de la aplicación para un identificador de aplicación dado y versión. El contrato AppProxy entonces reenvía la llamada `delegatecall`ando hacia su dirección.

<center><img src="../../images/aragonos/appproxy_delegatecall.png"></center>

Dado que el Kernel mantiene un registro centralizado de la última versión del código para cada identificador de aplicación, el cambio de una referencia en el Kernel actualiza de manera efectiva todas las instancias de esa aplicación en las organizaciones que dependen del mismo Kernel. Estas actualizaciones podrían ser delegadas a otro contrato, p.ej. la Aragon Network, en caso de organizaciones que no quieren encargarse de la actualización manual de sus propias aplicaciones.

#### Establecer el Código de Aplicación
```
kernel.setAppCode(bytes32 appId, address appCode)
```

Esta acción actualiza el código de implementación registrado para un `appId` dado, de manera que todas las futuras llamadas a la aplicación usen el nuevo código de aplicación.

Nótese que esto actualiza efectivamente la aplicación en todas las organizaciones que dependen del mismo Kernel. Nótese que todas las llamadas a una aplicación fallarán si un `appId` no ha sido establcido para ese `appCode`.

## 3. Inicialización

Los contratos que se despliegan para cada Kernel y Aplicación no contienen ninguna lógica de negocio debido a que dependen de una arquitectura tipo proxy para su actualización. Los contratos del proxy son simplemente una manera de apuntar a la lógica cuando son llamados.

Sin embargo, esta arquitectura impide la habilidad de llamar al constructor Solidity. Los constructures solo son ejecutados en la creación de un contrato pero no son almacenados como parte del código de cuenta.

Nosotros en cambio usamos una 'función regular' para realizar la inicialización en cada proxy. Esta función puede ser llamada solo después de que un contrato `AppProxy` sea desplegado. Para impedir ataques en los que el actor malicioso intenta hacer frente a una transacción de inicialización entre el despliegue y la transacción legítima de inicialización, el `AppProxy` te permite pasar sólo la carga de pago de inicialización que será ejecutada durante el despliegue, permitiendo la inicialización atómica de las aplicaciones.

Es importante resaltar que esta función de inicialización puede ser llamada solo una vez por proxy. En vez de simplemente guardar un buleano cuando un componente ha sido inicializado, nosotros almacenamos un número de bloque cuando la inicialización ha ocurrido. Los clientes puede usar esto para saber desde qué bloque deberían filtrar para eventos.

## 4. Descubrimiento de aplicaciones y versionado de paquetes

Técnicamente, una aplicación **A** no es más que un simple contrato [`AppProxy`](22-app-space-upgradeability) que mantiene una referencia a un kernel **K** y a un `appId`. Si **A** no tiene ningún permiso, entrante o saliente, establecido en **K**, **A** es efectivamente irrelevante para la DAO ya que no puede ser llamada ni realizar ninguna llamada por sí misma. Así que la noción de instalar una aplicación se reemplaza por la noción de crear permisos para una aplicación (p.ej. definir qué entidades pueden interactuar con una aplicación y qué puede hacer una aplicación en otras aplicaciones).

Todas las aplicaciones relevantes en una DAO deberían poder ser descubiertas recorriendo la ACL, comprobando si algunas direcciones son `AppProxy`s, y comprobando si esas `AppProxy`s tienen una referencia al kernel de la DAO. Si es el caso, entonces las aplicaciones coincidentes con aquellos `appId`s del `AppProxy`s son consideradas instaladas en la DAO.

Los identificadores de aplicación (`appId`s) deberían corresponderse con el [`namehash`](https://www.npmjs.com/package/eth-ens-namehash) del nombre ENS para el contrato desplegado de la aplicación:

```
appId = namehash(“voting.aragonpm.eth”)
```

Un `appId` de una aplicación puede ser usado como un identificador por su paquete completo (incluyendo el frontend de la aplicación y otros artefactos).

Aragon posee y provee `aragonpm.eth` como un dominio que lo desarrolladores puedan usar para registrar sus paquetes colgando del mismo. Sin embargo, el sistema está designado para ser agnóstico en cuanto al dominio.

### Repos para Aplicaciones

Después de descubrir que una entidad en la DAO es una aplicación, podemos recuperar su `appId` y usar ENS para resolver su contrato Repo:

```
repo = Resolver(ens.resolver(appId)).addr(appId)
```

Los contratos Repo se ajustan al Protocolo de Versionado de Aragon original pero añaden más comprobaciones on-chain para actualizaciones de versión.

Cada Repo tiene un poseedor que es una dirección Ethereum que puede crear nuevas versiones del paquete. Este derecho de posesión puede ser transferido a otra dirección por parte del poseedor.

Un Repo mantiene un estado versionado sobre:

  - El código de la aplicación del contrato inteligente (`contractAddress`): el código de la aplicación es la dirección de la versión de despliegue de la aplicación. El Kernel determina qué versión de la aplicacion está usando apuntando a la dirección del código de la aplicación asociado con esa versión.
  - Contenido del paquete (`contentURI`): definido por un ID de localización donde otros componentes del paquete (p.ej. frontend) están alojados (IPFS, Swarm, etc.) y el hash del contenido para recuperarlo.

Mediante el versionado de tanto la dirección del código de la aplicación como el contenido del paquete, construimos expectativas adicionales para el versionado semántico de las aplicaciones:

  - **Patch**: Cambios menores en el contenido del paquete (p.ej. frontend). Esta actualización puede ser realizada sin notificar al usuario.
  - **Minor**: Cambios mayores en el contenido del paquete, pero todavía funcionando con el actual código del contrato inteligente. Los usuarios deberían ser notificados de la actualización.
  - **Major**: cualquier cambio en el código de la aplicación del contrato inteligente con o sin acompañamiento de una actualización del frontend. Se necesita interacción con el usuario para actualizar.
  
  Mediante esta comprobación realizada a nivel de contrato inteligente, podemos cargar la versión correcta del frontend solo mirando una instancia de la aplicación. Esto se hace comprobando que la versión de un contrato inteligente está enlazada con una aplicación dada a través de su `appId` y `appCode`.
  
  Una actualización de versión correcta para un paquete está definida por las siguientes reglas:

  - Solo un miembro de la versión será incrementado en 1. Los componentes de la versión a la izquierda del número elevando deben permanecer igual y los componentes a su derecha deben ser igual a 0.
  - Ejemplo: Desde 2.1.3 las únicas actualizaciones posibles son 3.0.0 (major version), 2.2.0 (minor version), y 2.1.4 (patch version).
  - Los cambios en la dirección del código de la aplicación pueden ser realizados solo si la actualización cambia la major version (actualizándola a x.0.0 según la regla anterior).

### Requerimentos adicionales de empaquetado

El paquete que está almacenado off-chain debe contener un estándar [manifest.json](https://w3c.github.io/manifest/).

También introducimos un archivo `eth.json` específico con las siguientes claves: para ayudar a conectar el frontend de una app con sus contratos inteligentes:

  - `abi`: Estándar [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
  - `bytecode`: Código de inicialización para desplegar el código de una aplicación en la red.
  - `functions`: Un vector de todas las firmas de función relevantes para el contrato, con su descripción [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format), nombres de argumento, y si la función está protegida por el ACL o no (y en qué rol está requerido, si está protegido). Estos pueden ser automáticamente generados durante la publicación del paquete.
  - `permissions`: Un vector de permisos que la aplicación necesita tener sobre otras entidades para poder funcionar. Esto probablemente  será dependiente de los parámetro de inicialización. Por ejemplo: una aplicación de Finanzas necesitará permisos sobre el Vault con el que ha sido inicializado.
  - `verification`: Un objeto que provee la información requerida para verificar de manera independiente el código fuente del código desplegado. Los valores requeridos incluyen: `deployTxId`, `sourceCode`, y la configuración del compilador, la versión solc, y las configuraciones de optimización.

La implementación inicial de la gestión de paquetes basados en contratos puede ser encontrada en [apm-contracts repo](https://github.com/aragon/apm-contracts).