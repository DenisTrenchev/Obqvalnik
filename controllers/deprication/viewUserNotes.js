const express = require('express');
const db = require('../../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isUser, async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;
	notes = await db.Note.findAll({
		where: {userID: iddata._userId}
	});
	res.render('userNotes', {
		notes: notes
	});
	
});

router.post('/', async (req, res) => {
	let {_noteId} = req.body;

	await db.Note.destroy({
		where: {
			id: _noteId
		}
	})
	res.redirect(req.get('referer'));
});

module.exports = router;