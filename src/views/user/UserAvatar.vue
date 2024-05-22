<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/repo'
import { userUpdateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('Avatar picture size can not exceed 4MB!')
    return false
  }
  return true
}
//创建本地预览
const onSelectFile = (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw) //存储base64格式
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  //发送请求更新头像
  await userUpdateAvatarService(imageUrl.value)
  //userStore重新渲染
  await userStore.getUser()
  ElMessage.success('更新成功')
}
//基于store的值初始化image值
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
</script>
<template>
  <page-container title="更换头像">
    <!--on-change用来监听change事件，通常用于表单,关闭了自动上传-->
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :auto-upload="false"
      ref="uploadRef"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <br />
    <!--click事件为获取绑定对象的DOM元素的点击事件-->
    <el-button
      type="primary"
      :icon="Plus"
      @click="uploadRef.$el.querySelector('input').click()"
      size="large"
      >选择图片</el-button
    >
    <el-button type="success" :icon="Upload" @click="onUpdateAvatar" size="large"
      >上传头像</el-button
    >
  </page-container>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
