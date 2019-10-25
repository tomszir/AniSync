<template>
  <div id="chat-message" :self="self">
    <div class="profile-icon">
      <i class="caret-left" />
      <i class="caret-right" />
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      />
    </div>
    <div class="body">
      <div class="author">Some random guy</div>
      <div
        class="content"
      >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: ["self"]
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

$msg-bg-color: lighten($bg-color, 5%);
$self-msg-bg-color: lighten(clr(primary), 25%);

.caret-left {
  width: 0;
  height: 0;

  right: 0;
  position: absolute;

  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid $msg-bg-color;
}
.caret-right {
  left: 0;
  width: 0;
  height: 0;

  display: none;
  position: absolute;

  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid $self-msg-bg-color;
}

#chat-message {
  display: flex;
  margin-top: 10px;
}
#chat-message[self] {
  flex-direction: row-reverse;

  .caret-left {
    display: none;
  }
  .caret-right {
    display: inline;
  }
  .profile-icon {
    padding-right: 0;
    padding-left: 20px;
  }
  .body {
    color: #000;
    background-color: $self-msg-bg-color;
  }
  .author {
    display: none;
    margin: 0;
  }
  .content {
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.profile-icon {
  padding-right: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.profile-icon img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: black;
}
.body {
  padding: 10px;
  color: #e4e6e7;
  background-color: $msg-bg-color;
  border-radius: 5px;
}
.author {
  color: clr(primary);
  margin-bottom: 10px;
}
</style>