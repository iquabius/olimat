// questions-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient')

  db.schema.hasTable('questions').then(exists => {
    if (!exists) {
      console.log('questions table does not exists!')
      // db.schema.createTable('questions', table => {
      //   table.increments('id')
      //   table.string('text')
      // }).then(
      //   () => console.log('Updated questions table'),
      //   e => console.error('Error updating questions table', e)
      // )
    }
  })

  return db
}
