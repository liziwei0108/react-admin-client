/**
 * 发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 * 优化：统一处理请求异常
 */

 import axios from 'axios'
 import { message } from 'antd'

export default function ajax(url,data={},type='GET'){

  return new Promise((resolve,reject)=>{
    let promise;
    //执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }

    //如果成功的话就调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      //如果失败的话，不调用reject，而是alert提示错误
      message.error('请求出错：'+error.message)

    })

  })
}