# [wiki.aragon.one](https://wiki.aragon.one/)

## This wiki for the Aragon Project contains much of the content and resources available publicly.

If you feel like contributing to the wiki, like changing or adding things, feel free to submit a [Pull Request](https://github.com/aragon/aragon-wiki/pulls).

## Current versions used:
[MKDocs version 0.17.3](http://www.mkdocs.org/about/release-notes/)

[Material for MkDocs version 2.7.3](https://squidfunk.github.io/mkdocs-material/release-notes/)

### To upgrade from previous versions:
`pip install --upgrade mkdocs`

`pip install --upgrade mkdocs-material`

## To deploy changes in the wiki to web:

- Install [MkDocs](http://www.mkdocs.org/)
- `pip install mkdocs-material`
- Clone repo with `git clone {repo_url} --recursive`
- Push changes to `master` branch
- In the `aragon-wiki` directory, run `mkdocs gh-deploy`
