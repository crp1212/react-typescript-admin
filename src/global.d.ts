declare global {  
  interface Window {
    isWeixin: boolean;
  }
  interface RoutePramas {
    path: string;
    exact: boolean;
    component: React.ComponentType<any>;
    meta?: {
      title: string; // 文本
      icon?: string; // 图标
      newWindow?: boolean; // 是否通过新窗口打开
    };
    children?: RoutePramas[];
    hide?: boolean; // 参考信息, 是否显示在menu
  }
  interface CommonObject {
    [propName: string]: any;
  }
  interface StringObject {
    [propName: string]: string;
  }
}
export default global