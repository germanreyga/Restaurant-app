exports.seed = async function (knex) {
  // Deletes ALL existing entries related to a product
  try {
    return await knex.transaction(async (trx) => {
      // For foreign key constrants
      await knex("order_product").del();

      await knex("orders").del();

      await knex("products")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("products").insert([
            { name: "Classic Caesar salad", price: 89.99, category: "Salad" },
            { name: "Chicken salad", price: 99.99, category: "Salad" },
            {
              name: "Serrano ham ciabatta",
              price: 129.99,
              category: "Ciabatta",
            },
            { name: "Banana smoothie", price: 59, category: "Smoothie" },
            {
              name: "Extra chocolate brownies",
              price: 100,
              category: "Dessert",
            },
            { name: "Lemon cest pye", price: 49.99, category: "Dessert" },
          ]);
        });
    });
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
};
