
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('organisations', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('address')
    table.string('phone')
    table.string('type')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('organisations')
}
