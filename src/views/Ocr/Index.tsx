import React, { Component } from 'react'
import { Button } from 'antd'
import styles from './Ocr.less'
import { getBaiduAcessToken, analysisOcrFile } from '@/apis/ocr'
import { getFileBase64Code } from '@/utils/file'
import LoadingWrap from '@/components/LoadingCover/wrap'


interface IndexProps {

}

class Index extends Component<IndexProps, {}> {
  private accessToken: string = ''
  private inputFile: HTMLInputElement | null = null
  public getInputRef = (ref: HTMLInputElement | null): void => {
    this.inputFile = ref
  }
  public state = {
    image: '',
    words: [],
    loading: false
  }
  public async componentDidMount () {
    try {
      let data = await getBaiduAcessToken()
      this.accessToken = data.access_token
    } catch (error) {
      
    }
  }
  public async getUploadImage () {
    if (!this.inputFile) { return }
    let file = this.inputFile.files ? this.inputFile.files[0] : null
    if (!file) return  
    this.fileHandle(file)
  }
  public async fileHandle (file: File) {
    this.setImage(URL.createObjectURL(file))
    let base64Code: string = await getFileBase64Code(file) as string
    let ind = base64Code.indexOf(',')
    this.getAnalysisResult(base64Code.slice(ind + 1))
  }
  public setImage (image: string) {
    this.setState({ image })
  }
  public async getAnalysisResult (base64Code: string | ArrayBuffer | null) {
    if (!base64Code) { return }
    this.setState({loading: true})
    try {
      let data = await analysisOcrFile({
        image: base64Code,
        'access_token': this.accessToken
      })
      this.setState({ words: data })
    } catch (error) {
      console.log(error)
    }
    this.inputFile && (this.inputFile.value = '')
    this.setState({loading: false})
  }
  public startUpload () {
    if (!this.inputFile) { return }
    this.inputFile.click()
  }
  public dropOver (event: any) {
    let file = event.dataTransfer.files[0]
    event.stopPropagation()
    event.preventDefault()
    this.fileHandle(file)
  }
  public dragOverHandle (event: any) {
    event.stopPropagation()
    event.preventDefault()
  }
  public render () {    
    return <div className={styles.contianer}>
      <div>
        <Button type="primary" onClick={this.startUpload.bind(this)}>上传</Button>
        <input type="file" onChange={this.getUploadImage.bind(this)} ref={this.getInputRef} style={{display: 'none'}}/>
        <div className={'rc-row  ' + styles.main}  >
          <div className={styles.image} onDrop={this.dropOver.bind(this)} onDragOver={this.dragOverHandle.bind(this)}>
            <img src={this.state.image} alt=""/>
          </div>
          <LoadingWrap className={styles.text} loading={this.state.loading}>
            {this.state.words.join('    ')}
          </LoadingWrap>

        </div>
      </div>
    </div>
  }
}


export default Index


