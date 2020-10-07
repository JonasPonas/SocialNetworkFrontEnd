// :isProfile="isProfile"
<template>
  <div>
    <!-- <div id="user-info">
      <img v-bind:src="user.imageURL" alt="">
      <p id="name">{{ user.name + ' ' + user.surname }}</p>
      <p>{{ user.dateOfBirth }}</p>
    </div> -->
    <feed></feed>
  </div>
</template>
<script>
import Feed from "@/components/Feed.vue";
export default {
  components: {
    feed: Feed,
  },
  data: function(){
    return {
      user: Object
    };
  },
  created() {
    this.user = this.$store.state.account.user;
    console.log(this.$store.state.account.user);
  }
};
</script>

<style scoped>
@import "../assets/styles/Profile.css";
</style>