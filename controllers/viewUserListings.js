const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isUser, async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;

	listings = await db.Listing.findAll({
		where: {userId: iddata._userId},
        include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		},{
			model: db.Picture,
			attributes: ['id', 'fileName', 'ListingId']
		},{
			model: db.User
		}]
	});

    pictures = await db.Picture.findAll();

	res.render('viewUserListings', {
        pictures: pictures,
		listings: listings
	});
	
});

router.post('/', async (req, res) => {
	let {_listingId} = req.body;

	await db.Listing.destroy({
		where: {
			id: _listingId
		}
	})

	res.redirect(req.get('referer'));
});

module.exports = router;