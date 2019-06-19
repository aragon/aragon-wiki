# Aragon Project Wiki Basic Features

!!! quote ""
    ## Bold

    For **bold text**, the text is enclosed in two asterisks `**...**`.

    ```
    **Lorem ipsum dolor sit amet**, consectetur adipiscing elit.
    ```

    !!! success "Result"

        **Lorem ipsum dolor sit amet**, consectetur adipiscing elit.

!!! quote ""
    ## Italic

    For _italic text_, the text is enclosed in underlines `_..._`.

    ```
    _Lorem ipsum dolor sit amet_, consectetur adipiscing elit.
    ```

    !!! success "Result"

        _Lorem ipsum dolor sit amet_, consectetur adipiscing elit.

!!! quote ""
    ## Underlined

    For ^^underlined text^^, the text is enclosed in two carets `^^...^^`.

    ```
    ^^Lorem ipsum dolor sit amet^^, consectetur adipiscing elit.
    ```

    !!! success "Result"

        ^^Lorem ipsum dolor sit amet^^, consectetur adipiscing elit.

!!! quote ""
    ## Strikethtough

    For ~~strikethtough text~~ the text is enclosed in two tildes `~~...~~`.

    ```
    ~~Lorem ipsum dolor sit amet~~, consectetur adipiscing elit.
    ```

    !!! success "Result"

        ~~Lorem ipsum dolor sit amet~~, consectetur adipiscing elit.

!!! quote ""
    ## Headings

    Headings use the `# hash` sign

    One `# hash` sets the page title

    The 2nd level heading, `##` is the first level of heading in the body.

    !!! example "Example"
        ```
        ## Headings
        ### The 3rd level
        #### The 4th level
        ##### The 5th level
        ###### The 6th level
        ```

        ### The 3rd level

        #### The 4th level

        ##### The 5th level

        ###### The 6th level

    ## Headings <small>with secondary text</small>

    !!! example "Example"
        ```
        ## Headings <small>with secondary text</small>
        ### The 3rd level <small>with secondary text</small>
        #### The 4th level <small>with secondary text</small>
        ##### The 5th level <small>with secondary text</small>
        ###### The 6th level <small>with secondary text</small>
        ```

        ### The 3rd level <small>with secondary text</small>

        #### The 4th level <small>with secondary text</small>

        ##### The 5th level <small>with secondary text</small>

        ###### The 6th level <small>with secondary text</small>

!!! quote ""
    ## Blockquotes

    Use a single `>` in the beginning of the line/paragraph to enclose it in a blockquote

    ```
    > Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet rutrum.

    > Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet rutrum.
      Pellentesque aliquet quam enim, eu volutpat urna rutrum a. Nam vehicula nunc
      mauris, a ultricies libero efficitur sed.
    ```

    !!! success "Result"

        > Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet rutrum.

        > Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet rutrum.
          Pellentesque aliquet quam enim, eu volutpat urna rutrum a. Nam vehicula nunc
          mauris, a ultricies libero efficitur sed.

    ### Blockquote nesting

    Blockquotes can also be nested by using additional `> greater than` symbol.

    Example:
    ```
    > **Sed aliquet**, neque at rutrum mollis, neque nisi tincidunt nibh, vitae
      faucibus lacus nunc at lacus.

    > > Mauris dictum mi lacus, sit amet pellentesque urna vehicula fringilla.

    > > > `Suspendisse rutrum facilisis risus`, eu posuere neque commodo a.
    ```

    !!! success "Result"
        > **Sed aliquet**, neque at rutrum mollis, neque nisi tincidunt nibh, vitae
          faucibus lacus nunc at lacus.

        > > Mauris dictum mi lacus, sit amet pellentesque urna vehicula fringilla.

        > > > `Suspendisse rutrum facilisis risus`, eu posuere neque commodo a.

    ### Other content blocks

    > Vestibulum vitae orci quis ante viverra ultricies ut eget turpis.
    ``` js hl_lines="8"
      var _extends = function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            target[key] = source[key];
          }
        }
        return target;
      };
    ```

      > > Praesent at `:::js return target`, sodales nibh vel, tempor felis.

