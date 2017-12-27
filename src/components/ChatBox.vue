<template>
  <div class="chatbox">
    <h1>ChatBox</h1>
    <!-- Container for all the messages in the chat intended to be rendered vertically ontop of one another -->
    <div class="message-display">
      <div v-for="message in messages" v-bind:key="message.id">
        <span>{{ message.text }}</span>
        <span class="sender-label"> - {{message.sender}}</span>
        </div>
    </div>
    <div class="message-entry">
      <input v-model="newMessageText" type="text" placeholder="Type message here...">
      <button v-on:click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
// Load clientside socket
import io from 'Socket.io-client'

export default {
  name: 'ChatBox',
  data () {
    var socket = io("http://localhost:3000/");
    socket.on('user_connected', () => console.log("A user connected!"));
    socket.on('message', (message) => this.receive(message, "anon"));

    return {
      newMessageText: '',
      socket,
      messages: [
        {sender: 'Thomas', text: 'Bro'},
        {sender: 'Morgan', text: 'Bro..'},
        {sender: 'Scott', text: '..Bro'},
        {sender: 'Kroum', text: 'Broseph'}
      ]
    }
  },
  methods : {
    sendMessage: function (){
      console.log('sending: ' + this.newMessageText);   
      this.socket.emit('message', this.newMessageText);
      this.newMessageText = '';
    },
    receive: function(message, sender){
      console.log(message)
      this.messages.push({'sender': sender, 'text': message})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatbox {
  border: 1px solid grey
}
.sender-label {
  font-size: small
}
</style>
