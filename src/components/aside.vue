<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        :default-active="$route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        class="el-menu-vertical"
      >
        <v-alide v-for="menu in menuList" :key="menu.path" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import asideItem from './alideItem'
import { mapGetters } from 'vuex'
import variables from '../assets/css/variables.less'
export default {
  name: 'Sidebar',
  components: {
    'v-alide': asideItem
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isCollapse']),
    variables () {
      return variables
    }
  }
}
</script>
<style lang="less">
.sidebar-container {
  transition: width 0.28s;
  width: 200px;
  height: 100%;
  position: fixed;
  font-size: 0px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .el-scrollbar {
    height: 100%;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100%;
  }
  .is-active > .el-submenu__title {
    color: #f4f4f5;
  }

}
</style>
