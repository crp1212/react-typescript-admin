/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { HashRouter as Router} from 'react-router-dom'
import App from '@/App'
import './assets/common.less'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={zh_CN}><App /></ConfigProvider>
    </Router>  
  </Provider>,
  document.getElementById('root')
)