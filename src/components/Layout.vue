<template>
  <el-container :class="['container', classObj]">
    <el-aside width="200px">
      <v-aside :menuList="menuList"></v-aside>
    </el-aside>
    <el-container class="content">
      <el-header>
        <div class="header-btn">
          <span class="isFoldBtn" @click="toggleSideBar">
            <i class="iconfont icon-mirrorlightctrl" v-if="isFold"></i>
            <i class="iconfont icon-masterctrl" v-else></i>
          </span>
          <v-bread></v-bread>
        </div>
        <span class="img">
          <el-avatar size="small" :src="avatar"></el-avatar>
          <i class="iconfont icon-exit exit" @click="logout"></i>
        </span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import Aside from '../components/aside'
import Bread from '../components/bread'
export default {
  data () {
    return {
      isFold: true
    }
  },
  computed: {
    ...mapState(['avatar', 'menuList', 'isCollapse']),
    classObj () {
      return {
        hideSidebar: this.isCollapse,
        openSidebar: !this.isCollapse
      }
    }
  },
  components: {
    'v-aside': Aside,
    'v-bread': Bread
  },
  methods: {
    toggleSideBar () {
      this.isFold = !this.isFold
      this.$store.dispatch('toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="less">
.container {
  height: 100%;
}
.el-header {
  height: 49px !important;
  -moz-box-shadow: 0px 0px 5px #e4e7ed;
  -webkit-box-shadow: 0px 0px 5px #e4e7ed;
  box-shadow: 0px 0px 5px #e4e7ed;
}
.el-avatar > img {
  width: 100%;
}
</style>
<style lang="less" scoped>
@import "../assets/css/common.less";
.el-header {
  color: #333;
  text-align: center;
  padding: 0 12px;
  .flex(space-between);
  .header-btn {
    .flex();
  }
  .img {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .exit {
      font-size: 28px;
      margin-left: 10px;
      color: lightgray;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .isFoldBtn {
    display: inline-block;
    margin-right: 10px;
    i {
      display: inline-block;
      font-size: 28px;
      color: #000;
      font-weight: 200;
      cursor: pointer;
    }
  }
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  transition: width 0.28s;
  -moz-transition: width 0.28s;
  -webkit-transition: width 0.28s;
  -o-transition: width 0.28s;
}
.content {
  background: #fff;
}
.el-main {
  color: #333;
  text-align: center;
}
</style>
