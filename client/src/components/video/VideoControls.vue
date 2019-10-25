<template>
  <div id="video-controls">
    <!--
    Pause button
    -->
    <div class="pause" @click="handlePause">
      <control-button :icon="pauseIcon" />
    </div>

    <!--
    Volume button
    -->
    <div class="volume is-hidden-mobile">
      <control-button :icon="volumeIcon" />
    </div>

    <!--
    Current time
    -->
    <div class="video-text">{{ formattedCurrentTime }}</div>

    <!--
    Progress slider
    -->
    <div class="progress">
      <control-progress-slider :formatTime="formatTime" />
    </div>

    <!--
    Duration
    -->
    <div class="video-text">{{ formattedDuration }}</div>

    <!--
    Theater mode button
    -->
    <div class="theater is-hidden-mobile">
      <control-button icon="television" />
    </div>

    <!--
    Fullscreen button
    -->
    <div class="fullscreen" @click="handleFullscreen">
      <control-button icon="arrow-collapse" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ControlButton from "@/components/video/controls/ControlButton";
import ControlProgressSlider from "@/components/video/controls/ControlProgressSlider";

export default {
  name: "VideoControls",
  components: { ControlButton, ControlProgressSlider },
  props: ["handlePause", "handleFullscreen"],
  data() {
    return {
      progressTime: "--:--"
    };
  },
  computed: {
    ...mapState({
      video: state => state.video
    }),

    pauseIcon() {
      return this.video.status.paused ? "play" : "pause";
    },

    volumeIcon() {
      return "volume-high";
    },

    formattedDuration() {
      return this.video.duration == 0
        ? "--:--"
        : this.formatTime(this.video.duration);
    },

    formattedCurrentTime() {
      return this.video.currentTime == 0
        ? "--:--"
        : this.formatTime(this.video.currentTime);
    }
  },

  methods: {
    handleTheaterMode() {},

    formatTime(seconds) {
      const f = x => (x < 10 ? `0${x}` : x);

      const s = f(Math.floor(seconds % 60));
      const m = f(Math.floor(seconds / 60));

      return `${m}:${s}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#video-controls {
  left: 0;
  bottom: 0;
  position: absolute;

  width: 100%;
  min-height: 48px;
  padding: 0 10px 0 10px;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));

  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.video-text {
  color: $text-color;
  margin: 0 5px 0 5px;
  width: 40px;
  max-width: 40px;
  text-align: center;
}

.progress {
  height: 100%;
  margin: 0 10px 0 10px;

  display: flex;
  align-items: center;

  flex-grow: 1;
}
</style>