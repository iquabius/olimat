import Layout from '../../components/layout'

export default () => (
  <Layout>
    <h1>Criar Questão</h1>

    <form>
      Título:<br />
      <input type='text' name='title' /><br />
      Enunciado:<br />
      <textarea name='wording' value='Qual a raiz quadrada de 81?' /><br />
      <input type='submit' value='Salvar' />
    </form>
  </Layout>
)
