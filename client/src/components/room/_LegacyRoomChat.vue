<template>
  <div id="room-chat">
    <div class="chat-container">
      <div class="connected">
        <div class="current-user">
          {{ room.data.user.username }}
          <i
            class="mdi mdi-crown"
            v-if="room.data.user.role === 'host'"
          />
        </div>
        <div class="total-user">{{ connectedUsers }} connected user(s)</div>
      </div>
      <div class="chat-messages" ref="messages">
        <div class="chat-message" v-for="message in messages">
          <div v-if="message.sender === 'info'">
            <div class="msg-content info-message">{{ message.content }}</div>
          </div>
          <div v-else>
            <div class="msg-username">
              {{ message.sender.username }}
              <i
                class="mdi mdi-crown"
                v-if="message.sender.role === 'host'"
              />
            </div>
            <div class="msg-content" v-html="message.html"></div>
          </div>
        </div>
      </div>
      <div class="chat-footer">
        <input
          @keydown.enter="sendMessage"
          v-model="message"
          class="input"
          placeholder="Enter your message"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import emojione from "emojione";

export default {
  name: "RoomChat",
  data() {
    return {
      message: "",
      messages: []
    };
  },
  computed: {
    ...mapState({
      room: state => state.room
    }),
    connectedUsers() {
      return Object.keys(this.room.data.connected).length;
    }
  },
  methods: {
    sendMessage() {
      if (this.message == null || this.message == "") return;

      this.$store.state.room.socket.emit("chat/message", this.message);
      this.message = null;
    },
    toEmoji(input) {
      return emojione.toImage(input);
    }
  },
  mounted() {
    this.$store.state.room.socket.on("chat/message", message => {
      message.html = this.toEmoji(message.content);
      this.messages.push(message);
    });
  },
  updated() {
    const msgs = this.$refs["messages"];
    msgs.scrollTop = msgs.scrollHeight;
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.msg-content {
  /deep/ .emojione {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
}
.connected {
  border-bottom: 1px solid #32373a;
  padding-top: 10px;
  padding-bottom: 15px;
  margin: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
}
.chat-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.info-message {
  color: clr(primary);
  font-weight: bold;
}
.current-user {
  color: clr(primary);
  font-size: 16px;
  width: 100%;
  text-align: left;
  font-family: $secondary-font;
}
.total-user {
  color: #bec3c6;
  font-size: 12px;
  width: 100%;
  text-align: left;
}
.chat-messages {
  position: absolute;
  top: 60px;
  left: 0;
  height: calc(100% - 115px);
  overflow: auto;
  width: 100%;
  padding: 10px;
}
.chat-message {
  display: flex;
  flex-direction: column;
  margin: 15px 0 15px 0;
  color: #bec3c6;
  border-bottom: 1px solid #32373a;
  padding-bottom: 15px;
}
.msg-username {
  color: #dee6ea;
  font-size: 14px;
  margin-bottom: 10px;
}
.msg-content {
  font-size: 14px;
  max-width: 100%;
  align-items: center;
  word-break: break-word; /* Chrome, Safari */
  overflow-wrap: anywhere; /* Firefox */
  display: inline-block;
}
.chat-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  left: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-footer .input {
  width: calc(100% - 60px);
  display: block;
  height: 100%;
}
.chat-footer button {
  width: 60px;
  height: 100%;
}

/* width */
.chat-messages::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

/* Track */
.chat-messages::-webkit-scrollbar-track {
  background: #2d3235;
}

/* Handle */
.chat-messages::-webkit-scrollbar-thumb {
  background: clr(primary);
  border: 4px #2d3235 solid;
  border-top: 10px #2d3235 solid;
  border-bottom: 10px #2d3235 solid;
}

/* Handle on hover */
.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>