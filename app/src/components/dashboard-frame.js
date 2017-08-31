import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import MoreVert from 'material-ui-icons/MoreVert'
import withRoot from './withRoot'
import DashboardDrawer from './dashboard-drawer'

const styles = {
  dashboardFrame: {
    position: 'relative',
    //width: '100%'
    marginLeft: 250,
  },
  appBar: {
    backgroundColor: '#063d01',
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  main: {
    flexGrow: 1,
    marginTop: 30,
    justifyContent: 'center'
  },
  paper: {
    padding: '16px 32px',
  },
}

class DashboardFrame extends Component {
  state = {
    drawerOpen: true,
  }

  // handleDrawerClose = () => {
  //   this.setState({ drawerOpen: false });
  // }

  // handleDrawerToggle = () => {
  //   this.setState({ drawerOpen: !this.state.drawerOpen });
  // }

  render () {
    let { children, title = 'Painel' } = this.props

    return (
      <div style={styles.dashboardFrame}>
        <Head>
          <title>{ title }</title>
        </Head>
        <AppBar style={styles.appBar}>
          <Toolbar>
            <Typography type='title' color='inherit' style={styles.flex}>{title}</Typography>
            <IconButton color='contrast'>
              <MoreVert />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DashboardDrawer
           docked={true}
           open={this.state.drawerOpen}
           />

        <Grid container style={styles.main}>
          <Grid item xs={12}>
            <Paper style={styles.paper}>
              { children }
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

DashboardFrame.propTypes = {
  children: PropTypes.node.isRequired
}

export default withRoot(DashboardFrame)
