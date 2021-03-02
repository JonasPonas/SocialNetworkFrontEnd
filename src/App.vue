<template>
  <div id="app">
    
    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
    
  }
};
</script>
<style >
.left-column {
  background: #212020;
  position: fixed;
  top: 3rem;
  bottom: 0;
  width: 28%;
  /* height: 100%; */
  padding: 0 1rem;
  /* margin-left: 1%; */
  overflow: auto;
  box-sizing: border-box;
  /* overflow: scroll; */
  /* height: calc(100% - 6rem); */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}

.left-column::-webkit-scrollbar {
  display: none;
}
</style>

