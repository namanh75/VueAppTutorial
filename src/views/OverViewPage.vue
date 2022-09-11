<template>
  <div class="m-content-container">
    <!-- nodata container-->
    <NodataContainer v-if="isNodata" />
    <!-- <NodataContainer /> -->

    <!-- main content -->
    <div class="m-content-btn" v-if="!isNodata">
      <div class="m-content-search">
        <div class="m-input-container">
          <div :class="{ 'm-filter-search': isSearchData }">
            <input
              type="text"
              placeholder="Nhập mã hoặc họ tên"
              v-model="keySearch"
              @keyup="searchData"
            />
            <span class="m-input-ico-right"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
          </div>
        </div>
      </div>
      <button class="m-btn m-btn-normal-one" @click="btnAddNewOfficer">
        Thêm
      </button>

      <button class="m-btn m-btn-normal-two" @click="exportExcelAllPage">
        Xuất khẩu
      </button>
      <!-- <div class="m-export">
        <button
          class="m-btn m-btn-normal-three"
          @click="exportExcelCurrentPage"
        >
          Trang hiện tại
        </button>
        <button class="m-btn m-btn-normal-four">Tất cả các trang</button>
      </div> -->

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
      v-if="!isNodata"
      @dataFromTable="dataFromTable"
      @showFormDetail="showFormDetail"
      @showNotificationDelete="showNotificationDelete"
      @totalCountFunction="totalCountFunction"
      :reloadData="reloadData"
      @DeleteMany="DeleteMany"
      :reUnCheck="reUnCheck"
    />

    <div class="m-content-footer" v-if="!isNodata">
      <span @click="firstPageClick">
        <img src="../assets/icons/ic_MoveToFirst.png" alt="" />
      </span>
      <span @click="backPageClick">
        <img src="../assets/icons/ic_Back.png" alt="" />
      </span>
      <span>
        <input type="text" v-model="currentPage" @keyup="pagingSelect" />
      </span>
      <span @click="nextPageClick">
        <img src="../assets/icons/ic_Next.png" alt="" />
      </span>
      <span @click="lastPageClick">
        <img src="../assets/icons/ic_MoveToLast.png" alt="" />
      </span>
      <span>
        <!-- {{ CheckNullAxiosFunction(totalPage) }} -->
        {{ currentPage }}/ {{ totalPage}} trang ({{ totalCount }} giáo viên)
      </span>
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
import { saveAs } from "file-saver";
import FormContainer from "../components/base/form/FormContainer.vue";
import TableContainer from "../components/base/table/TableContainer.vue";
import NotificationDelete from "../components/base/notification/NotificationDelete.vue";
import ToastMessageError from "../components/base/popup/ToastMessageError.vue";
import ToastMessageSuccess from "../components/base/popup/ToastMessageSuccess.vue";
import LoadingPage from "../components/base/filters/LoadingPage.vue";
import NodataContainer from "../components/base/references/NodataContainer.vue";

