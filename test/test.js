const assert = require('chai').assert;
const db = require('../models');
const {register, registerFunc} = require('../controllers/register');
const {createListing, createListingFunc} = require('../controllers/createListing');
const {editListing, editListingFunc} = require('../controllers/editListing');
const {editProfile, editProfileFunc} = require('../controllers/editProfile');
const {addMessage, addMessageFunc} = require('../controllers/chat');

after(function (done) {
    db.sequelize.close().then(done);    
});

describe('App', function(){
//-------------------------------------------------------------------------------------------------
    it('Failed registration because password length is less then 8.', async function(){
        var res = await registerFunc('asd', 'asd', 'dsa@asd', '0876549381', 'Sofia', '123', '123');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.passwordLength, true);
    });

    it('Failed registration because passwords don\'t match.', async function(){
        var res = await registerFunc('asd', 'asd', 'dsa@asd', '0876549381', 'Sofia', '123', '321');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.passwordMatch, true);
    });

    it('Failed registration because there are missing field.', async function(){
        var res = await registerFunc('asd', 'asd', '', '0876549381', 'Sofia', '123', '123');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.allFields, true);
    });
    
    it('Failed registration because the email is already registered.', async function(){
        var res = await registerFunc('asd', 'asd', 'dimitar@mail.com', '0876549381', 'Sofia', '12345678', '12345678');
        assert.equal(res.isValid, false);
        assert.equal(res.errorsStatus.emailExists, true);
    });

    it('Succsessful registration.', async function(){
        var res = await registerFunc('Petar', 'Petrov', 'petar@mail.com', '0876549381', 'Sofia', '12345678', '12345678');
        assert.equal(res.isValid, true);
        await db.User.destroy({
            where: {email: 'petar@mail.com'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Succsessfully added listing.', async function(){
        var res = await createListingFunc('Listing title', 'Listing content', '1000', 7, 1, 2);
        assert.equal(res.isValid, true);
        await db.Listing.destroy({
            where: {title: 'Listing title'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Succsessfully edit a listing.', async function(){
        await createListingFunc('Listing title', 'Listing content', '1000', 7, 1, 2);
        var res = await editListingFunc('Listing title123', 'Listing content', '1000', 37);
        assert.equal(res.isValid, true);
        await db.Listing.destroy({
            where: {title: 'Listing title123'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Succsessfully update user information.', async function(){
        await registerFunc('Petar', 'Petrov', 'petar1@mail.com', '0876549381', 'Sofia', '12345678', '12345678');
        var res = await editProfileFunc('Petar', 'Petrov', '0876549381', 'Sofia', 22);
        assert.equal(res.isValid, true);
        await db.User.destroy({
            where: {email: 'petar1@mail.com'}
        });
    });
//-------------------------------------------------------------------------------------------------
    it('Succsessfully add message.', async function(){
        var res = await addMessageFunc(6, 5, 'test');
        assert.equal(res.isValid, true);
        await db.Message.destroy({
            where: {content: 'test'}
        });
    });
});