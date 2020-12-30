<template>
  <header>
    <div id="nav">
      <div class="profile-wrapper">
        <button v-if="this.$store" @click="onClickTab(true)">
          {{
            this.$store.state.account.user.name +
            " " +
            this.$store.state.account.user.surname
          }}
        </button>
        <img v-bind:src="getProfileImage()" alt="" />
      </div>
      <div id="buttons-and-input">
        <div class="half">
          <button @click="onClickTab(false)">Feed</button>

          <div id="dropdown">
            <span
              style="color: white; margin-right: 1rem"
              @mouseover="dropdownVisible = true"
              >Invites</span
            >
            <div
              v-if="dropdownVisible"
              class="dropdown-content"
              v-click-outside="hide"
            >
              <div
                class="invite-wrapper"
                v-for="friendInvite in friendInvites"
                :key="friendInvite.id"
              >
                <p>
                  <img v-bind:src="getInviteImage(friendInvite)" alt="" />
                  {{ friendInvite.name + " " + friendInvite.surname }}
                </p>
                <div class="invite-buttons">
                  <button
                    @click="acceptInvite(friendInvite)"
                    class="btn"
                    style="background: lightGreen; color: black"
                  >
                    Accept
                  </button>
                  <button
                    @click="rejectInvite(friendInvite)"
                    class="btn"
                    style="background: tomato"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="search-bar">
          <SearchBar />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import SearchBar from "./SearchBar.vue";
import { ipAddress } from "../modules/Constants";
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      dropdownVisible: false,
      friendInvites: [],
      toUser: -1,
      id: -1,
    };
  },
  methods: {
    hide() {
      this.dropdownVisible = false;
    },
    acceptInvite(invite) {
      console.log(invite);
      axios
        .post(ipAddress + "/acceptFriendInvite", {
          fromUser: invite.id,
          toUser: this.toUser,
        })
        .then(() => {
          this.getFriendInvites();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    rejectInvite(invite) {
      axios
        .post(ipAddress + "/rejectFriendInvite", {
          fromUser: invite.id,
          toUser: this.toUser,
        })
        .then(() => {
          this.getFriendInvites();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFriendInvites() {
      axios
        .get(ipAddress + "/getFriendInvites", {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.friendInvites = response.data;
        })
        .catch(() => {});
    },
    getInviteImage(invite) {
      if (invite.imageUrl) {
        return invite.imageUrl;
      }
      return "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
    },
    getProfileImage: function () {
      if (!this.$store) {
        return "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
      }
      const imageUrl = this.$store.state.account.user.imageURL;
      if (imageUrl == null) {
        return "https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg";
      }
      return imageUrl;
    },
    onClickTab: function (value) {
      if (!this.$store) { return }
      const user = this.$store.state.account.user;
      if (value) {
        this.$router
          .push({ name: "Profile", query: { profile: true, userId: user.id } })
          .catch(() => {});
      } else {
        this.$router.push({ name: "Feed" }).catch(() => {});
      }
    },
  },
  created() {
    if (this.$store) {
      this.toUser = this.$store.state.account.user.id;
      this.id = this.$store.state.account.user.id;
    }
    this.getFriendInvites();
  },
};
</script>

<style scoped>
@import "../assets/styles/Header.css";
.dropdown-content a {
  color: white;
  position: absolute;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
}
#dropdown {
  position: relative;
  display: inline-block;
}

.invite-wrapper {
  background: #121212;
  padding: 0.4rem;
  margin: 0.2rem 0;
  border-radius: 5px;
}

.dropdown-content {
  position: absolute;
  background-color: #242424;
  margin: 0.4rem;
  color: white;
  min-width: 360px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.invite-buttons {
  display: flex;
  justify-content: space-around;
}
.invite-buttons button {
  flex: 1;
  padding: 0.2rem !important;
  /* height: 1rem; */
  padding: 0;
}
</style>