import React, { Component } from 'react'
import { CommonProps } from './form.d'
import Button from './Button'
import { Modal, Checkbox  } from 'antd'
import styles from './TableFilterButton.less'

interface TableFilterButtonProps extends CommonProps { 
  
}
interface TableOptionItem {
  label: string;
  key: string;
  checked: boolean;
}
class TableFilterButton extends Component<TableFilterButtonProps, {}> {
  public cacheTableOption: CommonObject[] = []
  public state = {
    visible: false,
    tableOption: []
  }
  public onAction (obj: CommonObject) {
    this.showModal()
  } 
  public hideModal () {
    let tableOption = this.cacheTableOption
    this.setState({visible: false, tableOption})
  }
  public showModal () {
    this.cacheTableOption = this.state.tableOption
    this.setState({visible: true})
  }
  public initTableOption (tableConfig: CommonObject[]) { // 初始化table选项
    let tableOption = tableConfig.filter(item => !item.type).map(item => ({
      label: item.label,
      key: item.key,
      checked: !item.isHide,
      disabled: !!item.filterDisabled
    }))
    this.setState({tableOption})
  }
  public saveChange () { // 保存修改
    this.setState({visible: false})
    let tableOption: TableOptionItem[] = this.state.tableOption
    this.props.onAction({
      ...this.props.config,
      filterKeyMap: tableOption.reduce((result: CommonObject, cur) => {
        result[cur.key] = cur.checked
        return result
      }, {})
    })
  }
  public componentDidMount () {
    let tableConfig = this.props.optionalParam.tableConfig
    if (tableConfig) {
      this.initTableOption(tableConfig.tableHeader)
    }
  }
  public checkChange (index: number, e: any) {
    let tableOption = this.state.tableOption.map((item: CommonObject, ind) => {
      let result = { ...item }
      result.checked = index === ind ? e.target.checked : result.checked
      return result
    })
    this.setState({tableOption})
  }
  public render () {    
    let config = this.props.config
    let tableOpiton = this.state.tableOption
    return <div className={styles.container}>
      <Button config={config} onAction={this.onAction.bind(this)}></Button>
      <Modal
        title="列表项设置"
        visible={this.state.visible}
        onOk={this.saveChange.bind(this)}
        onCancel={this.hideModal.bind(this)}
        okText="确认"
        cancelText="取消"
      >
        <div className={styles.group}>
          { 
            tableOpiton.map((item: CommonObject, index) => {
              return <div className={styles.checkbox} key={index} >
                <Checkbox 
                  checked={item.checked} 
                  disabled={item.disabled}
                  onChange={(event) => {this.checkChange(index, event )}}
                >{item.label}</Checkbox>
              </div>
            }) 
          }
        </div>
      </Modal>
    </div>
  }
}


export default TableFilterButton


