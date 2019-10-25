<template>
  <div id="room">
    <div class="room-container">
      <!--
      The header/info. 
      Has: room name & id, currently playing
      -->
      <div class="header-container is-hidden-mobile">
        123
        <room-header />
      </div>

      <!--
      The main body
      Has: video & chat
      -->
      <div class="main-container">
        <div class="video-container">
          <video-player />
        </div>

        <transition>
          <div v-if="mobile.chatToggle" class="mobile-settings is-hidden-desktop">
            <button class="block" @click="toggleChat">
              <i class="mdi mdi-chevron-up" /> Chat
            </button>
          </div>
        </transition>

        <transition name="slide">
          <div v-if="!mobile.chatToggle" class="chat-container">
            <button class="is-hidden-desktop" @click="toggleChat">
              <i class="mdi mdi-chevron-down" /> Chat
            </button>
            <room-chat />
          </div>
        </transition>
      </div>

      <!--
      Everything below the main body
      Has: settings, moderation, playlists (later)
      -->
      <div class="footer-container is-hidden-mobile">
        123
        <room-settings />
      </div>
    </div>
  </div>
</template>

<script>
import RoomChat from "@/components/room/RoomChat";
import RoomHeader from "@/components/room/RoomHeader";
import RoomSettings from "@/components/room/RoomSettings";

import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "Room",
  components: { RoomChat, RoomHeader, RoomSettings, VideoPlayer },
  data() {
    return {
      mobile: {
        chatToggle: false
      }
    };
  },
  methods: {
    toggleChat() {
      this.mobile.chatToggle = !this.mobile.chatToggle;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

@keyframes slide-in {
  100% {
    transform: translateY(-100%);
  }
  0% {
    transform: translateY(0%);
  }
}

@keyframes slide-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.slide-enter-active {
  transition: all 0.5s slide-in;
}
.slide-leave-active {
  transition: all 1.5s slide-out;
}

#room {
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
}

.main-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;

  button {
    min-height: 45px;
  }
}
.mobile-settings {
  flex-grow: 1;

  position: relative;

  button {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
.chat-container {
  flex-grow: 1;
  min-width: 380px;
  max-width: 480px;
}
.header-container {
  background-color: red;
}
.footer-container {
  background-color: blue;
}

@media only screen and (max-width: $tablet-breakpoint) {
  .main-container {
    position: relative;
    top: 0;
    left: 0;
    height: 100vh;
    max-height: 100vh;
    min-width: 100%;

    flex-direction: column;
  }
  .video-container {
    min-width: 100%;
  }
  .chat-container {
    top: 0;
    min-width: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
}
@media only screen and (min-width: $small-desktop-breakpoint) {
  .video-container {
    max-width: 720px;
  }
}
@media only screen and (min-width: $desktop-breakpoint) {
  .video-container {
    max-width: 960px;
  }
}
</style>