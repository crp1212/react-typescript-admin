import { requestStockForecaseListDel } from '@/apis/stock'

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
            text: '删除',
            requestTarget: requestStockForecaseListDel,
            requestParamsMap: { code: 'code' }
          }
        ]
      }
    ]
  }
}