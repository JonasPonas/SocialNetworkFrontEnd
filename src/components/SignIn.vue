<template>
  <div id="container">
    <div id="signin-wrapper">
      <div id="buttons-container">
        <button
          v-bind:class="buttonsBackgrounds.loginButton"
          @click="changeToLogin"
          ref="loginbtn"
        >
          Login
        </button>
        <button
          v-bind:class="buttonsBackgrounds.registerButton"
          @click="changeToRegister"
          ref="registerbtn"
        >
          Register
        </button>
      </div>
      <p
        id="error"
        v-bind:class="'notification ' + notificationColor"
        v-if="signinError !== ''"
      >
        {{ signinError }}
      </p>
      <div id="login-register-wrapper" v-if="isShowingLogin">
        <login ref="login"></login>
      </div>
      <div id="login-register-wrapper" v-else>
        <register ref="register" id="registracija"></register>
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
import { ipAddress } from "../modules/Constants";

export default {
  name: "SignIn",
  data: function () {
    return {
      isShowingLogin: false,
      signinError: "",
      errors: [],
      notificationColor: "red",
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
    if (this.$store) {
      this.$store.commit("login", null);
    }
    
    axios.defaults.withCredentials = true;
  },
  methods: {
    swapButtonsBackgrounds: function (loginButtonStyle, registerButtonStyle) {
      this.buttonsBackgrounds.loginButton = loginButtonStyle;
      this.buttonsBackgrounds.registerButton = registerButtonStyle;
      this.signinError = "";
    },
    changeToRegister: function () {
      this.swapButtonsBackgrounds("button", "button selected");
      this.isShowingLogin = false;
    },
    changeToLogin: function () {
      this.swapButtonsBackgrounds("button selected", "button");
      this.isShowingLogin = true;
    },
    showNotification: function (text, isError) {
      if (isError) {
        this.notificationColor = "red";
      } else {
        this.notificationColor = "green";
      }
      this.signinError = text;
    },
    signin: function () {
      this.isShowingLogin ? this.login() : this.register();
    },
    login: function () {
      const email = this.$refs.login.$refs.loginName.value;
      const password = this.$refs.login.$refs.loginPassword.value;
      if (email === "" || password === "") {
        this.signinError = "Fill in all the fields.";
        return;
      }
      axios
        .post(
          ipAddress + `/login`,
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (this.$store) {
            this.$store.commit("login", response.data);
            this.$router.push({ name: "Feed" });
          }
        })
        .catch((e) => {
          this.signinError = e.response.data;
          console.log(e.response.data);
          this.errors.push(e);
        });
    },
    register: function () {
      const name = this.$refs.register.$refs.name.value;
      const surname = this.$refs.register.$refs.surname.value;
      const email = this.$refs.register.$refs.email.value;
      const phone = this.$refs.register.$refs.phone.value;
      const birthday = this.$refs.register.$refs.birthday.value;
      const password = this.$refs.register.$refs.password.value;
      const rPassword = this.$refs.register.$refs.rPassword.value;

      if (
        name === "" ||
        surname === "" ||
        email === "" ||
        phone === "" ||
        birthday == "" ||
        password === "" ||
        rPassword === ""
      ) {
        this.showNotification("Fill in all the fields.", true);
      } else if (password !== rPassword) {
        this.showNotification("Passwords do not match.", true);
      } else {
        console.log("register");
        axios
          .post(ipAddress + `/register`, {
            email: email,
            name: name,
            surname: surname,
            phoneNumber: phone,
            dateOfBirth: birthday,
            password: password,
          })
          .then(() => {
            this.showNotification(
              "Registration successfull. You can Login.",
              false
            );
          })
          .catch((e) => {
            this.showNotification(e.response.data, true);
            console.log(e.response.data);
            this.errors.push(e);
          });
      }
    },
  },
};
</script>
<style scoped>
@import "../assets/styles/LoginRegister.css";
@import "../assets/styles/SignIn.css";
</style>