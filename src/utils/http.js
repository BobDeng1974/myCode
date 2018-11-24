/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import ajax from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
// 超时时间
ajax.defaults.timeout = 40000
// http请求拦截器
var loadinginstace
ajax.interceptors.request.use(config => {
    // element ui Loading方法
  /*   loadinginstace = Loading.service({
        fullscreen: true
    }) */
    config.data = JSON.stringify(config.data);
    config.headers = {
        'Content-Type':"application/json;charset=UTF-8" 
    }; 
    return config
}, error => {
   /*  loadinginstace.close() */
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
ajax.interceptors.response.use(data => { // 响应成功关闭loading
   /*  loadinginstace.close() */
    return data
}, error => {
  /*   loadinginstace.close() */
    console.log(error);
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error)
})

export default ajax
