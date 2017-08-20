import {EWD} from 'ewd-client'
import sockIo from 'socket.io-client'

let backendStatus = 'waiting'

// Returns the controller as an argument to the callback
// connectToServer(controller => {})
export default function connectToServer (callback) {
  if (backendStatus === 'connected') {
    callback(EWD)

    if (EWD.log) {
      console.log('[EWD] already connected to QEWD server')
    }
    return
  }

  EWD.on('ewd-registered', function () {
    backendStatus = 'connected'
    callback(EWD)
    if (EWD.log) console.log('[EWD] connected to QEWD server')
  })

  EWD.on('ewd-reregistered', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'connected'
      callback(EWD)

      if (EWD.log) console.log('[EWD] reconnected to QEWD server')
    }
  })

  EWD.on('socketDisconnected', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'disconnected'
      callback(null)

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
}
