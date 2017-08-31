// Now it's coming from QEWD server, but not from the database yet
const questions = require('./data/questions')

module.exports = {
  handlers: {
    getQuestions: function (_msg, _session, _send, finished) {
      finished({
        data: questions
      })
    }
  }
}
