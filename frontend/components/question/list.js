import {Component} from 'react'
import questions from '../../data/questions'

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

export default QuestionList
