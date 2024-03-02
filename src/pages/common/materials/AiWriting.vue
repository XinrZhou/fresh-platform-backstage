<script setup lang='ts'>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { fetchEventSource } from '@microsoft/fetch-event-source';
  import { useMaterialStore } from '@/store/user/material';
  
  const materialStore = useMaterialStore();

  const historyList = ref([]);
  const query = ref('');
  const showIntroduction = ref(true);

  function search () {
    showIntroduction.value && (showIntroduction.value = false);
    const question = query.value;
    historyList.value.push({
      question: question,
      answer: ''
    });
    query.value = '';
    sendRequest(question);
  } 

  function sendRequest(question) {
    const token = sessionStorage.getItem('TOKEN');
    fetchEventSource('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': token
        },
        body: JSON.stringify({ question }),
        onerror() {
          ElMessage.error('请求出错');
        },
        onmessage(event) {
          const length = historyList.value.length;
          historyList.value[length - 1].answer += event.data;
        },
        onclose(){
          const temp = historyList.value[length - 1];
        }
    });
  }
</script>

<template>
  <el-card class="chat-card">
    <div class="introduction-wrapper" v-if="showIntroduction">
      <img 
        class="introduction-img"
        src="https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png" 
      />
      <h2>你好，我是AI写作助手</h2>
      <el-text type="info">试试这样问我：</el-text>
    </div>
    <div class="tips-wrapper" v-if="showIntroduction">
      <div class="tips-item">
        <h4>商品评价</h4>
        <el-text type="info" class="tips-text">
          你擅长写商品评价：1.真实感受；2.突出产品优点 现在你需要根据以下需求写商品评价：小鲜语牛奶
        </el-text>
      </div>
      <div class="tips-item">
        <h4>商品评价</h4>
        <el-text type="info">
          你擅长写商品评价：1.真实感受；2.突出产品优点 现在你需要根据以下需求写商品评价：小鲜语牛奶
        </el-text>
      </div>
      <div class="tips-item">
        <h4>商品评价</h4>
        <el-text type="info">
          你擅长写商品评价：1.真实感受；2.突出产品优点 现在你需要根据以下需求写商品评价：小鲜语牛奶
        </el-text>
      </div>
      <div class="tips-item">
        <h4>商品评价</h4>
        <el-text type="info">
          你擅长写商品评价：1.真实感受；2.突出产品优点 现在你需要根据以下需求写商品评价：小鲜语牛奶
        </el-text>
      </div>
    </div>
    <el-scrollbar v-if="!showIntroduction">
      <div class="chat-main">
        <template v-for="(item, index) in historyList" :key="index">
          <el-row justify="space-around" align="middle" class="chat-row">
            <el-col :span="1">
              <div class="avatar-wrapper">
                <el-icon><User /></el-icon>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="chat-content">
                {{ item.question }}
              </div>
            </el-col>
          </el-row>
          <el-row justify="space-around" align="middle" class="chat-row">
            <el-col :span="1">
              <div class="avatar-wrapper">
                <img 
                  class="avatar-image"
                  src="https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png" 
                />
              </div>
            </el-col>
            <el-col :span="22">
              <div class="chat-content chat-background">
                {{ item.answer }}
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </el-scrollbar>
    <el-card class="search-box">
      <el-input
        size="large"
        autosize
        v-model="query" 
        placeholder="在这里输入" 
      />
      <el-button 
        class="chat-button" 
        :disabled="query.length === 0" 
        @click="search"
      >
        <el-icon>
          <Position />
        </el-icon>
      </el-button>
    </el-card>
  </el-card>
</template>

<style scoped>
  .el-card {
    border-radius: 16px;
  }
  .chat-card {
    height: 80vh;
  }
  /deep/.el-card__body {
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .introduction-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .introduction-img {
    width: 40px;
  }
  .tips-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 800px;
    gap: 16px;
  }
  .tips-item {
    width: 390px;
    height: 80px;
    background: #f7f8fc;
    border: 1px solid transparent;
    border-radius: 16px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px 10px;
    position: relative;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
  }

  .chat-main {
    width: 760px;
    margin: 0 auto;
  }

  .chat-row {
    margin-bottom: 16px;
  }

  .chat-content {
    padding: 12px;
    border-radius: 16px;
  }
  .chat-background {
    background-color: #f7f8fc;
  }
  .avatar-wrapper {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #615ced;
    border-radius: 8px;
  }
  .avatar-image {
    width: 20px;
    height: 20px;
  }
  .search-box {
    position: relative;
    width: 800px;
    min-height: 100px;
    max-height: 120px;
  }
  .chat-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 10px;
    background: linear-gradient(47deg,#615ced,#3e2fa7 176%);
  }
  .chat-button.is-disabled {
    background-color: #dcdcdc;
  }
  .el-icon {
    font-size: 20px;
  }

  /deep/ .el-input__wrapper {
    box-shadow: none;
  }
</style>