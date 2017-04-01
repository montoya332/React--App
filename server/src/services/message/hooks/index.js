'use strict';

const restrictToSender = require('./restrict-to-sender');

const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks');

const process = require('./process');
const globalHooks = require('../../../hooks');
const populateSender = hooks.populate('createdBy', {
	service: 'users',
	field: 'createdBy'
});

exports.before = {
	all: [
		auth.verifyToken(),
		auth.populateUser(),
		auth.restrictToAuthenticated()
	],
	find: [],
	get: [],
	create: [process()],
	update: [hooks.remove('createdBy'), restrictToSender()],
	patch: [hooks.remove('createdBy'), restrictToSender()],
	remove: [restrictToSender()]
};

exports.after = {
	all: [],
	find: [populateSender],
	get: [populateSender],
	create: [populateSender],
	update: [],
	patch: [],
	remove: []
};