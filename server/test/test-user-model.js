const assert = require('assert');
const UserModel = require('../models/User');

describe('User Model', ()=> {
    describe('#Basic Lookups', ()=> {
        it('Should be able to find admin user', async  () => {
            const userData = await UserModel.findByUsername('admin')
                .then(data => {
                    if(!data || data.length === 0) return null;
                    return data;
                })
                .catch(err => {
                    return null;
                });
            assert.notEqual(userData, null);
            assert.equal('admin', userData[0].username);
        });
        it('Should be able to check if a user exists', async  () => {
            const userExists = await UserModel.checkExistingUser('admin');
            assert.equal(userExists, true);
        });
        it('Should be able to add and remove users', async  () => {
            const username = "TESTUSERNAMETHATISUNIQUE";
            const type = "client";
            const pass = "TESTUSERNAMETHATISUNIQUE";
            const id_store = null;
            const result = await UserModel.createUser(username, type, pass,id_store)
                .then(res => {return res;})
                .catch(err=> {return [];});
            assert.notEqual(result.length, 0);
            const result2 = await UserModel.deleteUser(username)
                .then(res => {return res;})
                .catch(err => {return 0;});
            assert.equal(result2, 1)

        });
    });
});

