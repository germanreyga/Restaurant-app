exports.up = function (knex) {
  return knex.schema
    .createTable("stores", (table) => {
      table.increments("id_store");
      table.string("location", 512).notNullable();
      table.string("name", 512).notNullable();
      table.string("description", 512).notNullable();
      table.float("latitude", 14, 10).notNullable();
      table.float("longitude", 14, 10).notNullable();
      table.timestamps(true, true);
    })
    .createTable("users", (table) => {
      table.increments("id_user");
      table.string("username", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("type", 512).notNullable();
      table.integer("id_store").unsigned();
      table.foreign("id_store").references("id_store").inTable("stores");
      table.timestamps(true, true);
    })
    .createTable("orders", (table) => {
      table.increments("id_order");
      table.time("order_hour").notNullable();
      table.string("status_payment", 255).notNullable();
      table.string("status_order", 255).notNullable();
      table.float("order_total").notNullable();
      table.integer("id_user").unsigned().notNullable();
      table.foreign("id_user").references("id_user").inTable("users");
      table.timestamps(true, true);
    })
    .createTable("comments", (table) => {
      table.increments("id_comment");
      table.string("description", 512).notNullable();
      table.integer("id_user").unsigned().notNullable();
      table.integer("id_order").unsigned().notNullable();
      table.foreign("id_user").references("id_user").inTable("users");
      table.foreign("id_order").references("id_order").inTable("orders");
      table.timestamps(true, true);
    })
    .createTable("products", (table) => {
      table.increments("id_product");
      table.string("name", 255).notNullable();
      table.float("price").notNullable();
      table.string("category", 255).notNullable();
      table.timestamps(true, true);
    })
    .createTable("order_product", (table) => {
      table.increments("id_order_product");
      table.integer("id_order").unsigned().notNullable();
      table.integer("id_product").unsigned().notNullable();
      table.integer("quantity").notNullable();
      table.foreign("id_order").references("id_order").inTable("orders");
      table.foreign("id_product").references("id_product").inTable("products");
      table.timestamps(true, true);
    })
    .createTable("discounts", (table) => {
      table.increments("id_discount");
      table.float("discount").notNullable();
      table.string("description", 512).notNullable();
      table.integer("id_order").unsigned().notNullable();
      table.foreign("id_order").references("id_order").inTable("orders");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("orders")
    .dropTable("products")
    .dropTable("stores")
    .dropTable("order_product")
    .dropTable("discounts")
    .dropTable("comments");
};
