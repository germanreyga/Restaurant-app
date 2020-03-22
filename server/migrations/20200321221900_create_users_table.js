exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id_user");
    table.string("username", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("type", 512).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
