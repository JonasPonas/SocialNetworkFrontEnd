<template>
  <form class="inputs-container">
    <input
      ref="loginName"
      type="text"
      placeholder="Email:"
      autocomplete="true"
    />
    <input
      ref="loginPassword"
      type="password"
      placeholder="Password:"
      autocomplete="true"
      @keyup.enter="finish()"
    />
  </form>
</template>

<script>
export default {
  methods: {
    finish() {
      this.$emit("finish");
    },
  },
};
</script>