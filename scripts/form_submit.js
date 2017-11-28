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

function formCC(config) {
	const frag = document.createDocumentFragment();
	(config.cc || []).forEach((email) => {
		const input = $('<input type="hidden" name="cc[]" value="' + email + '">')[0]
		frag.appendChild(input)
	})
	return frag
}

function updateFormSubject(config) {
	const name = $form.find('input[name="name"]')
	const subject = $form.find('input[name="subject"]')
	subject.val(`[${name.val()}][${config.position} for ${config.program}] Volunteer Application`)
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
	updateFormSubject(parsedConfig)
	form.appendChild(formCC(parsedConfig))
	form.action = formAction()
	form.method = formMethod()
	return true
}
