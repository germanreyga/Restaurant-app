exports.seed = async function(knex) {
  // Deletes ALL existing entries related to a product
  try {
    return await knex.transaction(async trx => {
      // For foreign key constrants
      await knex("order_product").del();

      await knex("orders").del();

      await knex("products")
        .del()
        .then(function() {
          // Inserts seed entries
          return knex("products").insert([
            { name: "Ensalada césar", price: 89.99 },
            { name: "Ensalada de pollo", price: 99.99 },
            { name: "Chapata de jamón serrano", price: 129.99 },
            { name: "Smoothie de plátano", price: 59 },
            { name: "Brownies espaciales", price: 100 },
            { name: "Pay de limón", price: 49.99 }
          ]);
        });
    });
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
};
