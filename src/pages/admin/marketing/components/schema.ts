export const ACTIVITY_SCHEMA = {
    type: 'object',
    required: ['title','tag', 'content', 'time', 'status'],
    properties: {
        title: {
            title: '名称',
            type: 'string',
        },
        tag: {
          title: '标签',
          type: 'string',
        },
        content: {
          title: '内容',
          type: 'string',
        },
        time: {
          title: "活动时间",
          type: "array",
          format: "date-time",
          items: {
              type: "number"
          }
        },
        status: {
          title: '生效',
          type: 'number'
        }
    }
};

export const ACTIVITY_UI_SCHEMA = {
    content: {
        'ui:widget': 'el-input',
        'ui:options': {
          type: 'textarea',
          rows: 2
        }
    },
    startTime: {
        'ui:widget': 'el-date-picker',
        'ui:options': {
            type: 'datetime',
            placeholder: '选择开始时间'
        }
    },
    endTime: {
      'ui:widget': 'el-date-picker',
      'ui:options': {
          type: 'datetime',
          placeholder: '选择结束时间'
      }
    },
    status: {
        'ui:widget': 'el-switch',
        'ui:options': {
            activeValue: 1,
            inactiveValue: 0
        }
    },
};