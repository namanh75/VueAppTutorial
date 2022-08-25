<template>
  <div class="m-content-table">
    <table>
      <thead>
        <tr class="m-content-column">
          <td class="m-content-table-column-1">
            <input
              type="checkbox"
              id="check-all"
              props="test"
              :checked="checkAll"
              @click="checkBoxAll"
            />
          </td>
          <td class="m-content-table-column-2">Số hiệu cán bộ</td>
          <td class="m-content-table-column-3">Họ tên</td>
          <td class="m-content-table-column-4">Số điện thoại</td>
          <td class="m-content-table-column-5">Tổ chuyên môn</td>
          <td class="m-content-table-column-6">QL theo môn</td>
          <td class="m-content-table-column-7">QL kho, phòng</td>
          <td class="m-content-table-column-8">Đào tạo QLTB</td>
          <td class="m-content-table-column-9">Đang làm việc</td>
          <td class="m-content-table-column-10"></td>
        </tr>
      </thead>
      <TableBody
        @dataFromBodyTable="dataFromBodyTable"
        @checkItem="checkItem"
        :checkBoxAll="checkAllChild"
      />
    </table>
  </div>
</template>

<script>
import TableBody from "./TableBody.vue";
export default {
  data() {
    return {
      checkAll: false,
      checkAllChild: false,
    };
  },
  components: {
    TableBody,
  },
  props: ["employee"],
  methods: {
    filterLoading() {
      this.$emit("filterLoading", false);
    },
    dataFromBodyTable(employee) {
      console.log(employee);
      this.$emit("dataFromTable", employee);
      this.$emit("showFormDetail", true);
    },
    checkItem(checkAll) {
      this.checkAll = checkAll;
    },
    checkBoxAll() {
      this.checkAll = !this.checkAll;
      this.checkAllChild=this.checkAll
    },
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
  background-color: rgba(0, 0, 0, 0.1);
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