<template>
  <div>
    <div class="friends">
      <p v-if="friends">{{ title }} ({{ friends.length }})</p>
      <div
        v-for="friend in friends"
        :key="friend.id"
        class="friend"
        @click="friendClicked(friend.id)"
      >
        <img v-bind:src="getFriendImage(friend.imageUrl)" alt="" />
        <p>{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friends",
  props: {
    friends: Array,
    title: String,
  },
  methods: {
    friendClicked(friendId) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: friendId },
        })
        .catch(() => {});
    },
    getFriendImage(img) {
      if (img) {
        return img;
      }
      return "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
    },
  },
};
</script>

<style scoped>
.friends {
  display: flex;
  background: #303030;
  color: white;
  justify-content: center;
  /* border: solid 1px lightgray; */
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* height: 50%; */
  /* overflow: scroll; */
  /* padding: 0.2rem 0; */
}
.friends p {
  text-align: center;
  width: 100%;
  font-weight: bold;
  margin: 0.5rem;
}

.friend {
  width: 7rem;
  height: 10rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  margin: 0.2rem;
  background: #212020;
}

.friend img {
  width: 7rem;
  height: 10rem;
  overflow: hidden;
  object-fit: cover;
}

.friend p {
  margin: 0.5rem;
  font-weight: normal;
}
</style>