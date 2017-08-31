import QuestionList from '../../../components/question/list'
import DashboardFrame from '../../../components/dashboard-frame'
import Link from 'next/link'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

const styles = {
  createQuestionButton: {
    position: 'fixed',
    bottom: 23,
    right: 23
  }
}

export default () => (
  <DashboardFrame title='Questões'>
    <Link href='/dashboard/questions/create'><a>Criar Questão</a></Link>
    <QuestionList />
    <Link href='/dashboard/questions/create'>
      <Button fab color='primary' style={styles.createQuestionButton}>
        <AddIcon />
      </Button>
    </Link>
  </DashboardFrame>
)
