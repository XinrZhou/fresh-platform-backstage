import { createApp } from 'vue';
import App from './App.vue';
import * as Icons from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
const state = createPinia();

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
});

app.use(router).use(state).use(ElementPlus).mount('#app');
