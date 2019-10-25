export default {
  namespaced: true,
  state: {
    // The video/container objects
    video: null,
    container: null,

    // Some of the metadata
    source: null,
    duration: null,
    currentTime: null,

    // Status of the video
    status: {
      paused: false,
      buffering: false
    }
  },
  mutations: {
    SET_VIDEO(state, video) {
      state.video = video
    },
    SET_CONTAINER(state, container) {
      state.container = container
    },
    CHANGE_VIDEO_TIME(state, currentTime) {
      state.video.currentTime = currentTime
    },

    SET_SOURCE(state, source) {
      state.source = source
    },
    SET_DURATION(state, duration) {
      state.duration = duration
    },
    SET_CURRENT_TIME(state, currentTime) {
      state.currentTime = currentTime
    },

    SET_PAUSED(state, paused) {
      state.status.paused = paused
    },
    SET_BUFFERING(state, buffering) {
      state.status.buffering = buffering
    }
  },
  actions: {
    init({ commit }, { video, container }) {
      commit('SET_BUFFERING', true)

      commit('SET_VIDEO', video)
      commit('SET_CONTAINER', container)

      // The video has finished loading it's metadata
      video.onloadedmetadata = () => {
        commit('SET_DURATION', video.duration)
        commit('SET_CURRENT_TIME', video.currentTime)
        commit('SET_BUFFERING', false)
      }

      // Update the currentTime for vue
      video.ontimeupdate = () => {
        commit('SET_CURRENT_TIME', video.currentTime)
      }

      video.onwaiting = () => commit('SET_BUFFERING', true)
      video.onplaying = () => commit('SET_BUFFERING', false)
    },

    changeTime({ commit }, newTime) {
      commit('SET_CURRENT_TIME', newTime)
      commit('CHANGE_VIDEO_TIME', newTime)
    },

    pause({ state, commit }) {
      commit('SET_PAUSED', true)
      state.video.pause()
    },

    play({ state, commit }) {
      commit('SET_PAUSED', false)

      state.video.play().catch(() => {})
    }
  }
}
