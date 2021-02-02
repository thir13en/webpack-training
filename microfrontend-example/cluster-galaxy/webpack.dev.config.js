const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'cluster-galaxy': './src/cluster-galaxy.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
	},
	mode: 'development',
	module:{
		rules: [
			{
				test: /\.hbs$/,
				use: 'handlebars-loader',
			},
			{
				test: /\.(jpg|jpeg|png)$/,
				use: 'file-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatters: ['**/*', path.join(__dirname, 'build/**/*')],
		}),
		new HTMLWebpackPlugin({
			template: 'src/index.hbs',
			filename: 'cluster-galaxy.html',
			title: 'Cluster Galaxy',
			description: 'Huge thingy',
		}),
	],
}