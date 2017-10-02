import {Component} from 'react'

import client from '../../feathers'

class QuestionList extends Component {
  constructor (props) {
    super(props)
    this.state = {questions: []}
  }

  componentDidMount () {
    const handleQuestions = questionsPage => {
      this.setState({
        questions: questionsPage.data
      })
    }

    client.service('questions')
      .find()
      .then(handleQuestions)
  }

  renderQuestion (question) {
    return (
      <li key={question.id.toString()}>
        {question.title}: {question.wording}
      </li>
    )
  }

  render () {
    const { questions } = this.state

    if (questions.length === 0) {
      return (<div>Carregando questões...</div>)
    } else {
      return (<ul>{questions.map(this.renderQuestion)}</ul>)
    }
  }
}

export default QuestionList
