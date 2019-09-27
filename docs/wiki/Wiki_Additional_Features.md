# Aragon Project Wiki Additional Features

## Feature blocks

Feature blocks follow a simple syntax: every block is started with `!!!`,
followed by a single keyword which is used as the type qualifier of the
block. The content of the block then follows on the next line, indented by
four spaces.

Example:

``` markdown
!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

Result:

!!! note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

### Types

#### Note

Example:

``` markdown
!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Abstract

Example:

``` markdown
!!! abstract / summary / tldr
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! abstract

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Info

Example:

``` markdown
!!! info / todo
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! info

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Tip

Example:

``` markdown
!!! tip / hint
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! tip

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Success

Example:

``` markdown
!!! success / check / done
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! success

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Question

Example:

``` markdown
!!! question / help / faq
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! question

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Warning

Example:

``` markdown
!!! warning / caution / attention
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! warning

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Failure

Example:

``` markdown
!!! failure / fail / missing
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! failure

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Danger

Example:

``` markdown
!!! danger / error
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! danger

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Bug

Example:

``` markdown
!!! bug
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! bug

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Example

Example:

``` markdown
!!! example / snippet
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! example

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Quote

Example:

``` markdown
!!! quote / cite
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! quote

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Changing the title

By default, the block title will equal the type qualifier in titlecase. However,
it can easily be changed by adding a quoted string after the type qualifier.

Example:

``` markdown
!!! note "Phasellus posuere in sem ut cursus"
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! note "Phasellus posuere in sem ut cursus"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Removing the title

Similar to setting a custom title, the icon and title can be omitted by
providing an empty string after the type qualifier:

Example:

