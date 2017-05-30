import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import App from './App'

class Dashboard extends Component {
  render () {
    let { children, title = 'Olimat 🔥' } = this.props

    return (
      <App>
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

      </App>
    )
  }
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dashboard
