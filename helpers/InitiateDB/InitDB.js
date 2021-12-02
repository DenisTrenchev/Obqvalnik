const db = require('../../models');

db.Category.bulkCreate([
    {
		name: 'Недвижими имоти'
	},
	{
		name: 'Автомобили'
	},
	{
		name: 'Малки електроуреди'
	},
	{
		name: 'Големи електроуреди'
	},
	{
		name: 'Спорт, книги, хоби'
	},
	{
		name: 'Животни'
	},
	{
		name: 'Дом и градина'
	},
	{
		name: 'Мода'
	},
	{
		name: 'За бебето и детето'
	},
	{
		name: 'Екскурзии и почивки'
	}
]);

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

db.UserRole.bulkCreate([
	{
		name: 'user'
	},
	{
		name: 'admin'
	}
]);