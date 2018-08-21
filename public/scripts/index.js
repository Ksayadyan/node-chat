let socket = io();

socket.on('connect',()=>{
  console.log('Connected to server');

})

socket.on('disconnect',()=>{
  console.log('Disconnected from server');
})

socket.on('newMessage',(message)=>{
  $("#messageContainer").append("<div class='recievedMessage'>"+message.text+"</div>")
  console.log('newMessage',message);
})

socket.on('newUserConnect',(message)=>{
  console.log('new user connect')
  document.getElementById('newUser').style.opacity = '1';
  setTimeout(()=>{
    document.getElementById('newUser').style.opacity = '0';
  },1500);
})

$('#button').click(()=>{
  if($('#messageField').val().length){
    sendMessage($('#messageField').val(),'Anonym');
    $("#messageContainer").append("<div class='sentMessage'>"+$('#messageField').val()+"</div>");
    $('#messageField').val('');
  }
})
$('body').keypress(function(event){
  if(event.key === 'Enter'){
    if($('#messageField').val().length){
      sendMessage($('#messageField').val(),'Anonym');
      $("#messageContainer").append("<div class='sentMessage'>"+$('#messageField').val()+"</div>");
      $('#messageField').val('');
    }
  }
});

function sendMessage(content,name){
  socket.emit('createMessage',{
    from: name,
    text: content,
  })
}
