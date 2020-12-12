<template>
  <div class="window">
    <div class="header">
      <span class="name">{{ friend.name + " " + friend.surname }}</span>
      <span @click="closeChat" class="close">x</span>
    </div>
    <div id="messages" class="messages">
      <span
        v-for="msg in messages"
        :key="msg.key"
        class="message"
        :style="getBubbleStyle(msg)"
      >
        {{ msg.message }}
      </span>
    </div>
    <div class="message-input">
      <input v-model="message" type="text" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ipAddress } from "../modules/Constants";
export default {
  name: "ChatWindow",
  props: {
    friend: Object,
    socket: Object,
  },
  data() {
    //5004
    return {
      messages: [],
      message: "",
    };
  },
  methods: {
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    getBubbleStyle(msg) {
      const fromUser = this.$store.state.account.user.id;
      if (fromUser == msg.fromUser) {
        return { background: "lightgreen", "margin-left": "auto" };
      }
      return { background: "yellow", "margin-right": "auto" };
    },
    closeChat() {
      this.$emit("closeChat");
    },
    sendMessage() {
      //   this.messages.push(this.message);
      const fromUser = this.$store.state.account.user.id;
      const toUser = this.friend.id;
      let key = this.makeid(12);
      let body = {
        message: this.message,
        toUser: toUser,
        fromUser: fromUser,
        key: key,
      };
      this.socket.emit("sendMessage", {
        message: this.message,
        toUser: toUser,
        fromUser: fromUser,
        key: key,
      });
      this.messages.push(body);
      this.message = "";
    },
    fetchMessages() {
      this.messages = [];
      const fromUser = this.$store.state.account.user.id;
      const toUser = this.friend.id;
      axios
        .get(ipAddress + "/messages", {
          params: {
            fromUser: fromUser,
            toUser: toUser,
          },
        })
        .then((response) => {
          this.messages = response.data;
        });
    },
    scroll() {
      document.getElementById("messages").scrollTop = document.getElementById(
        "messages"
      ).scrollHeight;
    },
  },
  updated() {
    this.scroll();
  },
  created() {
    this.socket.on("messageReceived", (data) => {
      console.log(data);
      if (data.fromUser == this.friend.id) {
        this.messages.push(data);
      }
    });
    this.fetchMessages();
  },
  watch: {
    friend: function () {
      this.fetchMessages();
    },
  },
};
</script>

<style scoped>
.window {
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
  height: 24rem;
  width: 20rem;
  z-index: 1000;
  border-radius: 8px 8px 0 0;
}
.window .header {
  padding: 1rem;
  color: white;
  background: #242424;
  display: flex;
  /* height: 2rem; */
}
.messages {
  height: 5rem;
  margin-top: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: #363636;
}
.message {
  margin: 0.5rem;
  margin-top: auto;
  /* background: lightgreen; */
  padding: 0.5rem;
  border-radius: 8px;

  /* margin-left: auto; */
  /* margin-right: auto; */
}
.header .close {
  color: white;
  margin-left: auto;
}
.close:hover {
  cursor: pointer;
}
.message-input {
  margin-top: auto;
  border-top: 1px solid lightgray;
}
.message-input input {
  height: 2.5rem;
  width: calc(80% - 0.3rem);
  margin: 0.2rem 0;
  margin-left: 0.3rem;
  border: 1px solid black;
  border-radius: 5px;
}

.message-input button {
  color: blue;
  width: 20%;
}
</style>