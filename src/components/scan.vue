<template>
  <div class="scan-content">
    <p class="scan-header">手机扫码 安全登录</p>
    <p class="scan-title">
      使用二维码扫码进行登录<span
        >扫码帮助<i class="iconfont icon-web-icon-"></i
      ></span>
    </p>
    <div class="scan-image">
      <el-image style="width: 220px; height: 220px" :src="imgurl" fit="fill">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i></div
      ></el-image>
    </div>
    <p class="scan-footer">登录即视为您同意<span>《网页版服务协议》</span></p>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      imgurl:
        require('../assets/scan.jpg')
    }
  }
}
</script>

<style lang="less" scoped>
.scan-content {
  margin: 18px 0 30px;
  text-align: center;
  .scan-header {
    font-size: 20px;
    font-weight: 500;
    color: rgba(65, 74, 96, 1);
  }
  .scan-title {
    color: #9fa3af;
    font-size: 14px;
    span {
      margin-left: 14px;
    }
    span,
    .icon-web-icon- {
      color: #3a76ff;
    }
  }
  .scan-footer{
    font-size: 13px;
    font-weight: 400;
    color: rgba(141, 146, 161, 1);
    span {
      color: rgba(0, 194, 179, 1);
    }
  }
}
</style>
