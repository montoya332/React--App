'use strict';

// message-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
	const Message = sequelize.define('messages', {
		text: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		freezeTableName: true,
		classMethods: {
			associate() {
				Message.belongsTo(sequelize.models.users, { foreignKey: 'sentBy' });
			}
		}
	});

	// message.sync();

	return Message;
};