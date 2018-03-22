
# [Fundraising](https://github.com/aragon/aragon-apps/tree/master/apps/fundraising)

_**Code in Github:**_ [aragon-apps/apps/fundraising](https://github.com/aragon/aragon-apps/tree/master/apps/fundraising)

The Fundraising app permite vender tokens de la organización a cambio de otros tokens. Las ventas que se pueden realizar son ventas limitadas simples con precios variables a lo largo del tiempo. Al ajustar algunos parámetros, se pueden lograr diferentes dinámicas de venta.

Los tipos de venta más complejos se pueden implementar como aplicaciones de terceros.

### Dependencias y permisos

- `Token Manager`: En la inicialización requiere una referencia a un `Token Manager` ejemplo. Uno fundraising app ejemplo solo puede 'vender' el token subyacente administrado por su `Token Manager`. **The fundraising app 
se deben otorgar permisos para tokens de menta en el Token Manager**. The Token Manager debe haber sido inicializado en `Native mode` para que pueda mentir arbitrariamente nuevos tokens (See [Token Manager spec](./token-manager)).

- `Vault`: Una referencia a un `vault` también se requiere en la inicialización. Sin embargo, no hay interacción directa con el vault, solo se usa como la dirección donde se depositan los ingresos de la venta (vanilla ERC20 transfers).

Ambos parámetros no son modificables después de la inicialización.

### Definiciones

- **Inverse pricing**: Dado que no existe soporte nativo para los números de coma flotante en Solidity, tenemos que introducir el concepto de fijación de precios inversa para permitir precios inferiores a 1. Los débitos simbólicos deben tenerse en cuenta al establecer los precios.
	- cuando inverse pricing es `false` en una venta, el precio significa cuántos tokens de entrada se deben pagar por cada token que se compra. Eso significa que la cantidad de tokens comprados se calcula como`boughtTokens = payedTokens / price`.
	- cuando inverse pricing es `true`, precio significa cuántos tokens comprados se adquieren por token de entrada. `boughtTokens = payedTokens * price`

- **Price periods**:
	- Una venta pasará por uno o múltiples períodos durante su ciclo de vida.
	- Los períodos determinan cuál es el precio en un momento dado durante la venta.
	- Un período comienza en la misma marca de tiempo cuando finalizó el período anterior (o en el caso del primero, cuando comienza la venta).
	- Un período tiene un precio inicial y final. Si no son lo mismo, el precio de una marca de tiempo determinada se interpola linealmente en función del tiempo.
	- Las ventas pueden tener hasta 50 períodos.

![](../../../dev/apps/rsc/fundraising_periods.png)

- **Caps**: De manera predeterminada, todas las ventas tienen un tope en dos aspectos, la apertura de uncamping se puede hacer estableciéndola en un número muy grande. Establecer una o ambas tapas para UINT256_MAX debe ser interpretado por el cliente como deshabilitado en ese aspecto.
	- **Max raised**: Cantidad máxima del token que se sube que acepta una venta.
	- **Max sold**: Cantidad máxima de tokens que puede vender una venta (tokens máximos acuñados).

###Ciclo de vida de venta

#### Creación
```
fundraising.newSale(...)
```
Todos los parámetros de venta se configuran en la inicialización y no se pueden cambiar. Después de que se ha creado una venta, existe la opción de forzar el cierre de la venta (requiere permisos).

Sale parameters:

- Investor: Dirección de la entidad autorizada para comprar en la venta. Si la dirección proporcionada es la 0th address (`0x0000...`), entonces la venta se considera pública y cualquier dirección puede comprar.
- Raised token: Dirección del token utilizado para comprar en la venta.
- Maximum raised: Como se explica en la sección de mayúsculas.
- Maximum sold: Como se explica en la sección de mayúsculas.
- Minimum buy: Cantidad mínima de token elevado para una compra válida.
- Is inverse price: Si los precios de venta se expresan como inversos o no (como se explicó anteriormente).
- Sale start time: Marca de tiempo para el inicio del primer período.
- Period ends array: Matriz de marcas de tiempo cuando finaliza cada período (Mínimo 1).
- Prices array: Matriz de precios por períodos. Aunque cada período tiene dos valores, es una matriz unidimensional. Ejemplo: `[2, 3, 3, 5]` medio Period 1(`initial price` = 2, `final price` = 3) and Period 2 (`initial price` = 3, `final price` = 5)

#### Comprar

En cada compra, el contrato calculará el precio de la marca de tiempo actual en función de los períodos de venta.

- Si una compra determinada da como resultado el tope de la venta (ya sea maxRaised o maxSold), el contrato reembolsará al comprador la cantidad aportada sobre el límite y la venta se cerrará.

- Después de cada compra individual, todos los fondos se envían a la bóveda. El contrato de recaudación de fondos nunca debe tener fondos entre compras.

##### Compre puntos de entrada

Se permiten dos métodos para comprar en ventas:

###### ERC20
```
fundraising.transferAndBuy(uint256 saleId, uint256 payedTokens)
```

Requiere que el remitente ya haya creado una asignación ERC20 igual o superior a `payedTokens` (en realidad podría ser menor en el escenario, algunos tokens no están permitidos por razones de tope).

###### ERC677
```
fundraising.buyTokens(uint256 saleId) // called by token
```
Requiere que el remitente haga una `transferAndCall()` como en el [ERC677 standard](https://github.com/ethereum/EIPs/issues/677) (aún evolucionando y discutiéndose), configurando el fundraising app como receptor y agregando la carga de datos correcta.

Levantamiento ether se puede hacer al configurar el token elevado a un EtherToken ( idealmente el utilizado por el [Finance app](./finance) para la detectabilidad). Dado que aragon-core's EtherToken la implementación se ajusta a ERC677, comprando con ether se puede hacer envolviendo el ether utilizando `etherToken.wrap()` 
y luego haciendo un `transferAndCall(...)` o usando el atajo `wrapAndCall(...)` que realiza ambas acciones.

Tenga en cuenta que esta sección está sujeta a cambios ya que el [ERC677 discusión](https://github.com/ethereum/EIPs/issues/677) evoluciona.

#### Venta de cierre
```
fundraising.closeSale(uint256 _saleId)
```

La venta se cierra automáticamente cuando se alcanza un límite o cuando finaliza el último período de la venta.

Intentar comprar en una venta cerrada fracasará.


### Limitaciones

- No existe un concepto de venta no exitosa por falta de fondos, por lo tanto no hay reembolsos.
- En ventas privadas, solo un inversor puede comprar. Las ventas en la lista blanca no son compatibles.
