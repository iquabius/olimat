import {Component} from 'react'
import connectToServer from './connectToServer'

const withController = BaseComponent => {
  class WithController extends Component {
    constructor (props) {
      super(props)
      this.state = { controller: null }
    }

    static getInitialProps (ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx)
      }

      return {}
    }

    componentDidMount () {
      connectToServer(controller => {
        // Trigger a re-rendering after the connection is established
        this.setState({controller})
      })
    }

    render () {
      // The controller only has the send() method after the connection is
      // established (backendStatus === 'connected')
      if (this.state.controller === null) {
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

  if (process.env.NODE_ENV !== 'production') {
    let baseComponentName = BaseComponent.displayName || BaseComponent.name
    WithController.displayName = `withController(${baseComponentName})`
  }

  return WithController
}

export default withController
