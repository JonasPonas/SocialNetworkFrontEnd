<template>
  <div id="container">
    <div id="signin-wrapper">
      <div id="buttons-container">
        <button v-bind:class="buttonsBackgrounds.login" @click="changeToLogin">
          Login
        </button>
        <button
          v-bind:class="buttonsBackgrounds.register"
          @click="changeToRegister"
        >
          Register
        </button>
      </div>
      <div v-if="isShowingLogin">
        <login ref="login"></login>
      </div>
      <div v-else>
        <register />
      </div>
      <button id="signin-button" @click="signin">
        {{ isShowingLogin ? "Login" : "Register" }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  name: "LoginRegister",
  data: function () {
    return {
      isShowingLogin: false,
      errors: [],
      buttonsBackgrounds: {
        login: "button",
        register: "button-selected ",
      },
    };
  },
  components: {
    login: Login,
    register: Register,
  },
  methods: {
    changeToRegister: function () {
      this.buttonsBackgrounds.login = "button";
      this.buttonsBackgrounds.register = "button-selected";
      this.isShowingLogin = false;
    },
    changeToLogin: function () {
      this.buttonsBackgrounds.login = "button-selected";
      this.buttonsBackgrounds.register = "button";
      this.isShowingLogin = true;
    },
    signin: function () {
      this.isShowingLogin ? this.login() : this.register();
    },
    login: function () {
      const email = this.$refs.login.$refs.loginName.value;
      const password = this.$refs.login.$refs.loginPassword.value;
      axios
        .post(`http://localhost:5004/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          this.$store.commit("login", response.data);
          this.$router.push({ name: "Feed"});
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    register: function () {
      console.log("register");
    },
  }
};
</script>
<style scoped>
@import "../assets/styles/LoginRegister.css";
@import "../assets/styles/Login.css";
</style>