'use strict';
const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');
module.exports = function() {
	const app = this;

	const sequelize = new Sequelize(app.get('postgres'), {
		dialect: 'postgres',
		logging: false
	});
	app.set('sequelize', sequelize);

	app.configure(authentication);
	app.configure(user);
	app.configure(message);

	// Associate all of our models
	Object.keys(sequelize.models)
		.map(name => sequelize.models[name])
		.filter(model => model.associate !== undefined)
		.forEach(model => model.associate());

	sequelize.sync();
};