import Layout from '../../components/layout'
import questions from '../../data/questions'

export default () => (
  <Layout>
    <h1>Questões</h1>

    <ul>
      {questions.map((question) =>
        <li key={question.id.toString()}>
          {question.title}: {question.wording}
        </li>)}
    </ul>
  </Layout>
)
