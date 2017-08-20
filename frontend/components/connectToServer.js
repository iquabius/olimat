import { EWD as controller } from 'ewd-client'
import sockIo from 'socket.io-client'

let backendStatus = 'waiting'

// Returns the controller as an argument to the callback
// connectToServer(controller => {})
export default function connectToServer (callback) {
  if (backendStatus === 'connected') {
    callback(controller)

    if (controller.log) {
      console.log('[EWD] already connected to QEWD server')
    }
    return
  }

  controller.on('ewd-registered', function () {
    backendStatus = 'connected'
    callback(controller)
    if (controller.log) {
      console.log('[EWD] connected to QEWD server')
    }
  })

  controller.on('ewd-reregistered', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'connected'
      callback(controller)

      if (controller.log) {
        console.log('[EWD] reconnected to QEWD server')
      }
    }
  })

  controller.on('socketDisconnected', function () {
    if (backendStatus === 'waiting') {
      backendStatus = 'disconnected'
      callback(null)

      if (controller.log) {
        console.log('[EWD] disconnected from QEWD server')
      }
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

  controller.log = true

  if (controller.log) {
    console.log('[EWD] starting')
  }
  controller.start(ewdConfig)
}
