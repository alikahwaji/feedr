exports.up = function (knex, Promise) {
  return knex.schema.table('organisations', (table) => {
    table.string('auth0_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('organisations', (table) => {
    table.dropColumn('auth0_id')
  })
}
