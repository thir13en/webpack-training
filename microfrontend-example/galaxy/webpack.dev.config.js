const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		index: 'index.html',
	},
	entry: {
		index: './src/index.js',
		galaxy: './src/galaxy/galaxy.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: 'http://localhost:3001/static/',
	},
	module: {
		rules: [
			{
				test: /\.hbs$/,
				use: ['handlebars-loader'], exclude: /node_modules/
			},
			{
				test: /\.(s*)css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.hbs',
			filename: 'galaxy.html',
			title: 'Galaxy Generator',
			description: 'Create a galaxy',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatters: ['**/*', path.join(process.cwd(), 'build/**/*')],
		}),
		new ModuleFederationPlugin({
			name: 'Star',
			remotes: {
				'Star': 'Star@http://localhost:3000/static/star.js', 
			},
		}),
		new ModuleFederationPlugin({
			name: 'Galaxy',
			filename: 'remote-galaxy.js',
			exposes: {
				'./Galaxy': './src/galaxy/galaxy.js',
			}
		}),
	],
};
