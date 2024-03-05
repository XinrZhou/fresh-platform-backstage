export const ROLE = {
  ADMIN: 'Vo10t',
  SUPPILER: 'cA1KL'
};

export const OPERATION_TYPE = {
  EDIT: {
    name: 'edit',
    title: '编辑',
  },
  ADD: {
    name: 'add',
    title: '添加',
  },
};

export const SHOP_STATUS = [
  {
    label: '审核中',
    value: 0,
    renderType: 'primary',
  },
  {
    label: '营业中',
    value: 1,
    renderType: 'success',
  },
  {
    label: '已关闭',
    value: 2,
    renderType: 'danger',
  }
]

export const APPROVAL_STATUS = {
  REJECT: 2,
  PASS: 1,
  PENDING: 0,
}

export const APPROVAL_STATUS_LIST = [
  {
    label: '审核驳回',
    value: 0,
    renderType: 'danger',
  },
  {
    label: '审核通过',
    value: 1,
    renderType: 'success',
  },
  {
    label: '审核中',
    value: 2,
    renderType: 'primary',
  }
]

export const CATEGORY_LEVEL = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
}

export const CATEGORY_OPTIONS = [
  {
    label: '一级类目',
    value: 1,
  }, 
  {
    label: '二级类目',
    value: 2,
  }, 
  {
    label: '三级类目',
    value: 3
  }
];

export const MODEL_TYPE = {
  IMAGE: 0,
  CHAT: 1,
}

export const MODEL_LIST = [
  {
    label: '绘画模型',
    value: 0,
    modelName: '腾讯AI绘画模型',
  },
  {
    label: '大语言模型', 
    value: 1,
    modelName: '通义千问'
  }
]
