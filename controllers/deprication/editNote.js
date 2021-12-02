const express = require('express');
const db = require('../../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../../helpers/util');
const url = require('url');


router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;
	note = await db.Note.findOne({
		where: {id: iddata._noteId}
	});
	res.render('editNote', {
		note: note
	});
});

async function editNote(noteTitle, noteContent, noteID){
	await db.Note.update(
		{title: noteTitle, content: noteContent},
		{where: {id: noteID}}
	);
	return {
		isValid: true
	};
};

router.post('/', async (req, res) => {
	let {_noteTitle, _noteContent, _noteID} = req.body;

	var result = await editNote(_noteTitle, _noteContent, _noteID);
	if(result.isValid == true){
		res.redirect("/users/dashboard");
	}
});

module.exports = {
	editNote: router,
	editNoteFunc: editNote
};