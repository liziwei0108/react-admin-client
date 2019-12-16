/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax'
import jsonp from 'jsonp'

const BASE = ''


//登录接口
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', { user }, 'POST')

//jsonp请求的接口请求函数
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    jsonp(url, {}, (err, data) => {
      console.log('jsonp', err, data);
      //如果成功了
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });

      } else {
        //如果失败了
        alert("天气数据获取失败")

      }

    })
  })


}