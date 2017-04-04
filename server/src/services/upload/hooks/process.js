'use strict';

module.exports = function(options) {
	return function(hook) {
		// The authenticated user
		const user = hook.params.user;
		const createdBy = user.id || user._id;
		if (!hook.data.uri && hook.params.file && createdBy) {
			const file = hook.params.file;
			const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
			// Override the original data
			hook.data = {
				uri,
				// Set the user id
				createdBy,
				// Add the current time via `getTime`
				createdAt: new Date().getTime()
			};
		}
	};
};