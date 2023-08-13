const socket = io('http://localhost:3000/');

document.addEventListener('DOMContentLoaded', function (){
    const formMessage = document.querySelector('#formMessage');
    formMessage.addEventListener('submit', (event)=> handleChat.newMessage(event))
    socket.on('updateMessages', (data) => handleChat.updateMessages(data))
})

const handleChat = {
    newMessage: (event)=> {
        event.preventDefault()
        const message = document.forms['formMessage']['message'].value
        const user = document.forms['formMessage']['user'].value
        document.querySelector("#user").style.visibility = 'hidden'
        socket.emit('newMessage', {message: message, user: user})
    },
    updateMessages: (data) => {
        const messagesContainer = document.querySelector('#messagesContainer');
            handleChat.insertMessagesOnScreen(data, messagesContainer);
    },
    insertMessagesOnScreen: (data, messagesContainer) => {
        messagesContainer.innerHTML = `<ul class='bg-light'>`
        data.forEach(messageData => {
            messagesContainer.innerHTML += `
                <li class='card border-0'>
                    <p class='card-header'>${messageData.user}: ${messageData.message}</p>
                </li>`
        })
        messagesContainer.innerHTML += `</ul>`
        document.forms['formMessage']['message'].value = ''
    }  
} 
