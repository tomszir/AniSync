<template>
  <div id="video-player" ref="video-container" :class="orientation == 1 ? 'landscape' : ''">
    <!--
    The actual video element
    -->
    <video ref="video" preload="auto" autoplay>
      <source :src="video.source" />
    </video>

    <!--
    Shows if currently buffering
    -->
    <div class="overlay" v-if="video.status.buffering">
      <div class="overlay-icon">
        <i class="spinner" />
      </div>
    </div>

    <!--
    Shows if paused
    -->
    <div class="overlay" v-if="video.status.paused">
      <div class="overlay-icon">
        <i class="mdi mdi-pause" />
      </div>
    </div>

    <!--
    The area which you can click to pause
    -->
    <div class="click-overlay" @click="handlePause" @dblclick="handleFullscreen" />

    <!--
    The controls of the video
    -->
    <video-controls :handlePause="handlePause" :handleFullscreen="handleFullscreen" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoControls from "@/components/video/VideoControls";

export default {
  name: "VideoPlayer",
  components: { VideoControls },
  data() {
    return {
      orientation: 0
    };
  },
  computed: {
    ...mapState({
      video: state => state.video
    })
  },
  methods: {
    handlePause() {
      if (this.video.status.paused) {
        this.$store.dispatch("video/play");
      } else {
        this.$store.dispatch("video/pause");
      }
    },
    handleFullscreen() {}
  },
  mounted() {
    const video = this.$refs["video"];
    const container = this.$refs["video-container"];

    // Initiliaze the video
    this.$store.dispatch("video/init", { video, container });
    this.$store.commit(
      "video/SET_SOURCE",
      "https://at-cdn.bunny.sh/anime/bokunoheroacademias4/[HorribleSubs] Boku no Hero Academia - 64 [1080p].mp4"
    );

    window.onorientationchange = event => {
      if (screen.orientation.angle >= 90) {
        this.orientation = 1;
      } else {
        this.orientation = 0;
      }
      console.log(this.orientation);
    };
  }
};
</script>

<style lang="scss" scoped>
#video-player {
  width: 100%;
  min-width: 280px;
  max-width: 960px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #000;
}

.landscape {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  height: 100vh;
}
#video-player.theater-mode {
  max-width: 80%;
}

video {
  width: 100% !important;
  height: auto !important;
}

video::-webkit-media-controls {
  display: none !important;
}

.overlay {
  left: 0;
  bottom: 0;
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.4);
}

.click-overlay {
  top: 0;
  left: 0;
  position: absolute;

  width: 100%;
  height: 90%;
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
</style>