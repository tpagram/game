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
      <input type="text" placeholder="Type message here...">
      <button>Send</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatBox',
  data () {
    return {
      messages: [
        {sender: 'Thomas', text: 'Bro'},
        {sender: 'Morgan', text: 'Bro..'},
        {sender: 'Scott', text: '..Bro'},
        {sender: 'Kroum', text: 'Broseph'}
      ]
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
