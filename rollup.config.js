const nodeResolve = require('rollup-plugin-node-resolve')
const commonJs = require('rollup-plugin-commonjs')

module.exports = {
	format: 'iife',
	plugins: [
		nodeResolve({
			module: false,
			jsnext: false,
			main: true,
			browser: true,
			extensions: [
				'.js', '.json'
			],
			preferBuiltins: false
		}),
		commonJs()
	]
}
