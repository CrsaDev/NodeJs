const socket = io('http://localhost:3000');
let myId = ""
let otherUser = ""

const users = document.querySelector('#users')
const msgField = document.querySelector('#msg-field')
const src = document.querySelector('#search')
const container = document.querySelector('.products-container')

const sendBtn = document.querySelector('#send-msg')
const disconnectBtn = document.querySelector('#disconnect')

sendBtn.onclick = () => {
    let data = msgField.value
    socket.emit('user-private-msg',{sender:myId,receiver:otherUser,msg:data})
    container.innerHTML += "<p> Me: " + data + "</p>"
}

socket.on('msg',(data) => {
    container.innerHTML += "<p> Stranger: " + data.msg + "</p>"
})

disconnectBtn.onclick = () => {

}

socket.on('user-refresh',(data)=> {
    users.innerText = data
})

socket.on('idSent',(data) => {
    myId = data.id
    console.log(myId)
})

socket.on('connection-created',(data) => {
    console.log('Connection created with: ' + data.id)
    otherUser = data.id
    src.hidden = true;
})

socket.on('connection-interrupt',() => {
    otherUser = ""
})

src.onclick = () => {
    //Emit user is searching
    socket.emit('searching',{id:myId})
    console.log('research begun')
}

//btn to emit connection interrupt