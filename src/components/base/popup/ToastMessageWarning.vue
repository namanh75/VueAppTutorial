<template>
  <nav class="m-toast-container-err m-toast-container-error">
    <button class="m-toast">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>Không được để trống</span>
      <!-- <i class="fa-solid fa-xmark fa-xmark-cancel"></i> -->
    </button>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("./ToastMessage.css");

/* toast warning */
.m-toast-container-error .fa-triangle-exclamation {
  background-color: #d73838;
  color: white;
}
.m-toast-container-error .fa-xmark-cancel {
  cursor: pointer;
  font-size: 24px;
  color: #d73838;
}
.fa-circle-exclamation {
  background-color: #e4ad2a;
  color: white;
}
.fa-xmark-warn {
  cursor: pointer;
  font-size: 24px;
  color: #e4ad2a;
}
</style>