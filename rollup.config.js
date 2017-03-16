const nodeResolve = require('rollup-plugin-node-resolve')
const commonJs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = {
	format: 'iife',
	plugins: [
		nodeResolve({
			module: true,
			jsnext: true,
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
