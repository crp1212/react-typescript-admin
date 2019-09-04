import React, { Component } from 'react'
import Header from './Header'
import Table from './Table'
import Pagination from './Pagination'

interface NormalListProps { 
  
}

class NormalList extends Component<NormalListProps, {}> {
  public state = {
  }
  public render () {    
    return <div>
      <Header></Header>
      <Table></Table>
      <Pagination></Pagination>
    </div>
  }
}


export default NormalList


