
# Finance

El propósito de Finance app debe ser el punto central para realizar un seguimiento de los ingresos y gastos en una organización, así como para realizar pagos.

The Finance app es multi-token (plus ether). Con el fin de eliminar la necesidad de un feed de precios confiable (oracle) para la tasa de cambio de token, cada token se contabiliza por sí mismo para el presupuesto y los estados financieros del período.

### Definiciones


#### Período contable

Los períodos contables son el equivalente de los trimestres financieros en las organizaciones tradicionales. Su longitud se puede establecer dependiendo de cómo la organización quiera usarlos.

Para cada período contable, se mantiene un saldo (called token statement) para cada token transaccionado, este saldo será negativo si se gastó más de lo depositado y positivo si no.


#### Actas


Una transacción registra un evento en el cual los activos fueron depositados o gastados a través de la aplicación de Finanzas. Las transacciones de gastos se llaman 'outgoing transactions' y depósitos 'incoming transactions'.
Cada transacción ocurre en un período contable y cuenta hacia su token statement.

Las transacciones no se pueden crear directamente, se registran como resultado de una operación (ya sea un pago que se está ejecutando o un depósito realizado).

#### Pagos

Pagos son la construcción utilizada para gastar usando el Finance app. Se puede crear un pago para que suceda una sola vez o puede ser un pago recurrente que se realizará de acuerdo con un cronograma determinado.

Si se ejecuta correctamente un pago, se crea una transacción saliente con una referencia al pago.

#### Presupuestos

Presupuestos dar la capacidad de limitar la cantidad de unidades de un token se puede gastar por período de Contabilidad. Los presupuestos se establecen en un token por token. Por defecto, ningún token tiene un presupuesto, lo que significa que se permite un gasto ilimitado.

Una vez que se ha establecido un presupuesto para un token, la aplicación de Finanzas solo permitirá que la cantidad presupuestada de tokens se gaste para ese período.

### Inicialización

Inicializando un Finance app requiere los siguientes parámetros:

- **Vault:** una referencia a un [Vault](./vault) instancia que el Finance app utilizará para depositar y gastar tokens. Para que funcione correctamente, the Finance app **debe tener permisos para transferir Vault's tokens**.
- **Ether token**: dirección del EtherToken instancia utilizada como ether.
- **Accounting period duration**: la duración inicial de los períodos contables. Puede ser cambiado posteriormente para períodos futuros.

### Ciclo vital

#### Depósitos

Se admiten dos mecanismos de depósito:

##### ERC20
```
token.approve(finance, amount)
finance.deposit(token, amount, string reference)
```

Después de hacer un ERC20 aprobación con el Finance app como gastador, calling `deposit(...)` creará una transacción entrante guardando la cadena de referencia.

##### ERC677
```
token.transferAndCall(finance, amount, string reference)
```

Realizando un ERC677 `transferAndCall(...)` to the Finance app también activará un depósito (intercepted with the `tokenFallback`). Los datos pasaron como carga útil a transferAndCall se usa directamente como referencia para el depósito.

Dado que aragon-core's EtherToken la implementación se ajusta a ERC677, depositando Ether to the Finance app 
se puede hacer envolviendo the ether using `etherToken.wrap()` y luego haciendo un `transferAndCall(...)` o usando el atajo `wrapAndCall(...)` que realiza ambas acciones.

