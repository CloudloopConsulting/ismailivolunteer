window.jQuery = require('jquery')
require('parsleyjs')

const $ = window.jQuery
const $form = $('form[data-form-marker]').eq(0)
const form = $form[0]
let parsedConfig

function formAction() {
	return 'http://localhost:4568/legacy/apply/'
}

function formMethod() {
	return 'POST'
}

function formInput(key, value) {
	return $(`<input type="hidden" readonly name="${key}" value="${value}">`)[0]
}

function formCC(config) {
	return (config.cc || []).map(email => formInput('cc[]', email))
}

function additionalInputs(config) {
	const frag = document.createDocumentFragment()
	formCC(config).forEach(input => frag.appendChild(input))
	frag.appendChild(formInput('organizer', config.organizer))
	frag.appendChild(formInput('organizer_email', config.organizer_email))
	return frag
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

form.onsubmit = function onsubmit(ev) {
	if (!instance.isValid()) {
		ev.preventDefault()
		return false
	}
	form.appendChild(additionalInputs(parsedConfig))
	form.action = formAction()
	form.method = formMethod()
	return true
}
