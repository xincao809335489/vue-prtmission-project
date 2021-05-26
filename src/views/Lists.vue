<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="name" label="部门成员" width="120">
      </el-table-column>
      <el-table-column prop="depart" label="所在部分" width="120">
      </el-table-column>
      <el-table-column prop="grade" label="所处级别" width="120">
      </el-table-column>
      <el-table-column prop="addressName" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row class="addInfo"
      ><el-button size="medium" type="primary" @click="addInfo"
        >添加</el-button
      ></el-row
    >
    <company-dialog
      :show.sync="show"
      :companyRow.sync="tableData[idx]"
    ></company-dialog>
    <company-dialog-add :isAdd.sync="isAdd" @addCompanyInfo="addCompanyInfo"></company-dialog-add>
  </div>
</template>

<script type="text/javascript">
import CompanyDialog from '../components/companyDialog.vue'
import CompanyDialogAdd from '../components/companyDialogAdd.vue'
export default {
  data () {
    return {
      show: false,
      idx: 0,
      isAdd: false,
      companyRow: {},
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          depart: '管理部门',
          grade: '技术总监',
          addressName: '北京市/市辖区/东城区',
          addressValue: ['110000', '110100', '110101']
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          depart: '管理部门',
          grade: '开发经理',
          addressName: '天津市/市辖区/河东区',
          addressValue: ['120000', '120100', '120102']
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          depart: '管理部门',
          grade: '小组长',
          addressName: '河北省/唐山市/市辖区',
          addressValue: ['130000', '130200', '130201']
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          depart: '管理部门',
          grade: '开发人员',
          addressName: '内蒙古自治区/呼和浩特市/新城区',
          addressValue: ['150000', '150100', '150102']
        }
      ]
    }
  },
  components: {
    'company-dialog': CompanyDialog,
    'company-dialog-add': CompanyDialogAdd
  },
  methods: {
    // 表格编辑功能
    handleEdit (index) {
      // 子组件中绑定的传递数据必须是直接定义在data中的值不能用变量再赋值一次，所以用到index先赋值到idx, :companyRow.sync="tableData[idx]"
      this.idx = index
      this.show = true
    },
    // 表格删除功能
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
    },
    // 新增数据
    addInfo () {
      this.isAdd = true
    },
    // 新增事件
    addCompanyInfo (data) {
      this.tableData.push(data)
    }
  }
}
</script>
<style lang="less" scoped>
.addInfo {
  text-align: left;
  margin-top: 10px;
}
</style>
