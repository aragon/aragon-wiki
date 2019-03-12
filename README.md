# [wiki.aragon.org](https://wiki.aragon.org/) <img align="right" src="https://github.com/aragon/design/blob/master/readme-logo.png" height="80px" />

## This wiki for the Aragon Project contains much of the content and resources available publicly

If you feel like contributing to the wiki, like changing or adding things, feel free to check out the [open Issues](https://github.com/aragon/aragon-wiki/issues) and submit a [Pull Request](https://github.com/aragon/aragon-wiki/pulls).

## Current versions used:
[Python 3.7.2] (https://www.python.org/downloads/)

[MKDocs version 1.0.0](http://www.mkdocs.org/about/release-notes/)

[Material for MkDocs version 4.0.0](https://squidfunk.github.io/mkdocs-material/release-notes/)

### To upgrade from previous versions:
`pip install --upgrade mkdocs`

`pip install --upgrade mkdocs-material`

## How do I run a local version of the wiki for editing?

- Install [MkDocs](http://www.mkdocs.org/)
  - Install mkdocs-material using Python, `pip install mkdocs-material`
- Clone the repo with `git clone https://github.com/aragon/aragon-wiki.git`
- In the `aragon-wiki` directory, run `mkdocs serve`
- Open [http://localhost:8000/](http://localhost:8000/) in your browser

## Guide for submitting a [new Pull Request](https://github.com/aragon/aragon-wiki/pulls)

- Check the [**Issues**](https://github.com/aragon/aragon-wiki/issues) for existing improvements that are needed
- If you don’t find anything close to what you’re working on, [**submit a new Issue**](https://github.com/aragon/aragon-wiki/issues/new) of what you would like to see changed in the wiki

Follow these steps:

- Fork the [Aragon Wiki GitHub repository](https://github.com/aragon/aragon-wiki)
- **Create a Pull Request** with your proposed changes to have your contribtuion merged into the Wiki repository.

## To deploy changes in the wiki to web:

Follow the instructions for running a local version and then in the `aragon-wiki` directory, run `mkdocs gh-deploy`
