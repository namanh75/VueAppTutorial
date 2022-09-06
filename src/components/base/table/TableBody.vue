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
        {{employee.equipmentManagementTraining}}
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

export default {
  data() {
    return {
      isChecked: false,
      employees: null,
      totalCount: null,
      dataLength: 20,
      checkList: [],
      checkAll: false,
    };
  },
  props: ["employee", "checkBoxAll"],
  methods: {
    rowOnDblClick(employeedata) {
      this.$emit("dataFromBodyTable", employeedata);
    },
    checkItem(employee) {
      console.log(this);
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
      console.log(this.checkList);
    },
    showNotificationDelete(employee) {
      this.$emit("showNotificationDelete", employee);
    },
    change(is) {
      if (is == 1) return true;
      if (is == 0) return false;
    },
  },
  beforeUpdate() {
    if (this.checkBoxAll == false) {
      this.checkList = [];
    } else {
      this.checkList = [];
      for (var i of this.employees) {
        this.checkList.push(i.officerID);
      }
    }
    console.log(this.checkList);
  },
  mounted() {
    try {
      var me = this;
      axios
        .get("http://localhost:5901/api/v1/Officers/paging?Offset=1&Limit=20")
        .then(function (res) {
          me.employees = res.data.data;
          me.totalCount = res.data.totalCount;
          this.$emit("totalCountFunction", this.totalCount);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
@import url("./TableBody.css");
td {
  overflow: hidden;
}
</style>