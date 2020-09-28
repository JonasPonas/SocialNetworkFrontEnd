<template>
  <header>
    <div id="nav">
      <div class="profile-wrapper">
        <a href="">{{ this.$store.state.account.user.name + ' ' + this.$store.state.account.user.surname}}</a>
        <img 
        v-bind:src="this.$store.state.account.user.imageURL"
         alt="" />
      </div>
      <div id="buttons-and-input">
        <div class="half">
          <a href="">Feed</a>
          <a href="">Chat</a>
          <a href="">Friends</a>
        </div>
        <div id="search-bar">
          <input
            id="serach"
            type="text"
            placeholder="Search:"
            @input="print"
            v-model="txt"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  data: function () {
    return {
      txt: ""
    };
  },
  methods: {
    print: function () {
      console.log(this.txt);
    },
  }
};
</script>