Tenga en cuenta que esta sección está sujeta a cambios ya que el [ERC677 discusión](https://github.com/ethereum/EIPs/issues/677) evoluciona.

### Pagos

Dependiendo de los parámetros con los que se crea un pago, puede ser un pago instantáneo por única vez, un pago recurrente para la nómina o un pago programado.

#### Creando pago
```
finance.newPayment(...)
```

Se crea un pago con los siguientes parámetros:

- **Token**: Dirección de token para pago.
- **Receiver**: Dirección que recibirá el pago.
- **Amount**: unidades de token que se pagan cada vez que se vence el pago.
- **Initial payment time**: marca de tiempo para cuando se realiza el primer pago.
- **Interval**: cantidad de segundos que deben pasar entre las transacciones de pago.
- **Maximum repeats**: instancias máximas se puede ejecutar un pago.

En caso de que un pago ya se pueda ejecutar en la creación, se ejecutará.

Si se crea un pago que no se repetirá nunca más y que ya se ejecutó, solo se registrará una transacción saliente para guardar el almacenamiento.

Un pago puede tener un pasado **initial payment time**, lo que podría ocasionar que muchas instancias del pago periódico se ejecuten en el momento de la creación del pago.

#### Ejecutando el pago
```
finance.executePayment(uint256 _paymentId)
finance.receiverExecutePayment(uint256 _paymentId)
```

La ejecución del pago transferirá al destinatario de un pago el importe debido dependiendo de la hora actual. Una sola ejecución puede generar múltiples transacciones si el pago no se ha ejecutado a tiempo. Para evitar que se quede sin gas cuando se deben realizar muchas transferencias, se realiza una cantidad máxima de transferencias por ejecución (en algunos casos, se podrían necesitar ejecuciones múltiples).

Los pagos siempre pueden ser ejecutados por el destinatario, pero también existe un rol adicional en la aplicación Finanzas que permite que otra entidad ejecute el pago (el destinatario obtiene los fondos en ambas instancias).

Para pagos cuyo token es lo conocido EtherToken, en lugar de hacer un token transferencia, transferirá directamente ether al destinatario.

Una ejecución de pago puede fallar en caso de que la organización se quede sin presupuesto para el token de pago para ese período de contabilidad en particular, o la organización no tenga suficiente saldo de token.

#### Inhabilitación de pagos
```
finance.setPaymentDisabled(uint256 _paymentId, bool _disabled)
```

En cualquier momento, un pago puede ser deshabilitado por una entidad autorizada. Si un pago no se ha ejecutado completamente hasta ese momento y está deshabilitado, el destinatario no podrá ejecutarlo hasta que esté habilitado de nuevo.

### Periodos

#### Ajuste de duración
```
finance.setPeriodDuration(uint64 _periodDuration)
```

Establece la duración del período para los siguientes períodos. La duración del período actual no se puede modificar.


#### Establecer presupuesto
```
finance.setBudget(ERC20 _token, uint256 _amount)
```

Actualiza el presupuesto de un token para los períodos contables. El nuevo presupuesto establecido se aplica automáticamente para el período actual.

#### Eliminar presupuesto
```
finance.removeBudget(ERC20 _token)
```

Quita el presupuesto de un token, lo que permite un gasto ilimitado de ese token en cualquier período. La eliminación del presupuesto afecta el período actual.

#### Períodos de transición
```
finance.tryTransitionAccountingPeriod(uint ttl)
```

Todas las operaciones que pueden dar como resultado la creación de una transacción (creación de un pago, ejecución de un pago, realización de un depósito) comprueban primero si el período contable necesita una transición (el período anterior ha expirado) o puede activarse manualmente mediante vocación `tryTransitionAccountingPeriod(...)`.

Si pasaron muchos períodos (la última operación ocurrió hace dos períodos, pero nunca se realizó la transición), se crea un período vacío para cada uno de ellos.

Para evitar el caso en el que la aplicación de Finanzas no puede realizar ninguna operación porque necesita pasar demasiados períodos contables, lo que hace que cualquier operación se quede sin gas, los períodos de transición tienen un parámetro para la cantidad de períodos en los que se realizará la transición. Las transiciones automáticas solo realizarán 10 transiciones como máximo, y si se necesitan más, la operación fallará. En caso de que se produzca este bloqueo y los períodos no se puedan hacer una transición automática, se pueden desencadenar varias operaciones de transición de períodos manualmente para eliminar el bloqueo.


### Limitaciones

- Se permite la creación de pagos, pero puede hacer que se salga del presupuesto. Puede causar una carrera para ejecutar pagos justo al comienzo de un período contable.
- Las ejecuciones de pago no caducan. Hay un vector de ataque en el que al no ejecutar un pago en algún momento, un presupuesto puede verse afectado cuando se ejecuta. En caso de que esto suceda, el pago puede ser ejecutado por otra entidad permitida o puede ser deshabilitado.  
