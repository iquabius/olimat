import DashboardFrame from '../../../components/DashboardFrame'
import questions from '../../../data/questions'
import Link from 'next/link'

export default () => (
  <DashboardFrame title='Questões'>
    <Link href='/dashboard/questions/create'><a>Criar Questão</a></Link>
    <ul>
      {questions.map((question) =>
        <li key={question.id.toString()}>
          {question.title}: {question.wording}
        </li>)}
    </ul>
  </DashboardFrame>
)
