<template>
  <div class="m-loading m-loading-container" v-show="loadingFilter">
    <div class="m-icon-loading"></div>
    <p>Đang tải dữ liệu</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingFilter: true,
    };
  },
  mounted() {
    setTimeout(() =>{
      this.loadingFilter = false;
    }, 500)
  },
};
</script>
<style scoped>
@import url("./LoadingPage.css");
</style>