!!! quote ""
    ## Lists

    ### Unordered lists

    Unordered lists are created by simply using `- hyphen` for listing the items along with indentation.

    ```
    - Sed sagittis eleifend rutrum. Donec vitae suscipit est.

        - Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
        - Nam vulputate tincidunt fringilla.
            - Nullam dignissim ultrices urna non auctor.

    - Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex.

    - Nulla et rhoncus turpis. Mauris ultricies elementum leo.
    ```

    !!! success "Result"

        - Sed sagittis eleifend rutrum. Donec vitae suscipit est.

            - Duis mollis est eget nibh volutpat, fermentum aliquet dui mollis.
            - Nam vulputate tincidunt fringilla.
                - Nullam dignissim ultrices urna non auctor.

        - Aliquam metus eros, pretium sed nulla venenatis, faucibus auctor ex.

        - Nulla et rhoncus turpis. Mauris ultricies elementum leo.

    ### Ordered lists

    Ordered lists are created by using numbers following a dot, ie. `1.` for listing the items along with indentation.

    ``` markdown
    1. Integer vehicula feugiat magna, a mollis tellus.

    2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus.

        1. Vivamus venenatis porttitor tortor sit amet rutrum.

            1. Mauris dictum mi lacus
            2. Ut sit amet placerat ante

        2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
          rutrum.

        3. Pellentesque eget `:::js var _extends` ornare tellus, ut gravida mi.
        ``` js hl_lines="1"
        var _extends = function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              target[key] = source[key];
            }
          }
          return target;
        };
        ```

    3. Vivamus id mi enim. Integer id turpis sapien.
    ```

!!! success "Result"

    1. Integer vehicula feugiat magna, a mollis tellus.

    2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus.

        1. Vivamus venenatis porttitor tortor sit amet rutrum.

            1. Mauris dictum mi lacus
            2. Ut sit amet placerat ante

        2. Morbi eget dapibus felis. Vivamus venenatis porttitor tortor sit amet
          rutrum.

        3. Pellentesque eget `:::js var _extends` ornare tellus, ut gravida mi.
        ``` js hl_lines="1"
        var _extends = function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              target[key] = source[key];
            }
          }
          return target;
        };
        ```

    3. Vivamus id mi enim. Integer id turpis sapien.

!!! quote ""
    ## Code blocks

    ### Inline

    Morbi eget `dapibus felis`. Vivamus *`venenatis porttitor`* tortor sit amet
    rutrum.

    Nam vehicula nunc `:::js return target` mauris, a ultricies libero efficitur
    sed. Sed molestie imperdiet consectetur. Vivamus a pharetra leo. Pellentesque
    eget ornare tellus, ut gravida mi. Fusce vel lacinia lacus.

    ### Listing

    ``` js hl_lines="8"
        var _extends = function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              target[key] = source[key];
            }
          }
          return target;
        };
    ```

!!! quote ""
    ## Horizontal rules

    A horizontal rules/lines can be added by using three underlines `___`

    Example

    ```
    ___
    ```

    Result:

___

!!! quote ""
    ## Tables

    Example:
    ```
    | Sollicitudo / Pellentesi | consectetur | adipiscing | elit    | arcu | sed |
    | ------------------------ | ----------- | ---------- | ------- | ---- | --- |
    | Vivamus a pharetra       | yes         | yes        | yes     | yes  | yes |
    | Ornare viverra ex        | yes         | yes        | yes     | yes  | yes |
    | Mauris a ullamcorper     | yes         | yes        | partial | yes  | yes |
    | Nullam urna elit         | yes         | yes        | yes     | yes  | yes |
    | Malesuada eget finibus   | yes         | yes        | yes     | yes  | yes |
    ```

    Result:

    | Sollicitudo / Pellentesi | consectetur | adipiscing | elit    | arcu | sed |
    | ------------------------ | ----------- | ---------- | ------- | ---- | --- |
    | Vivamus a pharetra       | yes         | yes        | yes     | yes  | yes |
    | Ornare viverra ex        | yes         | yes        | yes     | yes  | yes |
    | Mauris a ullamcorper     | yes         | yes        | partial | yes  | yes |
    | Nullam urna elit         | yes         | yes        | yes     | yes  | yes |
    | Malesuada eget finibus   | yes         | yes        | yes     | yes  | yes |

    ### Aligning table contents

    Example:
    ```
    | Left       | Center   | Right   |
    | :--------- | :------: | ------: |
    | Lorem      | *dolor*  | `amet`  |
    | [ipsum](#) | **sit**  |         |
    ```

    Result:

    | Left       | Center   | Right   |
    | :--------- | :------: | ------: |
    | Lorem      | *dolor*  | `amet`  |
    | [ipsum](#) | **sit**  |         |

## Symbols

MarkDown | Symbol |
:--:|:--:|
`(tm)`|	™|
`(c)`|	©|
`(r)`|	®|
`c/o`|	℅|
`+/-`|	±|
`-->`|	→|
`<--`|	←|
`<-->`|	↔|
`=/=`|	≠|
`1/4, etc.`|	¼, etc.|
`1st 2nd etc.`|	1st 2nd etc.|
