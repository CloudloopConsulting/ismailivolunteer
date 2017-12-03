const nodeResolve = require('rollup-plugin-node-resolve')
const commonJs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = {
	format: 'iife',
	external: ['jquery'],
	globals: {
		jquery: '$'
	},
	plugins: [
		nodeResolve({
			module: true,
			jsnext: false,
			main: true,
			browser: true,
			extensions: [
				'.js', '.json'
			],
			skip: ['jquery'],
			preferBuiltins: false
		}),
		commonJs(),
		babel({
			exclude: 'node_modules/**'
		})
	]
}
