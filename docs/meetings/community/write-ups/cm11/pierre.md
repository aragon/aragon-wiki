## Aragon Community Meeting 11 Write-Up for April 2018

### Pierre - UI & Interaction Developer

#### [Aragon](https://github.com/aragon/aragon) / [Aragon Apps](https://github.com/aragon/aragon-apps)

- Application state refactoring to improve the addition of new features (in progress).
- Reimplement a solution to provide URL parameters to Aragon apps (in progress).
- Started the implementation of the new Survey app.

#### [Aragon UI](https://github.com/aragon/aragon-ui)

- Move to styled-components `^3.0.0` and React `^16.3.1`.
- Move out the website-specific components in their own toolkit: [Aragon Web](https://github.com/aragon/aragon-web).
- Refactor the components providing services to make use of the new React Context API.
- UX Proposal for a standard [Identity component](https://github.com/aragon/aragon-ui/issues/156#issuecomment-385998267).

### Next

#### [Aragon](https://github.com/aragon/aragon) / [Aragon Apps](https://github.com/aragon/aragon-apps)

- Enable the notifications panel again and start implementing notifications in apps.
- Finish implementing the new Survey app.
- Implement the UI of the new Permissions app.
- Implement the Aragon ID app.
- Provide better error states.

#### [Aragon UI](https://github.com/aragon/aragon-ui)

- Move the layout we are using in apps into a component (or a set of components).
- Implement a focus state accross components.
- Implement the address viewer (identity) component.
- Implement the address autocomplete component.
- Remove references to [flow](http://flow.org/) (moving to [prop-types](https://github.com/facebook/prop-types) instead).
