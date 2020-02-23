import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/navbar.css'
class navBar extends React.Component {
  constructor() {
    super()
    this.state = {
      witch: true
    }
  }
  getWitch() {
    this.setState({
      witch: false
    })
  }
  getBlur() {
    this.setState({
      witch: true
    })
  }
  render() {
    return (
      <div className="witch_box">
        <NavLink to="/index" className="logo fl">
          <img src={require('../../assets/img/nav-logo.png')} alt="" />
        </NavLink>
        <div className="fr nav-right">
          <NavLink className="register" to="/sign/register">注册</NavLink>
          <div className="write">
            <i className="iconfont icon-yumaobi"></i>
            写文章
            </div>
        </div>
        <ul className="navbar-nav-right clearfix">
          <li><i className="iconfont">Aa</i></li>
          <li><img src={require('../../assets/img/nav_jsds.png')} alt="" /></li>
          <li className="login"><NavLink to="/sign/login">登录</NavLink></li>
        </ul>
        <div className="container-nav">
          <ul className="navbar-left">
            <li className={this.props.blog == '/index' ? 'actcur' : ''}><NavLink to='/index' activeClassName="active"><i className="iconfont icon-09" style={{ display: (this.props.blog == '/index' ? '' : 'none') }}></i>首页</NavLink></li>
            <li className="bgsilver"><NavLink to='/download' activeClassName="active"><i className="iconfont icon-shouji" style={{ display: (this.props.blog == '/index' ? '' : 'none') }}></i>下载App</NavLink></li>
            <li className="search">
              <form>
                <input type="text" placeholder="搜索" style={{ width: (this.state.witch ? '' : 320) }} onFocus={() => this.getWitch()} onBlur={() => this.getBlur()} />
                <i className={this.state.witch ? 'iconfont icon-zoom' : 'iconfont icon-zoom cur'}></i>
              </form>
            </li>
          </ul>
        </div>
      </div>

    )
  }
}
export default navBar