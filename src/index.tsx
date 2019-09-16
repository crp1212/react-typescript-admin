/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { HashRouter as Router} from 'react-router-dom'
import App from '@/App'
import './assets/common.less'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
    </Router>  
  </Provider>,
  document.getElementById('root')
)