<template>
  <form class="inputs-container">
    <input
      class="form-control"
      type="text"
      ref="name"
      placeholder="Name:"
      autocomplete="true"
    />
    <input
      class="form-control"
      type="text"
      ref="surname"
      placeholder="Surname:"
      autocomplete="true"
    />
    <input
      class="form-control"
      type="text"
      ref="email"
      id="emailas"
      placeholder="Email:"
      autocomplete="true"
    />
    <input
      class="form-control"
      type="tel"
      ref="phone"
      placeholder="Phone Nr:"
      autocomplete="true"
    />
    <input
      class="form-control"
      type="date"
      ref="birthday"
      placeholder="Date of Birth:"
      autocomplete="true"
    />
    <input
      class="form-control"
      type="password"
      ref="password"
      placeholder="Password:"
      autocomplete="false"
    />
    <input
      class="form-control"
      type="password"
      ref="rPassword"
      placeholder="Repeat Password:"
      autocomplete="false"
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