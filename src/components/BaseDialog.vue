<script setup lang='ts'>
  import { ref, defineEmits, defineProps, watch } from 'vue';
  import VueForm from '@lljj/vue3-form-element';

  const formProps = {
    labelWidth: '100px',
    labelPosition: 'right'
  }

  const formFooter = {
    okBtn: '确定'
  }


  const props = defineProps([
    'schema', 'uiSchema', 'dialogVisible', 'formData', 'operationType'
  ])
  const emits = defineEmits(['submit']);

  let formDataR = ref<Object>({});

  watch(() => props.formData, () => {
    formDataR.value = props.formData;
  })
</script>

<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title=props.operationType?.title
    width="500px"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <VueForm
      :formProps="formProps"
      :formFooter="formFooter"
      v-model="formDataR"
      :schema="props.schema"
      :ui-schema="props.uiSchema"
    />
  </el-dialog>
</template>

<style scoped>

</style>