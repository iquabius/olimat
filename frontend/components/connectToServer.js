import { EWD as controller } from 'ewd-client'
import sockIo from 'socket.io-client'

const ewdConfig = {
  application: 'OliMAT',
  mode: 'development',
  log: true,
  io: sockIo,
  url: 'http://localhost:8080'
}

let backendStatus = 'disconnected'
controller.log = process.env.NODE_ENV !== 'production'

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

  backendStatus = 'waiting'
  controller.start(ewdConfig)

  if (controller.log) {
    console.log('[EWD] starting')
  }
}
