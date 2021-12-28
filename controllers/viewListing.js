const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, /*helpers.isAdmin,*/ async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;
	
	const myId = req.user.id;

	listing = await db.Listing.findOne({
        where: {id: iddata._listingId},
		include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		},{
			model: db.User
		}]
	});

	pictures = await db.Picture.findAll({
		where: {ListingId: listing.id}
	});

	pictures.forEach(picture =>{
		console.log(picture.fileName);
	});

	res.render('viewListing', {
		pictures: pictures,
		listing: listing,
		myId: myId
	});
});

module.exports = router;