import { requestStockOptionalListAdd } from '@/apis/stock'
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
            actionType: 'request',
            text: '加自选',
            key: 'stockName',
            requestParamsMap: {
              stockName: 'stockName',
              code: 'code'
            },
            requestTarget: requestStockOptionalListAdd,
            showRule: [{
              key: 'isOptional',
              value: false,
              judgeType: 'equal'
            }]
          },
          {
            actionType: 'request',
            text: '图表'
          }
        ]
      }
    ]
  },
  pagination: {
    pageSizes: ['10', '20', '30', '40'],
    pageSize: 20,
    pageKey: 'p',
    pageSizeKey: 'psize'
  },
}