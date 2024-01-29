<script setup lang='ts'>
  import { ref } from 'vue';
  import { User } from '@/types/type'
  import { useUserStore } from '@/store/user/user'

  const userStore = useUserStore();
  const user = ref<User> ({});
  
  const goLogin  = () => {
    userStore.goLogin(user.value);
  }

</script>
<template>
  <div class="login-container">
    <text class="login-title">用心做生鲜</text>
    <el-card class="login-card">
      <el-form 
        :model="user" 
        size="large" 
        label-position="right" 
        class="login-form"
      >
        <el-form-item>
          <el-input 
            v-model="user.phoneNumber"  
            placeholder="手机号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input 
            v-model="user.password" 
            type="password"
            show-password
            placeholder="密码"
            clearable  
          />
        </el-form-item>
        <el-button type="info" size="small" class="login-forget" text>
          忘记密码
        </el-button>
      </el-form>
      <el-button class="login-button" @click="goLogin">
        登录
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
  .login-container {
    height: 100vh;
    background-image: url("https://images.unsplash.com/photo-1657012784624-c6ecc5031918?q=80&w=2695&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD");
  }

  .login-title {
    display: inline-block;
    margin: 20px 10px;
    font-family: 'Zhi Mang Xing', cursive;
    font-size: 86px;
    color: rgb(131, 148, 26);
  }

  .login-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 16px;
    width: 360px;
    text-align: center
  }

  .login-forget {
    float: right;
  }

  .login-button {
    width: 320px;
    background-color: rgb(89, 105, 0);;
    color: rgb(255, 255, 255);
  }
</style>