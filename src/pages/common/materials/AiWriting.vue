<script setup lang='ts'>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { fetchEventSource } from '@microsoft/fetch-event-source';
  import { useMaterialStore } from '@/store/user/material';
  
  const materialStore = useMaterialStore();

  const historyList = ref([]);
  const query = ref('');

  function search () {
    historyList.value.push({
      question: query.value,
      answer: ''
    });
    query.value = '';
    let thiz = this;
    const length = historyList.value.length;
    fetchEventSource('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': sessionStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
          question: historyList.value[length - 1].question
        }),
        onerror() {
          this.openWhenHidden = true;
        },
        onmessage(event) {
          // 接收数据
          historyList.value[length - 1].answer += event.data;
        },
        onclose(){
          // 数据传输完毕后就会关闭流
          const temp = historyList.value[length - 1];
        }
      })
  } 
</script>

<template>
  <el-card class="chat-card">
    <el-scrollbar class="chat-scrollbar">
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
                  class="image-wrapper"
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
    position: relative;
    height: 90vh;
    background-color: #F7F8FC;
  }

  .chat-scrollbar {
    height: 800px;
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
    background-color: #fff;
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

  .image-wrapper {
    width: 20px;
    height: 20px;
  }

  .search-box {
    position: absolute;
    bottom: 30px;
    margin: 0 auto;
    min-height: 100px;
    left: 0;
    right: 0;
    width: 700px;
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