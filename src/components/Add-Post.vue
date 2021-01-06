<template>
  <div>
    <div id="add-post-container">
      <div id="container-name-div">
        <p>Post something</p>
        <button @click="addPost">
          <img src="@/assets/add-post.png" alt="" />
        </button>
      </div>
      <div id="inputs-container">
        <input
          id="image-input"
          type="text"
          placeholder="Image URL"
          v-model="postInput"
        />
        <textarea
          v-model="postTextArea"
          name=""
          id=""
          rows="4"
          placeholder="Type some text..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ipAddress } from "../modules/Constants";

export default {
  name: "Add-Post",
  data: function () {
    return {
      user: Object,
      postInput: "",
      postTextArea: "",
      errors: [],
    };
  },
  methods: {
    async addPost () {
      var url = this.postInput;
      const description = this.postTextArea;
      if (url.includes("http://") || url.includes("https://")) {
        console.log("it's an URL");
      } else {
        url = "";
      }
      if (url !== "" || description !== "") {
        await this.add(description, url).catch((e) => {
          this.signinError = e.response.data;
          this.errors.push(e);
        });
        this.postInput = "";
        this.postTextArea = "";
      } else {
        this.errors.push('failed to post')
      }
    },
    async add(description, url) {
      let response = await axios.post(ipAddress + `/addPost`, {
        description: description,
        userId: this.user.id,
        imageURL: url,
      });
      return response;
    },
  },
  created() {
    if (this.$store) {
      this.user = this.$store.state.account.user;
    }
  },
};
</script>

<style scoped>
@import "../assets/styles/Add-Post.css";
</style>