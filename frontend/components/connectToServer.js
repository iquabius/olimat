import {EWD} from 'ewd-client'
import sockIo from 'socket.io-client'

let backendStatus = 'waiting'

export default function connectToServer (component) {
  if (backendStatus === 'connected') {
    // Also keep state on component to trigger rendering when the status change
    component.setState({ backendStatus: backendStatus })

    if (EWD.log) {
      console.log('[EWD] already connected to QEWD server')
    }
    return
  }

  EWD.on('ewd-registered', function () {
    backendStatus = 'connected'
    component.setState({ backendStatus: backendStatus })
    if (EWD.log) console.log('[EWD] connected to QEWD server')
  })

  EWD.on('ewd-reregistered', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'connected'
      component.setState({ backendStatus: backendStatus })

      if (EWD.log) console.log('[EWD] reconnected to QEWD server')
    }
  })

  EWD.on('socketDisconnected', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'disconnected'
      component.setState({ backendStatus: backendStatus })

      if (EWD.log) console.log('[EWD] disconnected from QEWD server')
    }
  })

  // TODO: handle this configuration in a better way
  const ewdConfig = {
    application: 'OliMAT',
    mode: 'development',
    log: true,
    io: sockIo,
    url: 'http://localhost:8080'
  }

  EWD.log = true

  if (EWD.log) console.log('[EWD] starting')
  EWD.start(ewdConfig)

  return EWD
}
