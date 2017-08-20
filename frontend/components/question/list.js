import {Component} from 'react'
// Now the questions are being dynamically loaded from the backend through the
// controller
import withController from '../../components/withController'

class QuestionList extends Component {
  constructor (props) {
    super(props)
    this.state = {questions: []}
  }

  componentWillMount () {
    const { controller } = this.props
    const message = { type: 'getQuestions' }
    const handleGetQuestions = messageObj => {
      this.setState({
        questions: messageObj.message.data
      })
    }

    controller.send(message, handleGetQuestions)
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
    return (
      <ul>
        {questions.map(this.renderQuestion)}
      </ul>
    )
  }
}

export default withController(QuestionList)
