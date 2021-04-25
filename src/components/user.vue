<template>
  <div class="form-content">
    <div class="form-header">
      <span :class="{ cur: isPassMsg === 1 }" @click="isPassMsg = 1"
        >密码登录</span
      >
      <span :class="{ cur: isPassMsg === 2 }" @click="isPassMsg = 2"
        >短信登录</span
      >
    </div>
    <el-form
      :model="formLabelAlign"
      class="formInfo"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入11位手机号"
          v-model="formLabelAlign.phone"
          type="text"
          :validate-event="false"
        >
          <template slot="prepend"
            ><i class="iconfont icon-shouji"></i
          ></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="psd"
        :style="{ display: isPassMsg === 1 ? 'block' : 'none' }"
      >
        <el-input
          placeholder="请输入6位密码"
          v-model="formLabelAlign.psd"
          type="password"
          autoComplete="off"
          :validate-event="false"
        >
          <template slot="prepend"><i class="iconfont icon-mima"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="msg"
        :style="{ display: isPassMsg === 2 ? 'block' : 'none' }"
      >
        <el-input
          placeholder="请输入6位验证码"
          v-model="formLabelAlign.msg"
          type="text"
          autoComplete="off"
          :validate-event="false"
        >
          <template slot="prepend"
            ><i class="iconfont icon-duanxinicon"></i
          ></template>
          <el-button
            slot="append"
            @click="sendMsg"
            :disabled="disabled"
            class="msgBtn"
            >{{ code_ts }}</el-button
          >>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="form-btn" :loading="loading" @click.native.prevent="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import { isvalidPhone, isvalidPass } from '../utils/common'
import api from '../request/api/user'
export default {
  data () {
    // 定义一个全局的变量，谁用谁知道
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isvalidPass(value)) {
        callback(new Error('密码由8-16字母和數字組成，不能是纯数字或者纯英文'))
      } else {
        callback()
      }
    }
    return {
      isPassMsg: 1,
      formLabelAlign: {
        phone: '',
        psd: '',
        msg: ''
      },
      rules: {
        psd: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: validPhone,
            trigger: 'blur'
          },
          { min: 11, max: 11, trigger: 'blur' }
        ]
      },
      loading: false,
      disabled: false, // 点击获取验证码按钮判断
      timer: null,
      code_ts: '发送验证码', // 倒计时提示文字
      sec: 60 // 倒计时秒数
    }
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          // 验证成功的情况操作
          this.$store.dispatch('login', this.formLabelAlign).then(() => {
            this.$router.push('/')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('请完善表单相关信息！')
          return false
        }
      })
    },
    sendMsg () {
      if (!this.timer) {
        const phone = this.formLabelAlign.phone
        api.sendMsg(phone).then((res) => {
          if (res.status === 1) {
            this.timer = setInterval(() => {
              if (this.sec > 1 && this.sec <= 60) {
                this.sec--
                this.code_ts = `已发送${this.sec}s`
                this.disabled = true // 按钮此时不能点击
              } else {
                this.code_ts = '发送验证码'
                clearInterval(this.timer)
                this.timer = null
                this.sec = 60
                this.disabled = false // 按钮此时可以点击
              }
            }, 700)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  },
  watch: {
    'formLabelAlign.msg': function (value) {
      var reg = /\b1[3456789]\d{9}\b/g
      const val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    }
  }
}
</script>
<style>
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  color: #333;
  border-color: #6adbcf;
}
/* 去除默认的谷歌输入框选中的样式 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  box-shadow: 0 0 0 60px #ffffff inset;
  -webkit-text-fill-color: #333333;
}
input::-webkit-input-placeholder {
  /* 修改字体颜色 */
  color: #ddd;
  /* 修改字号，默认继承input */
  font-size: 13px;
}
.el-form-item {
  margin-bottom: 26px;
}
</style>
<style lang="less" scoped>
.form-content {
  .form-header {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    span {
      width: 146px;
      height: 36px;
      line-height: 36px;
      color: #414a60;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      border: 1px solid rgba(227, 231, 237, 1);
      margin: 0;
      &:hover,
      &.cur {
        border-color: #53cac3;
        color: #53cac3;
      }
    }
  }
  .formInfo {
    .msgBtn {
      width: 90px;
      height: 90%;
      line-height: 0.9;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0 none;
      border: none;
    }
    .form-btn {
      width: 100%;
      font-size: 16px;
      height: 42px;
      color: #fff;
      letter-spacing: 1px;
      background: #5dd5c8;
      text-align: center;
      &:hover {
        background-color: #6adbcf;
        color: #fff;
      }
    }
  }
}
</style>
