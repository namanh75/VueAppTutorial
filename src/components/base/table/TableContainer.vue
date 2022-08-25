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
        @showNotificationDelete="showNotificationDelete"
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
      this.checkAllChild = this.checkAll;
    },
    showNotificationDelete(employee){
      this.$emit("showNotificationDelete", employee)
    }
  },
};
</script>

<style scoped>
@import url("./TableContainer.css");
</style>