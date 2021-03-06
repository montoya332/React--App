'use strict';

// src/services/message/hooks/restrict-to-sender.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

const errors = require('feathers-errors');

module.exports = function(options) {
	return function(hook) {
		const messageService = hook.app.service('messages');

		// First get the message that the user wants to access
		return messageService.get(hook.id, hook.params).then(message => {
			const userCreatedMessage = message.createdBy._id == hook.params.user._id
			const userPermissions = true
			// Throw a not authenticated error if the message and user id don't match
			if (!userCreatedMessage || !userPermissions) {
				throw new errors.NotAuthenticated('Access not allowed');
			}

			// Otherwise just return the hook
			return hook;
		});
	};
};