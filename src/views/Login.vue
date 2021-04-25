<template>
  <el-container class="login-container">
    <el-card class="login-card">
      <el-row class="login-content">
        <el-col :span="8" class="grid-left">
          <ul>
            <li class="title">
              <i class="iconfont icon-mubiaoyemianliebiao"></i>
              <div>
                <p class="c-black">两种界面展示</p>
                <p class="c-gray">登录与注册</p>
              </div>
            </li>
            <li class="title">
              <i class="iconfont icon-xuanzeqi"></i>
              <div>
                <p class="c-black">选择登录的方式</p>
                <p class="c-gray">大部分人选择手机验证的方式</p>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="16" class="grid-right">
          <div class="btn-switch">
            <div class="switch-tip">{{text = isLoginMode?'账号':'扫码'}}登录在这里</div>
            <i
              :class="['iconfont','icon-mode', {'icon-ico':!isLoginMode,'icon-weibiaoti-':isLoginMode,green: isGreen}]"
              @mouseenter="isGreen = true"
              @mouseleave="isGreen = false"
              @click="loginModeChange"
            ></i>
          </div>
          <transition name="" mode="out-in">
            <component :is="currentView"></component>
          </transition>
        </el-col>
      </el-row>
    </el-card>
  </el-container>
</template>

<script type="text/javascript">
import Scan from '../components/scan'
import User from '../components/user'
export default {
  data () {
    return {
      isGreen: false,
      isLoginMode: false,
      currentView: 'User',
      text: '扫码'
    }
  },
  components: {
    Scan,
    User
  },
  methods: {
    loginModeChange () {
      this.isLoginMode = !this.isLoginMode
      if (this.isLoginMode) {
        this.currentView = 'Scan'
      } else {
        this.currentView = 'User'
      }
    }
  }
}
</script>
<style>
.el-card__body {
  padding: 0;
  height: 100%;
  width: 100%;
}
.el-row,
.el-col {
  height: 100%;
}
</style>
<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #5dd5c8;
  .login-card {
    width: 680px;
    height: 520px;
    margin: 100px auto;
    min-width: 580px;
    border-radius: 10px;
    .login-content {
      width: 100%;
      height: 100%;
    }
    .grid-left {
      color: #8d92a1;
      background-color: #f8fcff;
      padding: 100px 30px;
      box-sizing: border-box;
      .title {
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 22px;
          color: darkkhaki;
        }
        & > div {
          margin-left: 10px;
        }
        &:first-child {
          p {
            color: #00c2b3;
            font-weight: 400;
          }
        }
        &:last-child {
          margin-top: 50px;
        }
      }
    }
    .grid-right {
      height: 49px;
      line-height: 49px;
      text-align: right;
      padding: 0 50px;
      box-sizing: border-box;
      .btn-switch {
        text-align: -webkit-right;
        height: 100%;
        .icon-mode {
          display: inline-block;
          position: relative;
          top: -32px;
          right: 13px;
          left: auto;
          font-size: 23px;
          cursor: pointer;
          &.green {
            color: #5dd5c8;
          }
        }
        .switch-tip {
          width: 117px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #5dd5c8;
          color: #fff;
          box-shadow: 0 1px 7px 0 rgba(93, 213, 200, 0.2);
          font-size: 13px;
          position: relative;
          top: 8px;
          right: 50px;
          left: auto;
          &::before {
            position: absolute;
            top: 8px;
            right: -9px;
            content: "";
            width: 0;
            height: 0;
            border-left: 10px solid #5dd5c8;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
          }
        }
      }
    }
  }
}
</style>
