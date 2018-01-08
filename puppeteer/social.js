const { readdirSync } = require('fs')
const { parse, join } = require('path')
const { spawn } = require('child_process')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const del = require('del')

const serverPort = 5555
const server = spawn('hugo', ['serve', '-p', serverPort])

const sourceDir = './content/__social'
const serverURL = (title) => `http://localhost:${serverPort}/__social/${title}`
const outDir = './images/social'
const outPath = (title) => join(outDir, `${title}.png`)

function getTitles(dir) {
	return readdirSync(dir)
		.map(file => parse(file).name)
}

function prepareDir(dir) {
	del.sync(dir)
	mkdirp.sync(dir)
}

async function saveImages(allTitles) {
	const browser = await puppeteer.launch()
	const allShots = allTitles.map(async title => {
		const page = await browser.newPage()
		const response = await page.goto(serverURL(title), {
			waitUntil: 'networkidle0'
		})
		if (Math.floor(response.status / 100) === 2) {
			await page.screenshot({
				path: outPath(title),
				fullPage: true,
				omitBackground: true
			})
		}
	})
	await Promise.all(allShots)
	await browser.close()
}

prepareDir(outDir)
const titles = getTitles(sourceDir)
saveImages(titles).then(() => server.kill())
