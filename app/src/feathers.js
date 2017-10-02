import io from 'socket.io-client'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'

// Check if is running on the browser
// TODO Get host and port from environment variables
const apiUrl = typeof window !== 'undefined'
        ? 'http://localhost:3001' // on browser
        : 'http://backend:3001'   // on Node.js

const socket = io(apiUrl)
const client = feathers()

client.configure(hooks())
client.configure(socketio(socket))

export default client
