exports.seed = function (knex) {
  return knex('organisations').insert([
    {
      id: 1,
      name: 'Sallies',
      address: '28 Innit Place, Mt Wellington, Auckland 1060',
      phone: '09 555 7615',
      type: 'charity'
    }, {
      id: 2,
      name: 'Happyton City Mission',
      address: '140 Happy Street, Auckland Central',
      phone: '09 555 9200',
      type: 'business'
    }, {
      id: 3,
      name: 'Oxo\'s Fam',
      address: 'Level 1, 14 West St, Garden of Eden, Auckland 1010',
      phone: '09 555 6500',
      type: 'charity'
    }, {
      id: 4,
      name: 'West Food Bank',
      address: 'West Trust, Big Building, Glen Eden, Auckland0602',
      phone: '09 555 0716',
      type: 'business'
    }, {
      id: 5,
      name: 'Kids4Cans',
      address: '7 Beatrice Tinsley Crescent, Albany, NY',
      phone: '09 555 1525',
      type: 'charity'
    }, {
      id: 6,
      name: 'CurryStop',
      address: '28 Restaurant Place, Auckland',
      phone: '09 444 7615',
      type: 'provider'
    }, {
      id: 7,
      name: 'Sushi Sushi',
      phone: '08005151514',
      address: '140 Restaurant Street, Auck',
      type: 'provider'
    }, {
      id: 8,
      name: 'SuperDuper Supermarket',
      address: 'Level 1, Supermarket St0',
      phone: '09 444 6500',
      type: 'provider'
    }, {
      id: 9,
      name: 'Pasta a la Auckland',
      phone: '354488987',
      address: 'Restaurant Building, Glen 4 0716',
      type: 'provider'
    }, {
      id: 10,
      name: 'Homestyle Bakery',
      phone: '66699988877',
      address: '7 Nom nom Ave, Albany, provider',
      type: 'business'

    }, {
      id: 11,
      name: `Yoshi's Restuarant`,
      address: '19 Ruru St',
      phone: '0800838383',
      type: 'business',
      auth0_id: 'auth0|59a48396c9b71e7fd4cbe3b7',
      email: 'business@example.com'
    }
  ]
  )
}
