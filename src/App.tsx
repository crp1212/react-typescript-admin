import React, { Component } from 'react'

export interface AppProps { b: string }

class App extends Component<AppProps, {}> {
  public state = {
    a: '2'
  }
  public render () {    
    return <div>app</div> 
  }
}
export default App


