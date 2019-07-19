import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router} from 'react-router-dom'
import App from '@/App'
import './assets/common.less'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>  
  </Provider>,
  document.getElementById('root')
)