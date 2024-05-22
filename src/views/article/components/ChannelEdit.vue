<script setup>
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,12}$/, message: '请输入长度1-12位的非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入别名', trigger: 'blur' },
    { pattern: /^\S{1,12}$/, message: '请输入长度1-12位的非空字符', trigger: 'blur' }
  ]
}
/**可以对外暴露一个方法open,基于open的参数，区分是添加还是编辑，open({})，空对象无需渲染
 * open({id,cate_name})需要渲染，是编辑，open调用后可以打开弹窗
 */
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } //...是扩展运算符，将对象的所有可枚举属性复制到当前对象
}
const emit = defineEmits(['success']) //子组件定义父组件传来的方法，父组件监听对应的事件
const onSubmit = async () => {
  await formRef.value.validate() //提交时校验
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success') //调用对应的方法
}
//向外暴露方法
defineExpose({ open })
/**
 * 为组件绑定属性时，带:表示这个属性是动态的，不带:表示为静态的字符串常量
 * :就是v-bind的缩写，#是v-slot缩写
 */
</script>
<template>
  <!--el-dialog对话框，:title为对话框标题，接收v-model，为true时显示-->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>
