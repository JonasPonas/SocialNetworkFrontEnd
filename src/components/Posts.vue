<template>
  <div id="posts">
    <addPost v-show="!isProfile"></addPost>

    <ul>
      <li class="post" v-for="post in posts" v-bind:key="post.id">
        <span
          class="poster-info"
          @mouseover="post.posterImageHover = true"
          @mouseleave="post.posterImageHover = false"
        >
          <img
            v-bind:class="
              post.posterImageHover ? 'poster-img img-hover' : 'poster-img'
            "
            v-bind:src="post.profileImage"
            alt=""
          />
          <span class="name-date-wrapper">
            <p
              @click="goTuUsersProfile(post)"
              @mouseover="post.nameHover = true"
              @mouseleave="post.nameHover = false"
              v-bind:class="post.nameHover ? 'posterName hover' : 'posterName'"
            >
              {{ post.name + " " + post.surname }}
            </p>
            <p class="date">{{ dateToTimeAgo(post) }}</p>
          </span>
        </span>
        <div class="content">
          <img v-bind:src="post.imageUrl" alt="" />
          <p>{{ post.description }}</p>
          <div class="bottom-buttons">
            <div class="button-container">
              <span>10</span>
              <button>
                <img
                  class="reaction-button"
                  src="@/assets/comment.png"
                  alt=""
                />
              </button>
              <span>101</span>
              <button>
                <img class="reaction-button" src="@/assets/heart.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import AddPost from "./Add-Post.vue";

export default {
  components: {
    addPost: AddPost,
  },
  data: function () {
    return {
      isProfile: Boolean,
      userId: Number,
      posts: [],
      errors: [],
      isFriend: true,
    };
  },
  watch: {
    "$route.query.userId"() {
      this.fetchPosts();
    },
  },
  methods: {
    goTuUsersProfile: function (post) {
      this.$router
        .push({
          name: "Profile",
          query: { profile: true, userId: post.userId },
        })
        .catch(() => {});
    },
    fetchPosts: function () {
      const userId = this.$store.state.account.user.id;
      this.isProfile = this.$route.query.profile;
      this.userId = this.$route.query.userId;

      if (userId === this.userId) {
        this.isFriend = false;
      } else {
        this.isFriend = true;
      }

      var url = "http://localhost:5004/getPostsByUser";
      if (!this.isProfile || this.isProfile == undefined) {
        url = "http://localhost:5004/getFriendsPosts";
      }
      if (this.userId === undefined) {
        this.userId = this.$store.state.account.user.id;
      }

      axios
        .get(url, {
          params: {
            id: this.userId,
          },
        })
        .then((response) => {
          response.data.forEach(function (post) {
            post["posterImageHover"] = false;
            post["nameHover"] = false;
            if (post.profileImage == null) {
              post.profileImage = 'https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg';
            }
          });
          this.posts = response.data;
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
        });
    },
    dateToTimeAgo: function (post) {
      const postDate = new Date(post.date);
      const currDate = new Date();
      var milisecondsAgo = currDate.getTime() - postDate.getTime();
      var secondsAgo = milisecondsAgo / 1000;
      var minutesAgo = secondsAgo / 60;
      var hoursAgo = minutesAgo / 60;
      var daysAgo = hoursAgo / 24;
      var weeksAgo = daysAgo / 7;
      var monthsAgo = weeksAgo / 4;
      var yearsAgo = monthsAgo / 12;

      if (secondsAgo < 60) {
        if (Math.floor(secondsAgo) === 1) {
          return Math.floor(secondsAgo) + " second " + "ago";
        }
        return Math.floor(secondsAgo) + " seconds " + "ago";
      } else if (minutesAgo < 60) {
        if (Math.floor(minutesAgo) === 1) {
          return Math.floor(minutesAgo) + " minute " + "ago";
        }
        return Math.floor(minutesAgo) + " minutes " + "ago";
      } else if (hoursAgo < 24) {
        if (Math.floor(hoursAgo) === 1) {
          return Math.floor(hoursAgo) + " hour " + "ago";
        }
        return Math.floor(hoursAgo) + " hours " + "ago";
      } else if (daysAgo < 7) {
        if (Math.floor(daysAgo) === 1) {
          return Math.floor(daysAgo) + " day " + "ago";
        }
        return Math.floor(daysAgo) + " days " + "ago";
      } else if (weeksAgo < 4) {
        if (Math.floor(weeksAgo) === 1) {
          return Math.floor(weeksAgo) + " week " + "ago";
        }
        return Math.floor(weeksAgo) + " weeks " + "ago";
      } else if (monthsAgo < 12) {
        if (Math.floor(monthsAgo) === 1) {
          return Math.floor(monthsAgo) + " month " + "ago";
        }
        return Math.floor(monthsAgo) + " months " + "ago";
      } else {
        if (Math.floor(yearsAgo) === 1) {
          return Math.floor(yearsAgo) + " year " + "ago";
        }
        return Math.floor(yearsAgo) + " years " + "ago";
      }
    },
  },
  created() {
    // const user = this.$store.state.account.user;
    this.fetchPosts();
  },
};
</script>

<style scoped>
@import "../assets/styles/Posts.css";
</style>