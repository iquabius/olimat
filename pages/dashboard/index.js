import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import DashboardFrame from '../../components/DashboardFrame'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100
  }
}

class Index extends Component {
  render () {
    return (
      <DashboardFrame>
        <div style={styles.container}>
          <Typography type='display1' gutterBottom>Painel de Administração do Olimat</Typography>
          <Typography type='subheading' gutterBottom>Material-UI</Typography>
        </div>
      </DashboardFrame>
    )
  }
}

export default Index
