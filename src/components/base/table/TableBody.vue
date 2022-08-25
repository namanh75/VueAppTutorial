<template>
  <tbody>
    <tr
      class="m-content-column"
      v-for="employee in employees"
      :key="employee.EmployeeID"
      @dblclick="rowOnDblClick(employee)"
    >
      <td class="m-content-table-column-1">
        <input
          type="checkbox"
          @click="checkItem(employee)"
          ref="input"
          :checked="checkBoxAll"
          
        />
      </td>
      <td class="m-content-table-column-2">{{ employee.EmployeeCode }}</td>
      <td class="m-content-table-column-3">{{ employee.EmployeeName }}</td>
      <td class="m-content-table-column-4">0398790580</td>
      <td class="m-content-table-column-5">Giáo dục</td>
      <td class="m-content-table-column-6"></td>
      <td class="m-content-table-column-7"></td>
      <td class="m-content-table-column-8"></td>
      <td class="m-content-table-column-9">
        <img src="../../../assets/icons/ic_Check.png" alt="" />
      </td>
      <td class="m-content-table-column-10">
        <span @click="rowOnDblClick(employee)"
          ><img src="../../../assets/icons/ic_Edit.png" alt=""
        /></span>
        <span><img src="../../../assets/icons/ic_delete.png" alt="" /></span>
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
.m-content-table {
  position: relative;
  margin-left: 12px;
  min-width: 900px;
  box-sizing: border-box;
  height: calc(100vh - 200px);
  overflow-y: scroll;
  overflow-x: scroll;
}

.m-content-table table thead {
  position: sticky;
  top: 0;
  background-color: #ffffff;
}
.m-tr-active {
  background-color: rgba(0, 0, 0, 0.1);
}
input[type="checkbox"] {
  cursor: pointer;
}
.m-content-table table tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.m-table-tr-active {
  background-color: rgba(0, 0, 0, 0.05);
}
.m-content-table table input[type="checkbox"] {
  filter: hue-rotate(300deg);
}

table,
tr,
td {
  border-collapse: collapse;
  text-align: center;
}
tr {
  cursor: pointer;
}

td img {
  vertical-align: middle;
  cursor: pointer;
}

table tr td span {
  cursor: pointer;
}

table tr td span img {
  vertical-align: middle;
}

.m-content-table::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}

.m-content-table::-webkit-scrollbar-thumb {
  background-color: #8f8f8f;
  border-radius: 4px;
}

.m-content-table td {
  height: 40px;
  line-height: 40px;
  border-collapse: collapse;
}
thead tr {
  background-color: #ffffff;
}

.m-content-table .m-content-table-column-1 {
  width: calc(1 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
}

.m-content-table .m-content-table-column-2 {
  width: calc(2 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-3 {
  width: calc(4 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-4 {
  width: calc(2 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-5 {
  width: calc(3 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-6 {
  width: calc(2 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-7 {
  width: calc(4 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: left;
  padding-left: 12px;
}

.m-content-table .m-content-table-column-8 {
  width: calc(2 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: center;
}

.m-content-table .m-content-table-column-9 {
  width: calc(2 * var(--value-of-column));
  border-right: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
  text-align: center;
}

.m-content-table .m-content-table-column-10 {
  width: calc(1.5 * var(--value-of-column));
  border-bottom: 1px solid #b1b1b1;
  text-align: center;
}

/* content footer */
.m-content-footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  box-shadow: 6px 3px 6px inset rgba(0, 0, 0, 0.08);
  padding-top: 16px;
}

.m-content-footer span img {
  padding: 0 6px;
  box-sizing: border-box;
  line-height: 64px;
  vertical-align: middle;
}

.m-content-footer span img {
  cursor: pointer;
}

.m-content-footer span input {
  height: 32px;
  width: 64px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #b1b1b1;
  text-align: center;
}
</style>