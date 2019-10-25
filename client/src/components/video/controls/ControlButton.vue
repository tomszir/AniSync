<template>
  <div id="control-button">
    <i :class="'mdi mdi-' + icon" />
  </div>
</template>

<script>
export default {
  name: "ControlButton",
  props: ["icon"]
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

$button-size: 32px;
$button-font-size: 20px;

#control-button {
  width: $button-size;
  height: 100%;

  padding: 0;

  color: $text-color;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: $button-font-size;

  cursor: pointer;
}

#control-button:hover .mdi {
  text-shadow: 0 0 5px $text-color;
}
</style>