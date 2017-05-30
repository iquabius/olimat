import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet, MuiThemeProvider } from 'material-ui/styles'
import { getDefaultContext } from '../styles/createDefaultContext'

const globalStyles = createStyleSheet('App', theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    body: {
      margin: 0
    },
    a: {
      color: 'inherit'
    }
  }
}))

let AppWrapper = props => (<span>{props.children}</span>)

AppWrapper = withStyles(globalStyles)(AppWrapper)

class App extends Component {
  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    let { children, title = 'Olimat 🔥' } = this.props
    const { styleManager, theme } = getDefaultContext()

    return (
      <MuiThemeProvider styleManager={styleManager} theme={theme}>
        <AppWrapper>
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
        </AppWrapper>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
