<template>
  <tbody>
    <tr
      class="m-content-column"
      v-for="employee in employees"
      :key="employee.officerID"
      
    >
      <td class="m-content-table-column-1">
        <input
          type="checkbox"
          @click="checkItem(employee)"
          ref="input"
          :checked="checkBoxAll"
        />
      </td>
      <td class="m-content-table-column-2" @dblclick="rowOnDblClick(employee)">
        {{ employee.officerCode }}
      </td>
      <td class="m-content-table-column-3" @dblclick="rowOnDblClick(employee)">
        {{ employee.fullName }}
      </td>
      <td class="m-content-table-column-4" @dblclick="rowOnDblClick(employee)">
        {{ employee.phoneNumber }}
      </td>
      <td class="m-content-table-column-5" @dblclick="rowOnDblClick(employee)">
        {{ employee.groupName }}
      </td>
      <td class="m-content-table-column-6" @dblclick="rowOnDblClick(employee)">
        {{ employee.subjectName }}
      </td>
      <td class="m-content-table-column-7" @dblclick="rowOnDblClick(employee)">
        {{ employee.storageRoomName }}
      </td>
      <td class="m-content-table-column-8" @dblclick="rowOnDblClick(employee)">
        <div
          :class="{
            'm-td-check': change(employee.equipmentManagementTraining),
          }"
        ></div>
      </td>
      <td class="m-content-table-column-9" @dblclick="rowOnDblClick(employee)">
        <div :class="{ 'm-td-check': change(employee.workStatus) }"></div>
      </td>
      <td class="m-content-table-column-10">
        <span @click="rowOnDblClick(employee)"
          ><img src="../../../assets/icons/ic_Edit.png" alt=""
        /></span>
        <span @click="showNotificationDelete(employee)"
          ><img src="../../../assets/icons/ic_delete.png" alt=""
        /></span>
      </td>
    </tr>
  </tbody>
</template>

<script>
import axios from "axios";
// import * as APIMethods from "../../../scripts/APIMethods";

export default {
  data() {
    return {
      isChecked: false, //ki???m tra check box
      employees: null, // danh s??ch c??n b??? nh??n vi??n
      totalCount: null, // t??? s??? nh??n vi??n
      dataLength: 20, //s??? nh??n vi??n c?? trong trang hi???n t???i (max 20)
      checkList: [], //check list ng?????i d??ng ch???n
      checkAll: false, //check box to??n b???
      filter: "1", //b??? l???c t??m ki???m
      isTrSelected: false, //style background cho dong dc chon
    };
  },
  props: ["employee", "checkBoxAll", "reloadData"],
  methods: {
    /**
     * Emit d??? li???u t??? table l??n form
     */
    rowOnDblClick(employeedata) {
      this.$emit("dataFromBodyTable", employeedata);
    },

    /**
     *  x??? l?? check box t???ng d??ng
     */
    checkItem(employee) {
      if (this.checkList.includes(employee.officerID)) {
        this.checkList = this.checkList.filter(function (element) {
          return element !== employee.officerID;
        });
      } else {
        this.checkList.push(employee.officerID);
      }
      if (this.checkList.length == this.dataLength) this.checkAll = true;
      else this.checkAll = false;
      this.$emit("checkItem", this.checkAll);
      this.$emit("DeleteMany", this.checkList);
      console.log(this.checkList);
      // this.backGroundCheck(employee.officerID)
    },

    /**
     *  x??? l?? checkbox to??n b???
     */
    showNotificationDelete(employee) {
      this.$emit("showNotificationDelete", employee, 1);
    },

    /**
     * Thay gi?? tr??? 0,1 th??nh bi???u t?????ng x trong giao di???n
     */
    change(is) {
      if (is == 1) return true;
      return false;
    },

    // backGroundCheck(officerID) {
    //   console.log(this.checkList)
    //   if (this.checkList.includes(officerID)) {
    //     console.log(officerID);
    //   } else console.log("false");
    // },
  },

  /**
   * X??? l?? Danh s??ch x??a nhi???u
   */
  beforeUpdate() {
    if (this.checkBoxAll == false) {
      this.checkList = [];
      this.$emit("DeleteMany", this.checkList);
    } else {
      this.checkList = [];
      for (var i of this.employees) {
        this.checkList.push(i.officerID);
        this.$emit("DeleteMany", this.checkList);
      }
    }
  },

  /**
   * Call API g???i d??? li???u trang 1 khi l???n ?????u t???i giao di???n
   */
  mounted() {
    var me = this;
    try {
      // var res = APIMethods.GetOfficer(
      //   `http://localhost:5901/api/v1/Officers/paging?Offset=1&Limit=20&filter=${this.filter}`
      // );
      // me.employees = res.data.data;
      // me.totalCount = res.data.totalCount;
      // me.$emit("totalCountFunction", me.totalCount);
      // me.dataLength = me.employees.length;
      // me.$emit("loadingFunction", false);
      axios
        .get(
          `http://localhost:5901/api/v1/Officers/paging?Offset=1&Limit=20&filter=${this.filter}`
        )
        .then(function (res) {
          me.employees = res.data.data;
          me.totalCount = res.data.totalCount;
          me.$emit("totalCountFunction", me.totalCount);
          me.dataLength = me.employees.length;
          me.$emit("loadingFunction", false);
        });
    } catch (error) {
      console.log("l???i");
      console.log(error);
      me.$emit("loadingFunction", false);
    }
    setTimeout(() => {
      this.$emit("loadingFunction", false);
    }, 5000);
  },
  created() {
    this.employees = this.reloadData;
  },
  watch: {
    reloadData() {
      this.employees = this.reloadData;
      this.dataLength = this.reloadData.length;
    },
  },
};
</script>

<style scoped>
@import url("./TableBody.css");
td {
  overflow: hidden;
}
</style>