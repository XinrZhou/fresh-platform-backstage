<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { ElInput } from 'element-plus'

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const inputValue = ref('');
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

watch(() => props.modelValue, () => {
  dynamicTags.value = props.modelValue;
}, {
  deep: true,
  immediate: true
})

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  emit('update:modelValue', dynamicTags.value)
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <div class="flex gap-2">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + 添加值
    </el-button>
  </div>
</template>

<style scoped>
  .el-tag {
    margin-right: 6px;
  }
</style>
