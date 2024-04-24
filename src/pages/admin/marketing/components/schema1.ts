export const ADVERTISEMENT_SCHEMA = {
  type: 'object',
  required: ['title','price', 'unit', 'description'],
  properties: {
      title: {
          title: '名称',
          type: 'string',
      },
      price: {
        title: '价格',
        type: 'number',
      },
      unit: {
        title: '单位',
        type: 'string',
      },
      description: {
        title: '内容',
        type: 'string',
      }
  }
};

export const ADVERTISEMENT_UI_SCHEMA = {
  price: {
    'ui:options': {
        min: 0,
        max: 99999,
        precision: 2,
        controls: false
    }
  },  
  description: {
      'ui:widget': 'el-input',
      'ui:options': {
        type: 'textarea',
        rows: 2
      }
  }
};