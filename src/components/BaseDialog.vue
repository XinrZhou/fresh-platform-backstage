<script setup lang='ts'>
  import { ref, watch, toRaw } from 'vue';
  import VueForm from '@lljj/vue3-form-element';

  const formProps = {
    labelWidth: '120px',
    labelPosition: 'right'
  }
  const formFooter = {
    okBtn: '确定'
  }

  const props = defineProps([
    'schema', 'uiSchema', 'dialogVisible', 'formData', 'operationType'
  ])
  const emits = defineEmits(['onDataSubmit', 'onDialogClose']);
  let formDataR = ref<Object>({});

  watch(() => props.formData, () => {
    formDataR.value = props.formData;
  })

  const handleDataSubmit = () => {
    emits('onDataSubmit', toRaw(formDataR.value));
  }

  const handleDialogClose = () => {
    emits('onDialogClose');
    formDataR.value = {};
  }
</script>

<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title=props.operationType?.title
    width="500px"
    @close="handleDialogClose"
  >
    <VueForm
      v-model="formDataR"
      :formProps="formProps"
      :formFooter="formFooter"
      :schema="props.schema"
      :ui-schema="props.uiSchema"
      @cancel="handleDialogClose"
      @submit="handleDataSubmit"
    />
  </el-dialog>
</template>

<style scoped>

</style>