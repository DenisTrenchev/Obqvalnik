const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const { Op } = require("sequelize");

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	categories = await db.Category.findAll();
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

	res.render('dashboard', {
		pictures: pictures,
		listings: listings,
		categories: categories
	});
});

router.post('/', async (req, res) => {
	let {_search, _category} = req.body;

	if(_category == 'Choose category'){
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
				attributes: ['id', 'name'],
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
	}else{
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
				attributes: ['id', 'name'],
				where: {id: _category}
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
	}
	
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