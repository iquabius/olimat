import React from 'react'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'
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
            href='/questions'
            onClick={this.props.onRequestClose}
          >
            <ListItemText primary='Questões' />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
