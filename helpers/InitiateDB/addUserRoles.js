const db = require('../../models');

db.UserRole.bulkCreate([
	{
		name: 'user'
	},
	{
		name: 'admin'
	}
]);