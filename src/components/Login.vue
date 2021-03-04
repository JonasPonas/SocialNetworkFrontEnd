<template>
  <form class="inputs-container">
    <input
      class="form-control"
      ref="loginName"
      type="text"
      placeholder="Email:"
      autocomplete="true"
    />
    <input
      class="form-control"
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