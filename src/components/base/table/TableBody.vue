<template>
  <tbody>
    <tr
      class="m-content-column"
      v-for="employee in employees"
      :key="employee.EmployeeID"
    >
      <td class="m-content-table-column-1">
        <input
          type="checkbox"
          @click="checkItem(employee)"
          ref="input"
          :checked="checkBoxAll"
          
        />
      </td>
      <td class="m-content-table-column-2" @dblclick="rowOnDblClick(employee)">{{ employee.EmployeeCode }}</td>
      <td class="m-content-table-column-3" @dblclick="rowOnDblClick(employee)">{{ employee.EmployeeName }}</td>
      <td class="m-content-table-column-4" @dblclick="rowOnDblClick(employee)">0398790580</td>
      <td class="m-content-table-column-5" @dblclick="rowOnDblClick(employee)">Giáo dục</td>
      <td class="m-content-table-column-6" @dblclick="rowOnDblClick(employee)"></td>
      <td class="m-content-table-column-7" @dblclick="rowOnDblClick(employee)"></td>
      <td class="m-content-table-column-8" @dblclick="rowOnDblClick(employee)"></td>
      <td class="m-content-table-column-9">
        <img src="../../../assets/icons/ic_Check.png" alt="" />
      </td>
      <td class="m-content-table-column-10">
        <span @click="rowOnDblClick(employee)"
          ><img src="../../../assets/icons/ic_Edit.png" alt=""
        /></span>
        <span @click="showNotificationDelete(employee)"><img src="../../../assets/icons/ic_delete.png" alt="" /></span>
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
      dataLength: null,
      checkList: [],
      lengthOfCheckList: 0,
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
      if (this.checkList.includes(employee.EmployeeId)) {
        this.checkList.pop(employee.EmployeeId);
      } else {
        this.checkList.push(employee.EmployeeId);
      }

      if (this.checkList.length == this.dataLength) this.checkAll = true;
      else this.checkAll = false;
      this.$emit("checkItem", this.checkAll);
      console.log(this.checkList);
    },
    showNotificationDelete(employee){
      this.$emit("showNotificationDelete", employee);
    }
  },
  beforeUpdate() {
    if (this.checkBoxAll == false) {
      this.checkList = [];
    } else {
      this.checkList = [];
      for (var i of this.employees) {
        this.checkList.push(i.EmployeeId);
      }
    }
    console.log(this.checkList);
  },
  mounted() {
    try {
      var me = this;
      axios
        .get("https://amis.manhnv.net/api/v1/Employees")
        .then(function (res) {
          me.employees = res.data;
          me.dataLength = res.data.length;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
@import url('./TableBody.css');
</style>