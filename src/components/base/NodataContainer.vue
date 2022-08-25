<template>
  <div class="m-nodata-nav">
    <h1>Nodata Guildline</h1>
    <h2>Không có dữ liệu</h2>
    <div>
      <img src="../../assets/icons/ic_Alert.png" alt="" />
      <h3>Chưa có lớp học</h3>
      <p>
        Vui lòng chọn <b>Thêm mới</b> để thêm lớp học hoặc <b>Thêm nhanh</b> để
        thêm lớp hàng loạt
      </p>
      <nav>
        <button class="m-btn m-btn-normal-one">Thêm mới</button>
        <button class="m-btn m-btn-normal-one">Thêm nhanh</button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.m-nodata-nav {
  display: none;
  height: 705px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0px;
  background-color: #eaecef;
  padding-top: 20px;
  box-sizing: border-box;
}

.m-nodata-nav h1 {
  font-size: 40px;
  color: var(--main-color);
}

.m-nodata-nav h2 {
  font-weight: normal;
  font-size: 20px;
  position: relative;
  top: -30px;
}

.m-nodata-nav h1,
.m-nodata-nav > h2 {
  width: 70%;
  text-align: left;
}

.m-nodata-nav > div {
  padding-top: 5%;
  padding-bottom: 3%;
  width: 70%;
  height: 60%;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}
</style>