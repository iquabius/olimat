const questions = require('./questions/questions.service.js')

module.exports = function () {
  const app = this

  app.configure(questions)
}
