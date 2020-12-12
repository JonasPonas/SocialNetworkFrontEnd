<template>
  <div>
    <input
      id="serach"
      type="text"
      placeholder="Search:"
      @input="search"
      v-model="txt"
    />
    <div
      v-if="dropdownVisible"
      v-click-outside="hideDropdown"
      id="myDropdown"
      class="dropdown-content"
    >
      <a
        v-for="user in users"
        :key="user.id"
        href="#"
        @click="userClicked(user.id)"
      >
        <img v-bind:src="user.imageUrl" alt="" />
        {{ user.name + " " + user.surname }}
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ipAddress } from "../modules/Constants";

export default {
  name: "SearchBar",
  data: function () {
    return {
      txt: "",
      dropdownVisible: false,
      users: [],
    };
  },
  methods: {
    userClicked(userId) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: userId },
        })
        .catch((e) => {
          console.log(e);
        });
      this.dropdownVisible = false;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    search: function () {
      if (this.txt === "") {
        this.dropdownVisible = false;
      } else {
        axios
          .post(ipAddress + "/searchUser", { fullName: this.txt })
          .then((response) => {
            this.users = response.data;
            this.users.forEach((u) => {
              if (u.imageUrl == null) {
                u.imageUrl =
                  "https://static.wixstatic.com/media/142313_2fdcee04ff144161a745c651458666ac~mv2.png/v1/crop/x_14,y_0,w_299,h_326/fill/w_240,h_274,al_c,q_85,usm_0.66_1.00_0.01/no-user.webp";
              }
            });
            console.log(this.users);
          })
          .catch((e) => {
            console.log(e);
          });
        this.dropdownVisible = true;
      }
    },
  },
};
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  /* display: none; */
  position: absolute;
  background-color: #212020;
  /* min-width: 160px; */
  max-height: 15rem;
  overflow: scroll;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}

.dropdown-content a img {
  height: 1rem;
  width: 1rem;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}
</style>