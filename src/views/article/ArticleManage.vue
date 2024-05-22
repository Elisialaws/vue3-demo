<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListServer } from '@/api/article'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from './components/ArticleEdit.vue'
// 假数据
const articleList = ref([])
const total = ref(0) //默认总共数据条数为0
const loading = ref(false)

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
//
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListServer(params.value)
  articleList.value = res.data.data //res.data是后台返回的结果
  total.value = res.data.total
  loading.value = false
}
onMounted(() => {
  getArticleList()
})
//用articleEditRef创建绑定
const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open({ row })
}
const onDelArticle = (row) => {
  articleEditRef.value.open({ row })
} //处理分页逻辑,每页数量变化后重新渲染
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
} //当前页码变化
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
const onSeatch = () => {
  params.value.pagenum = 1
  getArticleList()
} //重置逻辑。将筛选条件清空
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const onSuccess = (type) => {
  if (type === 'add') {
    //如果是添加渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  //如果是编辑，渲染当前页
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!--el-select选择框，el-option的label是给用户看的，value是提交到后台的-->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSeatch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发布时间">
        <!--由于配置了默认插槽，prop的内容会被覆盖-->
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="100">
        <!--利用作用域插槽row可以获取当前行的item=> v-for 遍历item-->
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!--分页区域,current-page和page-size要做好绑定,:disabled是否禁用
    :background设置背景颜色,layout控制工具栏,字符串的顺序决定了渲染顺序,用,隔开
     @size-change和@current-change一页大小变化和当前页码变化对应的函数,默认会传递一个参数number
    justify-content定义浏览器沿着弹性容器的主轴和网格容器的行向轴分配内容元素之间和周围的空间。-->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 8, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px; justify-content: end"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
