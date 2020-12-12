<template>
  <div class="chat-wrapper">
    <p class="header">Friends</p>
    <div v-for="friend in friends" :key="friend.id">
      <div class="person" @click="toggleChat(friend)">
        <img class="img-wrapper" :src="friend.imageUrl" alt="" />
        <p>
          {{ friend.name + " " + friend.surname }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Chat",
  props: {
      friends: Array,
  },

  methods: {
    toggleChat(friend) {
        this.$emit('showChat', friend)
    },

  },

};
</script>

<style scroped>
.chat-wrapper {
  position: fixed;
  right: 0;
  top: 0;
  width: 18%;
  background: #212020;
  height: 100%;
  margin-top: 3rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.person {
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0.5rem 0.5rem;
}
.chat-wrapper .header {
  color: lightgray;
  /* font-size: 18px; */
  padding: 0 0.5rem;
  /* text-align: center; */
}
.person:hover {
  cursor: pointer;
}

.person p {
  color: white;
  margin: 0;
  margin-left: 1rem;
}

.img-wrapper {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
}
</style>