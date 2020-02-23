import React,{Component} from 'react';
import Router from './router'
// 引入路由文件
import One from './router/one'
// 引入ui库
import 'antd/dist/antd.css'
// 公共样式
import '../src/assets/css/resets.css'
// iconfnt
import '../src/assets/font/iconfont.css'
// swiper
import 'swiper/css/swiper.min.css'
// 引入axios
import axios from 'axios'
Component.prototype.$axios = axios
class App extends React.Component{
  render(){
    return (
        <Router routes={One}></Router>
    )
  }
}

export default App;
