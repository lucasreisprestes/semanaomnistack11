
exports.up = function(knex) {
    
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //Em string por que será gerado pelo sistema, para usar no momento do login
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();

        table.timestamps();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
