<template>
  <div id="posts">
    <addPost v-show="!isProfile"></addPost>

    <ul>
      <li class="post" v-for="(post, index) in posts" v-bind:key="post.id">
        <span
          class="poster-info"
          @mouseover="post.posterImageHover = true"
          @mouseleave="post.posterImageHover = false"
        >
          <img
            v-bind:class="
              post.posterImageHover ? 'poster-img img-hover' : 'poster-img'
            "
            v-bind:src="post.profileImage"
            alt=""
          />
          <span class="name-date-wrapper">
            <p
              @click="goToUsersProfile(post)"
              @mouseover="post.nameHover = true"
              @mouseleave="post.nameHover = false"
              v-bind:class="post.nameHover ? 'posterName hover' : 'posterName'"
            >
              {{ post.name + " " + post.surname }}
            </p>
            <p class="date">{{ dateToTimeAgo(post) }}</p>
          </span>
        </span>
        <button
          v-if="post.isEditing"
          class="delete-button"
          @click="deletePost(post)"
        >
          <img src="@/assets/delete_icon.png" alt="">
        </button>

        <div class="content">
          <img v-bind:src="post.imageUrl" alt="" />
          <p v-if="!post.isEditing">
            {{ post.description }}
          </p>
          <div class="edit" v-else>
            <textarea
              :ref="'textArea-' + index"
              :value="post.description"
              type="text"
              rows="4"
            >
            </textarea>
          </div>

          <div class="bottom-buttons">
            <div class="edit-buttons-wrapper" v-if="post.isEditing">
                <button class="edit-button" @click="saveEdit(post, index)">
                  Save
                </button>
                <button class="edit-button" @click="editPost(post)">
                  Cancel
                </button>
              </div>
            <div class="button-container">
              
              <button v-if="isUsersProfile" @click="editPost(post)">
                <img class="reaction-button" src="@/assets/edit.png" alt="" />
              </button>
              <span>10</span>
              <button>
                <img
                  class="reaction-button"
                  src="@/assets/comment.png"
                  alt=""
                />
              </button>
              <span>101</span>
              <button>
                <img class="reaction-button" src="@/assets/heart.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import AddPost from "./Add-Post.vue";
import { TimeAgo } from "../modules/TimeAgo";
import { ipAddress } from '../modules/Constants'

export default {
  components: {
    addPost: AddPost,
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
    editPost: function (post) {
      console.log(post.description);
      post.isEditing = !post.isEditing;
    },
    saveEdit: function (post, index) {
      const newDescription = this.$refs["textArea-" + index][0].value;
      post.description = newDescription;
      post.isEditing = false;
      axios
        .post(ipAddress + `/updateContentDescription`, {
          contentId: post.contentId,
          description: newDescription,
        })
        .then(() => {})
        .catch((e) => {
          this.signinError = e.response.data;
          console.log(e.response.data);
          this.errors.push(e);
        });
    },
    dateToTimeAgo: function (post) {
      return TimeAgo.dateToTimeAgo(post);
    },
    goToUsersProfile: function (post) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: post.userId },
        })
        .catch(() => {});
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
    fetchPosts: function () {
      
      this.isProfile = this.$route.query.profile;
      this.userId = this.$route.query.userId;

      var url = ipAddress + "/getPostsByUser";
      if (!this.isProfile || this.isProfile == undefined) {
        url = ipAddress + "/getFriendsPosts";
      }
      if (this.userId === undefined) {
        this.userId = this.$store.state.account.user.id;
      }
      axios
        .get(url, {
          params: {
            id: this.userId,
          },
        }, {withCredentials: true})
        .then((response) => {
          response.data.forEach(function (post) {
            post["posterImageHover"] = false;
            post["nameHover"] = false;
            post["isEditing"] = false;
            if (post.profileImage == null) {
              post.profileImage =
                "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
            }
          });
          this.posts = response.data;
          this.figureIfItsUsersProfile();
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
    },
    deletePost: function (post) {
      const contentId = post.contentId;
      axios
        .delete(ipAddress + "/deletePost", {
          params: {
            contentId: contentId,
          },
        })
        .then(() => {
          this.posts = this.posts.filter((post) => {
            return post.contentId !== contentId;
          });
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
@import "../assets/styles/Posts.css";
</style>