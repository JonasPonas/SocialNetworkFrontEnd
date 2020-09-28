<template>
  <div id="feed">
    <ul>
      <li class="post" v-for="post in posts" v-bind:key="post.id">
        <div class="poster-info">
          <img v-bind:src="post.profileImage" alt="" />
          <p>{{ post.name + " " + post.surname }}</p>
        </div>
        <div class="content">
          <img v-bind:src="post.imageUrl" alt="" />
          <p>{{ post.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      posts: [],
      errors: []
    };
  },
  created() {
    const user = this.$store.state.account.user;
    axios
      .get(`http://localhost:5004/getFriendsPosts`, {
        params: {
          id: user.id,
        },
      })
      .then((response) => {
        this.posts = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>