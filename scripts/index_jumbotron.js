const needToLoad = [
	'5',
].map(name => `/images/jumbotron/${name}.jpg`)

const loaded = []
const intervalWait = 10000

const el = document.getElementById('images-target')

function selectRandomFromArray(arr) {
	return arr[Math.floor(Math.random() * ((arr.length - 1) - 0 + 1)) + 0]
}

function setImageOnEl(relPath) {
	el.style.backgroundImage = `url("${relPath}")`
}

function popUnloadedImg() {
	return needToLoad.pop()
}

function pushLoadedImg(relPath) {
	loaded.push(relPath)
}

function preloadAnImg() {
	const relPath = popUnloadedImg()
	if (!relPath) {
		return
	}
	const imgEl = document.createElement('img')
	imgEl.setAttribute('style', 'display: none')
	imgEl.onload = pushLoadedImg.bind(null, relPath)
	imgEl.src = relPath
	document.body.appendChild(imgEl)
}

function changeImg() {
	const relPath = selectRandomFromArray(loaded)
	setImageOnEl(relPath)
}

// const initialImg = popUnloadedImg()
// setImageOnEl(initialImg)
// pushLoadedImg(initialImg)
//
// const len = needToLoad.length
// for (let i = 0; i < len; i++) {
// 	preloadAnImg()
// }
//
// const intervalFunc = window.setInterval(changeImg, intervalWait)
//
// window.needToLoad = needToLoad
