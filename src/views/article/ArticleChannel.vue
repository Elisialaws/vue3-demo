<script setup>
//import PageContainer from '@/components/PageContainer.vue'
//components里面的组件自动注册，可以不用写
import { ref } from 'vue'
import { artDelChannelService, artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
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
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确认删除吗', 'Warning', {
    //这个也是异步的，不然会直接执行后面的删除操作了
    //消息弹出框,内容，标题，配置选项
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
const dialog = ref()
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <!--label标签为列名，prop绑定每行的属性,v-loading显示加载时转圈-->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <!--自定义列模板,row是channelList的一项，$index是下标
      icon,circle,type指定图标，形状，颜色-->
      <el-table-column label="操作" width="100">
        <!--{ row }是具名插槽对象的解构-->
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
      <!--el-empty如果数据为空，description为文字描述,#empty插槽-->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!--进行参数绑定-->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
