const db = require('../../models');
db.User.update(
	{userRole: 2},
	{where: {email: 'denis@admin.com'}}
);

