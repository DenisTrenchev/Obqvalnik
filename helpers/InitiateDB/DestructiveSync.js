const db = require('../../models');

db.sequelize.sync({force: true}).then(()=>{
	db.sequelize.close();}
).catch();
