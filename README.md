# ODT Templater

[![Greenkeeper badge](https://badges.greenkeeper.io/saibotsivad/odt-templater.svg)](https://greenkeeper.io/)

Markdown to physical paper.

Write your documents in markdown, output them as templateable ODT files.

(Typical flow: Markdown -> ODT -> PDF)

## Overview

Suppose you write a long book type thing, but then you want to
print it. Web typography is much different than paper typography,
and publishers/printers usually want PDF files, so you'll need
to generate an output file based on the markdown you wrote.

This module generates an ODT file from markdown. ODT files have
the normal typography styles that are used to make great prints.

You can generate an ODT style template using some other application
like LibreOffice. Inside LibreOffice you would set template styles
like header styles, page margins, etc. That file would be used as
a reference file for your generated file.

## ODT Files

ODT files are actually just compressed ZIP files, filled with a
handful of XML files. Here's a typical file structure inside
an ODT file:

* `META-INF/manifest.xml` : Contains a list of all the files packaged
	into the ODT file. This file is required for most ODT file readers.
* `Thumbnails/thumbnail.png` : Optional picture file, used by some
	operating systems as a preview of the document.
* `settings.xml` : Overall document settings and styles, such as page
	margins, justification rules, bullet numbering schemes, etc. This
	file is required for most ODT file reader applications.
* `styles.xml` : Particular style settings, such as header styles, list
	and paragraph indentation styles, etc. This file is required for
	most ODT file reader applications.
* `content.xml` : Contains the actual document content. This file is
	required for most ODT file reader applications

## Utilities

This module has several utilities:

### `package-odt.js`

Given a folder containing an unpackaged ODT file, this will repackage
the folder content into a valid ODT file.

Example:

```js
var package = require('odt-templater/package-odt.js')
package({
	outputFile: 'output.odt',
	inputFolder: 'resources/minimal-odt'
}, function() {
	console.log('done packaging')
})
```

### `template-odt.js`

Given a folder containing an unpackaged ODT file, the `content.xml`
file will be treated as a [mustache](http://mustache.github.io)
template.

The folder contents will be repackaged into a valid ODT file, using
the rendered `content.xml`. (The original `content.xml` file is
left unchanged.)

Example:

```js
var templater = require('odt-templater/template-odt.js')
templater({
	outputFile: 'output.odt',
	inputFolder: 'resources/minimal-odt',
	data: {
		user: {
			firstName: 'John'
		}
	}
}, function() {
	console.log('done templating')
})
```

### `unpackage-odt.js`

Given an ODT file, it will be unpacked into the given folder,
attempting to create that folder if it doesn't exist.

Example:

```js
var unpackage = require('odt-templater/unpackage-odt.js')
unpackage({
	inputFile: 'resources/example/file.odt',
	outputFolder: 'resources/example/file'
}, function() {
	console.log('done unpackaging')
})
```

## Process Flow

The technical flow imagined is as follows:

1. Make an ODT file and modify the styles as desired. This
	will be your template.
2. Extract the ODT file contents into a folder and modify
	the `content.xml` to contain mustache properties.
3. Write a book in markdown, with [frontmatter](https://jekyllrb.com/docs/frontmatter/)
	metadata at the start.
4. Use a tool like [pandoc](http://pandoc.org/) to convert
	your markdown to an ODT file.
5. Extract the `content.xml` file from the markdown ODT.
6. Repackage a new ODT file using the template and the extracted
	`content.xml`, as well as the frontmatter metadata, to
	create the final styled ODT file.

## TODO

* Although pandoc is absolutely amazing, I'd like a tool
	that does the markdown->ODT process in JS, so that a
	user doesn't need to install pandoc.
* It would be super neat to make a mapping of the `styles.xml`
	and `settings.xml` possible properties (from the ODT
	specs) and make a more human-readable object. E.g. the
	`styles.xml` has `font-face-decls` which I think means
	"font face declerations"? Maybe just linking to a resource
	that lists all the properties available would be fine.

## License

Published under the [Very Open License](http://veryopenlicense.com/).

<3
