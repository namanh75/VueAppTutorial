<template>
  <div class="m-form-add-container">
    <div class="m-form-add">
      <div class="m-form-avt">
        <img src="../../../assets/icons/ic_image.png" alt="" />
        <p>Chọn ảnh</p>
        <h3>
          Họ và tên <br />
          Số hiệu cán bộ
        </h3>
      </div>
      <div class="m-form-content">
        <p>{{ titleForm }}</p>
        <span @click="btnCloseAddOnclick"
          ><img src="../../../assets/icons/ic_X.png" alt=""
        /></span>
        <nav>
          <div class="m-input-container">
            <label for="">Số hiệu cán bộ<span>*</span></label>
            <div :class="{ 'm-form-add-warning': isValidateEmployeeCode }">
              <input
                type="text"
                class="m-input-check m-focus-input"
                name="employeeCode"
                props="Số hiệu cán bộ"
                v-model="dataSave.officerCode"
                ref="focusInput"
                @blur="checkEmptyInputEmployeeCode"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Họ và tên <span>*</span></label>
            <div :class="{ 'm-form-add-warning': isValidateEmployeeName }">
              <input
                type="text"
                class="m-input-check"
                name="name"
                props="Họ và tên"
                v-model="dataSave.fullName"
                ref="employeeName"
                @blur="checkEmptyInputEmployeeName"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Số điện thoại</label>
            <div>
              <input
                type="text"
                name="phoneNumber"
                props="Số điện thoại"
                ref="phoneNumber"
                v-model="dataSave.phoneNumber"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Email</label>
            <div>
              <input type="text" v-model="dataSave.email" ref="email" />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Tổ bộ môn</label>
            <div>
              <input type="text" v-model="dataSave.groupName" />
              <span @click="showGroup"
                ><i class="fa-solid fa-angle-down m-input-icon-1"></i
              ></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-1"
            v-show="isShowGroup"
          >
            <p
              v-for="gr in groupData"
              :key="gr"
              @click="groupClick(gr.groupName)"
            >
              {{ gr.groupName }}
            </p>
          </div>
          <div class="m-input-container">
            <label for="">Môn dạy</label>
            <div @click="showSubject">
              <div class="m-subject">{{ dataSave.subjectName }}</div>
              <span><i class="fa-solid fa-angle-down m-input-icon-2"></i></span>
            </div>
          </div>

          <div
            class="m-input-detail-items m-input-detail-items-2"
            v-show="isShowSubject"
          >
            <div
              v-for="sb in subjectData"
              :key="sb"
              @click="subjectClick(sb.subjectName)"
            >
              <input type="checkbox" />
              <p>{{ sb.subjectName }}</p>
            </div>
          </div>
          <div class="m-input-container" id="m-input-max-height">
            <label for="">QL kho, phòng</label>
            <div @click="showRoom">
              <div class="m-room">{{ dataSave.storageRoomName }}</div>
              <span><i class="fa-solid fa-angle-down m-input-icon-3"></i></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-3"
            v-show="isShowRoom"
          >
            <div
              v-for="sr in storageRoomData"
              :key="sr"
              @click="storageRoomClick(sr.storageRoomName)"
            >
              <input type="checkbox" />
              <p>{{ sr.storageRoomName }}</p>
            </div>
          </div>
        </nav>
        <div id="m-form-check">
          <div
            class="m-input-container m-input-downline m-input-check-box-color"
          >
            <input
              type="checkbox"
              class="m-input-radio-check m-input-downline"
            />
            <label>Trình độ nghiệp vụ QLTB</label>
            <input
              type="checkbox"
              class="m-input-radio-check"
              :checked="change(dataSave.workStatus)"
              @click="workStatusCheck(dataSave.workStatus)"
            />
            <label>Đang làm việc</label>
            <label for="">Ngày nghỉ việc</label>
            <div class="m-input-container m-input-container-mini">
              <input type="text" class="m-input-ico m-input-ico-mini" />
              <span class="m-input-ico-right"
                ><i class="fa-solid fa-calendar-days"></i
              ></span>
            </div>
          </div>
        </div>
        <div class="m-form-btn-close">
          <button class="m-btn m-btn-normal-two" @click="btnCloseAddOnclick">
            Đóng
          </button>
          <button class="m-btn m-btn-normal-one" @click="submitData">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "FormContainer",
  props: ["dataSelected", "titleForm", "flagForm"],
  methods: {
    btnCloseAddOnclick() {
      try {
        this.$emit("showFormDetail", false);
      } catch (e) {
        console.log(e);
      }
    },
    checkEmptyInputEmployeeCode() {
      var val = this.$refs.focusInput.value;
      if (val == "") {
        this.isValidateEmployeeCode = true;
      } else {
        this.isValidateEmployeeCode = false;
      }
    },
    checkEmptyInputEmployeeName() {
      var val = this.$refs.employeeName.value;
      if (val == "") {
        this.isValidateEmployeeName = true;
        this.dataSelect = val;
      } else {
        this.isValidateEmployeeName = false;
        this.dataSelect = val;
      }
    },

    showGroup() {
      this.isShowSubject = false;
      this.isShowRoom = false;
      this.isShowGroup = !this.isShowGroup;
    },
    showSubject() {
      this.isShowGroup = false;
      this.isShowRoom = false;
      this.isShowSubject = !this.isShowSubject;
    },
    showRoom() {
      this.isShowSubject = false;
      this.isShowGroup = false;
      this.isShowRoom = !this.isShowRoom;
    },

    groupClick(gr) {
      this.groupSelected = gr;
      this.dataSave.groupName = gr;
      this.isShowGroup = false;
    },
    subjectClick(sb) {
      this.dataSave.subjectName = sb;
      this.isShowSubject = false;
    },
    storageRoomClick(sr) {
      this.dataSave.storageRoomName = sr;
      this.isShowRoom = false;
    },

    submitData() {
      try {
        this.warningString = "Không được để trống:";
        var codeVal = this.$refs.focusInput.value;
        var nameVal = this.$refs.employeeName.value;
        var phoneVal = this.$refs.phoneNumber.value;
        var emailVal = this.$refs.email.value;
        if (phoneVal == "") this.dataSave.phoneNumber = "chưa có";
        if (emailVal == "") this.dataSave.email = "test@example.com";
        this.isShowToastSuccess = true;
        if (nameVal == "") {
          this.isShowToastSuccess = false;
          this.warningString += " Họ và tên;";
        }
        if (codeVal == "") {
          this.isShowToastSuccess = false;
          this.warningString += " Mã nhân viên;";
        }
        if (this.isShowToastSuccess) {
          if (this.flagForm == 1) {
            this.dataSave.groupID = null;
            this.dataSave.subjectID = null;
            this.dataSave.storageRoomID = null;
            this.dataSave.identifyNumber="123456789"

            this.dataSave.identifyNumber = "chưa có";
            axios
              .post("http://localhost:5901/api/v1/Officers", this.dataSave)
              .then((response) => {
                console.log(response);
                this.$emit(
                  "showToast",
                  this.isShowToastSuccess,
                  this.warningString
                );
              });
          }
          if (this.flagForm == 2) {
            axios
              .put(
                `http://localhost:5901/api/v1/Officers/${this.dataSelected.officerID}`,
                this.dataSave
              )
              .then((res) => {
                console.log(res);
                this.$emit(
                  "showToast",
                  this.isShowToastSuccess,
                  this.warningString
                );
              });
          }
        } else {
          this.$emit("showToast", this.isShowToastSuccess, this.warningString);
        }
      } catch (e) {
        console.log(e);
        this.isShowToastSuccess = false;
        this.warningString = "Có lỗi xảy ra ở server";
        this.$emit("showToast", this.isShowToastSuccess, this.warningString);
      }
      console.log(this.dataSave);
    },
    change(is) {
      if (is == 1) return true;
      if (is == 0) return false;
    },
    workStatusCheck(workStatus) {
      if (workStatus == 1) return (this.dataSave.workStatus = 0);
      if (workStatus == 0) return (this.dataSave.workStatus = 1);
    },
  },
  data() {
    return {
      isValidateEmployeeCode: null,
      isValidateEmployeeName: null,
      dataSelect: null,
      dataSave: null,
      warningString: "",
      isShowToastWarning: false,
      isShowToastSuccess: false,
      isShowSubject: false,
      isShowGroup: false,
      isShowRoom: false,
      groupSelected: null,
      groupData: [],
      subjectData: [],
      storageRoomData: [],
    };
  },
  created() {
    this.dataSave = this.dataSelected;
  },
  mounted() {
    this.$refs.focusInput.focus();
    try {
      var me = this;
      axios.get("http://localhost:5901/api/v1/Groups").then(function (resp) {
        me.groupData = resp.data;
      });
      axios
        .get("http://localhost:5901/api/v1/StorageRooms")
        .then(function (respo) {
          me.storageRoomData = respo.data;
        });
      axios
        .get("http://localhost:5901/api/v1/Subjects")
        .then(function (response) {
          me.subjectData = response.data;
        });
    } catch (err) {
      console.log(err);
    }
  },
  // updated() {
  //   this.dataSelect = "nam";
  // },
};
</script>

<style scoped>
@import url("./FormContainer.css");
</style>