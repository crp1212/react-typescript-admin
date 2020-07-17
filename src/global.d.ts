declare global {  
  interface Window {
    isWeixin: boolean;
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
  interface RoutePramas {
    path: string;
    exact: boolean;
    component?: React.ComponentType<any>;
    unAuth?: boolean; // 是否有权限查看
    to?: string;
    meta?: {
      title: string; // 文本
      icon?: string; // 图标
      newWindow?: boolean; // 是否通过新窗口打开
    };
    children?: RoutePramas[];
    parent?: RoutePramas;
    customLayout?: boolean; // 参考信息, 该路由是否由自己本身展示，不存在于layout中, 只有在hide为true的情况下生效
    hide?: boolean; // 参考信息, 是否显示在menu
  }
  interface CommonObject {
    [propName: string]: any;
  }
  interface ReactComponentObject<T> {
    [propName: string]: React.ComponentType<T>;
  }
  interface StringObject {
    [propName: string]: string;
  }
  interface NumberObject {
    [propName: string]: number;
  }
  interface FunctionObject {
    [propName: string]: Function;
  }
  interface BooleanObject{
    [propName: string]: boolean;
  }
  interface CommonComponentProps{
    children: React.Component;
  }
  interface NormalListRequestConfig {
    url: string;
    defaultParams?: StringObject;
  }
  interface NormalListConfig { // NormalList的基本配置
    header?: any;
    table: any;
    pagination?: any;
    requestTarget?: NormalListRequestConfig;
    formConfig?: any;
  }
  interface NormalListUnitConfig { // 最小单元配置
    UIType: string; // 必须有ui类型
    key: string; // 必有设定key
    hide?: boolean; // 通过该字段表示是否显示, true为不显示
    actionType?: string; // ui的响应类型, 可选
    getWatchHandle?: Function; // 获取可监听配置
    arraySeparators?: string; // 数组数据的连接符, 当需要把数组的value转化为字符串时使用
    [propName: string]: any;
  }
  interface StockTransactionItem {
    change: number, // 价格变化
    price: number, // 成交价格
    time: string, // 时间字符串
    total: number, // 总成交额
    type: string, // 成交类型 1 是买盘 2 是卖盘 3 是中性盘
    volumn: number // 成交量
  }
  interface StockHistoryItem {
    name: string, // 股票名称
    limitVolumn: number, // 过滤值
    code: string, // 股票号码
    timeRange: number, // 时间范围
    timeStr: string // 日期
  }
}
export default global