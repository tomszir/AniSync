<template>
  <div id="room">
    <div v-if="room.status.isConnecting" class="loading-overlay">
      <div class="overlay-icon">
        <i class="spinner" />
      </div>
    </div>
    <div v-else class="flex-container" :theater="video.status.isTheaterMode">
      <div class="flex-inner-container">
        <div class="flex-header">
          <div>
            <div class="room-name">Name of the room</div>
            <div class="room-id">#{{ roomId }}</div>
          </div>
        </div>
        <div class="flex-body">
          <div class="flex-video">
            <video-player />
          </div>
          <div class="flex-chat">
            <room-chat />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoPlayer from "@/components/VideoPlayer";
import RoomChat from "@/components/room/RoomChat";

export default {
  name: "Room",
  components: { VideoPlayer, RoomChat },
  data() {
    return {
      roomId: this.$route.params.id,
      connected: []
    };
  },
  computed: {
    ...mapState({
      room: state => state.room,
      video: state => state.video
    })
  },
  mounted() {
    this.$store.dispatch("room/connect", this.roomId).then(socket => {
      socket.emit("video/requestVideoSource");
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
body {
  margin: 0;
  padding: 0;
}
#room-chat {
  height: 100%;
}
.room-name {
  font-family: $secondary-font;
  font-size: 26px;
  color: clr(primary);
}
.room-id {
  color: #bec3c6;
}
.user-info {
  color: #fff;
}
.loading-overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg-color;
}
.overlay-icon {
  width: 40px;
  height: 40px;

  font-size: 22px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);
}
.overlay-icon i {
  color: #fff;
}
.flex-header {
  width: 100%;
  max-height: 10%;
  background-color: #2e3235;
  padding: 20px;
  margin-bottom: 20px;

  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
}
.flex-inner-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-body {
  width: 100%;
  background-color: yellow;

  display: flex;
  justify-content: center;

  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
}
.flex-video {
  max-width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-chat {
  flex-grow: 1;
  align-self: stretch;
  background-color: #2e3235;
}
.flex-container {
  margin: 0 auto;
  width: 70%;
  height: 100vh;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flex-container[theater] {
  justify-content: start;
  width: 100%;
}
.flex-container[theater] .flex-inner-container {
  height: 100%;
}
.flex-container[theater] .flex-header {
  display: none;
}
.flex-container[theater] .flex-body {
  height: 100%;
  width: 100%;
  order: 1;
}
.flex-container[theater] .flex-video {
  height: 100%;
  min-width: 75%;
}
.flex-container[theater] .flex-chat {
  height: 100%;
  width: 100%;
}
.flex-container[theater] #video-player {
  height: 100%;
  max-width: 100%;
}
</style>
