'use strict';

/* eslint no-console: "off" */
const webpackConfigs = require('./webpack');
const defaultConfig = 'dev'; //dev , dist, test

module.exports = (configName) => {
console.log('configName',configName)
  // If there was no configuration give, assume default
  const requestedConfig = configName || defaultConfig;

  // Return a new instance of the webpack config
  // or the default one if it cannot be found.
  let LoadedConfig = defaultConfig;

  if (webpackConfigs[requestedConfig] !== undefined) {
    LoadedConfig = webpackConfigs[requestedConfig];
  } else {
    console.warn('Missing Env');
    LoadedConfig = {};
  }

  const loadedInstance = new LoadedConfig();

  // Set the global environment
  process.env.NODE_ENV = loadedInstance.env;

  return loadedInstance.config;
};