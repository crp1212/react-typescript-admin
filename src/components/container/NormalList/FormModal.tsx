import React, { Component } from 'react'
import { Modal } from 'antd'
import { getFormComponent } from '@/components/form/Index'
import { isFunction } from '@/utils/index'
import { fetch } from '@/apis/index'
import styles from './NormalList.less'

interface FormModalConfig extends CommonObject {
  list: NormalListUnitConfig[];
  request: CommonObject[];
}

interface FormModalProps { 
  config: FormModalConfig;
  onAction: Function;
}

class FormModal extends Component<FormModalProps, {}> {
  public watchCollection: CommonObject = {}
  public state = {
    visible: false,
    formData: {}
  }
  public hideModal () {
    this.setState({ visible: false })
  }
  public showModal () {
    this.setState({ visible: true })
  }
  public componentDidMount () {
    console.log(this.props.config)
  }
  public onAction (option: CommonObject) {
    let { key, value } = option 
    let changeResult: StringObject = {}
    if (Array.isArray(key)) {
      key.map((val, index) => changeResult[key[index]] = value[index])
    } else {
      changeResult[key] = value
    }
    this.state.formData = {
      ...this.state.formData,
      ...changeResult
    }
  }
  public collectWatchHandle (obj: FunctionObject) {
    let watchCollection = this.watchCollection
    let backResult: StringObject = {}
    Object.keys(obj).forEach(key => {
      let queue = watchCollection[key] 
      if (!queue) { 
        queue = watchCollection[key]= {}
      }
      let uuid = parseInt(Math.random() * 1000 + '') + '' + Date.now()
      queue[uuid] = obj[key]
      backResult[key] = uuid
    })
    return backResult
  }
  public clearWatchHandle (obj: StringObject) { // 清除对应的函数
    let watchCollection = this.watchCollection
    Object.keys(obj).forEach(key => {
      let queue = watchCollection[key]
      if (queue) {
        delete queue[obj[key]]
      }
    })
  }
  public getRenderResultList (arr: NormalListUnitConfig[]) {
    return arr.map((config, index) => getFormComponent({
      ...config,
      getWatchHandle: (watchObj: FunctionObject) => {
        return this.collectWatchHandle(watchObj)
      },
      clearWatchHandle: (watchTypeUuid: StringObject) => {
        this.clearWatchHandle(watchTypeUuid)
      }
    }, index, this.onAction.bind(this)))
  }
  public verifyFormData () { // 验证表单数据
    let watchKeyMap = this.watchCollection.verify
    if (!watchKeyMap) { return true }
    let result = Object.keys(watchKeyMap).map(key => watchKeyMap[key]()).every(val => val)
    return result
  }
  public onConfirm () { // 点击确定的事件
    let { requestTarget, actionType } = this.props.config
    /* let requestFn: Function | undefined
    if (isFunction(requestTarget)) {

    } else {
      requestFn = fetch(requestTarget.method, requestTarget.url)
    } */
    if (!this.verifyFormData()) {
      return
    }
    let onAction = this.props.onAction
    onAction && onAction({
      actionType,
      requestTarget,
      requestParam: this.state.formData
    })
  }
  public render () {    
    let formList = this.props.config.list
    return <Modal
      title="列表项设置"
      visible={this.state.visible}
      onOk={this.onConfirm.bind(this)}
      onCancel={this.hideModal.bind(this)}
      okText="确认"
      cancelText="取消"
      width='600px'
    >
      <div className={styles.formItem}>
        { this.getRenderResultList(formList) }
      </div>
    </Modal>
  }
}


export default FormModal


