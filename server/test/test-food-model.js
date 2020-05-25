const assert = require('assert');
const FoodModel = require('../models/Food');

describe('Food Model', ()=> {
    describe('#Basic Lookups', ()=> {
        it('Should be able to display at least one food', async  () => {
            let Foods = await FoodModel.allProducts()
                .then(data => {
                    return data;
                    
                })
                .catch(err => {
                    return [];
                });
            assert.notEqual(Foods.length, 0);
            
        });
    });
});
