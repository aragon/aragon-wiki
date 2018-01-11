<center>
# AragonOS

*Refleja la implememtación [aragon-core](https://github.com/aragon/aragon-core) 2.0.1. Actualizado el 4 de Diciembre de 2017.*

Una arquitectura inspirada en [exokernels](https://es.wikipedia.org/wiki/Exon%C3%BAcleo), para DAOs modulares, actualizables y seguras.
</center>

## Introducción

Esta arquitectura inspirada en exokernels habilita la creación de Organizaciones Autónomas Descentralizadas (del inglés, DAOs). Implementa un sistema de permisos inspirados en UNIX con contratos inteligentes que permiten un contol seguro y eficiente de los recursos software.

Los contratos inteligentes pueden definir las reglas y sanciones alrededor de un acuerdo. También pueden tomar decisiones así como reforzar compromisos previos. Por ejemplo la habilidad de transferir grandes cantidades de fondos. Pero esta gran responsabilidad también hace de los contratos inteligentes el primer objetivo de ataque. Los contratos inteligentes son esenciales para el ecosistema Ethereum. Testarlos y certificarlos no compone una solución absoluta ya que, invevitablemente, los humanos cometen errores.

Entonces, ¿cómo podemos garantizar que las DAOs funcionan de forma eficiente y segura? Y, ¿con capacidades de actualización, manteniendo la seguridad y la evolución del ecosistema Ethereum?

Presentamos nuestro sistema operativo seguro y descentralizado: _AragonOS_.

Este documento provee una revisión técnica acerca de su arquitectura. Para una introducción menos técnica orientada a AragonOS puedes revisar el [announcement blogpost](https://blog.aragon.one/introducing-aragonos-say-hi-to-modular-and-extendable-organizations-8555af1076f3).

## 1. Kernel y Lista de Control de Acceso

La **Lista de Control de Acceso** (del inglés, ACL) es el filtro que determina si una dirección tiene un cierto rol en el contexto de una aplicación. Permite o prohíbe la ejecución de acciones en un contexto dado, tales como actualizaciones, así como las determinación de las entidades con poder sobre dicho permiso.

El sistema de permisos de la ACL está inspirado en UNIX. Las ACLs controlan los permisos otorgados a un usuario y pueden facilitar la transferencia de los permisos mencionados. De manera similar al comando `sudo` en UNIX, los usuarios pueden escalar permisos, pero con más flexibilidad y granularidad.

### Aplicaciones

Las **Aplicaciones** son contratos inteligentes que dependen del Kernel—el kernel del sistema operativo—para su propia ACL y actualizar su código. Ya que las aplicaciones son actualizables, podemos esperar que existan por un largo período de tiempo. Esto significa que es seguro para una aplicación ser responsable de la posesión de distintos activos en nombre de la DAO (p.ej. tokens y nombre ENS). Las aplicaciones pueden implementar múltiples acciones y estas acciones pueden estar protegidas o no por la ACL. En caso de que una acción esté protegida, la ejecución de la acción sólo se permitirá cuando lo autorice la ACL. 

### Roles

Otra característica para garantizar la seguridad en el ecosistema es la posibilidad de delegación de responsabilidades para la ejecución autónoma. Las Aplicaciones pueden definir un número determinado de roles y los roles pueden agrupar una o más acciones detrás. Para realizar una acción protegida por la ACL, la entidad que desee realizarla deberá disopner de los permisos necesarios para ejecutar las acciones de ese rol.

Los Roles son siempre únicos para cada aplicación. Disponer de un rol en una aplicación no garantiza el permiso para la posesión del mismo rol en otras aplicaciones. Una entidad puede tener muchos roles en una aplicación.

Ejemplo:

```
contract TokenApp is App {
	bytes32 constant public MINT_ROLE = 0x1234;
	function mint(address _receiver, uint256 _amount) auth(MINT_ROLE) { … }
}
```

### Entidad

Una Entidad es cualquier actor que esté representado por una dirección Ethereum, como una multisig (una cuenta que necesita múltiples firmas antes de ejecutar una acción), una aplicación (por ejemplo, una aplicación para votaciones que solo ejecuta una acción si los poseedores de los tokens votan favorablemente), o una simplre cuenta controlada por una clave privada.

El sistema puede delegar permisos a grupos de entidades mediante la implementación de un Grupo de Aplicación. Como en otras aplicaciones, puede depender de la ACL para la protección de funciones importantes, tales como añadir o borrar miembros de un grupo. Cuando los miembros de un grupo quieren ejecutar una acción específica, el Grupo de Aplicación actúa como un contrato proxy que realiza la acción en nombre del grupo.

### Permisos

Un **Permiso** está definido como la habilidad de realizar acciones (agrupadas en un rol) en determinadas instancias de una aplicación (identificadas por su dirección).

Nos refererimos como **Instancia de un permiso** a si una entidad tiene o no un cierto **Permiso**.

Cuando un permiso se crea, un **Gestor de Permisos** se establece para ese permiso específico. El gestor de permisos puede conceder o revocar instancias de permisos para ese permiso.

#### Crear Permiso

```
kernel.createPermission(address entity, address app, bytes32 role, address manager)
```

`createPermission` fallará si esa instancia de permiso para ese permiso ya ha sido creada antes.

Esta llamada es idéntica a `grantPermission`excepto porque permite la creación de un nuevo permiso desde cero si el mismo todavía no existe.

La acción `createPermission` necesita ser protegida por la ACL con un rol. Se trata de una función importante que puede ser usada de manera maliciosa. Cuando el Kernel está inicializado, crea el permiso para una dirección que a su vez puede crear nuevos permisos.

Si se comprueba en la ACL que un permiso que no ha sido creado antes, la ACL no permitirá por defecto que la acción sea realizada.

#### Conceder Permiso

```
kernel.grantPermission(address entity, address app, bytes32 role)
```
La `entidad` podría estar habilitada para llamar todas las acciones que su `rol` pueda realizar en esa `app` particular. Esto tendría efecto hasta que el gestor de permisos lo revocase llamando `revokePermission`.

La acción `grantPermission` no requiere protección con la ACL porque una entidad solo puede hacer cambios a un permiso si es el `manager` para un permiso dado.

#### Revocar Permiso

```
kernel.revokePermission(address entity, address app, bytes32 role)
```
`revokePermission` puede ser llamada en cualquier momento por el `manager`de un cierto permiso y borrará la habilidad de una `entidad` de tener un `rol` en una `app`.

La acción `revokePermission` tampoco necesita ser protegida por la ACL, ya que una entidad tan solo puede realizar cambios si es el `manager` para un permiso dado.

`createPermission`, `grantPermission` y `revokePermission` disparan el mismo evento que los clientes de Aragon deben registrar y usar para construir una versión local del ACL.

```
SetPermission(address indexed from, bytes32 indexed role, address indexed to, bool allowed)
```

#### Establecer el Gestor de Permisos

```
kernel.setPermissionManager(address newManager, address app, bytes32 role)
```

Solo el gestor de permisos de un permiso puede llamar a esta función para establecer un nuevo gestor.

Establecer un nuevo gestor de permisos resulta en la pérdida de poder de gestión para el gestor de permisos antiguo para ese permiso.

`createPermission` ejecuta un caso especial de establecer el gestor de permisos por primera vez. Desde este punto en adelante, el gestor solo puede ser cambiado con `setPermissionManager`.

Cambiar el gestor de permisos dispara el siguiente evento:

```
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager)
```
#### Ejemplo

Como un ejemplo, los siguientes pasos muestran el flujo completo para un usuario Root que crea una nueva DAO con los permisos básicos de manera que una Voting app pueda gestionar los fondos almacenados en una Vault app:

1. Desplegar el Kernel.
2. Ejecutando `kernel.initialize(rootAddress)` se crea el permiso:
`createPermission(rootAddress, kernelAddress, PERMISSIONS_CREATOR_ROLE, rootAddress)`
3. Desplegar la Voting app
4. Conceder a la Voting app la habilitad de llamar `createPermission`:
`grantPermission(votingAppAddress, PERMISSIONS_CREATOR_ROLE, kernelAddress)` (debe ser ejecutada por una `rootAddress`)
5. Desplegar la Vault app, que tiene una firma llamada `transferTokens`
6. Crear un nuevo voto vía la Voting app para crear el permiso `TRANSFER_TOKENS_ROLE` mediante:
`createPermission(votingAppAddress, vaultAppAddress, TRANSFER_TOKENS_ROLE, votingAppAddress)`
7. Si el voto es aprobado, la Voting app tiene acceso a todas las acciones del `TRANSFER_TOKENS_ROLE`, que en este caso es simplemente `transferTokens` en el Vault.
8. Los votos pueden ser creados para transferir fondos.
9. La Voting app podrá revocar o re-conceder el permiso ya que es el gestor de permisos para `TRANSFER_TOKENS_ROLE` en `vaultAppAddress`.

Una implementación de la ACL explicada puede encontrarse en el archivo [aragon-core’s Kernel](https://github.com/aragon/aragon-core/blob/dev/contracts/kernel/Kernel.sol).

#### Comprobar permisos

Las Aplicaciones pueden decidir si protegen acciones detrás de la ACL o no, ya que tiene sentido que algunas acciones sean completamente públicas. La protección de una acción detrás de la ACL se hace simplemente añadiendo el modificador de autenticación que pasa el rol requerido para realizar la acción como un parámetro. El modificador auth comprobará con el Kernel si la entidad realizando la llamada tiene ese rol o no.

#### Escalar Permisos

Consideremos un kernel **K**, una entidad **E**_0_ y una aplicación **A**. **E** quiere realizar una cción **A**_sig_ en la aplicación **A**. El cliente sabe (ya que es parte de los metadatos de la aplicación) que para realizar **A**_sig_ se requiere que una entidad tenga **A**_role_.
El cliente debería saber que **E**_0_ no puede llamar directamente **A**_sig_, ya que no tiene ese rol, pero una lista de Entidades [**E**_1_, **E**_2_] sí que tienen ese rol en la aplicación **A**. El cliente debería entonces mostrar al usuario las múltiples rutas de reenvío posibles para pasar la llamada a **E**_1_, de manera que **E**_0_ pueda realizar **A**_sig_.

El cálculo de una ruta de reenvío requiere saber a través de qué entidad Forwarders **E**_0_ puede realizar acciones.
El usuario o contrato que realice esta acción podría entonces elegir su ruta preferida para reenviar permisos para realizar **A**_sig_. Por ejemplo, **E**_1_ puede ser una Voting app **V**, así que la acción sería crear un nuevo voto que, en caso de ser aprobado, llamaría **A**_sig_. Como **V** tiene un rol **A**_role_ tiene el permiso de ejecutar **A**_sig_, entonces tendríamos un escalado de permisos completado satisfactoriamente.
Nótese que el escalado de permisos puede ocurrir instantáneamente o puede retrasarse y requerir acciones por parte de otras entidades como en el caso de la voting app.

<center><img src="../../images/aragonos/permission_escalation.png"></center>

##### Forwarders

Para hacer el escalado de permisos más sencillo, se define una interfaz común para que suceda:

```
contract Forwarder {
   bool isForwarder = true;
   function canForward(address sender, bytes evmCallScript) view returns (bool);
   function forward(bytes evmCallScript);
}
```

##### EVM Call Script

El parámetro `evmCallScript` permite la ejecución de múltiples llamadas con simplemente una transacción. Esto es útil, por ejemplo, en el caso de votaciones, ya que permite la aprobación de múltiples acciones con tan sólo un voto.

Un `evmCallScript` es la concatencación de múltiples `evmCallActions`. Una carga de pago de una `evmCallAction` puede ser:

``[ to (address: 20 bytes) ] [ calldataLength (uint32: 4 bytes)  ] [ calldata (calldataLength bytes) ]``

Cuando son ejecutadas, las acciones en el `evmCallScript` son ejecutadas una cada vez usando el `CALL` opcode. Si alguna de las acciones fallase (p.ej. `CALL` retorna 0), la ejecución completa es revertida.

La referencia de implementación para EVM Call Script puede ser encontrada aquí: [`EVMCallScript.sol`](https://github.com/aragon/aragon-core/blob/dev/contracts/common/EVMCallScript.sol).

Si un usuario quiere realizar una acción que no puede ser llevada a cabo directamente, puede comprobar si hay forwarders. Esto comprueba si hay entidades que pueden realizar la acción que cualquiera de las direcciones de usuario puede usar.

Esto puede tener múltiples niveles de profundidad. Por ejemplo, si un usuario mantiene un número de tokens, se permite que el usuario use la entidad gestor de tokens. Esto es algo que se pasa cuando el remitente posee tokens. Entonces se permite solo una vez que la entidad gestora de tokens cree un nuevo voto.

## 2. Capacidad de actualización

La capacidad de actualización del sistema se consigue mediante el uso del patrón [`DelegateProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/common/DelegateProxy.sol). El Kernel y las Aplicaciones (`KernelProxy` y `AppProxy`) usan el DelegateProxy con algunas ligeras modificaciones.

<center><img src="../../images/aragonos/delegateproxy.png"></center>

Dada la ejecución de nuevas versiones de aplicaciones o del kernel en el mismo contexto exacto que las versiones anteriores, la disposición del almacenamiento anterior tiene que ser tomada en consideración. Heredar del alamacenamiento del contrato anterior antes de añadir nuevas variables de almacenamiento es considerado una práctica segura. Es recomendado asegurarse de que la actualización no rompe el almacenamiento antes de desplegar la nueva versión. Trabajaremos en herramientas que prevengan problemas con el almacenamiento durante una actualización.

### 2.1. Capacidad de actualización del Kernel

Para que el [Kernel](#1-kernel-and-the-access-control-list) sea fácilmente actualizable, rápidamente desplegable, y más eficiente, usamos un constructo tipo proxy. El despliegue de una nueva DAO se consigue mediante el despliegue de un contrato [`KernelProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/kernel/KernelProxy.sol) que simplemente delega todas las llamadas a una implementacion de un kernel en una dirección dada, mientras que sigue manteniendo su propio alamacenamiento. La actualización de la implementación del kernel en el proxy es tan fácil como cambiar su referencia a otra dirección de implementación. Incluso aunque esta acción es bastante fácil de completar, es extremadamente crítica para la DAO y debería ser protegida en concordancia.

### 2.2. Capacidad de actualización del espacio de aplicaciones

Como las aplicaciones pueden ser usadas como entidades (p.ej. una voting app), es importante que cada aplicación sea capaz de mantener su dirección fija, para así mantener su identidad incluso si hay cambios de actualización por debajo de la lógica. Esto es para mantener los permisos sin cambios a nivel de kernel con las actualizaciones.

Una idea de como esto puede ser conseguido es a través del concepto de un contrato [`AppProxy`](https://github.com/aragon/aragon-core/blob/dev/contracts/apps/AppProxy.sol) (inspirado por el [augur-core’s `Delegators`](https://github.com/AugurProject/augur-core/blob/develop/source/contracts/libraries/Delegator.sol)). El despliegue de una aplicación via un contrato `AppProxy` solo requiere una referencia al Kernel y a la identificación de la aplicación. Cuando una aplicación recibe una llamada, es interceptada por la función callback del proxy. En este punto, el proxy pregunta al Kernel por las últimas direcciones del código de la aplicación para un identificador de aplicación dado y versión. El contrato AppProxy entonces reenvía la llamada `delegatecall` hacia su dirección, asegurándose de que la última versión de la aplicación está siempre corriendo.

<center><img src="../../images/aragonos/appproxy_delegatecall.png"></center>

Dado que el Kernel mantiene un registro centralizado de la última versión del código para cada identificador de aplicación, el cambio de una referencia en el Kernel actualiza de manera efectiva todas las instancias de esa aplicación en las organizaciones que dependen del mismo Kernel. Estas actualizaciones podrían ser delegadas a otro contrato, Aragon Network, en caso de organizaciones que no quieran encargarse de la actualización manual de sus propias aplicaciones.

```
kernel.setAppCode(bytes32 appId, address appCode)
```
Esta acción actualiza el código de implementación registrado para un `appId` dado. Esto actualiza efectivamente la aplicación en todas las organizaciones que dependen del mismo Kernel. Si un `appId`no ha sido establecido para ese `appCode`, todas las llamadas a una aplicación fallarán.

## 3. Inicialización

Los contratos que se despliegan no contienen ninguna lógica de negocio para el componente. Esto es debido a que el Kernel y las Aplicaciones dependen de una arquitectura tipo Proxy para su actualización. 

Esto impide la habilidad de llamar al constructor. Los constructures solo son ejecutados en la creación de un contrato pero no son almacenados como parte del código de cuenta.

La inicialización es realizada mediante una 'función regular' quedebería ser llamada solo después de que un contrato `AppProxy` sea desplegado. Para impedir ataques en los que el actor malicioso intenta hacer frente a una transacción de inicialización entre el despliegue y la transacción legítima de inicialización, el `AppProxy` te permite pasar sólo la carga de pago de inicialización que será ejecutada durante el despliegue, permitiendo la inicialización atómica de las aplicaciones.

Es importante resaltar que esta función de inicialización puede ser llamada solo una vez por proxy. En vez de simplemente guardar un buleano cuando un componente ha sido inicializado, nosotros almacenamos un número de bloque cuando la inicialización ha ocurrido. Los clientes puede usar esto para saber desde qué bloque deberían filtrar para eventos.

## 4. Descubrimiento de aplicaciones y versionado de paquetes

Una aplicación **A** no es más que un simple contrato [`AppProxy`](22-app-space-upgradeability) que mantiene una referencia a un kernel **K** y a un `appId`. Si **A** no tiene ningún permiso, entrante o saliente, establecido en **K**, **A** es efectivamente irrelevante para la DAO ya que no puede ser llamada ni realizar ninguna llamada por sí misma. Así que la noción de instalar una aplicación se reemplaza por la noción de crear permisos para una aplicación (lo que tiene que suceder para que las diferentes funciones de una aplicación sean llamadas y lo que puede hacer una aplicación para otras aplicaciones).

Todas las aplicaciones relevantes en una DAO deberían poder ser descubiertas recorriendo la ACL, comprobando si algunas direcciones son AppProxys, y comprobando si esas AppProxys tienen una referencia al kernel de la DAO. Si esto sucede, una aplicación con el `appId` del AppProxy se considera instalada de manera efectiva en la DAO.

El identificador de una aplicación (`appId`) puede ser usado como un identificador por su paquete completo (el frontend de la aplicación y otros artefactos). El `appId` de una aplicación debería ser el nombre ENS del paquete. La función `namehash` crea el hash de manera recursiva de los diferentes componentes de un nombre ([reference implementation](https://www.npmjs.com/package/eth-ens-namehash))

```
appId = namehash(“voting.aragonpm.eth”)
```

Aragon posee _aragonpm.eth_ y permitirá a los desarrolladores crear paquetes, pero el sistema está designado para ser agnóstico en dominio (por ejemplo, district0x podría decidir tener todos sus paquetes colgando de `packages.district.eth`).

Después de descubrir que una entidad en la DAO es una aplicación, podemos recuperar su appId y ya que el appId es un nombre ENS, podemos mirar en el ENS para encontrar el contrato del repo completo para un appId.

```
repo = Resolver(ens.resolver(appId)).addr(appId)
```

Los contratos Repo se ajustan al Protocolo de Versionado de Aragon original pero añaden más comprobaciones on-chain para actualizaciones de versión.

Cada Repo tiene un poseedor que es una dirección Ethereum que puede crear nuevas versiones del paquete. Este derecho de posesión puede ser transferido a otra dirección por parte del poseedor.

Un Repo mantiene un estado versionado sobre:

  - El código de la aplicación del contrato inteligente (`contractAddress`): el código de la aplicación es la dirección de la versión de despliegue de la aplicación. El Kernel puede entonces apuntar a esta dirección y a todas las instancias de la aplicación, dependiendo del Kernel que la misma use.
  - Contenido del paquete (`contentURI`): definido por un id de localización de dónde está alojado el paquete (IPFS, Swarm, etc.) y el hash del contenido para recuperarlo.

Mediante la referencia del código de la aplicación y el contenido del paquete, podemos establecer algunas garantías de lo que significa el versionado semántico.

  - **Patch**: Cambios menores en el contenido del paquete (frontend). Esta actualización puede ser realizada sin notificar al usuario.
  - **Minor**: Cambios mayores en el contenido del paquete, pero todavía funcionando con el actual código del contrato inteligente (frontend). Los usuarios deberían ser notificados de la actualización.
  - **Major**: Cambios en los contratos inteligentes y el frontend. Para usar esta versión del frontend, se requiere una actualización a los contratos inteligentes nuevos. Se requiere interacción con el usuario para la actualización.
  
Mediante esta comprobación realizada a nivel de contrato inteligente, podemos cargar la versión correcta del frontend solo mirando una instancia de la aplicación. Esto se hace mediante la comprobación de que la versión de un contrato inteligente está enlazada a una aplicación dada a través de la recuperación del appId y el appCode.
  
  Una actualización de versión correcta para un paquete está definida por las siguientes reglas:

  - Solo un miembro de la versión será incrementado en 1. Los componentes de la versión a la izquierda del número elevando deben permanecer igual y los componentes a su derecha deben ser igual a 0.
  	- Ejemplo: Desde 2.1.3 las únicas actualizaciones posibles son 3.0.0 (major version), 2.2.0 (minor version), y 2.1.4 (patch version).
  - Los cambios en la dirección del código de la aplicación pueden ser realizados solo si la actualización cambia la major version (actualizándola a x.0.0 según la regla anterior).

El paquete que está almacenado off-chain debe contener un estándar [manifest.json](https://w3c.github.io/manifest/). Aparte de lo anterior, para hacer posible la interacción con los contratos inteligentes, introducimos un archivo específico `eth.json` con las siguientes claves:

  - `abi`: Estándar [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)
  - `bytecode`: Código de inicialización para desplegar el código de una aplicación en la red.
  - `functions`: Un vector de todas las firmas de función relevantes para el contrato, con su descripción [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format), nombres de argumento, y si la función está protegida por el ACL o no (y en qué rol está requerido, si está protegido). Estos pueden ser automáticamente generados durante la publicación del paquete.
  - `permissions`: Un vector de permisos que la aplicación necesita tener sobre otras entidades para poder funcionar. Esto probablemente  será dependiente de los parámetro de inicialización. Por ejemplo: una aplicación de Finanzas necesitará permisos sobre el Vault con el que ha sido inicializado.
  - `verification`: Un objeto que provee la información requerida para verificar de manera independiente el código fuente del código desplegado. Los valores requeridos incluyen: `deployTxId`, `sourceCode`, y la configuración del compilador, la versión solc, y las configuraciones de optimización.

Una implementación inicial de los contratos que soportan la gestión de paquetes puede ser encontrada en el [repo GitHub apm-contracts](https://github.com/aragon/apm-contracts).