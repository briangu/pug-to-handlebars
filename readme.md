# pug-to-handlebars

Convert pug templates to their corresponding handlebars version.

## Install

```shell
npm install -g pug-to-handlebars
```

## Usage

```
Usage: pug-to-handlebars [path...]

Options:
  -h, --help               output usage information
  -V, --version            output the version number
  -o, --out <destination>  destination folder (defaults to current directory)
```

`*.pug` files specified at path argument will be transformed to `*.hbs` files.

## Examples
Transform all `*.pug` files in current directory to `*.hbs` files at the same directory.
```
$ pug-to-handlebars
```
---
Transform all `*.pug` files in current directory to `*.hbs` files at directory `./hbs-templates`.
```
$ pug-to-handlebars -o ./hbs-templates
```
---
Transform `./pug-templates/index.pug` file to `*.hbs` file at directory `./hbs-templates`.
```
$ pug-to-handlebars -o ./hbs-templates ./pug-templates/index.pug
```
---
Transform all `*.pug` files of `./pug-templates` directory to `*.hbs` files at the same directory.
```
$ pug-to-handlebars ./pug-templates
```
---
Transform multiple `*.pug` files to `*.hbs` files at directory `./hbs-templates`.
```
$ pug-to-handlebars -o ./hbs-templates ./pug-templates ./other/about.pug ./another/some-file.pug
```
---
For features that can't be translated from pug to handlebars a comment will be inserted, for example `<!-- TODO: Fix unsupported pug mixin -->`.
