const express = require('express')
const { join } = require('path')

const http = require('http')

const app = express()

const { Server } = require('socket.io')


const server = http.createServer(app)

const io = new Server(server)

app.get('/', (req,res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) =>{
    console.log('user connected')

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      
        io.emit('send message to all user', msg)
    });

    socket.on('typing', () =>{
        socket.broadcast.emit('show typing status')
    })

    socket.on('stop typing', () =>{
        socket.broadcast.emit('clear typing status')
    })
      
})



server.listen(5000,() => {
    console.log('Listening on port 5000')
})

