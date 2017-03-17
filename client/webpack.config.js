'use strict';

/* eslint no-console: "off" */
const webpackConfigs = require('./webpack');
const defaultConfig = 'dev'; //dev , dist, test

module.exports = (configName) => {

		const requestedConfig = configName || defaultConfig;

		let LoadedConfig = defaultConfig;

		if (webpackConfigs[requestedConfig] !== undefined) {
				LoadedConfig = webpackConfigs[requestedConfig];
		} else {
				console.warn('Missing Env');
				LoadedConfig = {};
		}

		const loadedInstance = new LoadedConfig();

		process.env.NODE_ENV = loadedInstance.env;

		return loadedInstance.config;
};