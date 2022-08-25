<template>
  <nav class="m-toast-container m-toast-container-error">
    <button class="m-toast">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>{{warningString}}</span>
      <!-- <i class="fa-solid fa-xmark fa-xmark-cancel"></i> -->
    </button>
  </nav>
</template>

<script>
export default {
  props: ["warningString"],
};
</script>

<style scoped>
@import url("./ToastMessage.css");
.m-toast{
  border-left: 3px solid #d73838;
}
.m-toast-container-error .fa-triangle-exclamation {
  background-color: #d73838;
  color: white;
}
.m-toast-container-error .fa-xmark-cancel {
  cursor: pointer;
  font-size: 24px;
  color: #d73838;
}
</style>