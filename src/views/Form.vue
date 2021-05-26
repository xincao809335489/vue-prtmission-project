<template>
  <div>
    <p>v-model的父子组件传值方式跟sync的用法</p>
    <!-- 一种方式 -->
    <!-- <p>{{message}}</p>
    <input type="text" v-bind:value="message" @input="getNewVal"> -->
    <!-- 二中方式 -->
    <!-- <custom @input="value = $event" :text="value"></custom>
    <div>{{value}}</div>
    <button @click="changeValue">点击修改子组件的值</button> -->
    <!-- 三种方式 -->
    <!-- <p>{{checked}}</p>
    <custom @change="checked=$event"></custom> -->
    <!-- 四种方式直接使用v-model -->
    <!-- <p>{{ checked }}</p>
    <custom v-model="checked"></custom> -->
    <!-- sync的用法 -->
    <!-- 一种写法 -->
    <!-- <p>{{age}}</p>
    <custom :age="age" @setAge="(res) => (age = res)"></custom> -->
    <!-- 二种写法 -->
    <!-- <p>{{age2}}</p>
    <custom :age2.sync="age2"></custom> -->
    <!-- 三种写法 -->
    <!-- <p>{{'外面的值'+age3}}</p>
    <custom :age3.sync = 'age3'></custom>
    <button @click="fn">外面的值改变里面的值</button> -->
    <!-- 四种写法v-model实现父子组件双向的操作 -->
    <hr>
    <div>{{'父组件'+fatherText}}</div>
    <custom v-model="fatherText"></custom>
    <button @click="changeChild">点击父组件改变子组件值</button>
    <hr />
  </div>
</template>

<script type="text/javascript">
import custom from './custom.vue'
export default {
  data () {
    return {
      message: '我是一个语法糖',
      value: '初始值',
      checked: false,
      age: 10,
      age2: 20,
      age3: 0,
      fatherText: "i'm fathertext"
    }
  },
  components: {
    custom
  },
  beforeUpdate () {
    console.log('父组件--before' + this.value)
  },
  updated () {
    console.log('父组件--update' + this.value)
  },
  methods: {
    changeValue () {
      this.value = 'new Value'
    },
    fn () {
      this.age3 += 10
    },
    changeChild () {
      this.fatherText = 'father change the text'
    }
  }
}
</script>

<style lang="less" scoped></style>
