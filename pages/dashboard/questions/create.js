import DashboardFrame from '../../../components/DashboardFrame'

export default () => (
  <DashboardFrame title='Criar Questão'>
    <form>
      Título:<br />
      <input type='text' name='title' /><br />
      Enunciado:<br />
      <textarea name='wording' value='Qual a raiz quadrada de 81?' /><br />
      <input type='submit' value='Salvar' />
    </form>
  </DashboardFrame>
)
