import Layout from '../../components/layout'
import questions from '../../data/questions'
import Link from 'next/link'

export default () => (
  <Layout>
    <h1>Questões</h1>

    <Link href='/questions/create'><a>Criar Questão</a></Link>
    <ul>
      {questions.map((question) =>
        <li key={question.id.toString()}>
          {question.title}: {question.wording}
        </li>)}
    </ul>
  </Layout>
)
