<template>
  <div class="wrapper">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="user">
        <div style="display: flex; flex-direction: column; align-items: center">
          <img class="poster-image" :src="comment.imageURL" alt="" />
          <span class="poster-name">{{ comment.name }}</span>
        </div>
        <p
          style="
            background: #242424;
            border-radius: 5px;
            margin-left: 1rem;
            margin-bottom: 1.4rem;
          "
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="input-wrapper">
      <!-- <p style="background: none" for="">Add comment</p> -->
      <input
        v-model="comment"
        name=""
        id=""
        cols="3"
        rows="1"
        placeholder="Add comment..."
      />
      <button @click="addComment">Send</button>
    </div>
  </div>
</template>

<script>
//import { defaultImg } from "../modules/Constants";

export default {
  props: {
    comments: Array,
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    addComment() {
      this.$emit("addComment", this.comment);
      this.comment = "";
    },
  },
  created() {
    //this.fixCommentImg();
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background: #121212;
  /* border: 1px solid black; */
}
.comment {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
}

.comment .user {
  /* background: red; */
  display: flex;
  align-items: center;
  padding: 0.4rem;
  color: white;
  border-radius: 10px;
  margin: 0.3rem;
  width: 99%;
  /* margin-right: auto; */
}

.poster-name {
  text-align: center;
}
.poster-image {
  width: 4rem !important;
  height: 4rem !important;
  overflow: hidden !important;
  object-fit: cover !important;
  border-radius: 50% !important;
}
.comment .text {
  margin-top: 0.4rem;
  margin-left: 10rem;
  background: white;
  color: black;
}
.input-wrapper {
  color: white;
  background: #121212;
  border-radius: 10px;
  margin: 0.4rem 0.4rem;
}
.input-wrapper p {
  margin: 0 0.5rem;
}
.input-wrapper input {
  margin: 0 1rem;
  border-radius: 10px;
  padding: 0.4rem;
  /* max-height: 2rem;
  min-height: 2rem; */
  width: calc(100% - 2rem);
}
.input-wrapper button {
  color: white;
  margin: 0.5rem 1rem;
  /* padding: 0.2rem 1rem; */
  background: #121212;
  border-radius: 5px;
}
</style>