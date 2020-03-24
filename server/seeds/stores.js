exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("stores")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("stores").insert([
        {
          location:
            "María Auxiliadora 7, San Bartolo el Chico, 14380 Ciudad de México, CDMX",
          name: "ITESM CDMX",
          description: "Placeholder"
        }
      ]);
    });
};
