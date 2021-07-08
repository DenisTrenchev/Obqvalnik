const router = require('./router');
const db = require('./models/index');

db.sequelize.authenticate().then(() => {
	router.run();
})