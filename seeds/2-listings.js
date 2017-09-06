exports.seed = function (knex) {
  return knex('listings').del()
    .then(function () {
      return knex('listings').insert([
        {
          id: 1,
          provider_id: 6,
          recipient_id: 3,
          category_id: 4,
          description: '24 medium bread rolls',
          pick_up_date_time: '2017-09-05 04:00:AM',
          use_by_date: '2017-09-09 09:00:PM',
          creation_date_time: '2017-09-28 02:00:00'
        }
      ])
    })
}
