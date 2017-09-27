// Now it's coming from the PostgreSQL database
const knex = require('../db/knex')

module.exports = {
  handlers: {
    getQuestions: function (_msg, _session, _send, finished) {
      knex('questions').select('*')
        .then(questions => {
          finished({
            status: 'success',
            data: questions
          })
        }).catch(err => {
          finished({
            status: 'error',
            data: err
          })
        })
    }
  }
}
