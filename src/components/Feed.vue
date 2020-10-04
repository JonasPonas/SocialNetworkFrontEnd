<template>
  <div>
    <feedHeader></feedHeader>
    <posts></posts>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Posts from "./Posts.vue";

export default {
  name: "Feed",
  components: {
    feedHeader: Header,
    posts: Posts,
  },
};
</script>

