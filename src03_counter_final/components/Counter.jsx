/*
UI组件
主要做显示与用户交互
如果用到了react-redux插件库，则UI组件的代码中不会出现任何redux相关代码
*/

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props){
    super(props);

    this.numberRef = React.createRef()


  }

  increment = () => {
    const number = this.numberRef.current.value * 1
    this.props.increment(number)
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    this.props.decrement(number)
  }

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    if(this.props.count % 2 === 1){
      this.props.increment(number)
    }
    
  }

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    this.props.incrementAsync(number)
  }


  render() {
    const count = this.props.count
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    );
  }
}

export default Counter;
