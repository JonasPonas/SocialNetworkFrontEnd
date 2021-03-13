<template>
  <div>
    <addPost v-show="!isProfile"></addPost>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
      "
      v-if="posts.length == 0"
    >
      <h1 style="color: white">OMG NOTHING HERE :O</h1>
    </div>
    <ul class="pl-0">
      <li class="post" v-for="(post, index) in posts" v-bind:key="post.id">
        <Post
          @postDeleted="postDeleted"
          :isUsersProfile="isUsersProfile"
          :post="post"
          :index="index"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import AddPost from "./Add-Post.vue";

import Post from "./Post.vue";

import { ipAddress, defaultImg } from "../modules/Constants";

export default {
  components: {
    addPost: AddPost,
    Post,
  },
  data: function () {
    return {
      isProfile: false,
      isUsersProfile: false,
      userId: Number,
      posts: [],
      errors: [],
    };
  },
  watch: {
    "$route.query.userId"() {
      this.fetchPosts();
    },
  },
  methods: {
    postDeleted(p) {
      this.posts = this.posts.filter((post) => {
        return post.contentId !== p.contentId;
      });
    },
    figureIfItsUsersProfile: function () {
      const userId = this.$store.state.account.user.id;
      if (this.posts.length > 0) {
        if (this.posts[0].userId === userId) {
          this.isUsersProfile = true;
        } else {
          this.isUsersProfile = false;
        }
      }
    },
    async fetchPosts() {
      if (this.$route) {
        this.isProfile = this.$route.query.profile;
        this.userId = this.$route.query.userId;
      }
      var url = ipAddress + "/getPostsByUser";
      if (!this.isProfile || this.isProfile == undefined) {
        url = ipAddress + "/getFriendsPosts";
      }
      if (this.userId === undefined) {
        this.userId = this.$store.state.account.user.id;
      }
      try {
        let response = await axios.get(
          url,
          {
            params: {
              id: this.userId,
            },
          },
          { withCredentials: true }
        );
        response.data.forEach((post) => {
          post["posterImageHover"] = false;
          post["nameHover"] = false;
          post["isEditing"] = false;
          if (post.profileImage == null) {
            post.profileImage = defaultImg;
          }
        });
        this.posts = response.data;
        this.figureIfItsUsersProfile();
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
@import "../assets/styles/Posts.css";
@import "../assets/styles/Main.css";
</style>