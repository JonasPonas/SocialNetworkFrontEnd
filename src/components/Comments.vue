<template>
  <div class="wrapper">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="user">
        <img :src="comment.imageURL" alt="" />
        {{ comment.name + " " + comment.surname }}
        <p >{{ comment.text }}</p>
      </div>
    </div>
    <div class="input-wrapper">
      <p style="background: none;" for="">Add comment</p>
      <textarea v-model="comment" name="" id="" cols="3" rows="3"></textarea>
      <button @click="addComment">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
  data() {
    return {
      // comments: []

      comment: '',
    };
  },
  methods: {
    addComment() {      
      this.$emit('addComment', this.comment)
      this.comment = ''
    }
  },
  created() {

  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background: #121212;
  border: 1px solid black;
}
.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment .user {
  background: #333333;
  padding: 0.4rem;
  color: white;
  border-radius: 10px;
  margin: 0.3rem;
}

.comment .user img {
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
}
.comment .text {
  margin-top: 0.4rem;
  background: white;
  color: black;
}
.input-wrapper {
  color: white;
  background: #363636;
  border-radius: 10px;
  margin: 0.4rem 0.4rem;
}
.input-wrapper p {
  margin: 0.5rem;
}
.input-wrapper textarea {
  margin: 0 1rem;
  max-height: 3rem;
  min-height: 3rem;
  width: calc(100% - 2rem);
}
.input-wrapper button {
  color: black;
  margin: 0.5rem 1rem;
  padding: 0.2rem 1rem;
  background: white;
  border-radius: 5px;
}
</style>