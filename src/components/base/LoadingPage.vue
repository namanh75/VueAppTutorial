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
.m-loading-container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: none;
}

.m-loading-container .m-icon-loading {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left: 7px solid var(--main-color);
  border-top: 7px solid var(--main-color);
  border-right: 7px solid #ffffff;
  border-bottom: 7px solid #ffffff;
  animation: spin 0.5s infinite linear;
}

.m-loading-container p {
  color: #ffffff;
  font-size: 25px;
}
</style>