/*
入口js
*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import MemoryUtils from './utils/memoryUtils'
import StorageUtils from './utils/storageUtils'

//从localStorage中获取User并保存到内存中
const user = StorageUtils.getUser();
MemoryUtils.user = user;

ReactDOM.render(<App />,document.getElementById('root'));
