const express = require('express');
const router = express.Router();
const { Connection } = require('pg');
const helpers = require('../helpers/util');

router.get('/', helpers.checkNotAuthenticated, helpers.isAdmin, async (req, res) =>{
	res.render('docs');
});


module.exports = router;