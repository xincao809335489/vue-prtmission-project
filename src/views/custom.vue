<template>
  <div>
    <!-- 二种方式 -->
    <!-- <input type="text" @input="$emit('input', $event.target.value)" :value="text"> -->
    <!-- 三中方式 -->
    <!-- <input type="checkbox" @change="$emit('change',$event.target.checked)" :checked="checked"> -->
    <!-- 四种方式直接接收v-model传递的值 -->
    <!-- <input
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
      :checked="checked"
    /> -->
    <!-- sync的用法 -->
    <!-- 一种写法 -->
    <!-- <button @click="$emit('setAge',20)">点我修改父组件的age</button> -->
    <!-- 二种写法 -->
    <!-- <button @click="$emit('update:age2',40)">点我修改父组件的age2</button> -->
    <!-- 三种方法 -->
    <!-- <p>{{'里面的值'+age3}}</p>
    <button @click="fn">里面的值改变外面的值</button> -->
     <!-- 四种方法 -->
     <!-- <p>{{'里面的值'+age5}}</p>
     <button @click="fn2">里面修改外面的值</button> -->
     <!-- 等价于第四种写法的另一种方式 -->
     <div>{{'子组件'+childText}}</div>
     <button @click="change">点击子组件改变父组件值</button>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    text: {
      type: String,
      require: true
    },
    checked: {
      type: Boolean,
      require: true
    },
    age3: {
      type: Number,
      require: true
    },
    age5: {
      type: Number,
      default: 0
    },
    fatherText: {
      type: String
    }
  },
  model: {
    // prop: 'checked',
    // event: 'change'
    // prop: 'age5',
    // event: 'cc',
    prop: 'fatherText',
    event: 'changeChild'
  },
  data () {
    return {
      childText: this.fatherText
    }
  },
  beforeUpdate () {
    console.log('子组件--before' + this.text)
  },
  updated () {
    console.log('子组件--update' + this.text)
  },
  watch: {
    fatherText (newtext) {
      this.childText = newtext
    },
    childText (newtext) {
      this.$emit('changeChild', newtext)
    }
  },
  methods: {
    fn () {
      // 注意此处不能直接修改父组件中的值例如this.age3+=20(错误写法)只能将改变的值传给父组件，然后父组件来修改这个值
      this.$emit('update:age3', 10)
    },
    fn2 () {
      this.$emit('cc', this.age5 + 3)
    },
    change () {
      this.childText = 'son change the text'
    }
  }
}
</script>

<style lang="less" scoped></style>