export default {
  name: "OverView",
  components: {
    FormContainer,
    TableContainer,
    NotificationDelete,
    ToastMessageError,
    ToastMessageSuccess,
    LoadingPage,
    NodataContainer,
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
      flagForm: null,
      reloadData: null,
      totalCount: null,
      totalPage: null,
      currentPage: 1,
      filter: "1",
      keySearch: "",
      isSearchData: false,
      deleteArrayData: null,
      flagDelete: null,
      reUnCheck: false,
      isShowExport: false,
      isNodata: false,
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
      this.flagForm = 2;
      this.titleForm = "Chỉnh sửa hồ sơ cán bộ nhân viên";
    },
    btnDeleteClick() {
      this.isBtnDelete = !this.isBtnDelete;
      this.flagDelete = 2;
    },
    notificationDelete(e) {
      this.isBtnDelete = false;
      this.isNotificationDelete = e;
    },
    showToast(isShowToastSuccess, warningString) {
      var me = this;
      if (isShowToastSuccess == true) {
        this.isShowToastError = false;
        this.isShowToastSuccess = true;
        setTimeout(() => {
          this.isShowToastSuccess = false;
        }, 3000);
        this.isShowFormDetail = false;
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/paging?Offset=${
              (me.currentPage - 1) * 20 + 1
            }&Limit=20&filter=${this.filter}`
          )
          .then((res) => {
            me.reloadData = res.data.data;
            me.totalCount = res.data.totalCount;
            me.totalCountFunction(me.totalCount);
          });
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
      this.totalCount = data;
      this.totalPage = data / 20;
      this.totalPage = Math.ceil(this.totalPage);
    },
    /**
     * chuyển trang
     */
    firstPageClick() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    backPageClick() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    nextPageClick() {
      if (this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    lastPageClick() {
      if (this.currentPage != this.totalPage) {
        this.currentPage = this.totalPage;
        var me = this;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
              me.reUnCheck = !me.reUnCheck;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    pagingSelect() {
      var me = this;
      if (this.currentPage >= 1 && this.currentPage <= this.totalPage) {
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20&filter=${me.filter}`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else if (this.currentPage == "") {
        console.log("vui lòng nhập số");
      } else if (this.currentPage < 1) {
        this.currentPage = 1;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
          console.log("thất bại");
        }
      } else {
        this.currentPage = 1;
        try {
          axios
            .get(
              `http://localhost:5901/api/v1/Officers/paging?Offset=${
                (me.currentPage - 1) * 20 + 1
              }&Limit=20`
            )
            .then(function (res) {
              me.reloadData = res.data.data;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    /**
     * Hiện thông báo xóa thi ấn nút xóa
     */
    showNotificationDelete(employee, flag) {
      this.employeeDeleteSelect = employee;
      console.log(this.employeeDeleteSelect);
      this.isNotificationDelete = true;
      this.flagDelete = flag;
      console.log(employee)
    },
    /**
     * Xác nhận xóa
     */
    confirmNotificationDelete() {
      try {
        var me = this;
        //call APi Xóa
        if (this.flagDelete == 1) {
          axios
            .delete(
              `http://localhost:5901/api/v1/Officers/${this.employeeDeleteSelect.officerID}`
            )
            .then((response) => {
              console.log(response);
              axios
                .get(
                  `http://localhost:5901/api/v1/Officers/paging?Offset=${
                    (me.currentPage - 1) * 20 + 1
                  }&Limit=20&filter=${this.filter}`
                )
                .then((res) => {
                  me.reloadData = res.data.data;
                  me.totalCount = res.data.totalCount;
                  me.totalCountFunction(me.totalCount);
                });
              //tắt thông Báo
              this.isNotificationDelete = false;
              //thông báo xóa thành công hay thất bại
              this.isShowToastSuccess = true;
              setTimeout(() => {
                this.isShowToastSuccess = false;
              }, 3000);
            });
        }
        if (this.flagDelete == 2) {
          var arraySend = [];
          for (var i = 0; i < me.deleteArrayData.length; i++) {
            arraySend.push(me.deleteArrayData[i]);
          }
          console.log(arraySend);
          axios
            .post(
              `http://localhost:5901/api/v1/Officers/ManyDelete?size=${me.deleteArrayData.length}`,
              arraySend
            )
            .then((response) => {
              console.log(response);
              axios
                .get(
                  `http://localhost:5901/api/v1/Officers/paging?Offset=${
                    (me.currentPage - 1) * 20 + 1
                  }&Limit=20&filter=${this.filter}`
                )
                .then((res) => {
                  me.reloadData = res.data.data;
                  me.totalCount = res.data.totalCount;
                  me.totalCountFunction(me.totalCount);
                  me.reUnCheck = true;
                  //tắt thông Báo
                  me.isNotificationDelete = false;
                  //thông báo xóa thành công hay thất bại
                  me.isShowToastSuccess = true;
                  setTimeout(() => {
                    me.isShowToastSuccess = false;
                  }, 3000);
                });
            })
            .catch((e) => {
              console.log(e);
              me.isNotificationDelete = false;
              //thông báo xóa thành công hay thất bại
              me.isShowToastError = true;
              setTimeout(() => {
                me.isShowToastError = false;
              }, 3000);
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
    searchData() {
      var me = this;
      me.reUnCheck = !me.reUnCheck;
      if (me.keySearch == "") {
        me.filter = "1";
        me.isSearchData = false;
      } else {
        me.filter = me.keySearch.replace("", "%");
        me.isSearchData = true;
      }
      try {
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/paging?Offset=${
              (me.currentPage - 1) * 20 + 1
            }&Limit=20&filter=${me.filter}`
          )
          .then(function (res) {
            me.reloadData = res.data.data;
            me.totalCount = res.data.totalCount;
            me.totalCountFunction(me.totalCount);
          });
      } catch (error) {
        console.log(error);
      }
    },
    DeleteMany(checkList) {
      this.deleteArrayData = checkList;
    },

    exportExcelCurrentPage() {},
    exportExcelAllPage() {
      var me = this;
      try {
        axios
          .get(
            `http://localhost:5901/api/v1/Officers/export?Offset=1&Limit=${me.totalCount}&filter=${me.filter}`,
            { responseType: "blob" }
          )
          .then(function (res) {
            saveAs(res.data, "Danh sách cán bộ nhân viên.xlsx");
          });
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