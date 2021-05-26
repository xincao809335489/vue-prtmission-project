<template>
  <div class="container">
    <el-row :gutter="4">
      <el-col :span="6" v-for="item in pictures" :key="item.id" class="col">
        <div
          class="content"
          :style="stypeObj"
          @click="handleClick(item)"
          @mouseenter="handleChange(true, item)"
          @mouseleave="handleChange(false, item)"
        >
          <img
            :src="item.src"
            alt=""
            class="image"
            :class="{ active: item.isActive }"
          />
          <p class="text">
            <span>{{ item.name }}</span>
            <span>{{ item.date }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      v-if="imgData.length"
      :title="imgData[0][0].title"
      top="4%"
      :lock-scroll="true"
      :destroy-on-close="true"
      :visible.sync="dialogTableVisible"
    >
      <div>
        <div class="bg-container">
          <img :src="bgImg" alt="" class="bg-img" />
          <vue-loop-scroll
            direction="up"
            :speed="50"
            :index="0"
            :mouseStop="true"
          >
            <span>{{ imgData[0][0].desc }}</span>
          </vue-loop-scroll>
        </div>
        <el-carousel
          indicator-position="outside"
          :loop="true"
          :autoplay="true"
          class="car-container"
        >
          <el-carousel-item v-for="(item, index) in imgData" :key="index">
            <ul class="list">
              <li
                v-for="(carItem, idx) in item"
                :key="idx"
                @click="changeCar(carItem)"
              >
                <img :src="carItem.src" :alt="carItem.title" class="list-img" />
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import api from '../request/api/home.js'
export default {
  data () {
    return {
      pictures: [],
      stypeObj: {
        width: '300px',
        height: '240px'
      },
      pageIndex: 0,
      pageSize: 10,
      totalPage: 0,
      dialogTableVisible: false,
      picData: [],
      imgData: [],
      bgImg: ''
    }
  },
  created () {
    this.getPic()
  },
  mounted () {
    this.$nextTick(function () {
      // 解决视图渲染，数据未更新,此处必须添加true才有效果
      window.addEventListener('scroll', this.handleScroll, true)
    })
  },
  computed: {
    scrollOption () {
      return {
        step: 0.8,
        hoverStop: true,
        direction: 2,
        limitMoveNum: this.imgData.length,
        openWatch: true,
        singleHeight: 0,
        singleWidth: 0,
        waitTime: 1000
      }
    }
  },
  methods: {
    // 放大图片
    handleChange (val, item) {
      item.isActive = val
    },
    changeCar (item) {
      const { src } = item
      this.bgImg = src
    },
    // 图片信息展示
    handleClick (item) {
      window.removeEventListener('scroll', this.handleScroll, true)
      this.dialogTableVisible = true
      const params = {
        name: item.name,
        engName: item.engName
      }
      api.getInfoData(params).then(res => {
        res.forEach(function (item) {
          item.src = require('../assets/pictures/' +
            item.engName +
            '/' +
            item.src)
        })
        for (var i = 0; i < res.length; i += 3) {
          this.imgData.push(res.slice(i, i + 3))
        }
        this.bgImg = this.imgData[0][0].src
        console.log(this.imgData)
      })
    },
    // 获取图片数据
    getPic () {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      api.getPicDatas(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          res.data.forEach(item => {
            item.src = require('../assets/pictures/' + item.src)
            item.isActive = false
          })
          this.pictures = this.pictures.concat(res.data)
          this.totalPage = res.totalPage
          this.pageIndex = res.pageIndex
          this.pageSize = res.pageSize
        }
      })
    },
    // 滚动事件
    handleScroll () {
      // 窗口滚动要做的操作
      const sh =
        document.documentElement.scrollHeight || document.body.scrollHeight // 滚动条高度
      const st = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离顶部的距离
      const ch =
        document.documentElement.clientHeight || document.body.clientHeight // 滚动条外容器的高度
      if (st + ch >= sh - 20) {
        // 快到底部时候加载数据
        if (this.pageIndex < this.totalPage) {
          this.pageIndex++
          this.getPic() // 加载方法
        } else {
          return false
        }
      }
    }
  }
}
</script>
<style lang="less">
.el-dialog__header {
  padding: 10px 0 0 20px;
  text-align: left;
  .el-dialog__headerbtn {
    top: 11px;
    font-size: 20px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: darkgray;
  }
}
.el-dialog__body {
  padding: 20px 12px 10px 12px;
  .bg-container {
    display: flex;
    height: 280px;
    margin-bottom: 20px;
    .vue-loop-scroll {

      span {
        line-height: 2;
        text-align: left;
      }
    }
    .bg-img {
      width: 50%;
      height: 100%;
      margin-right: 25px;
    }
  }
}
.el-carousel__container{
  height: 172px;
}
</style>
<style lang="less" scoped>
.container {
  .col {
    height:auto;
    margin-bottom: 14px;
  }
  .content {
    border-radius: 4px;
    box-shadow: 2px 1px 7px 1px #ddd;
    cursor: pointer;
    .image {
      display: block;
      width: 100%;
      height: 85%;
      transition: all 0.6s;
      &.active {
        transform: scale(1, 1.35);
      }
    }
    .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 15%;
      color: #303133;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  .car-container {
    .list {
      width: 100%;
      height: 172px;
      line-height: 50px;
      margin: 0 auto;
      overflow: hidden;
      li {
        float: left;
        width: 33%;
        height: 100%;
        cursor: pointer;
        .list-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
