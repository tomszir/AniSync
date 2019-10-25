<template>
  <div
    id="control-slider"
    ref="container"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseout="onMouseOut"
  >
    <div class="container">
      <div ref="progress" class="current-progress">
        <div class="tracker" />
        <div ref="peek-time" class="peek-time">{{ peekTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ControlProgressSlider",
  props: ["formatTime"],

  data() {
    return {
      down: false,
      peekTime: 0
    };
  },

  computed: {
    ...mapState({
      video: state => state.video
    })
  },

  watch: {
    "video.currentTime": function(time) {
      if (this.down) return;

      const percent = (time / this.video.duration) * 100;
      const progress = this.$refs["progress"];

      progress.style.width = `${percent}%`;
    }
  },

  methods: {
    updateSlider(e) {
      const time = this.$refs["peek-time"];
      const container = this.$refs["container"];

      const rect = container.getBoundingClientRect();
      const width = container.offsetWidth;

      const initial = Math.floor(((e.pageX - rect.left) / width) * 100);
      const percent = initial > 100 ? 100 : initial < 0 ? 0 : initial;
      const peekPosition = width * (percent / 100) - time.offsetWidth / 2;

      this.peekTime = this.formatTime((this.video.duration * percent) / 100);

      time.style.left = `${peekPosition}px`;
      time.style.display = "inline";

      this.$refs["progress"].style.width = `${percent}%`;
    },

    submitSlider(e) {
      const time = this.$refs["peek-time"];
      const container = this.$refs["container"];

      const rect = container.getBoundingClientRect();
      const width = container.offsetWidth;

      const initial = Math.floor(((e.pageX - rect.left) / width) * 100);
      const percent = initial > 100 ? 100 : initial < 0 ? 0 : initial;
      const newTime = this.video.duration * (percent / 100);

      this.$store.dispatch("video/changeTime", newTime);

      time.style.display = "none";
    },

    onMouseDown(e) {
      this.down = true;
      this.updateSlider(e);
    },

    onMouseMove(e) {
      const time = this.$refs["peek-time"];
      const container = this.$refs["container"];

      let percent = Math.floor((e.offsetX / container.offsetWidth) * 100);
      percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

      const position =
        (container.offsetWidth * percent) / 100 - time.offsetWidth / 2;

      this.peekTime = this.formatTime((this.video.duration * percent) / 100);

      time.style.left = `${position}px`;
      time.style.display = "inline";
    },

    onMouseOut() {
      this.$refs["peek-time"].style.display = "none";
    }
  },

  created() {
    window.addEventListener("mousemove", e => {
      if (!this.$refs["container"]) return;
      if (!this.down) return;

      this.updateSlider(e);
    });
    window.addEventListener("mouseup", e => {
      if (!this.$refs["container"]) return;
      if (!this.down) return;

      this.down = false;
      this.submitSlider(e);
    });
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

#control-slider {
  cursor: pointer;

  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
}
#control-slider .container {
  height: 2px;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.3);

  pointer-events: none;
}

#control-slider .current-progress {
  width: 0%;
  height: 100%;

  background-color: clr(primary);

  position: relative;
  pointer-events: none;
}

#control-slider .peek-time {
  top: -35px;

  color: $text-color;

  display: none;
  position: absolute;
  text-align: center;
}

#control-slider .tracker {
  right: -8px;
  bottom: -7px;

  width: 16px;
  height: 16px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.6);

  position: absolute;
  pointer-events: none;
}
#control-slider .tracker::after {
  content: "";

  width: 4px;
  height: 4px;
  border-radius: 50%;

  background-color: #fff;

  position: absolute;
  pointer-events: none;
}
</style>