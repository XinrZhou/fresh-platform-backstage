<script setup lang='ts'>
  import {  ref } from 'vue';
  import { useMaterialStore } from '@/store/user/material';

  const materialStore = useMaterialStore();
//   materialStore.getAiPicture(
//     {
//     "prompt": "阳光，新鲜的橙子",
//     "negativePrompt": "",
//     "styles": [
//       "101"
//     ],
//     "logoAdd": 0,
// }
//   );
</script>

<template>
  素材库
</template>
<style scoped>

</style>