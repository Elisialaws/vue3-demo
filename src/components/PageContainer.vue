<!--父传子，通过添加属性的方式传递，子组件通过defineProps接收一个对象，
    对于props传递的数据，可以直接使用
子传父，父组件给子组件@绑定事件，子组件通过defineEmits触发事件
component里面自动注册
-->
<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<!--display属性很重要,flex为弹性容器，inline为内联元素,block为块级元素
  box-sizing默认为content-box，如果有width和height，会加上padding和border
  border-box，不会加上padding和border-->
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
