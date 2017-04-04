'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const process = require('./process');

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
	update: [hooks.remove('createdBy')],
	patch: [hooks.remove('createdBy')],
	remove: []
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