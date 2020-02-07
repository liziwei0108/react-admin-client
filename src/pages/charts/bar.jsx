import React, { Component } from 'react';
import { Card, Button } from 'antd';
import ReactEcharts from 'echarts-for-react'

/**
 * 柱状图
 */

export default class Bar extends Component {

  constructor(props){
    super(props)
    this.state = {
      sales: [5, 20, 36, 10, 10, 20],   //销量的数组
      stores: [7, 10, 56, 67,3, 10]     //库存的数组
    }
  }

  //更新柱形图数据
  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale+1),
      stores: state.stores.map(store => store-1)
    }))
  }

  //返回echarts柱状图配置
  getOption = (sales, stores) => {

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量','库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      },
        {
          name: '库存',
          type: 'bar',
          data: stores
        }
    ]
    };

    return option

  }

  render(){
    const { sales, stores } = this.state
    return(
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='柱状图1'>
          <ReactEcharts option={this.getOption(sales, stores)}/>

        </Card>
        
      </div>
    )
  }
}