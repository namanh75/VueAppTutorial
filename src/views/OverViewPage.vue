<template>
  <div class="m-content-container">
    <!-- nodata container-->
    <!-- <NodataContainer /> -->

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
      @showNotificationDelete="showNotificationDelete"
      @totalCountFunction="totalCountFunction"
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
    :flagForm="flagForm"
    @showToast="showToast"
  />

  <nav class="m-more-delete" v-show="isBtnDelete" @click="notificationDelete">
    <span><img src="../assets/icons/ic_delete.png" alt="" />Xóa</span>
  </nav>

  <!-- Notification Delete  -->
  <NotificationDelete
    v-show="isNotificationDelete"
    @notificationDelete="notificationDelete"
    @confirmNotificationDelete="confirmNotificationDelete"
  />

  <!-- Toast PopUp Error -->
  <ToastMessageError v-show="isShowToastError" :warningString="warningString" />

  <!-- Toast PopUp Successfully -->
  <ToastMessageSuccess v-show="isShowToastSuccess" />

  <!-- Loading Page Animation -->
  <LoadingPage />
</template>
<script>
import axios from "axios";
import FormContainer from "../components/base/form/FormContainer.vue";
import TableContainer from "../components/base/table/TableContainer.vue";
import NotificationDelete from "../components/base/notification/NotificationDelete.vue";
import ToastMessageError from "../components/base/popup/ToastMessageError.vue";
import ToastMessageSuccess from "../components/base/popup/ToastMessageSuccess.vue";
import LoadingPage from "../components/base/filters/LoadingPage.vue";

export default {
  name: "OverView",
  components: {
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
      isBtnDelete: false,
      isNotificationDelete: false,
      isShowToastSuccess: false,
      isShowToastError: false,
      warningString: "",
      employeeDeleteSelect: null,
      flagForm:null,
    };
  },
  methods: {
    btnAddNewOfficer() {
      try {
        this.showFormDetail(true);
        this.dataSelected = {};
        this.flagForm = 1;
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
      this.flagForm=2;
      this.titleForm = "Chỉnh sửa hồ sơ cán bộ nhân viên";
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
    totalCountFunction(data) {
      console.log(data);
    },

    /**
     * Hiện thông báo xóa thi ấn nút xóa
     */
    showNotificationDelete(employee) {
      this.employeeDeleteSelect = employee;
      console.log(this.employeeDeleteSelect);
      this.isNotificationDelete = true;
    },
    /**
     * Xác nhận xóa
     */
    confirmNotificationDelete() {
      try {
        //call APi Xóa
        axios.delete(`http://localhost:5901/api/v1/Officers/${this.employeeDeleteSelect.officerID}`).then((response) => {
          console.log(response);
        });
        //tắt thông Báo
        this.isNotificationDelete = false;
        //thông báo xóa thành công hay thất bại
        this.isShowToastSuccess = true;
        setTimeout(() => {
          this.isShowToastSuccess = false;
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
@import url(../styles/layout/overviewpage.css);
</style>