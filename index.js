const exp = require('constants');
const express = require('express');
const { connect } = require('http2');
const app = express()
const PORT = 3000;
const server = app.listen(PORT, ()=> console.log('Server running on port '+PORT))
const io = require('socket.io')(server);

app.use(express.static('public'))

const messages = []

io.on('connection', (socket)=> {
    socket.emit('updateMessages', messages)

    socket.on('newMessage', (data)=> {
        messages.push(data)
        io.emit('updateMessages', messages)
    })
})