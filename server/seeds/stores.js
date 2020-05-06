exports.seed = async function(knex) {
  // Deletes ALL existing entries related to a store
  try {
    return await knex.transaction(async trx => {
      // For foreign key constrants
      await knex("users").del();

      await knex("stores")
        .del()
        .then(function() {
          return knex("stores").insert([
            {
              location: "Legorreta",
              name: "FastFruit",
              description: "Junto al comedor de lego",
              latitude: 19.284161,
              longitude: -99.133877
            },
            {
              location: "CIE",
              name: "FastFruit",
              description: "Escondido dentro del primer piso",
              latitude: 19.28292,
              longitude: -99.1390861
            },
            {
              location: "Disney",
              name: "FastFruit",
              description: "En frente de prepa",
              latitude: 19.2853,
              longitude: -99.141301
            }
          ]);
        });

      await knex("users").insert([
        {
          username: "admin",
          password:
            "$2b$10$si/2T4or/Vj7o0fvCH0akOv/Yyppvdeyh8RX4ik7wO4xfBtyc3kXi",
          type: "admin",
          id_store: undefined
        }
      ]);
    });
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
};
