const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	listings = await db.Listing.findAll({
        where: {userId: req.user.id},
		include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		}]
	});

	pictures = await db.Picture.findAll();
    
    user = await db.User.findOne({
        where: {id: req.user.id}
    });

	res.render('profile', {
		pictures: pictures,
		listings: listings,
        user: user
	});
	//res.render('dashboard');
});

router.post('/', async (req, res) => {
	let {_listingId} = req.body;

	await db.Listing.destroy({
		where: {
			id: _listingId
		}
	})

	res.redirect("/users/profile");
});

module.exports = router;