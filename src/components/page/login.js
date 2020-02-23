import React from 'react'
import '../../assets/css/login.css'
import api from '../../api/api'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      phone: localStorage.getItem('iid')?localStorage.getItem('iid'):'',
      password: "",
      value: false,
      content: ''
    }
  }
  getChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }
  getlogin(e) {
    e.preventDefault()
    if (this.state.phone == "" || this.state.password == "") {
      this.refs.content.style.display = 'block'
      this.setState({
        content: '手机号/邮箱地址或密码不能为空'
      })
      setTimeout(() => {
        this.refs.content.style.display = 'none'
      }, 5000)
      return
    } else if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.state.phone)) {
      this.refs.content.style.display = 'block'
      this.setState({
        content: '手机号格式不正确'
      })
      setTimeout(() => {
        this.refs.content.style.display = 'none'
      }, 5000)
      return
    }
    else {
      this.$axios({
        url: api.Login,
        params: {
          phone: this.state.phone,
          password: this.state.password
        }
      })
        .then(res => {
          if (res.data.code == 501) {
            this.refs.content.style.display = 'block'
            this.setState({
              content: '账户不存在'
            })
            setTimeout(() => {
              this.refs.content.style.display = 'none'
            }, 5000)
            return
          } else if (res.data.code == 502) {
            this.refs.content.style.display = 'block'
            this.setState({
              content: '密码错误'
            })
            setTimeout(() => {
              this.refs.content.style.display = 'none'
            }, 5000)
            return
          } else if (res.data.code == 200) {
            if(this.state.value){
              localStorage.setItem('iid',this.state.phone)
            }
            this.props.history.push('/index')
            localStorage.setItem('uid', res.data.account.id);
          }
        })
        .catch(err => {
          this.refs.content.style.display = 'block'
          this.setState({
            content: '账号或密码错误'
          })
          setTimeout(() => {
            this.refs.content.style.display = 'none'
          }, 5000)
        });
    }
  }
  getChangePwd(e) {
    this.setState({
      password: e.target.value
    })
  }
  getChecked(){
    this.setState({
      value:!this.state.value
    })
  }
  render() {
    return (
      <div className="js-login">
        <form>
          <div className="input">
            <i className="iconfont icon-shouji1"></i>
            <input className="text" type="text" placeholder="手机号或邮箱" value={this.state.phone} onChange={this.getChangePhone.bind(this)} />
          </div>
          <div className="input">
            <i className="iconfont icon-mima1"></i>
            <input type="password" placeholder="密码" value={this.state.password} onChange={this.getChangePwd.bind(this)} />
          </div>
          <div className="remember_me">
            <div className="me_left">
              <input type="checkbox" value={this.state.value} onChange={this.getChecked.bind(this)}/><span>记住我</span></div>
            <span>登录遇到问题?</span>
          </div>
          <button className="login_btn" onClick={this.getlogin.bind(this)}>登录</button>
        </form>
        <div className="more-sign">
          <h6>社交帐号登录</h6>
          <ul>
            <li>
              <a>
                <i className="iconfont icon-xinlang"></i>
              </a>
            </li>
            <li><a id="weixin" target="_blank" href=""><i className="iconfont icon-weixin"></i></a></li>
            <li><a target="_blank" href=""><i className="iconfont icon-icon"></i></a></li>
          </ul>
        </div>
        <div className="reminder" ref="content">{this.state.content}</div>
      </div>
    );
  }
}

export default Index;
