<template>
  <header>
    <div id="nav">
      <div class="profile-wrapper">
        <button @click="onClickTab(true)">{{ this.$store.state.account.user.name + ' ' + this.$store.state.account.user.surname}}</button>
        <img 
        v-bind:src="getProfileImage()"
         alt="" />
      </div>
      <div id="buttons-and-input">
        <div class="half">
          <button  @click="onClickTab(false)">Feed</button>
          <button href="">Chat</button>
          <button href="">Friends</button>
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
    getProfileImage: function() {
      const imageUrl = this.$store.state.account.user.imageURL;
      if(imageUrl == null) {
        return 'https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg';
      } 
      return imageUrl;
    },
    onClickTab: function(value) {
      const user = this.$store.state.account.user;
      if(value){
        this.$router.push({ name: "Profile", query: { profile: true, userId: user.id } }).catch(()=>{});
      } else {
        this.$router.push({ name: "Feed"}).catch(()=>{});
      }
         
     }
  }
};
</script>

<style scoped>
@import "../assets/styles/Header.css";
</style>