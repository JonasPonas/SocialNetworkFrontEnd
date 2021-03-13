<template>
  <div>
    <feedHeader v-if="true"></feedHeader>
    <div class="container-fluid content-wrapper">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-2" v-if="showing">
          <Friends
            :friends="friendSuggestions"
            :title="'People you may know'"
          />
        </div>

        <div class="col-12 col-xl-7 ml-auto">
          <posts></posts>
        </div>

        <div class="col-12 col-xl-auto ml-auto">
          <Chat @showChat="showChat" :friends="friends" />
          <ChatWindow
            :socket="socket"
            @closeChat="closeChat"
            v-if="showingChatWindow"
            :friend="friend"
            class="chat-window"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Friends from "@/components/Friends";
import ChatWindow from "./ChatWindow";
import Header from "./Header.vue";
import Posts from "./Posts.vue";
import Chat from "./Chat.vue";
import { ipAddress } from "../modules/Constants";
import io from "socket.io-client";

export default {
  name: "Feed",
  components: {
    feedHeader: Header,
    posts: Posts,
    Chat,
    ChatWindow,
    Friends,
  },
  data() {
    return {
      showing: false,
      friends: [],
      friendSuggestions: [],
      friend: {},
      showingChatWindow: false,
      socket: io(ipAddress),
      user: {},
    };
  },
  methods: {
    showChat(friend) {
      this.showingChatWindow = true;
      this.friend = friend;
    },
    closeChat() {
      this.showingChatWindow = false;
    },
    async fetchFriends() {
      this.user = this.$store.state.account.user;
      let response = await axios.get(ipAddress + "/getFriends", {
        params: {
          id: this.user.id,
        },
      });
      return response;
    },
    async fetchFriendSuggestions() {
      this.user = this.$store.state.account.user;
      try {
        let response = await axios.get(
          ipAddress + "/suggestions/friends/" + this.user.id
        );
        this.friendSuggestions = response.data;
      } catch (error) {
        console.log("No Friends To Suggest!");
      }
    },
  },
  mounted() {
    if (this.$store) {
      this.socket.on("connect", function () {});
    }
    this.fetchFriends()
      .then((response) => {
        this.friends = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  created() {
    this.showing = this.$route.name == "Feed" ? true : false;
    console.log(this.$route.name);
    if (this.showing) this.fetchFriendSuggestions();
    if (this.$store) {
      const userId = this.$store.state.account.user.id;
      this.socket.emit("register", {
        userId: userId,
      });
    }
  },
};
</script>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 0;
  right: 20%;
}
@import "../assets/styles/Main.css";
</style>

