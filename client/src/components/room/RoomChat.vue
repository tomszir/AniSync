<template>
  <div id="room-chat">
    <div class="container">
      <div class="messages">
        <chat-message />
        <chat-message self />
        <chat-message />
      </div>
      <div class="inputs">
        <input class="block" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from "@/components/room/chat/ChatMessage";

export default {
  name: "RoomChat",
  components: { ChatMessage }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

#room-chat {
  width: 100%;
  height: 100%;

  $inputs-padding: 5px;

  .container {
    top: 0;
    left: 0;
    position: relative;
    background-color: $secondary-bg-color;
    min-height: 100%;
    padding: 10px 0;
  }
  .messages {
    top: 0;
    bottom: $input-height + ($inputs-padding * 2);

    overflow: auto;
    position: absolute;
    padding: 0 10px;
  }
  .inputs {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px;
  }
  .inputs input {
    border-radius: 5px;
  }

}
</style>