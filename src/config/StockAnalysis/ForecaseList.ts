export default {
  table: {
    tableHeader: [
      {
        key: 'stockName',
        label: '股票名称',
        width: 150
      },
      {
        key: 'code',
        label: '股票代码',
        width: 150,
      },
      {
        label: '操作',
        type: 'operator',
        operatorConfig: [
          {
            actionType: 'openWindow',
            text: '删除',
            key: 'updateUrl',
            showRule: [{
              key: 'updateUrl',
              judgeType: 'noUndefined'
            }]
          },
          {
            actionType: 'openWindow',
            text: '加入预测',
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