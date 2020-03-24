exports.seed = function(knex) {

    return knex('stores').del()
    .then(function () {
      return knex('stores').insert([
        {location: 'Legorreta', name: 'FastFruit', description: 'Junto al comedor de lego'},
        {location: 'CIE', name: 'FastFruit', description: 'Escondido dentro del primer piso'},
        {location: 'Disney', name: 'FastFruit', description: 'En frente de prepa'}
      ]);
    });
  };
  
