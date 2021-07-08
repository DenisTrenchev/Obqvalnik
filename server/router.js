const express = require('express');
const app = express();
const session = require("express-session");
const server = require('http').Server(app);

const port = require("./config/express").port;

app.run = () => {
	server.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app