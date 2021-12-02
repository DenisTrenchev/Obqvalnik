const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const { Op } = require("sequelize");

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	listings = await db.Listing.findAll({
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

	// listings.forEach(listing =>{
	// 	console.log(listing.Category.name);
	// 	console.log(listing.Picture.ListingId);
	// });

	res.render('dashboard', {
		pictures: pictures,
		listings: listings
	});
});

router.post('/', async (req, res) => {
	let {_search} = req.body;

	listings = await db.Listing.findAll({
		where: {
			[Op.or]: [
				{title:{
					[Op.like]: '%'+_search+'%'
				}},
				{content:{
					[Op.like]: '%'+_search+'%'
				}}
			]
		},
		include: [{
			model: db.Category,
			attributes: ['id', 'name']
		},{
			model: db.ListingType,
			attributes: ['id', 'name']
		},{
			model: db.Picture,
			attributes: ['id', 'fileName']
		},{
			model: db.User
		}]
	});

	pictures = await db.Picture.findAll();

	// listings.forEach(listing =>{
	// 	console.log(listing.Picture.fileName);
	// });

	res.render('dashboard', {
		pictures: pictures,
		listings: listings
	});
});

module.exports = router;