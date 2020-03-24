exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'Ensalada césar', price: 89.99},
        {name: 'Ensalada de pollo', price: 99.99},
        {name: 'Chapata de jamón serrano', price: 129.99},
        {name: 'Smoothie de plátano', price: 59},
        {name: 'Brownies espaciales', price: 100},
        {name: 'Pay de limón', price: 49.99},
      ]);
    });
};
