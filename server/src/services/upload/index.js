'use strict';
const hooks = require('./hooks');
const path = require('path');


const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');

// feathers-blob service
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const serverBase = path.join(__dirname, '../../..');
const blobStorage = fs(serverBase + '/uploads');

module.exports = function() {
	const app = this;

	// Upload Service with multipart support
	app.use('/uploads',

		// multer parses the file named 'uri'.
		// Without extra params the data is
		// temporarely kept in memory
		multipartMiddleware.single('uri'),

		// another middleware, this time to
		// transfer the received file to feathers
		function(req, res, next) {
			req.feathers.file = req.file;
			next();
		},
		blobService({
			Model: blobStorage
		})
	);



	// Get our initialize service to that we can bind hooks
	const uploadService = app.service('/uploads');

	// Set up our before hooks
	uploadService.before(hooks.before);

	// Set up our after hooks
	uploadService.after(hooks.after);
};