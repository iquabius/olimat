exports.up = (knex, Promise) => {
  return knex.schema.createTable('questions', (table) => {
    table.increments('id').unsigned().primary()
    table.text('wording')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('questions')
}
