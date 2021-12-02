const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;

	user = await db.User.findOne({
		where: {id: iddata._userId}
	});

	res.render('editProfile', {
		user: user
	});
});

async function editProfile(firstName, lastName, phoneNumber, address, userID){
	await db.User.update({
        firstName: firstName, 
        lastName:lastName,
        phoneNumber: phoneNumber, 
        address: address
    },
		{where: {id: userID}}
	);
	return {
		isValid: true
	};
};

router.post('/', async (req, res) => {
	let {_firstName, _lastName, _phoneNumber, _address, _userID} = req.body;

	var result = await editProfile(_firstName, _lastName, _phoneNumber, _address, _userID);
	if(result.isValid == true){
		res.redirect("/users/profile");
	}
});

module.exports = {
	editProfile: router,
	editProfileFunc: editProfile
};