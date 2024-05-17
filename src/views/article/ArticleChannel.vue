<script setup>
//import PageContainer from '@/components/PageContainer.vue'
//components里面的组件自动注册，可以不用写
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
const onEditChannel = (row) => {
  console.loh(row)
}
const onDelChannel = (row) => {
  console.group(row)
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">测试</el-button>
    </template>
    <!--label标签为列名，prop绑定每行的属性,v-loading显示加载时转圈-->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <!--自定义列模板,row是channelList的一项，$index是下标
      icon,circle,type指定图标，形状，颜色-->
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <!--el-empty如果数据为空，description为文字描述-->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>
<style lang="scss" scoped></style>
