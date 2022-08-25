<template>
  <div class="m-form-add-container">
    <div class="m-form-add">
      <div class="m-form-avt">
        <img src="../../assets/icons/ic_image.png" alt="" />
        <p>Chọn ảnh</p>
        <h3>
          Họ và tên <br />
          Số hiệu cán bộ
        </h3>
      </div>
      <div class="m-form-content">
        <p>{{ titleForm }}</p>
        <span @click="btnCloseAddOnclick"
          ><img src="../../assets/icons/ic_X.png" alt=""
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
                v-model="dataSave.EmployeeCode"
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
                v-model="dataSave.EmployeeName"
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
                v-model="dataSave.phoneNumber"
              />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Email</label>
            <div>
              <input type="text" :value="dataSelected.Email" />
            </div>
          </div>
          <div class="m-input-container">
            <label for="">Tổ bộ môn</label>
            <div>
              <input type="text" :value="groupSelected" />
              <span @click="showGroup"
                ><i class="fa-solid fa-angle-down m-input-icon-1"></i
              ></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-1"
            v-show="isShowGroup"
          >
            <p v-for="gr in groupData" :key="gr" @click="groupClick(gr)">
              {{ gr }}
            </p>
          </div>
          <div class="m-input-container">
            <label for="">Môn dạy</label>
            <div @click="showSubject">
              <div class="m-subject"></div>
              <span><i class="fa-solid fa-angle-down m-input-icon-2"></i></span>
            </div>
          </div>

          <div
            class="m-input-detail-items m-input-detail-items-2"
            v-show="isShowSubject"
          >
            <div>
              <input type="checkbox" />
              <p>Hà Nội</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>TP Hồ Chí Minh</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Đà Nẵng</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Cần thơ</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Hải phòng</p>
            </div>
          </div>
          <div class="m-input-container" id="m-input-max-height">
            <label for="">QL kho, phòng</label>
            <div @click="showRoom">
              <div class="m-room"></div>
              <span><i class="fa-solid fa-angle-down m-input-icon-3"></i></span>
            </div>
          </div>
          <div
            class="m-input-detail-items m-input-detail-items-3"
            v-show="isShowRoom"
          >
            <div>
              <input type="checkbox" />
              <p>Hà Nội</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>TP Hồ Chí Minh</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Đà Nẵng</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Cần thơ</p>
            </div>
            <div>
              <input type="checkbox" />
              <p>Hải phòng</p>
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
            <input type="checkbox" class="m-input-radio-check" />
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
export default {
  name: "FormContainer",
  props: ["dataSelected", "titleForm"],
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
      console.log(gr);
      this.groupSelected = gr;
      this.isShowGroup = false;
    },

    submitData() {
      this.warningString = "Không được để trống:";
      var codeVal = this.$refs.focusInput.value;
      var nameVal = this.$refs.employeeName.value;
      this.isShowToastSuccess = true;
      if (nameVal == "") {
        this.isShowToastSuccess = false;
        this.warningString += " Họ và tên;";
      }
      if (codeVal == "") {
        this.isShowToastSuccess = false;
        this.warningString += " Mã nhân viên;";
      }

      this.$emit("showToast", this.isShowToastSuccess, this.warningString);
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
      groupData: [
        "Tổ toán tin",
        "Tổ lý hóa",
        "Tổ Sinh Sử Địa",
        "Tổ anh văn",
        "Tổ ngữ văn",
        "Tổ văn phòng",
      ],
    };
  },
  created() {
    this.dataSave = this.dataSelected;
  },
  mounted() {
    this.$refs.focusInput.focus();
  },
  updated() {
    this.dataSelect = "nam";
  },
};
</script>
<style scoped>
.m-form-add-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1500;
}
.m-form-add-container input[type="checkbox"] {
  filter: hue-rotate(290deg);
}

.m-form-add-container .m-form-avt {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding-top: 20px;
}

.m-form-add-container .m-form-avt img {
  width: 60%;
}

.m-form-add-container .m-form-avt p {
  width: 60%;
  height: 32px;
  line-height: 32px;
  background-color: var(--main-color);
  color: var(--white-color);
  cursor: pointer;
}

.m-form-add {
  width: 800px;
  height: 360px;
  border: 1px solid #b1b1b1;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: var(--white-color);
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 30% auto;
}

.m-form-add .m-form-avt {
  border-right: 1px solid #b1b1b1;
}

.m-form-content {
  padding-left: 5px;
}

.m-form-content p {
  font-size: 20px;
  font-weight: bold;
}

.m-form-content > span {
  position: absolute;
  display: block;
  cursor: pointer;
  top: 0;
  right: 0;
}

.m-form-content > span img {
  width: 40px;
  height: 40px;
}

.m-form-add .m-form-content nav {
  display: grid;
  grid-template-columns: 48% auto;
  margin-right: 15px;
}

.m-form-add .m-form-content nav .m-input-container:nth-child(even) {
  min-width: 120px;
}

.m-form-add .m-form-content nav .m-input-container > label {
  min-width: 100px;
}

.m-form-add .m-form-content nav > div {
  margin-right: 5px;
}
.m-room {
  width: 387px;
  border: none;
  cursor: pointer;
}
.m-subject {
  width: 127px;
  border: none;
  cursor: pointer;
}
.m-form-add .m-form-content nav #m-input-max-height {
  grid-area: 4/1/5/3;
}

.m-form-add .m-form-content nav #m-input-max-height input {
  width: 395px;
}

.m-form-add .m-form-content nav .m-input-detail-items-1 {
  left: 357px;
  top: 190px;
  width: 142px;
  display: block;
  z-index: 100;
}

.m-form-add .m-form-content nav .m-input-detail-items-2 {
  left: 617px;
  top: 190px;
  width: 163px;
  position: absolute;
  z-index: 300;
  display: block;
  padding-left: 12px;
}
.m-input-detail-items-2 p, .m-input-detail-items-3 p{
  display: inline-block
}

.m-form-add .m-form-content nav .m-input-detail-items-3 {
  left: 357px;
  top: 240px;
  width: 423px;
  position: absolute;
  z-index: 400;
  display: block;
  padding-left: 12px;
}

.m-form-add .m-form-content nav .m-input-detail-items p {
  font-size: 12px;
  font-weight: normal;
}

.m-form-add .m-form-content span {
  color: red;
}

.m-form-add .m-form-content span i {
  color: #b1b1b1;
}

.m-form-add .m-form-content > #m-form-check .m-input-container-mini {
  width: 126px;
  position: relative;
  top: 7px;
}

.m-form-add .m-form-content > #m-form-check .m-input-container-mini span i {
  cursor: pointer;
  color: var(--main-color);
}

.m-form-add .m-form-content .m-form-btn-close {
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
  padding-top: 10px;
}

.m-form-add .m-form-add-warning {
  border: solid 1px rgb(255, 92, 92);
}

.m-form-add .m-form-add-correct {
  border: solid 1px var(--main-color);
}
</style>