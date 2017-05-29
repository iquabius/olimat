import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class App extends Component {
  render () {
    let { children, title = 'Olimat 🔥' } = this.props

    return (
      <div>
        <Head>
          <title>{ title }</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
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
      </div>
    )
  }
}
