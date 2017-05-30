import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import Dashboard from '../../components/Dashboard'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100
  }
}

class Index extends Component {
  render () {
    return (
      <Dashboard>
        <div style={styles.container}>
          <Typography type='display1' gutterBottom>Painel de Administração do Olimat</Typography>
          <Typography type='subheading' gutterBottom>Material-UI</Typography>
        </div>
      </Dashboard>
    )
  }
}

export default Index