``` markdown
!!! note ""
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

!!! note ""

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Embedded code blocks

Example:

!!! note

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

    ``` javascript
    import Messenger, { providers } from '@aragon/messenger'
    import { defer } from 'rxjs/observable/defer'
    import { empty } from 'rxjs/observable/empty'
    import { fromPromise } from 'rxjs/observable/fromPromise'
    import { merge } from 'rxjs/observable/merge'

    export const AppProxyHandler = {
      get (target, name, receiver) {
        if (name in target) {
          return target[name]
        }

        return function (...params) {
          return target.rpc.sendAndObserveResponse(
            'intent',
            [name, ...params]
          ).pluck('result')
        }
      }
    }
    ```

    Nunc eu odio eleifend, blandit leo a, volutpat sapien. Phasellus posuere in
    sem ut cursus. Nullam sit amet tincidunt ipsum, sit amet elementum turpis.
    Etiam ipsum quam, mattis in purus vitae, lacinia fermentum enim.

## Footnotes

### Usage

The markup for footnotes is similar to the standard Markdown markup for links.
A reference is inserted in the text, which can then be defined at any point in
the document.

#### Inserting the reference

The footnote reference is enclosed in square brackets and starts with a caret,
followed by an arbitrary label which may contain numeric identifiers [1, 2, 3,
...] or names [Granovetter et al. 1998]. The rendered references are always
consecutive superscripted numbers.

Example:

``` markdown
Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]
```

Result:

Lorem ipsum[^1] dolor sit amet, consectetur adipiscing elit.[^2]

#### Inserting the content

The footnote content is also declared with a label, which must match the label
used for the footnote reference. It can be inserted at an arbitrary position in
the document and is always rendered at the bottom of the page. Furthermore, a
backlink is automatically added to the footnote reference.

##### on a single line

Short statements can be written on the same line.

Example:

``` markdown
[^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Result:

> <a href="#fn:1">Jump to footnote at the bottom of the page</a>

  [^1]: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

##### on multiple lines

Paragraphs should be written on the next line. As with all Markdown blocks, the
content must be indented by four spaces.

Example:

``` markdown
[^2]:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.
```

Result:

  [^2]:
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
      nulla. Curabitur feugiat, tortor non consequat finibus, justo purus
      auctor massa, nec semper lorem quam in massa.

> <a href="#fn:2">Jump to footnote at the bottom of the page</a>

!!! quote ""
    ## Equations

    ### Blocks

    Blocks are enclosed in `$$...$$` which are placed on separate lines.

    ``` tex
    $$
    \frac{n!}{k!(n-k)!} = \binom{n}{k}
    $$
    ```

    !!! success "Result"

        $$
        \frac{n!}{k!(n-k)!} = \binom{n}{k}
        $$

    ###  Inline

    Inline equations need to be enclosed in `:::tex $...$`:

    ``` tex
    Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$
    ```

    !!! success "Result"

        Lorem ipsum dolor sit amet: $p(x|y) = \frac{p(y|x)p(x)}{p(y)}$

!!! quote ""
    ## Tasklists

    Tasklists are useful for keeping track of tasks and showing what has been done and has yet to be done. Checkbox lists are like regular lists, but prefixed with `[ ]` for empty or `[x]` for filled checkboxes.

    Example:

    ``` markdown
    - [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
    - [x] Nulla lobortis egestas semper
    - [ ] Vestibulum convallis sit amet nisi a tincidunt
        - [x] In hac habitasse platea dictumst
        - [x] In scelerisque nibh non dolor mollis congue sed et metus
        - [ ] Praesent sed risus massa
    - [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
    - [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi
    ```

    Result:

    - [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
    - [x] Nulla lobortis egestas semper
    - [ ] Vestibulum convallis sit amet nisi a tincidunt
        - [x] In hac habitasse platea dictumst
        - [x] In scelerisque nibh non dolor mollis congue sed et metus
        - [ ] Praesent sed risus massa
    - [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque
    - [ ] Nulla vel eros venenatis, imperdiet enim id, faucibus nisi

!!! quote ""
    ## Code Highlighting

    Using Markdown syntaxes, code blocks can be opened and closed by writing three backticks on separate lines. To add code highlighting to those blocks, the easiest way is to specify the language directly after the opening block.

    Examples:

    ```` markdown
    ``` python
    import tensorflow as tf
    ```
    ````

    ````
    ``` javascript
    import Messenger, { providers } from '@aragon/messenger'
    import { defer } from 'rxjs/observable/defer'
    import { empty } from 'rxjs/observable/empty'
    import { fromPromise } from 'rxjs/observable/fromPromise'
    import { merge } from 'rxjs/observable/merge'

    export const AppProxyHandler = {
      get (target, name, receiver) {
        if (name in target) {
          return target[name]
        }

        return function (...params) {
          return target.rpc.sendAndObserveResponse(
            'intent',
            [name, ...params]
          ).pluck('result')
        }
      }
    }
    ```
    ````

    Results:

    ``` python
    import tensorflow as tf
    ```

    ``` javascript
    import Messenger, { providers } from '@aragon/messenger'
    import { defer } from 'rxjs/observable/defer'
    import { empty } from 'rxjs/observable/empty'
    import { fromPromise } from 'rxjs/observable/fromPromise'
    import { merge } from 'rxjs/observable/merge'

    export const AppProxyHandler = {
      get (target, name, receiver) {
        if (name in target) {
          return target[name]
        }

        return function (...params) {
          return target.rpc.sendAndObserveResponse(
            'intent',
            [name, ...params]
          ).pluck('result')
        }
      }
    }
    ```

    ### Supported languages

    The Code Highlighting uses [Pygments](http://pygments.org/), a generic syntax highlighter.

    It supports over [300 languages](http://pygments.org/languages).

    ### Grouping code blocks

    You can use grouping for code blocks with tabs.

    Example:

    ````
    ``` bash tab="Bash"
    #!/bin/bash

    echo "Hello world!"
    ```

    ``` c tab="C"
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
    }
    ```

    ``` c++ tab="C++"
    #include <iostream>

    int main() {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```
    ````

    Result:

    ``` bash tab="Bash"
    #!/bin/bash

    echo "Hello world!"
    ```

    ``` c tab="C"
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
    }
    ```

    ``` c++ tab="C++"
    #include <iostream>

    int main() {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

    ### Highlighting specific lines

    Specific lines can be highlighted by passing the line numbers to the `hl_lines`
    argument placed right after the language identifier. Line counts start at 1.

    Example:

    ```` markdown
    ``` python hl_lines="3 4"
    """ Bubble sort """
    def bubble_sort(items):
        for i in range(len(items)):
            for j in range(len(items) - 1 - i):
                if items[j] > items[j + 1]:
                    items[j], items[j + 1] = items[j + 1], items[j]
    ```
    ````

    Result:

        #!python hl_lines="3 4"
        """ Bubble sort """
        def bubble_sort(items):
            for i in range(len(items)):
                for j in range(len(items) - 1 - i):
                    if items[j] > items[j + 1]:
                        items[j], items[j + 1] = items[j + 1], items[j]
