<script setup>
import { ref } from 'vue'
import { artPublishService } from '@/api/article'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus'
const visibleDrawer = ref(false)
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const emit = defineEmits(['success'])
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('必须是jpg或者png格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
/*
当前接口需要formData对象，需要将葡萄转化为formData对象
FormData 对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据*/
const onPublish = async (state) => {
  formModel.value.state = state
  const formdata = new FormData()
  for (let key in formModel.value) {
    formdata.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    console.log('编辑')
  } else {
    await artPublishService(formdata)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    //需要通知父组件，添加成功
    emit('success', 'add')
  }
}
const formModel = ref({ ...defaultForm })
const imageUrl = ref('')
const editorRef = ref()
const onUploadFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}
const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑回显')
  } else {
    imageUrl.value = ''
    formModel.value = { ...defaultForm } //重置了表单的数据
    editorRef.value.setHTML('') //重置文本编辑器内容，调方法
  }
}
/**可以对外暴露一个方法open,基于open的参数，区分是添加还是编辑，open({})，空对象无需渲染
 * open({id,cate_name})需要渲染，是编辑，open调用后可以打开弹窗
 */
defineExpose({
  open
})
</script>
<template>
  <!--el-drawer抽屉组件，和dialog相似，但UI不同，title和v-model很重要
      direction可以控制出现的方向-->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <!--这里直接加width相当于增加属性，子组件需要接收这个属性配置后才能生效-->
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!--可以通过不配置action,on-succsess,将auto-upload设置为false关闭自动上传
        只做本地预览，提交时一起上传
        before-upload可以做提交前的校验-->
        <el-upload
          class="avatar-uploader"
          auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <!--富文本编辑器，导入vue-quill包，再双向绑定-->
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<!--scoped属性，只在当前组件生效-->
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
