const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		star: './src/star.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
	},
	module:{
		rules: [
			{
				test: /\.hbs$/,
				use: 'handlebars-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatters: ['**/*', path.join(__dirname, 'build/**/*')],
		}),
		new HTMLWebpackPlugin({
			template: 'src/index.hbs',
			filename: 'star.html',
			title: 'Giant Blue Star',
			description: 'Shining as usual',
		}),
	],
}