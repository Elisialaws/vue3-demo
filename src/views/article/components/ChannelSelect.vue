<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref, onMounted } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String] //这么写是支持两种类型的类型
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
onMounted(() => {
  getChannelList()
})
</script>
<template>
  <!--子组件不能改变父组件，不能直接v-model绑定
  在Vue 3之前的版本中，v-model在自定义组件上的默认行为是绑定一个名为value的prop，
  并在输入时触发一个名为input的事件。但在Vue 3中，
  这些默认名称已经更改为modelValue和update:modelValue2。
 modelValue是实现v-model双向绑定的默认prop名称。 
  $event代表原生DOM事件的事件对象，允许获取事件的详细信息-->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
    <!--v-for绑定key可以跟踪每个节点的身份，
      从而可以高效地重新排序元素而不是进行全面的 DOM 重建。这对于性能优化尤其重要-->
  </el-select>
</template>
