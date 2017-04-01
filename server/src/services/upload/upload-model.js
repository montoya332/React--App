'use strict';

// upload-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
	const Upload = sequelize.define('Upload', {
		uri: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		freezeTableName: true,
		classMethods: {
			associate() {
				Upload.belongsTo(sequelize.models.users, { foreignKey: 'createdBy' });
			}
		}
	});

	// Upload.sync();

	return Upload;
};