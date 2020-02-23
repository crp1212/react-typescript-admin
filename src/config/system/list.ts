import { getWarehouseList, getUserInfo, createAftersalePointPeople } from '@/apis/common'
export default function getSystemListConfig () {
  return {
    header: {
      list: [
        {
          UIType: 'Input',
          prefixIcon: 'search',
          key: 'keyword',
          placeholder: '用户名称',
          actionType: 'query',
          width: 160
        },
        {
          UIType: 'Select',
          key: 'warehouse_id',
          placeholder: '全部售后点',
          width: 160,
          actionType: 'query',
          /*  mode: 'multiple',
          arraySeparators: ',', */
          options: [
            {
              label: '全部',
              value: ''
            }
          ],
          async: true,
          requestTarget: getWarehouseList,
          requestFormat: {
            label: 'name',
            value: 'id'
          }
        },
        {
          UIType: 'Select',
          key: 'status',
          placeholder: '筛选状态',
          width: 160,
          actionType: 'query',
          options: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 2
            }
          ]
        },
        {
          UIType: 'Button',
          actionType: 'query',
          text: '查询',
          type: 'primary'
        },
        {
          UIType: 'Button',
          actionType: 'reset',
          text: '重置'
        }
      ],
      rightList: [
        {
          UIType: 'Button',
          prefixIcon: 'el-icon-plus',
          actionType: 'add',
          text: '新建工作人员',
          type: 'primary',
        },
        {
          UIType: 'TableFilterButton',
          text: '列表项设置',
          actionType: 'filter',
          icon: 'filter'
        }
      ]
    },
    table: {
      tableHeader: [
        {
          type: 'index'
        },
        {
          key: 'name',
          label: '用户名称',
          /* getListFn (data: CommonObject) {
            return data.warehouse_name.map((name: string) => ({
              text: name,
              style: { color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16) }
            }))
          } */
        },
        {
          key: 'warehouse_name',
          label: '售后点',
          dealFunction (data: CommonObject) { // 处理函数
            return data.warehouse_name.join('，')
          }
        },
        {
          key: 'created_at',
          label: '创建时间',
          width: ''
        },
        {
          label: '状态',
          key: 'status',
          keyMap: {
            '1': '启用',
            '2': '禁用'
          }
        },
        {
          label: '操作',
          type: 'operator',
          operatorConfig: [
            {
              actionType: 'edit',
              text: '编辑',
              key: 'guid,age',
            },
            {
              actionType: 'check',
              text: '查看',
              key: 'guid,age',
              unAuth: true
            }
          ]
        }
      ]
    },
    pagination: {
      pageSizes: ['10', '20', '30', '40'],
      pageSize: 10,
      pageKey: 'page',
      pageSizeKey: 'limit'
    },
    formConfig: {
      list: [
        {
          UIType: 'LabelSelect',
          label: '绑定人员:',
          key: ['guid', 'name', 'mobile'],
          placeholder: '请选择人员账号',
          showSearch: true,
          searchKey: 'keyword',
          firstSearch: false, // 是否需要初始化的数据
          options: [],
          async: true,
          requestTarget: getUserInfo,
          requestFormat: {
            label: 'name',
            value: 'guid',
            phone: 'mobile'
          },
          verify: true,
        },
        {
          UIType: 'LabelSelect',
          label: '售后点:',
          key: 'warehouse_id',
          placeholder: '全部售后点',
          options: [],
          async: true,
          requestTarget: getWarehouseList,
          requestFormat: {
            label: 'name',
            value: 'id'
          },
          verify: true,
          mode: 'multiple'
        },
        {
          UIType: 'LabelCheckboxGroup',
          label: '权限:',
          key: 'auth',
          defaultValue: ['1'],
          width: '300',
          options: [
            {
              label: '维修', value: '1'
            },
            {
              label: '测试', value: '2'
            },
            {
              label: '收发件', value: '3'
            }
          ]
        },
        {
          UIType: 'LabelInput',
          label: '描述:',
          key: 'remarks',
          type: 'textarea',
          width: '300',
          textareaConfig: {
            row: 4
          }
        },
        {
          UIType: 'LabelRadioGroup',
          label: '状态:',
          key: 'status',
          options: [
            {
              label: '启用', value: '1'
            },
            {
              label: '禁用', value: '2'
            }
          ]
        }
      ],
      requestTarget: createAftersalePointPeople,
      actionType: 'request'
    }
  }
}