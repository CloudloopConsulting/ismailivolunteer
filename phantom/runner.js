const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const exec = require('child_process').exec

const HTTP_ROOT = 'http://localhost:1313/listings'
const ROOT = path.join(__dirname, '..')
const SRC_DIR = path.join(ROOT, 'content', 'phantom')
const IMG_DIR = path.join(ROOT, 'images', 'social')
const IMG_EXT = 'png'

// path.parse().name

function getURL(name) {
	return path.join(HTTP_ROOT, name)
}

function getImageFile(name) {
	return `${path.join(IMG_DIR, name)}.${IMG_EXT}`
}

async function saveFile(file) {
	const name = path.parse(file).name
	return new Promise((resolve, reject) => {
		exec(`node phantom/chrome.js --url ${getURL(name)} --filename ${getImageFile(name)}`, { cwd: ROOT }, (err, stdout, stderr) => {
			if (err) {
				console.log(stdout)
				console.log(stderr)
				reject()
			}
			resolve()
		})
	})
}

async function getFiles(dir) {
	return fs.readdirAsync(dir)
}

getFiles(SRC_DIR)
	.then(data => Promise.all(data.map(saveFile)))
	.then(() => console.log('DONE'))
