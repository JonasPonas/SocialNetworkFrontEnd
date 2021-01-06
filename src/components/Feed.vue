<template>
  <div>
    <feedHeader></feedHeader>
    <posts></posts>
    <Chat @showChat="showChat" :friends="friends" />
    <ChatWindow
      :socket="socket"
      @closeChat="closeChat"
      v-if="showingChatWindow"
      :friend="friend"
      class="chat-window"
    />
  </div>
</template>

<script>
import axios from "axios";
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
  },
  data() {
    return {
      friends: [],
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
      return response
    },
  },
  mounted() {
    if (this.$store) {
      this.socket.on("connect", function () {});
    }
    this.fetchFriends().then(response => {
      this.friends = response.data;
    }).catch(e => {
      console.log(e);
    });
  },
  created() {
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
</style>

