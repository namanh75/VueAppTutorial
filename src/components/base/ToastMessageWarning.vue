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
.m-toast-container-err{
  display: block;
  position: fixed;
  top: 30px;
  right: 35px;
}
.m-toast {
  font-size: 13px;
  height: 64px;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 3px 6px #ffffff;
  background-color: white;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  min-width: 350px;
}
.m-toast span {
  margin-left: 8px;
  margin-right: 100px;
}
.m-toast i {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* toast error */
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