import {Component} from 'react'
import connectToServer from './connectToServer'

const withController = BaseComponent => {
  class WithController extends Component {
    constructor (props) {
      super(props)
      this.state = {backendStatus: 'waiting'}
    }

    static getInitialProps (ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx)
      }

      return {}
    }

    componentDidMount () {
      let controller = connectToServer(this) // Maybe this can be in the
      this.setState({controller})            // constructor?
    }

    render () {
      // The controller only has the send() method after the connection is
      // established (backendStatus === 'connected')
      if (this.state.backendStatus === 'waiting') {
        return (<div>Connectando ao servidor...</div>)
      } else {
        return (
          <BaseComponent
            controller={this.state.controller}
            {...this.props} />
        )
      }
    }
  }

  WithController.displayName = `withController(${BaseComponent.displayName})`

  return WithController
}

export default withController
