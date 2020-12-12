// :isProfile="isProfile"
<template>
  <div>
    <div id="left-column">
      <div id="user-info">
        <img v-bind:src="user.imageURL" alt="" />
        <p id="name">{{ user.name + " " + user.surname }}</p>
        <p v-if="user.city != null">{{user.city + ", " + user.country}}</p>
        <p>Birthday: {{ formatDate(user.dateOfBirth) }}</p>
      </div>

      <div id="friends">
        <p>Friends ({{friends.length}})</p>
        <div v-for="friend in friends" :key="friend.id" class="friend" @click="friendClicked(friend.id)">
          <img v-bind:src="friend.imageUrl" alt="" />
          <p>{{ friend.name }}</p>
        </div>
      </div>
    </div>
    <feed></feed>
  </div>
</template>
<script>
import Feed from "@/components/Feed.vue";
import { ipAddress } from "../modules/Constants";
import axios from "axios";

export default {
  components: {
    feed: Feed,
  },
  data: function () {
    return {
      user: {},
      friends: [],
      userId: "",
    };
  },
  methods: {
    formatDate(dateString) {
      var timestamp = Date.parse(dateString);
      var date = new Date(timestamp);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("en-US", options);
    },
    getUserInfo() {
      axios
        .get(ipAddress + "/userInfo", {
          params: {
            userId: this.userId,
          }
        })
        .then((response) => {
          this.user = response.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFriends() {
      axios
        .get(ipAddress + "/getFriends", {
          params: {
            id: this.userId,
          },
        })
        .then((response) => {
          this.friends = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    friendClicked(friendId) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: friendId },
        })
        .catch(() => {});
    },
    init() {
      this.userId = this.$route.query.userId;
      this.getFriends();
      this.getUserInfo();
    },
  },
  created() {
    // this.user = this.$store.state.account.user;
    // console.log(this.$store.state.account.user);
    this.init();
  },
  watch: {
    "$route.query.userId": function () {
      this.init();
    },
  },
};
</script>

<style scoped>
#left-column {
  background: #212020;
  position: fixed;
  top: 3rem;
  width: 28%;
  height: 100%;
  padding: 0 1rem;
  /* margin-left: 1%; */
  overflow: auto;
  box-sizing: border-box;
  /* overflow: scroll; */
  /* height: calc(100% - 6rem); */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  padding-bottom: 1rem;
  /* bottom: 1rem; */
}

#left-column::-webkit-scrollbar {
  display: none;
}

#user-info {
  /* margin-top: 4rem; */
  background: white;
  align-items: center;
  border: solid 1px lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6rem 0;
  height: 50%;
  
}

#friends {
  display: flex;
  background: white;
  border: solid 1px lightgray;
  flex-wrap: wrap;
  margin-top: 1rem;
  height: 50%;
  /* padding: 0.2rem 0; */
}

#friends p {
  text-align: center;
  width: 100%;
  font-weight: bold;
  margin: 0.5rem;
}

.friend {
  width: 33%;
  height: 10rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* background: #212020; */
}

.friend img {
  width: 100%;
  height: 10rem;
  overflow: hidden;
  object-fit: cover;
}

.friend p {
  margin: 0.5rem;
  font-weight: normal;
}

#user-info img {
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  object-fit: cover;
}

#user-info #name {
  margin-top: 1.5rem;
  font-weight: bold;
}
</style>