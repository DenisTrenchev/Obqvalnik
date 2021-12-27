const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const { Op } = require("sequelize");

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	const userId = req.user.id;

    userList = await db.User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        where: {
            id: {
                [Op.in]: db.sequelize.literal(
                    `(SELECT m."reciever" FROM "Messages" m WHERE m."sender" = '${userId}'
                    UNION SELECT m."sender" FROM "Messages" m WHERE m."reciever" = '${userId}')`
                )
            }
        }
	});

	res.render('chatList', {
		userList: userList
	});
});

module.exports = router;