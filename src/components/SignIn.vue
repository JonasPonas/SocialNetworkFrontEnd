<template>
  <div id="container">
    <div id="signin-wrapper">
      <div id="buttons-container">
        <button v-bind:class="buttonsBackgrounds.loginButton" @click="changeToLogin">
          Login
        </button>
        <button
          v-bind:class="buttonsBackgrounds.registerButton"
          @click="changeToRegister"
        >
          Register
        </button>
      </div>
      <div id="login-register-wrapper" v-if="isShowingLogin">
        <login ref="login"></login>
      </div>
      <div id="login-register-wrapper" v-else>
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
  name: "SignIn",
  data: function () {
    return {
      isShowingLogin: false,
      errors: [],
      buttonsBackgrounds: {
        loginButton: "button",
        registerButton: "button selected ",
      },
    };
  },
  components: {
    login: Login,
    register: Register,
  },
  created() {
     this.$store.commit("login", null);
  },
  methods: {
    swapButtonsBackgrounds: function(loginButtonStyle, registerButtonStyle) {
      this.buttonsBackgrounds.loginButton = loginButtonStyle;
      this.buttonsBackgrounds.registerButton = registerButtonStyle;
    },
    changeToRegister: function () {
      this.swapButtonsBackgrounds("button", "button selected");
      this.isShowingLogin = false;
    },
    changeToLogin: function () {
      this.swapButtonsBackgrounds("button selected", "button");
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
@import "../assets/styles/SignIn.css";
</style>