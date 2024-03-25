<script setup lang='ts'>
  import _ from 'lodash';
  import { computed, toRaw, ref, watch } from 'vue';
  import { User, Phone } from '@element-plus/icons-vue';
  import { useOssStore } from '@/store/user/oss';
  import { useUserStore } from '@/store/user/user';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance} from 'element-plus';
  import ResetDialog from './components/ResetDialog.vue';
  import BaseUpload from '@/components/BaseUpload.vue';

  const userStore = useUserStore();
  const userInfoC = computed(() => userStore.userInfo);
  const userR = ref({});

  const dialogVisibleR = ref<Boolean>(false);
  
  watch(() => userInfoC.value, () => {
    userR.value = _.cloneDeep(userInfoC.value);
  });

  const ossStore = useOssStore();
  watch(() => ossStore.imageUrl, () => {
    userR.value.avatar = toRaw(ossStore.imageUrl);
  })

  const ruleFormRef = ref<FormInstance>(null);

  const onDialogClose = () => dialogVisibleR.value = false;

  const onPwdReset = (pwd: String) => {
    ElMessageBox.confirm(
      '确认重置您的密码？', 
      'Tips', 
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      userStore.updatePassword(pwd).then(() => {
        onDialogClose();
        ElMessage.success('重置成功！');
      });
    })
  }

  const handleImageUpload = (file) => {
    ossStore.uploadImage(file);
  }
  const handleImageRemove = () => {
    userR.value.imageUrl = '';
  }

  const handleSubmit = () => {
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        userStore.updateUserInfo(toRaw(userR.value)).then(() => {
          ElMessage.success(`修改成功！`);
          userStore.getUserInfo();
        });
      } else {
        Elmessage.error('请填写完整信息！');
      }
    });
  }
</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="8">
      <el-card class="info-card">
        <el-avatar
          :size="80"
          :src="userInfoC.avatar"
        />
        <div class="info-item">
          <el-icon ><user /></el-icon>
          <el-text type="info">
            {{ userInfoC.name }}
          </el-text>
        </div>
        <div class="info-item">
          <el-icon><phone /></el-icon>
          <el-text type="info">
            {{ userInfoC.number }}
          </el-text>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card>
        <el-form label-width="100" ref="ruleFormRef" :model="userR">
          <el-form-item label="用户名" prop="name" required>
            <el-input v-model="userR.name" />
          </el-form-item>
          <el-form-item label="手机" prop="number" required>
            <el-text>{{ userR.number }}</el-text>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <BaseUpload 
              :image-url="userR.avatar" 
              @on-upload="handleImageUpload"
              @on-remove="handleImageRemove"
            />
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary" 
              @click="handleSubmit"
            >
              保存
            </el-button>
            <el-button @click="dialogVisibleR = true" type="text" size="small">
              重置密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  <ResetDialog
    :dialog-visible="dialogVisibleR" 
    @on-dialog-close="onDialogClose"
    @on-pwd-reset="onPwdReset"
  />
</template>

<style scoped>
  .el-input {
    width: 300px;
  }
  .info-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center; 
  }
  .info-item {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 8px;
  }
</style>