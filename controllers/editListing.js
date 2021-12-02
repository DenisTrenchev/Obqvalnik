const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	var id = url.parse(req.url, true);
	var iddata = id.query;
	listing = await db.Listing.findOne({
		where: {id: iddata._listingId},
        include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		}]
	});
	res.render('editListing', {
		listing: listing
	});
});

async function editListing(listingTitle, listingContent, listingPrice, listingID){
	await db.Listing.update(
		{title: listingTitle, content: listingContent, price: listingPrice},
		{where: {id: listingID}}
	);
	return {
		isValid: true
	};
};

router.post('/', async (req, res) => {
	let {_listingTitle, _listingContent, _listingPrice, _listingID} = req.body;

	var result = await editListing(_listingTitle, _listingContent, _listingPrice, _listingID);
	if(result.isValid == true){
		res.redirect("/users/profile");
	}
});

module.exports = {
	editListing: router,
	editListingFunc: editListing
};