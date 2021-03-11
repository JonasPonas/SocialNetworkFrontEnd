<template>
  <div v-if="post">
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
        ref="comm"
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

          <button @click="showComments(!showingComments)">
            <b-icon icon="chat-square-text-fill" variant="light" />
          </button>
          <span v-if="info['comments'] > 0" class="countNumber">{{
            info.comments
          }}</span>
          <button @click="reaction(true)">
            <b-icon
              :icon="reaction()"
              variant="light"
              class="reaction-button"
              ref="reactI"
            />
          </button>
          <span v-if="info['reactions'] > 0" class="countNumber">{{
            info.reactions
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeAgo } from "../modules/TimeAgo";
import axios from "axios";
import { ipAddress, defaultImg } from "../modules/Constants";
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
      fromUser: {},
      reactionActive: false,
      info: { reactions: 0, comments: 0, reacted: 0 },
    };
  },
  methods: {
    async addComment(comment) {
      try {
        await axios.post(ipAddress + "/addComment", {
          postId: this.post.postId,
          text: comment,
          fromUser: this.fromUser,
        });
        this.info.comments++;
      } catch {
        console.log("Failed to add a comment!");
      }
      this.showComments(true);
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
          this.errors.push(e);
        });
    },
    editPost: function (post) {
      if (post) {
        post.isEditing = !post.isEditing;
      }
    },
    saveEdit: function () {
      if (!this.post) {
        return;
      }
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
          this.errors.push(e);
        });
    },

    dateToTimeAgo: function (post) {
      return TimeAgo.dateToTimeAgo(post.date, new Date());
    },
    goToUsersProfile: function (post) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: post.userId },
        })
        .catch(() => {});
    },
    async showComments(showing) {
      this.showingComments = showing;
      if (!this.showingComments) return;
      try {
        let response = await axios.get(ipAddress + "/getComments", {
          params: {
            postId: this.post.postId,
          },
        });
        this.comments = response.data;
        //fix comment images
        this.comments.forEach((comment) => {
          if (comment.imageURL == null || comment.imageURL == undefined) {
            comment.imageURL = defaultImg;
          }
        });
        //this.$refs.comm.fixCommentImg();
        return response;
      } catch (e) {
        this.errors.push(e);
        return e;
      }
    },
    async getInfo() {
      if (this.userId === undefined)
        this.userId = this.$store.state.account.user.id;
      try {
        let info = await axios.get(
          ipAddress + "/getPostInfo",
          {
            params: {
              userId: this.userId,
              postId: this.post.postId,
            },
          },
          { withCredentials: true }
        );
        //console.log(info.data[0].reactions);
        this.info["reactions"] = Number(info.data[0].reactions);
        this.info["comments"] = Number(info.data[0].comments);
        Number(info.data[0].reacted) == 1
          ? (this.reactionActive = true)
          : (this.reactionActive = false);
        this.reaction();
      } catch {
        console.log("Failed to fetch post: " + this.post.postId + "(id) info");
      }
    },
    reaction: function (click = false) {
      if (click) {
        axios
          .post(ipAddress + `/addReaction`, {
            userId: this.userId,
            postId: this.post.postId,
            emojiId: 4, // Sending heart emoji for now
          })
          .then(() => {
            this.reactionActive = !this.reactionActive;
            if (!this.reactionActive) this.info.reactions--;
            else this.info.reactions++;
          })
          .catch((e) => {
            console.log("Setting reaction failed: " + e);
          });
      }

      if (this.reactionActive) return "heart-fill";
      else return "heart";
    },
    infoUpdate() {
      console.log("Info update!");
    },
  },
  created() {
    if (this.$store) {
      this.fromUser = this.$store.state.account.user.id;
    }
    this.getInfo();
  },
  watch: {
    post: function () {
      this.showingComments = false;
      this.getInfo();
    },
  },
};
</script>

<style>
.countNumber {
  position: relative;
  left: -6px;
  top: -6px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
