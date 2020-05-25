const assert = require('assert');
const StoreModel = require('../models/Store');

describe('Store Model', ()=> {
    describe('#Basic Lookups', ()=> {
        it('Should be able to display at least one store', async  () => {
            let Stores = await StoreModel.findAll()
                .then(data => {
                    return data;
                    
                })
                .catch(err => {
                    return [];
                });
            assert.notEqual(Stores.length, 0);
            
        });
        it('Should be able to display at least one employee', async  () => {
            let Employees = await StoreModel.findAllEmployees()
                .then(data => {
                    return data;
                    
                })
                .catch(err => {
                    return [];
                });
            assert.notEqual(Employees.length, 0);
            
        });
    });
});
