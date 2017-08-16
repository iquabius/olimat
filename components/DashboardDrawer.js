import React from 'react'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Link from 'next/link'

const styles = {
  list: {
    width: 250,
    flex: 'initial'
  }
}

export default class DashboardDrawer extends React.Component {
  render () {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        >
        <List style={styles.list} disablePadding>
          <ListItem
            component='a'
            href='/dashboard/questions'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Questões' />
          </ListItem>

          <ListItem
            component='a'
            href='/dashboard/tests'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Provas' />
          </ListItem>

          <Divider />

          <ListItem
            component='a'
            href='/dashboard/editions'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Edições' />
          </ListItem>

          <ListItem
            component='a'
            href='/dashboard/cities'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Cidades' />
          </ListItem>

          <ListItem
            component='a'
            href='/dashboard/regions'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Regiões' />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
