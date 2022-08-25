<template>
  <nav class="m-toast-container m-toast-container-success">
    <button class="m-toast">
      <i class="fa-solid fa-check"></i>
      <span>Thành công</span>
      <!-- <i class="fa-solid fa-xmark fa-xmark-cancel"></i> -->
    </button>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("./ToastMessage.css");

.m-toast-container-success .fa-check {
  background-color: var(--main-color);
  color: white;
}
.m-toast-container-success .fa-xmark-cancel {
  cursor: pointer;
  font-size: 24px;
  color: var(--main-color);
}
</style>