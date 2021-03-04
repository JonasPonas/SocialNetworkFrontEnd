<template>
  <div class="wrapper-p">
    <div class="chat-wrapper">
      <p class="header">Friends</p>
      <div v-for="friend in friends" :key="friend.id">
        <div class="person" @click="openProfile(friend.id)">
          <img class="img-wrapper" :src="getImage(friend.imageUrl)" alt="" />
          <p style="font-size: 20px">
            {{ friend.name + " " + friend.surname }}
          </p>
          <div class="ml-auto">
            <b-button variant="success" size="md" @click="toggleChat(friend)">
              Chat
            </b-button>
          </div>
        </div>
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
      this.$emit("showChat", friend);
    },
    getImage(img) {
      if (img) {
        return img;
      }
      return "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
    },
    openProfile(userId) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: userId },
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
<style scroped>
.wrapper-p {
  /* padding: 0.5rem; */
  position: fixed;
  right: 0;
  top: 0;
  width: 28%;
  padding: 1rem;
  background: #212020;
  height: 100%;
  margin-top: 2rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}
.chat-wrapper {
  background: #303030;
  padding: 0.7rem;
  height: 100%;
  /* align-items: center; */
}

.person {
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0.5rem 0.5rem;
}
.chat-wrapper .header {
  margin-top: 0.4rem;
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
}
</style>