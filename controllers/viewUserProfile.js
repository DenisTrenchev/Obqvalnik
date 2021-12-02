const express = require('express');
const db = require('../models');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');
const url = require('url');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
    var id = url.parse(req.url, true);
	var iddata = id.query;

    console.log(iddata._userId);
    
	user = await db.User.findOne({
        where: {id: iddata._userId}
    });

	res.render('viewUserProfile', {
        user: user
	});
});

module.exports = router;