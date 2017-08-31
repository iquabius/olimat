import React, {Component} from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import DashboardFrame from '../../components/dashboard-frame'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100
  }
}

class Index extends Component {
  state = {
    open: false
  };

  render () {
    return (
      <DashboardFrame>
        <div style={styles.container}>
          <Typography type='display1' gutterBottom>Painel de Administração do OliMAT</Typography>
          <Typography type='subheading' gutterBottom>Material-UI</Typography>
        </div>
      </DashboardFrame>
    )
  }
}

export default Index
