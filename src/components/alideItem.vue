<template>
  <div v-if="!item.hidden">
    <template v-if="!item.meta">
      <el-menu-item class="tl" :index="item.children[0].path">
        <i :class="['iconfont', 'iconfont-6', item.children[0].meta.icon]"></i>
        <span slot="title">{{ item.children[0].meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.path" class="tl">
      <template slot="title" >
        <i :class="['iconfont', 'iconfont-6', item.meta.icon]"></i>
        <span>{{ item.meta.title }}</span>
      </template>

      <template v-for="child in item.children">
        <alide-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.path"
        />
        <el-menu-item class="tl" v-else :key="child.path" :index="child.path">
          <i :class="['iconfont', 'iconfont-6', child.meta.icon]"></i>
          <span slot="title">{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'AlideItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
