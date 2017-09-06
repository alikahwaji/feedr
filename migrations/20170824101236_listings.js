
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('listings', function (table) {
    table.increments('id').primary()
    table.integer('provider_id').references('organisations.id')
    table.integer('recipient_id').references('organisations.id')
    table.integer('category_id')
    table.string('description')
    table.string('pick_up_date_time')
    table.string('use_by_date')
    table.string('creation_date_time')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('listings')
}
