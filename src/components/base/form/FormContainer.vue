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
@import url("./FormContainer.css");
</style>