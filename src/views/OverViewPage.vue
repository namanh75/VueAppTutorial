<template>
  <div class="m-content-container">
    <!-- nodata container-->
    <NodataContainer />

    <!-- main content -->
    <div class="m-content-btn">
      <div class="m-content-search">
        <div class="m-input-container">
          <div>
            <input type="text" value="" />
            <span class="m-input-ico-right"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
          </div>
        </div>
      </div>
      <button class="m-btn m-btn-normal-one" @click="btnAddNewOfficer">
        Thêm
      </button>
      <button class="m-btn m-btn-normal-two">Xuất khẩu</button>
      <button class="m-btn-ico-mini">
        <i
          ><img
            src="../assets/icons/ic_More.png"
            alt=""
            @click="btnDeleteClick"
        /></i>
      </button>
    </div>

    <!-- Table Container -->
    <TableContainer
      @dataFromTable="dataFromTable"
      @showFormDetail="showFormDetail"
      @filterLoading="filterLoading"
    />

    <div class="m-content-footer">
      <span>
        <img src="../assets/icons/ic_MoveToFirst.png" alt="" />
      </span>
      <span>
        <img src="../assets/icons/ic_Back.png" alt="" />
      </span>
      <span>
        <input type="text" />
      </span>
      <span>
        <img src="../assets/icons/ic_Next.png" alt="" />
      </span>
      <span>
        <img src="../assets/icons/ic_MoveToLast.png" alt="" />
      </span>
      <span> 1/2 trang (56 giáo viên) </span>
    </div>
  </div>

  <!-- Form Container -->
  <FormContainer
    v-if="isShowFormDetail"
    @showFormDetail="showFormDetail"
    :dataSelected="dataSelected"
    :titleForm="titleForm"
    @showToast="showToast"
  />

  <nav class="m-more-delete" v-show="isBtnDelete" @click="notificationDelete">
    <span><img src="../assets/icons/ic_delete.png" alt="" />Xóa</span>
  </nav>

  <!-- Notification Delete  -->
  <NotificationDelete
    v-show="isNotificationDelete"
    @notificationDelete="notificationDelete"
  />

  <!-- Toast PopUp Error -->
  <ToastMessageError v-show="isShowToastError" :warningString="warningString" />

  <!-- Toast PopUp Successfully -->
  <ToastMessageSuccess v-show="isShowToastSuccess" />

  <!-- Loading Page Animation -->
  <LoadingPage :loadingFilters="loadingFilter" />
</template>
<script>
import NodataContainer from "../components/base/NodataContainer.vue";
import FormContainer from "../components/base/FormContainer.vue";
import TableContainer from "../components/base/table/TableContainer.vue";
import NotificationDelete from "../components/base/NotificationDelete.vue";
import ToastMessageError from "../components/base/ToastMessageError.vue";
import ToastMessageSuccess from "../components/base/ToastMessageSuccess.vue";
import LoadingPage from "../components/base/LoadingPage.vue";

export default {
  name: "OverView",
  components: {
    NodataContainer,
    FormContainer,
    TableContainer,
    NotificationDelete,
    ToastMessageError,
    ToastMessageSuccess,
    LoadingPage,
  },
  props: ["employee"],
  data() {
    return {
      isShowFormDetail: false,
      titleForm: null,
      dataSelected: {},
      loadingFilter: null,
      isBtnDelete: false,
      isNotificationDelete: false,
      isShowToastSuccess: false,
      isShowToastError: false,
      warningString: "",
    };
  },
  methods: {
    btnAddNewOfficer() {
      try {
        this.showFormDetail(true);
        this.dataSelected = {};
        this.titleForm = "Thêm mới cán bộ nhân viên";
      } catch (e) {
        console.log(e);
      }
    },
    showFormDetail(isShow) {
      try {
        this.isShowFormDetail = isShow;
      } catch (e) {
        console.log(e);
      }
    },
    dataFromTable(employee) {
      this.dataSelected = employee;
      this.titleForm = "Chỉnh sửa hồ sơ cán bộ nhân viên";
    },
    filterLoading(loading) {
      try {
        this.loadingFilter = loading;
      } catch (e) {
        console.log(e);
      }
    },
    btnDeleteClick() {
      this.isBtnDelete = !this.isBtnDelete;
    },
    notificationDelete(e) {
      this.isBtnDelete = false;
      this.isNotificationDelete = e;
    },
    showToast(isShowToastSuccess, warningString) {
      if (isShowToastSuccess == true) {
        this.isShowToastError = false;
        this.isShowToastSuccess = true;
        setTimeout(() => {
          this.isShowToastSuccess = false;
        }, 3000);
        this.isShowFormDetail = false;
      }
      if (isShowToastSuccess == false) {
        this.isShowToastSuccess = false;
        this.warningString = warningString;
        this.isShowToastError = true;
        setTimeout(() => {
          this.isShowToastError = false;
        }, 3000);
      }
    },
  },
};
</script>
<style scoped>
@import url(../styles/layout/overviewpage.css);
</style>