import { Component } from 'react'
import Link from 'next/link'

export default class AppFrame extends Component {
  render () {
    const { children } = this.props
    return (
      <span>
        <header>
          <nav>
            <Link href='/'><a>Home</a></Link> |
            <Link href='/questions'><a>Questões</a></Link> |
          </nav>
        </header>

        { children }

        <footer>
          <hr />
          Esse é o rodapé. Ele aparece em todas as páginas que usarem o componente
          Layout, assim como os links de navegação no cabeçalho.
        </footer>
      </span>
    )
  }
}
