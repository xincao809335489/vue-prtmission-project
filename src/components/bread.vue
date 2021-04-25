<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          name="breadcrumb"
          v-for="(item,index) in leveList"
          :key="item.path"
          :to="{ path: item.path }"
          ><span v-if="index==leveList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
          </el-breadcrumb-item
        >
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      leveList: null
    }
  },
  watch: {
    $route () {
      this.getBreadCrumb()
    }
  },
  created () {
    this.getBreadCrumb()
  },
  methods: {
    getBreadCrumb () {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [
          {
            path: '/home',
            meta: { title: '首页' }
          }
        ].concat(matched)
      }
      this.leveList = matched
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    }
  }
}
</script>
<style lang="less">
.breadcrumb {
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: 400;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  .el-breadcrumb__separator {
    font-weight: 400;
    color: lightgray;
  }
}
</style>
<style lang="less" scoped>
.breadcrumb {
  font-size: 14px;
}
</style>
