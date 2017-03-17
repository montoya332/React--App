/* Default test configuration. */
const WebpackBaseConfig = require('./common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

class WebpackTestConfig extends WebpackBaseConfig {
	set config(data) {
		const baseSettings = this.defaultSettings;
		delete baseSettings.devServer;
		this._config = Object.assign({}, baseSettings, data);
		return this._config;
	}

	get config() {
		return super.config;
	}

	get env() {
		return 'test';
	}
	constructor() {
		super();
		const cssModulesQuery = {
				modules: true,
				importLoaders: 1,
				localIdentName: '[name]-[local]-[hash:base64:5]'
		};
		this.config = {
			devtool: 'inline-source-map',
			entry: [
				'./index.js'
			],
			externals: {
				cheerio: 'window',
				"jsdom": "window",
				'react/addons': 'true',
				'react/lib/ExecutionEnvironment': 'true',
				'react/lib/ReactContext': 'true',
				fs: '{}',
				tls: '{}',
				net: '{}',
				console: '{}',
				child_process: '{}',
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': '"test"'
				})
			],
			module: {
				rules: [{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					include: [].concat( this.includedPackages, [ this.srcPathAbsolute, this.testPathAbsolute ] )
				}, {
					test: /^.((?!cssmodule).)*\.(sass|scss)$/,
					loader: 'null-loader'
				}, {
					test: /\.cssmodule\.(sass|scss)$/,
					loaders: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						query: cssModulesQuery
					}, {
						loader: 'sass-loader'
					}]
				}]
			}
		};
	}
}

module.exports = WebpackTestConfig;