const fs = require('fs')
const CDP = require('chrome-remote-interface')
const argv = require('minimist')(process.argv.slice(2))

const url = argv.url
const filename = argv.output

CDP(async (client) => {
	const { Page, Emulation } = client
	try {

		await Page.enable()

		const deviceMetrics = {
			width: 1200,
			height: 630,
			deviceScaleFactor: 0,
			mobile: false,
			fitWindow: false
		}
		await Emulation.setDeviceMetricsOverride(deviceMetrics)
		await Emulation.setVisibleSize({ width: 1200, height: 630 })
		await Page.navigate({ url })
		await Page.loadEventFired()
		const { data } = await Page.captureScreenshot()
		fs.writeFileSync(filename, Buffer.from(data, 'base64'))

	} catch (err) {
		console.error(err)
	}
	await client.close()
}).on('error', (err) => {
	console.error(err)
})
