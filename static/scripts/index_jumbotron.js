(function () {
'use strict';

var needToLoad = ['1', '2', '3'].map(function (name) {
	return '/images/jumbotron/' + name + '.jpg';
});

var loaded = [];
var intervalWait = 10000;

var el = document.getElementById('images-target');

function selectRandomFromArray(arr) {
	return arr[Math.floor(Math.random() * (arr.length - 1 - 0 + 1)) + 0];
}

function setImageOnEl(relPath) {
	el.style.backgroundImage = 'url("' + relPath + '")';
}

function popUnloadedImg() {
	return needToLoad.pop();
}

function pushLoadedImg(relPath) {
	loaded.push(relPath);
}

function preloadAnImg() {
	var relPath = popUnloadedImg();
	if (!relPath) {
		return;
	}
	var imgEl = document.createElement('img');
	imgEl.setAttribute('style', 'display: none');
	imgEl.onload = pushLoadedImg.bind(null, relPath);
	imgEl.src = relPath;
	document.body.appendChild(imgEl);
}

function changeImg() {
	var relPath = selectRandomFromArray(loaded);
	setImageOnEl(relPath);
}

var initialImg = popUnloadedImg();
setImageOnEl(initialImg);
pushLoadedImg(initialImg);

var len = needToLoad.length;
for (var i = 0; i < len; i++) {
	preloadAnImg();
}

var intervalFunc = window.setInterval(changeImg, intervalWait);

window.needToLoad = needToLoad;

}());
