<template>
  <!-- dialog -->
  <el-dialog
    title="企业人员信息"
    :visible.sync="dialogFormVisible"
    class="company-dialog"
  >
    <el-form :model="companyInfo" ref="dialogForm" :rules="companyRules" label-width="80px">
      <el-form-item label="人员名称" prop="name">
        <el-input v-model="companyInfo.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="入职日期" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择入职日期"
          v-model="companyInfo.date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="所在部门" prop="depart">
        <el-select
          v-model="companyInfo.depart"
          placeholder="请选择所在部门"
          :style="selectWidth"
        >
          <el-option label="管理部门" value="管理部门"></el-option>
          <el-option label="研发部门" value="研发部门"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所处级别" prop="grade">
        <el-select
          v-model="companyInfo.grade"
          placeholder="请选择所处级别"
          :style="selectWidth"
        >
          <el-option label="技术总监" value="技术总监"></el-option>
          <el-option label="开发经理" value="开发经理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所处地址" prop="addressValue">
        <el-cascader
          size="large"
          :options="companyInfo.options"
          v-model="companyInfo.addressValue"
          :props="{ expandTrigger: 'hover' }"
          @change="changeProvice"
          :style="selectWidth"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="companyCompleted()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { getCodeToText, getRegionData } from '../utils/common.js'
export default {
  props: {
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      companyInfo: {
        date: '',
        name: '',
        depart: '',
        grade: '',
        addressName: '',
        addressValue: []
      },
      selectWidth: {
        width: '100%'
      },
      companyRules: {
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' },
          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
        ],
        date: [
          {
            // 去掉type:'date'，验证时会报错
            required: true,
            message: '请选择入职日期',
            trigger: 'change'
          }
        ],
        depart: [
          { required: true, message: '请选择所在部门', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择所处级别', trigger: 'change' }
        ],
        addressValue: [
          { required: true, message: '请选择所在省市区', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogFormVisible: {
      get () {
        return this.isAdd
      },
      set (val) {
        this.$emit('update:isAdd', val)
      }
    }
  },
  watch: {
    isAdd: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.resetForm()
        }
      }
    }
  },
  created () {
    this.resetForm()
  },
  methods: {
    resetForm () {
      this.companyInfo.options = getRegionData()
    },
    // 转化省市区编码为汉字
    changeProvice (val) {
      this.companyInfo.addressName = getCodeToText(val)
    },
    // 确定事件
    companyCompleted () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          const data = this.companyInfo
          this.$emit('addCompanyInfo', data)
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style lang="less">
.company-dialog {
  .el-dialog {
    width: 45%;
  }
  .el-dialog__body{
    padding:14px 20px;
  }
  .el-dialog__footer{
    padding: 0px 20px 14px;
  }
}
</style>
<style lang="less" scoped></style>
