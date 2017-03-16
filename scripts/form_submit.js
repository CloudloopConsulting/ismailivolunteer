window.jQuery = require('jquery')
require('parsleyjs')

const $ = window.jQuery
const $form = $('form[data-form-marker]').eq(0)
const form = $form[0]
let parsedConfig

function formAction(config) {
	return 'https://formspree.io/' + config.to
}

function formMethod() {
	return 'POST'
}

function formCC(config) {
	return $('<input type="hidden" name="_cc" value="' + (config.cc || []).join(',') + '">')[0]
}

try {
	parsedConfig = JSON.parse(atob(window.__FORM_DATA__))
} catch (e) {
	throw new Error('could not decode formdata')
}

if (Object.keys(parsedConfig) === 0) {
	throw new Error('incomplete config')
}

if (!form) {
	throw new Error('cannot find form')
}

const instance = $form.parsley({
	errorClass: 'has-danger',
	successClass: 'has-success',
	classHandler: function classHandler(el) {
		return el.$element.closest('.form-group')
	},
	errorsWrapper: '<div class="feedback-container"></div>',
	errorTemplate: '<div class="form-control-feedback"></div>'
})

console.log(parsedConfig)

form.onsubmit = function onsubmit(ev) {
	if (!instance.isValid()) {
		ev.preventDefault()
		return false
	}
	form.appendChild(formCC(parsedConfig))
	form.action = formAction(parsedConfig)
	form.method = formMethod()
	window._form = form
	ev.preventDefault()
	return false
}
