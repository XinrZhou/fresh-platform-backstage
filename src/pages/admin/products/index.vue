<script setup lang='ts'>
const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  }
]
</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="4">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </el-col>
    <el-col :span="18">
      表格
    </el-col>
  </el-row>
</template>

<style scoped>

</style>