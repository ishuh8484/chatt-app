const socket =  io('https://localhost:8000');

const form = document.getElementsById('send-container');
const messageInput = document.getElementById('messageInp');
const  messageContainer = document.querySelector(".container");
var audio = new audio('ting.mp3');





const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add('position');
    messageContainer.appendChild(messageElement);
    if(position == 'left'){
        audio.play() 
    }
    
}

form.addEventListner('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append('you: ${message}', 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name)


socket.on('user-joined', name=>{
    apppend('${name} joined the chart', 'right')

})

socket.on('receive', data=>{
    apppend('${data.name}: ${data.message}', 'right')

})

socket.on('leave', name=>{
    apppend('${name} left the chat', 'left')

})


