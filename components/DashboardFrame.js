import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import MoreVert from 'material-ui-icons/MoreVert'
import App from './App'

const styles = {
  dashboardFrame: {
    position: 'relative',
    width: '100%'
  },
  appBar: {
    backgroundColor: '#063d01',
    position: 'relative'
  },
  flex: {
    flex: 1
  }
}

class DashboardFrame extends Component {
  render () {
    let { children, title = 'Olimat 🔥' } = this.props

    return (
      <App>
        <Head>
          <title>{ title }</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <div style={styles.dashboardFrame}>
          <AppBar style={styles.appBar}>
            <Toolbar>
              <IconButton contrast>
                <MenuIcon />
              </IconButton>
              <Typography type='title' colorInherit style={styles.flex}>Olimat</Typography>
              <IconButton contrast>
                <MoreVert />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        { children }

      </App>
    )
  }
}

DashboardFrame.propTypes = {
  children: PropTypes.node.isRequired
}

export default DashboardFrame
