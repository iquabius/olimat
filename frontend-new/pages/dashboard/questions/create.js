import DashboardFrame from '../../../components/dashboard-frame'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

export default () => (
  <DashboardFrame title='Criar Questão'>
    <form>
      <TextField
        id='title'
        label='Título'
        fullWidth
        margin='normal'
        />
      <TextField
        id='wording'
        label='Enunciado'
        fullWidth
        multiline
        rows='4'
        margin='normal'
        />
      <Button raised color='accent'>Salvar</Button>
    </form>
  </DashboardFrame>
)
