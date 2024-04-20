<script setup lang="ts">
  import { ECharts, EChartsOption, init, registerMap } from 'echarts';
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import 'echarts-wordcloud';
  import mapJson from '@/json/map.json';

  // 定义props
  interface Props {
    width?: string;
    height?: string;
    title: string;
    isMap: boolean;
    option: EChartsOption;
  }
  const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100%',
    title: '',
    isMap: false,
    option: () => ({}),
  });

  const myChartsRef = ref<HTMLDivElement>();
  let myChart: ECharts;
  // eslint-disable-next-line no-undef
  let timer: string | number | NodeJS.Timeout | undefined;

  // 初始化echarts
  const initChart = (): void => {
    if (myChart !== undefined) {
      myChart.dispose();
    }
    myChart = init(myChartsRef.value as HTMLDivElement);
    props.isMap && registerMap('china', mapJson as any);
    // 拿到option配置项，渲染echarts
    myChart?.setOption(props.option, true);
  };

  // 重新渲染echarts
  const resizeChart = (): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (myChart) {
        myChart.resize();
      }
    }, 500);
  };
  
  onMounted(() => {
    initChart();
    window.addEventListener('resize', resizeChart);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    clearTimeout(timer);
    timer = 0;
  });

  watch(
    props.option,
    () => {
      initChart();
    },
    {
      deep: true
    }
  );
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div 
      ref="myChartsRef" 
      :style="{ height, width }" 
      :option="option" 
    />
  </el-card>
</template>

<style scoped>
</style>
