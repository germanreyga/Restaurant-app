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
            {
              name: "Classic Caesar salad",
              price: 89.99,
              category: "Salad",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767851-2d8abb80-9df0-11ea-82b3-1fbdd9fa3149.jpg",
            },
            {
              name: "Chicken salad",
              price: 99.99,
              category: "Salad",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767854-33809c80-9df0-11ea-9308-6f1f44a4532a.jpg",
            },
            {
              name: "Serrano ham ciabatta",
              price: 129.99,
              category: "Ciabatta",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767853-311e4280-9df0-11ea-811c-fdfc85be91d1.jpg",
            },
            {
              name: "Banana smoothie",
              price: 59,
              category: "Smoothie",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767850-2b286180-9df0-11ea-931f-d1aa745c69d5.jpg",
            },
            {
              name: "Extra chocolate brownies",
              price: 100,
              category: "Dessert",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767856-354a6000-9df0-11ea-854c-7684ca246d94.jpg",
            },
            {
              name: "Lemon cest pie",
              price: 49.99,
              category: "Dessert",
              photo_url:
                "https://user-images.githubusercontent.com/26470569/82767852-2f547f00-9df0-11ea-8cd8-a1b49c3323b1.jpg",
            },
          ]);
        });
    });
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
};
