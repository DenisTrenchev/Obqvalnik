const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	res.render('createNote');
});

async function createNote(noteTitle, noteContent, userID){
	await db.Note.build({
		title: noteTitle,
		content: noteContent,
		userID: userID
	}).save();
	return {
		isValid: true
	};
}
router.post('/', async (req, res) => {
	let {_noteTitle, _noteContent} = req.body;

	var result = await createNote(_noteTitle, _noteContent, req.user.id);

	if(result.isValid == true){
		res.redirect("/users/dashboard");
	}
});

module.exports = {
	createNote: router,
	createNoteFunc: createNote
};