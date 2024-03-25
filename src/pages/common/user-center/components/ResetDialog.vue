<script setup lang='ts'>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';

  const props = defineProps(['dialogVisible']);
  const emits = defineEmits(['onDialogClose', 'onPwdReset']);

  const passwordR = ref('');
  const rePasswordR = ref('');

  const onConfirm = () => {
    if (passwordR.value !== rePasswordR.value) {
      ElMessage.error('两次密码不一致');
      return;
    }
    emits('onPwdReset', passwordR.value);
  };

</script>

<template>
  <el-dialog
    v-model="props.dialogVisible" 
    width="560"
    title="重置密码"
  >
    <el-input 
      v-model="passwordR" 
      placeholder="enter password" 
      type="password"
      clearable 
    />
    <el-input 
      v-model="rePasswordR" 
      placeholder="re-enter" 
      type="password"
      clearable 
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onDialogClose">
          取消
        </el-button>
        <el-button 
          @click="onConfirm" 
          type="primary" 
          :disabled="!passwordR"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style scoped>
  .el-input {
    padding: 0 20px;
    margin-bottom: 20px;
  }
</style>