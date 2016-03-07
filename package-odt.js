var yazl = require('yazl')
var glob = require('glob')
var fs = require('fs')
var path = require('path')

module.exports = function(options, cb) {
	var zipfile = new yazl.ZipFile()

	zipfile.outputStream.pipe(fs.createWriteStream(options.outputFile)).on('close', () => {
		console.log('done writing:', options.outputFile)
		cb()
	})

	glob('**/*.*', {
		cwd: options.inputFolder
	}, (err, files) => {
		files.forEach(file => {
			console.log('writing:', file)
			zipfile.addFile(path.join(options.inputFolder, file), file)
		})
		zipfile.end()
	})
}