const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");

const db = require('./models');
const initializePassport = require('./config/passport');

const home = require('./controllers/home');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const {register, registerFunc} = require('./controllers/register');
const dashboard = require('./controllers/dashboard');
const {createListing, createListingFunc} = require('./controllers/createListing');
const viewListing = require('./controllers/viewListing');
const profile = require('./controllers/profile');
const {editListing, editListingFunc} = require('./controllers/editListing');
const viewUserProfile = require('./controllers/viewUserProfile');
const {editProfile, editProfileFunc} = require('./controllers/editProfile');
const adminPanel = require('./controllers/adminPanel');
const viewUserListings = require('./controllers/viewUserListings');
//const chat = require('./controllers/chat');
const chatList = require('./controllers/chatList');
//------------------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initializePassport(passport);

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use('/home', home);
app.use('/', home);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/users/register', register);
app.use('/dashboard', dashboard);
app.use('/dashboard/createListing', createListing);
app.use('/dashboard/viewListing', viewListing);
app.use('/users/profile', profile);
app.use('/dashboard/editListing', editListing);
app.use('/dashboard/viewUserProfile', viewUserProfile);
app.use('/users/profile/editProfile', editProfile);
app.use('/adminPanel', adminPanel);
app.use('/adminPanel/viewUserListings', viewUserListings);
//app.use('/dashboard/chat', chat);
app.use('/dashboard/chatList', chatList);

//DB test
db.sequelize.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));