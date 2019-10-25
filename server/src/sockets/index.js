const rug = require('random-username-generator')

rug.setSeperator('')

const sockets = {
  init: (server) => {
    const io = require('socket.io').listen(server)
    const getRoomId = (id) => `room-${id}`

    function createMessage(socket, message) {
      message = {
        sender: socket.data,
        content: message,
        timestamp: 123
      }

      socket.room.chat.history.push(message)

      return message
    }

    function createRoom(room, host, roomId) {
      room.id = getRoomId(roomId)
      room.created = true
      room.video = {
        meta: {
          source:
            'http://twist.moe/anime/recreators/[HorribleSubs] Re-Creators - 02v2 [1080p].mp4',
          currentTime: 0
        },
        status: {
          isPaused: false,
          isBuffering: false
        }
      }
      room.chat = {
        history: [],
        maxHistory: 50
      }

      room.host = host.id
    }

    io.use((socket, next) => {
      const { id } = socket.handshake.query

      socket.join(getRoomId(id))
      socket.data = {
        role: 'guest',
        username: rug.generate()
      }

      const room = io.sockets.adapter.rooms[getRoomId(id)]

      if (!room.hasOwnProperty('created')) {
        createRoom(room, socket, id)
        socket.data.role = 'host'
      }

      if (room.sockets[socket.id] === true)
        room.sockets[socket.id] = socket.data

      socket.data = room.sockets[socket.id]
      socket.room = io.sockets.adapter.rooms[getRoomId(id)]

      next()
    })

    io.on('connection', (socket) => {
      console.log(`${socket.id}@${socket.room.id} - connected!`)

      socket.emit('room/connection', {
        user: socket.data,
        messages: socket.room.chat.history
      })

      io.in(socket.room.id).emit('chat/message', {
        sender: 'info',
        content: `${socket.data.username} has connected`,
        timestamp: 0
      })
      io.in(socket.room.id).emit('room/updateConnected', socket.room.sockets)

      socket.on('disconnect', () => {
        console.log(`${socket.id}@${socket.room.id} - disconnected!`)

        io.in(socket.room.id).emit('chat/message', {
          sender: 'info',
          content: `${socket.data.username} has disconnected`,
          timestamp: 0
        })

        // Socket was the host, pass it on.
        if (socket.data.role === 'host') {
          const newHost = Object.keys(socket.room.sockets)[
            Math.floor(Math.random() * Object.keys(socket.room.sockets).length)
          ]

          if (newHost) {
            socket.room.sockets[newHost].role = 'host'
            socket.room.host = newHost

            io.to(newHost).emit('room/updateUser', socket.room.sockets[newHost])
          }
        }

        io.in(socket).emit('room/updateConnected', socket.room.sockets)
      })

      // Chat messaging
      socket.on('chat/message', (message) => {
        console.log(`${socket.id}@${socket.room.id} - has sent a message!`)

        message = createMessage(socket, message)

        io.in(socket.room.id).emit('chat/message', message)
      })

      // Request the video
      socket.on('video/requestVideoSource', () => {
        socket.emit('video/updateVideoSource', socket.room.video.meta.source)
      })

      // Change the paused state
      socket.on('video/changePauseState', (paused) => {
        console.log(
          `${socket.id}@${socket.room.id} - has changed pause to '${paused}'!`
        )

        socket.room.video.status.isPaused = paused
        socket.to(socket.room.id).emit('video/changePauseState', paused)
      })

      // Request synchronization
      socket.on('video/requestSync', () => {
        console.log(`${socket.id}@${socket.room.id} - has requsted to sync-up!`)

        io.to(socket.room.host).emit('video/requestHostData')
      })

      // When host returns the data
      socket.on('video/receiveHostData', (data) => {
        console.log(`${socket.id}@${socket.room.id} - has sent the host data!`)

        const video = socket.room.video

        video.meta.currentTime = data.currentTime

        io.in(socket.room.id).emit('video/sync', video)
      })

      socket.on('video/startBuffering', () => {
        console.log(`${socket.id}@${socket.room.id} - has started buffering`)

        socket.to(socket.room.id).emit('video/startBuffering')
      })

      socket.on('video/stopBuffering', () => {
        console.log(`${socket.id}@${socket.room.id} - has stopped buffering`)

        socket.to(socket.room.id).emit('video/stopBuffering')
      })
    })
  }
}

module.exports = sockets
