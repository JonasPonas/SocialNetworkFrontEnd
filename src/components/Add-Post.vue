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

export default {
  data: function () {
    return {
      user: Object,
      postInput: "",
      postTextArea: "",
    };
  },
  methods: {
    addPost: function () {
      const user = this.$store.state.account.user;
      var url = this.postInput;
      const description = this.postTextArea;
      if (url.includes("http://") || url.includes("https://")) {
        console.log("it's an URL");
      } else {
        url = "";
      }
      if (url !== "" || description !== "") {
        axios
          .post(`http://localhost:5004/addPost`, {
            description: description,
            userId: user.id,
            imageURL: url,
          })
          .then(() => {
            this.postInput = "";
            this.postTextArea = "";
          })
          .catch((e) => {
            this.signinError = e.response.data;
            console.log(e.response.data);
            this.errors.push(e);
          });
        console.log(url + " " + description);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/Add-Post.css";
</style>