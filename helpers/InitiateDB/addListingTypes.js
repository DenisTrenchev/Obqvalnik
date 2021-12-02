const db = require('../../models');

db.ListingType.bulkCreate([
	{
		name: 'Продажба'
	},
	{
		name: 'Под наем'
	},
	{
		name: 'Размяна'
	},
	{
		name: 'Безплатно'
	}
]);