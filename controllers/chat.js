const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const { Op } = require("sequelize");
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	var senderId = req.user.id;
    var recieverId = url.parse(req.url, true);
	var iddata = recieverId.query;

    messages = await db.Message.findAll({
        attributes: ['content', 'createdAt', 'updatedAt'],
        where: {
            [Op.or]: [
                {[Op.and]: [{reciever: senderId}, {sender: iddata._recieverId}]},
                {[Op.and]: [{reciever: iddata._recieverId}, {sender: senderId}]}
            ]
        },
        include: [{
			model: db.User,
			attributes: ['firstName', 'lastName']
		}],
        order: [['createdAt', 'ASC']]
	});

	res.render('chat', {
		messages: messages
	});
});

module.exports = router;