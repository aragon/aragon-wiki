# [wiki.aragon.one](https://wiki.aragon.one/)

## This wiki for the Aragon Project contains much of the content and resources available publicly.

If you feel like contributing to the wiki, like changing or adding things, feel free to submit a [Pull Request](https://github.com/aragon/aragon-wiki/pulls).

## Current versions used:
[MKDocs version 0.17.3](http://www.mkdocs.org/about/release-notes/)

[Material for MkDocs version 2.7.3](https://squidfunk.github.io/mkdocs-material/release-notes/)

### To upgrade from previous versions:
`pip install --upgrade mkdocs`

`pip install --upgrade mkdocs-material`

## How do I run a local version of the wiki for editing?

- Install [MkDocs](http://www.mkdocs.org/)
  - Install mkdocs-material using Python, `pip install mkdocs-material`
- Clone the repo with `git clone {repo_url} --recursive`
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
