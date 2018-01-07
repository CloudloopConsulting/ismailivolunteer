const nodeResolve = require('rollup-plugin-node-resolve')
const commonJs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

const FILE_NAMES = [
	'error',
	'form_submit',
	'index_jumbotron',
	'old_browsers',
	'smooth'
]

function buildConfig(name) {
	return {
		input: `./scripts/${name}.js`,
		output: {
			name,
			file: `./static/scripts/${name}.js`,
			format: 'iife',
			globals: { jquery: '$' },
		},
		external: ['jquery'],
		plugins: [
			nodeResolve({
				module: true,
				jsnext: false,
				main: true,
				browser: true,
				extensions: [
					'.js', '.json'
				],
				preferBuiltins: false
			}),
			commonJs(),
			babel({
				exclude: 'node_modules/**'
			})
		]
	}
}

module.exports = FILE_NAMES.map(buildConfig)
