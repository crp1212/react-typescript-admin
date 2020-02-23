export default {
  header: {
    list: [
      {
        UIType: 'Button',
        actionType: 'quick-add',
        text: '添加',
        type: 'primary'
      }
    ]
  },
  table: {
    tableHeader: [
      {
        type: 'index'
      },
      {
        key: 'eyedropName',
        label: '药水名称',
      },
      {
        key: 'time',
        label: '使用时间'
      },
      {
        label: '操作',
        type: 'operator',
        operatorConfig: [
          {
            actionType: 'edit',
            text: '编辑',
            key: 'guid,age',
          }
        ]
      }
    ]
  },
  pagination: {
    pageSizes: ['10', '20', '30', '40'],
    pageSize: 20,
    pageKey: 'page',
    pageSizeKey: 'limit'
  },
  formConfig: {
    list: [
      {
        UIType: 'LabelInput',
        label: '药水名称:',
        key: 'eyedropName',
        width: '300'
      }
    ],
    actionType: 'modifi'
  }
}