/* eslint-env phantomjs */

const webpage = require('webpage')
const system = require('system')

if (system.args.length < 2 || system.args.length > 3) {
	console.log('Usage: phantom.js URL filename')
	phantom.exit(1)
} else {
	console.log('Capturing page')

	const page = webpage.create()
	const url = system.args[1]
	const filename = system.args[2]

	page.viewportSize = {
		width: 1200,
		height: 630
	}

	page.settings.userAgent = 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17'

	page.customHeaders = {
		Referer: url
	}

	page.open(url, function (status) {
		if (status !== 'success') {
			console.log('Unable to open URL')
			phantom.exit(1)
		} else {
			console.log('Opened URL')
			window.setTimeout(function () {
				console.log('Saving image')
				page.render(filename)
				phantom.exit(0)
			}, 4000)
		}
	})
}
