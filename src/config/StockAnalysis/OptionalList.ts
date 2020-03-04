import { requestStockOptionalListDel, requestStockForecastListAdd } from '@/apis/stock'
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
            actionType: 'check',
            text: '查看'
          },
          {
            actionType: 'request',
            text: '加入预测',
            requestParamsMap: {
              code: 'code',
              stockName: 'stockName'
            },
            requestTarget: requestStockForecastListAdd,
            showRule: [{
              key: 'forecast',
              value: false,
              judgeType: 'equal'
            }]
          },
          {
            actionType: 'request',
            text: '删除',
            requestTarget: requestStockOptionalListDel,
            requestParamsMap: { code: 'code' }
          }
          
        ]
      }
    ]
  }
}