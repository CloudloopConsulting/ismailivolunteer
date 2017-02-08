/* global $, formdata */

var config = {}
var $form = $('form[data-form-up]').eq(0)
var form = $form[0]
var instance

function formAction(c) {
	return 'https://formspree.io/' + c.to
}

function formMethod() {
	return 'POST'
}

function formCC(c) {
	return $('<input type="hidden" name="_cc" value="' + c.cc.join(',') + '">')[0]
}

try {
	config = JSON.parse(atob(formdata))
} catch (e) {
	throw new Error('could not decode formdata')
}

if (Object.keys(config) === 0) {
	throw new Error('incomplete config')
}

if (!form) {
	throw new Error('cannot find form')
}

instance = $form.parsley({
	errorClass: 'has-danger',
	successClass: 'has-success',
	classHandler: function classHandler(el) {
		return el.$element.closest('.form-group')
	},
	errorsWrapper: '<div class="feedback-container"></div>',
	errorTemplate: '<div class="form-control-feedback"></div>'
})

form.onsubmit = function onsubmit(ev) {
	if (instance.isValid()) {
		form.appendChild(formCC(config))
		form.action = formAction(config)
		form.method = formMethod()
	} else {
		ev.preventDefault()
	}
}
