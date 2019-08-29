declare global {  
  interface Window {
    isWeixin: boolean;
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
  interface RoutePramas {
    path: string;
    exact: boolean;
    component?: React.ComponentType<any>;
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
  interface StringObject {
    [propName: string]: string;
  }
  interface FunctionObject {
    [propName: string]: Function;
  }
}
export default global