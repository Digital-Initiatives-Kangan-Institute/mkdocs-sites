# Authoring Pages

This site is part of a collection of `mkdocs` sites built with `material` for `mkdocs`.
Each page is built using `markdown` and is empowered using `material` for `mkdocs`.

Before creating any pages it's important to know how to utilise the extra features provided by `material`.

## Managing Sites

Use the `serve` and `create` bash scripts to manage sites in this repository.

- **`serve`** — Lists all available sites and starts a local preview server for the one you choose.
- **`create`** — A site creation wizard that sets up the basic structure for a new site.

## Creating a New Page

All pages must be created inside the `docs` folder of this site.

1. Create a markdown file inside the `docs` folder. Folders and file names act as route names.
2. Open `mkdocs.yml` and add a new entry to the `nav` section, with the path to the new file as its value.
3. Stage, commit, and push your changes to GitHub.

## Markdown Support
Read the `GUIDE.md` guide in the repository for extended Markdown rules.