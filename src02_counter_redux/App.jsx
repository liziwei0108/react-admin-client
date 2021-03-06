/*
根组件
*/

import React, { Component } from 'react';
import {increment, decrement} from './redux/actions'

class App extends Component {
  constructor(props){
    super(props);

    this.numberRef = React.createRef()


  }

  increment = () => {
    const number = this.numberRef.current.value * 1
    this.props.store.dispatch(increment(number))
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    this.props.store.dispatch(decrement(number))
  }

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    if(this.props.store.getState()%2 === 1){
      this.props.store.dispatch(increment(number))
    }
    
  }

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      this.props.store.dispatch(increment(number))
    },1000)
  }


  render() {
    const count = this.props.store.getState()
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

export default App;
