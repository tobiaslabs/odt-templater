var fs = require('fs')
var unzip = require('unzip')

module.exports = function(options, cb) {
	var output = fs.createReadStream(options.inputFile)
	output.on('close', () => {
		console.log('done extracting: ' + options.inputFile + ' => ' + options.outputFolder)
		cb()
	})
	output.pipe(unzip.Extract({ path: options.outputFolder }))
}
