<template>
  <nav class="m-notification-delete">
    <div>
      <h2>Thông báo</h2>
      <span @click="closeNotificationDelete"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
      <p>Bạn có chắc chắn muốn xóa Cán bộ giáo viên đang chọn không?</p>
      <div>
        <button class="m-btn m-btn-normal-two" @click="closeNotificationDelete">
          Đóng
        </button>
        <button class="m-btn m-btn-normal-one">Đồng ý</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    closeNotificationDelete() {
      this.$emit("notificationDelete", false);
    },
  },
  data() {},
  updated() {},
};
</script>

<style scoped>
.m-notification-delete {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: block;
}

.m-notification-delete > div {
  width: 320px;
  height: 150px;
  background-color: var(--white-color);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 12px;
  padding-right: 12px;
  display: block;
}

.m-notification-delete > div span {
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;
}

.m-notification-delete > div p {
  font-size: 15px;
}

.m-notification-delete > div > div {
  display: flex;
  justify-content: flex-end;
}
</style>