<template>
  <div class="chatbox">
    <h1>ChatBox</h1>
    <input v-model="username" type="text" placeholder="Type username here...">
    <!-- Container for all the messages in the chat intended to be rendered vertically ontop of one another -->
    <div class="message-display">
      <div v-for="message in messages" v-bind:key="message.id">
        <span>{{ message.text }}</span>
        <span class="sender-label"> - {{message.sender}}</span>
        </div>
    </div>
    <div class="message-entry">
      <input v-model="newMessageText" type="text" placeholder="Type message here...">
      <button v-on:click="send">Send</button>
    </div>
  </div>
</template>

<script>
// Load clientside socket
import io from 'Socket.io-client'

export default {
  name: 'ChatBox',
  data () {
    var socket = io(process.env.API_SERVER);
    socket.on('user_connected', () => console.log("A user connected!"));
    socket.on('message', (senser, message) => this.receive(senser, message));
    return {
      username: '',
      newMessageText: '',
      socket,
      messages: []
    }
  },
  methods : {
    send: function (){
      this.socket.emit('message', this.username, this.newMessageText);
      this.newMessageText = '';
    },
    receive: function(sender, message){
      if (sender == '') { sender = 'anon' }
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
