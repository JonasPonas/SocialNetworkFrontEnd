
<template>
  <div>
    <div class="position-relative p-4">
      <div class="left-column">
        <div id="user-info">
          <img
            v-bind:src="user.imageURL"
            alt=""
            @click="show = true"
            class="hover-pointer"
          />
          <p id="name">{{ user.name + " " + user.surname }}</p>
          <p v-if="user.city != null">{{ user.city + ", " + user.country }}</p>
          <p>Birthday: {{ formatDate(user.dateOfBirth) }}</p>
          <button
            class="btn btn-primary"
            v-if="showFriendInvite"
            @click="sendFriendInvite"
          >
            Send Friend Invite
          </button>
        </div>

        <Friends :friends="friends" :title="'Friends'" />
      </div>
      <feed></feed>

      <b-overlay :show="show" no-center no-wrap>
        <template #overlay>
          <div class="overlay-input text-center">
            <p id="cancel-label"><b>Please provide profile picture URL</b></p>
            <input
              class="form-control"
              ref="pictureUrl"
              type="text"
              placeholder="ImgUrl:"
            />
            <div class="text-right">
              <b-button
                ref="save"
                variant="success"
                size="md"
                @click="updateProfilePicture"
              >
                Save
              </b-button>
              <b-button
                ref="cancel"
                variant="danger"
                size="md"
                @click="show = false"
              >
                Cancel
              </b-button>
            </div>
          </div>
        </template>
      </b-overlay>
    </div>
  </div>
</template>
<script>
import Feed from "@/components/Feed.vue";
import Friends from "@/components/Friends";
import { ipAddress, defaultImg } from "../modules/Constants";
import axios from "axios";

export default {
  components: {
    feed: Feed,
    Friends,
  },
  name: "Profile",
  data: function () {
    return {
      user: {},
      friends: [],
      userId: "",
      myId: -1,
      showFriendInvite: false,
      errors: [],
      show: false,
    };
  },
  methods: {
    formatDate(dateString) {
      var timestamp = Date.parse(dateString);
      var date = new Date(timestamp);
      var options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
    sendFriendInvite() {
      axios
        .post(ipAddress + "/sendFriendInvite", {
          fromUser: this.myId,
          toUser: this.userId,
        })
        .then(() => {
          alert("friend invite sent!");
        })
        .catch(() => {
          alert("could not send friend invite");
        });
    },
    async getUserInfo() {
      let response = await axios.get(ipAddress + "/userInfo", {
        params: {
          userId: this.userId,
        },
      });
      this.user = response.data[0];
      if (this.user.imageURL == undefined) {
        this.user.imageURL = defaultImg;
      }
    },
    async getFriends() {
      let response = await axios.get(ipAddress + "/getFriends", {
        params: {
          id: this.userId,
        },
      });
      this.friends = response.data;
      let f = this.friends.map((f) => {
        return f.id;
      });
      if (!f.includes(this.myId) && this.myId != this.userId) {
        this.showFriendInvite = true;
      } else {
        this.showFriendInvite = false;
      }
    },

    init() {
      if (this.$route) {
        this.userId = this.$route.query.userId;
        this.myId = this.$store.state.account.user.id;
      }
      this.getFriends().catch((e) => {
        this.errors.push(e);
      });
      this.getUserInfo().catch((e) => {
        this.errors.push(e);
      });
    },
    updateProfilePicture() {
      //console.log("Img url: " + this.$refs.pictureUrl.value);
      if (this.$refs.pictureUrl.value != "") {
        axios
          .post(ipAddress + "/setProfilePicture", {
            userId: this.myId,
            imageUrl: this.$refs.pictureUrl.value,
          })
          .then(() => {
            alert("Profile picture changed!");
            this.$store.state.account.user.imageURL = this.$refs.pictureUrl.value;
          })
          .catch(() => {
            alert("could not change profile picture!");
          });
      }

      this.show = false;
    },
  },
  created() {
    // this.user = this.$store.state.account.user;
    // console.log(this.$store.state.account.user);

    this.init();
  },
  watch: {
    "$route.query.userId": function () {
      this.init();
    },
  },
};
</script>

<style scoped>
#user-info {
  margin-top: 1rem;
  background: #303030;
  color: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6rem 0;
  /* height: 50%; */
}

#user-info img {
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  object-fit: cover;
}

#user-info #name {
  margin-top: 1.5rem;
  font-weight: bold;
}

.hover-pointer {
  cursor: pointer;
}

.overlay-input {
  /* can also be whatever container */
  width: 500px;
  height: auto;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -250px;
  display: block;
}
</style>