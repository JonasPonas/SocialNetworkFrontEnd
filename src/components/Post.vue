<template>
  <div>
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
      <img src="@/assets/delete_icon.png" alt="" />
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
      <Comments
        @addComment="addComment"
        :comments="comments"
        v-if="showingComments"
      />
      <div class="bottom-buttons">
        <div class="edit-buttons-wrapper" v-if="post.isEditing">
          <button class="edit-button" @click="saveEdit()">Save</button>
          <button class="edit-button" @click="editPost(post)">Cancel</button>
        </div>
        <div class="button-container">
          <button v-if="isUsersProfile" @click="editPost(post)">
            <img class="reaction-button" src="@/assets/edit.png" alt="" />
          </button>
          <!-- <span>10</span> -->

          <button>
            <img
              @click="showComments(post, !showComments)"
              class="reaction-button"
              src="@/assets/comment.png"
              alt=""
            />
          </button>
          <button>
            <img class="reaction-button" src="@/assets/heart.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeAgo } from "../modules/TimeAgo";
import axios from "axios";
import { ipAddress } from "../modules/Constants";
import Comments from "./Comments.vue";
export default {
  props: {
    post: Object,
    index: Number,
    isUsersProfile: Boolean,
  },
  components: {
    Comments,
  },
  data() {
    return {
      errors: [],
      showingComments: false,
      comments: [],
    };
  },
  methods: {
    addComment(comment) {
        const fromUser = this.$store.state.account.user.id;
        axios.post( ipAddress+ "/addComment",{
            postId: this.post.postId,
            text: comment,
            fromUser: fromUser
        }).then(response => {
            console.log(response);
            this.showComments(true)
        }).catch(e => {
            console.log(e);
        })
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
          this.$emit("postDeleted", this.post);
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
    },
    editPost: function (post) {
      console.log(post.description);
      post.isEditing = !post.isEditing;
    },
    saveEdit: function () {
      console.log(this.$refs["textArea-" + this.index]);
      const newDescription = this.$refs["textArea-" + this.index].value;
      this.post.description = newDescription;
      this.post.isEditing = false;
      axios
        .post(ipAddress + `/updateContentDescription`, {
          contentId: this.post.contentId,
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
    showComments(showing) {
      this.showingComments = showing;
      if (!this.showingComments) return;
      axios
        .get(ipAddress + "/getComments", {
          params: {
            postId: this.post.postId,
          },
        })
        .then((response) => {
          this.comments = response.data;
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
</style>