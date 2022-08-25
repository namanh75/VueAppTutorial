<template>
  <div class="m-loading m-loading-container" v-if="loadingFilter">
    <div class="m-icon-loading"></div>
    <p>Đang tải dữ liệu</p>
  </div>
</template>
<script>
export default {
  props:['loadingFilters'],
  data() {
    return {
      loadingFilter: true,
    };
  },
  updated() {
    this.loadingFilter = this.loadingFilters
  },
};
</script>
<style scoped>
@import url("./LoadingPage.css");
</style>