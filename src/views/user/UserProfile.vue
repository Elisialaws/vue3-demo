<script setup>
import { userUpdateInfoService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/repo'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const formRef = ref(null)
//对仓库的值进行结构
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()
const form = ref({
  id,
  username,
  nickname,
  email
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { pattern: /^\S{2,10}/, message: '昵称为2到10个非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
}

const onSubmit = async () => {
  //等待校验结果
  await formRef.value.validate()
  //提交修改
  await userUpdateInfoService(form.value)
  getUser()
  //提示用户
  ElMessage.success('修改成功')
}
</script>
<template>
  <PageContainer title="基本资料">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
