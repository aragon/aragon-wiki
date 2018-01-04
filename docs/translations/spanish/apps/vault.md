Test
# [Vault](https://github.com/aragon/aragon-apps/tree/master/apps/vault)

_**Code in Github:**_ [aragon-apps/apps/vault](https://github.com/aragon/aragon-apps/tree/master/apps/vault)

Vaults poseer y administrar los activos ERC20 que tiene el DAO.

La razón de diseño para tener Vaults:

- Permitir la instalación de aplicaciones de terceros que pueden gastar desde el mismo grupo de activos que otrasaplicaciones.
- Poder revocar los permisos de gasto a las aplicaciones sin tener que mover activos.

La concesión de permisos para ejecutar funciones en la Bóveda debe hacerse con extremo cuidado (puede causar una fuga irreversible de fondos) e idealmente solo otros contratos inteligentes confiables (e.g. Finance app) debería tener acceso a ella.

### Funciones

#### Solicitud de asignación
```
vault.requestAllowance(ERC20 token, uint256 amount)
```

Otorga al emisor de la llamada la capacidad de gastar `amount` tokens fuera de la Vault's `token` equilibrar cada vez que el emisor decide. Bajo el capó, realiza una aprobación de ERC20 en el token.

Esto es útil porque una entidad puede solicitar una asignación una vez desde la Vault y luego gastarlo en pedazos (mediante la ejecución de múltiples `transferFrom`)

Sin embargo, permitir que una entidad use esta función podría ser peligroso ya que una vez que una entidad ha solicitado una concesión, la tendrá perpetuamente (hasta que la gaste o solicite una tolerancia de 0 tokens) incluso si los permisos son revocados a la entidad.

#### Transferir tokens
```
vault.transferTokens(ERC20 token, address receiver, uint256 amount)
```

Realiza una transferencia directa de ERC20 `token`, enviando el especificado `amount` to `receiver`
