const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const multer = require('multer');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	categories = await db.Category.findAll()
	listingTypes = await db.ListingType.findAll()
	res.render('createListing', {
		categories: categories,
		listingTypes: listingTypes
	});
});

async function createListing(listingTitle, listingContent, listingPrice, userId, listingTypeId, categoryId){
	await db.Listing.build({
		title: listingTitle,
		content: listingContent,
		price: listingPrice,
		userId: userId,
		ListingTypeId: listingTypeId,
		CategoryId: categoryId
	}).save();
	return {
		isValid: true
	};
}

async function addPicture(fileName, listingId){
	await db.Picture.build({
		fileName: fileName,
		ListingId: listingId
	}).save();
	return {
		isValid: true
	};
}

var storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, './public/pictures/listingPictures');
	},
	filename: function (request, file, callback) {
		callback(null, file.originalname)
	}
});

var upload = multer({ storage: storage });

router.post('/', upload.array('_pic'), async (req, res) => {
	let {_listingTitle, _listingContent, _listingPrice, _category, _listingType, _pic} = req.body;

	var result = await createListing(_listingTitle, _listingContent, _listingPrice, req.user.id, _listingType, _category);

	var listing = await db.Listing.findOne({
		limit: 1,
		order: [['id', 'DESC']]
	})

	for (const pic of req.files) {
		await addPicture(pic.originalname, listing.id);
	}

	if(result.isValid == true){
		res.redirect("/dashboard");
	}
});

module.exports = {
	createListing: router,
	createListingFunc: createListing
};