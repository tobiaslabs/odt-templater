var Mustache = require('mustache')
var yazl = require('yazl')
var glob = require('glob')
var fs = require('fs')
var path = require('path')
var Promise = require('promise')

module.exports = function(options, cb) {
	var zipfile = new yazl.ZipFile()

	zipfile.outputStream.pipe(fs.createWriteStream(options.outputFile)).on('close', () => {
		console.log('done writing:', options.outputFile)
		cb()
	})

	new Promise(resolve => {
		glob('**/*.*', {
			cwd: options.inputFolder,
			ignore: 'content.xml'
		}, (err, files) => {
			files.forEach(file => {
				console.log('writing:', file)
				zipfile.addFile(path.join(options.inputFolder, file), file)
			})
			resolve()
		})
	})
	.then(() => {
		var context = 
		fs.readFile(path.join(options.inputFolder, 'content.xml'),
			{ encoding: 'utf8' },
			(err, file) => {
				var output = Mustache.render(file, options.data)
				zipfile.addBuffer(new Buffer(output, 'utf8'), 'content.xml')
				zipfile.end()
			})
	})
}
