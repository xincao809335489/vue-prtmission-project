<template>
  <div class="container">
    <el-card class="card">
      <el-tree
        show-checkbox
        :data="closeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import api from '../request/api/home.js'
import { FlatToNested } from '../utils/common.js'
export default {
  data () {
    return {
      closeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.getCloseData()
  },
  methods: {
    getCloseData () {
      api.getCloseData().then(res => {
        const data = res
        const option = {
          idProperty: 'id',
          parentProperty: 'parentId',
          childrenProperty: 'children'
        }
        const closeDatas = FlatToNested(data, option)
        console.log(closeDatas)
        this.closeData = closeDatas
      })
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">
  .container .card{
    margin:10px 0;
    .el-card__body{
    padding:10px;
  }
  }
</style>
