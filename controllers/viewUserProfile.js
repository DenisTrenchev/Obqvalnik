const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
    var id = url.parse(req.url, true);
	var iddata = id.query;

    pictures = await db.Picture.findAll();

	user = await db.User.findOne({
        where: {id: iddata._userId}
    });

    listings = await db.Listing.findAll({
        where: {userId: iddata._userId},
		include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		}]
	});

	res.render('viewUserProfile', {
        user: user,
        pictures: pictures,
        listings: listings
	});
});

module.exports = router;