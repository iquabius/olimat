import DashboardFrame from '../../../components/DashboardFrame'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

export default () => (
  <DashboardFrame title='Criar Questão'>
    <form>
      <TextField
        id='title'
        label='Título'
        />
      <TextField
        id='wording'
        label='Enunciado'
        />
      <Button raised color='primary'>Salvar</Button>
    </form>
  </DashboardFrame>
)
