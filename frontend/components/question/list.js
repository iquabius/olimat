import {Component} from 'react'
// The questions are not coming from the database yet, they're currently being
// statically loaded as JSON data from 'frontend/data/questions.js'.
import questions from '../../data/questions'
import withController from '../../components/withController'

class QuestionList extends Component {
  render () {
    return (
      <ul>
        {questions.map((question) =>
          <li key={question.id.toString()}>
            {question.title}: {question.wording}
          </li>)}
      </ul>
    )
  }
}

export default withController(QuestionList)
