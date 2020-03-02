export default {
  table: {
    tableHeader: [
      {
        key: 'title',
        label: '标题'
      },
      {
        label: '操作',
        width: 200,
        type: 'operator',
        operatorConfig: [
          {
            actionType: 'openWindow',
            text: '更新',
            key: 'updateUrl',
            showRule: [{
              key: 'updateUrl',
              judgeType: 'noUndefined'
            }]
          },
          {
            actionType: 'openWindow',
            text: '清缓存',
            key: 'cacheUrl',
            showRule: [{
              key: 'cacheUrl',
              judgeType: 'noUndefined'
            }]
          }
        ]
      }
    ]
  }
}