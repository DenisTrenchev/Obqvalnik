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
    
    var recieverID = iddata._recieverId;

	if(recieverID == undefined){
		res.redirect("/dashboard/chatList");
	}
    messages = await db.Message.findAll({
        attributes: ['content', 'createdAt', 'updatedAt'],
        where: {
            [Op.or]: [
                {[Op.and]: [{reciever: senderId}, {sender: recieverID}]},
                {[Op.and]: [{reciever: recieverID}, {sender: senderId}]}
            ]
        },
        include: [{
			model: db.User,
			attributes: ['firstName', 'lastName']
		}],
        order: [['createdAt', 'ASC']]
	});

	res.render('chat', {
		messages: messages,
        senderId: senderId,
        recieverID: recieverID
	});
});

async function addMessage(sender, reciever, content){
	await db.Message.build({
		content: content,
		sender: sender,
		reciever: reciever
	}).save();
	return {
		isValid: true
	};
}

router.post('/', async (req, res) => {
	let {_sender, _reciever, _messageContent} = req.body;

	var result = await addMessage(_sender, _reciever, _messageContent);

	if(result.isValid == true){
		res.redirect("/dashboard/chat?_recieverId=" + _reciever);
	}
});

module.exports = {
    addMessage: router,
    addMessageFunc: addMessage
};