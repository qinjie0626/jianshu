import React from 'react'
import '../../assets/css/login.css'
import api from '../../api/api'
import { message} from 'antd';
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      nickname: "",
      phone: "",
      password: "",
      captcha: "",
      time: 60,
      content: '获取验证码',
      flag: false,
      checked: true,
      nicknamecon: "请输入昵称",
      phonecon: "请输入手机号",
      passwordcon: "请输入密码",
      captchacon: "请输入验证码",
    }
  }
  // 获取验证码
  getCode(e) {
    e.preventDefault();
    this.$axios({
      url: api.sent,
      params: {
        phone: this.state.phone,
      }
    })
      .then(res => {
        let timer = null
        if (res.data.code == 200) {
          this.setState({
            checked: true
          })
          timer = setInterval(() => {
            this.setState({
              time: this.state.time - 1
            },()=>{
              this.setState({
                content: `还有${this.state.time}秒`
              })
              if (this.state.time <= 0) {
                clearInterval(timer)
                this.setState({
                  content: '再次获取验证码'
                })
                this.setState({
                  checked: false
                })
                this.setState({
                  time: 60
                })
              }
            })
          }, 1000);
          
        } else {
          alert("服务器崩溃，请刷新重试！！");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  Nickname(e) {
    this.setState({
      nickname: e.target.value
    }, () => {
      if (!/^[\w\u4e00-\u9fa5][\s\w\u4e00-\u9fa5]*(?!\s)$/.test(this.state.nickname)) {
        this.refs.nickname.style.display = 'block'
        this.setState({
          nicknamecon: '昵称格式不正确,需要是2-15个字符,只能包含英文中文下划线,不能包含空格'
        })
      } else {
        this.refs.nickname.style.display = 'none'
      }
    })
  }
  PhoneFun(e) {
    this.setState({
      phone: e.target.value
    }, () => {
      if (/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.state.phone)) {
        this.refs.phone.style.display = 'none'
        this.setState({
          checked: false
        })
      } else {
        this.refs.phone.style.display = 'block'
        this.setState({
          phonecon: '手机号格式不正确'
        })
        this.setState({
          checked: true
        })
      }
    })
    this.setState({
      flag: true
    })

  }
  getPhoneB(){
    this.$axios({
      url:api.existence,
      params:{
        phone:this.state.phone
      }
    }).then(res=>{
      if(res.data.exist==1){
        this.refs.phone.style.display = 'block'
        this.setState({
          phonecon: '该账号已注册'
        })
      }else{
        this.refs.phone.style.display = 'none'
      }
    }).catch(err=>{

    })
  }
  captCha(e) {
    if (this.state.captcha != '') {
      this.refs.captcha.style.display = 'none'
    }
    this.setState({
      captcha: e.target.value
    })
  }
  passWord(e) {
    this.setState({
      password: e.target.value
    }, () => {
      if (/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(this.state.password)) {
        this.refs.password.style.display = 'none'
      } else {
        this.refs.password.style.display = 'block'
        this.setState({
          passwordcon: '密码包含 数字,英文,字符中的两种以上，长度6-20'
        })
      }
    })
  }

  getReg(e) {
    e.preventDefault();
    // 验证验证码
    if (this.state.nickname == '') {
      this.refs.nickname.style.display = 'block'
      this.setState({
        nicknamecon: '请输入昵称'
      }, () => {
        return
      })
    } else if (this.state.phone == '') {
      this.refs.phone.style.display = 'block'
      this.setState({
        phonecon: '请输入手机号'
      }, () => {
        return
      })
    } else if (this.state.captcha == '') {
      this.refs.captcha.style.display = 'block'
      this.setState({
        captchacon: '请输入验证码'
      }, () => {
        return
      })
    }
    else if (this.state.password == '') {
      this.refs.password.style.display = 'block'
      this.setState({
        passwordcon: '请输入密码'
      }, () => {
        return
      })
    } else {
      this.$axios({
        url: api.captCha,
        params: {
          phone: this.state.phone,
          captcha: this.state.captcha
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.refs.captcha.style.display = 'none'
            // 注册账户
            this.getRegister();
          } else
          {
            this.refs.captcha.style.display = 'block'
            this.setState({
              captchacon: '验证码输入错误'
            }, () => {
              return
            })
          }
        })
        .catch(err => {
          this.refs.captcha.style.display = 'block'
            this.setState({
              captchacon: '验证码不正确'
            }, () => {
              return
            })
        });
    }
  }
  // 注册
  getRegister() {
    this.$axios({
      url: api.Register,
      params: {
        nickname: this.state.nickname,
        phone: this.state.phone,
        password: this.state.password,
        captcha: this.state.captcha
      }
    })
      .then(res => {
        if (res.data.code == 200) {
          message.success('注册成功');
          this.props.history.push('/sign/login')
        } else {
          message.error('注册失败');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="js-login">
        <form>
          <div className="input">
            <i className="iconfont icon-gerenzhongxin-zhong"></i>
            <input className="text" type="text" placeholder="你的昵称" value={this.state.nickname} onChange={this.Nickname.bind(this)} />
            <div className="tooltip-inner" ref="nickname" style={{right:(this.refs.nickname?-this.refs.nickname.offsetWidth - 10:'')}}>
              <i className="iconfont icon-weixian"></i><span>{this.state.nicknamecon}</span>
            </div>
          </div>
          <div className="input">
            <i className="iconfont icon-shouji1"></i>
            <input className="phone" type="text" placeholder="手机号" value={this.state.phone} onChange={this.PhoneFun.bind(this)} onBlur={this.getPhoneB.bind(this)}/>
            <div className="tooltip-inner" ref="phone"  style={{right:(this.refs.phone?-this.refs.phone.offsetWidth - 10:'')}}>
              <i className="iconfont icon-weixian"></i><span>{this.state.phonecon}</span>
            </div>
          </div>
          <div className="input code" style={{ display: (this.state.flag ? 'block' : 'none') }}>
            <i className="iconfont icon-yzm"></i>
            <input className="phone" type="text" placeholder="手机验证码" value={this.state.captcha} onChange={this.captCha.bind(this)} />
            <button className={this.state.checked ? 'cur' : ''} disabled={this.state.checked} onClick={this.getCode.bind(this)}>{this.state.content}</button>
            <div className="tooltip-inner" ref="captcha" style={{right:(this.refs.captcha?-this.refs.captcha.offsetWidth - 10:'')}}>
              <i className="iconfont icon-weixian"></i><span>{this.state.captchacon}</span>
            </div>
          </div>
          <div className="input">
            <i className="iconfont icon-mima1"></i>
            <input type="password" placeholder="设置密码" value={this.state.password} onChange={this.passWord.bind(this)} />
            <div className="tooltip-inner" ref="password" style={{right:(this.refs.password?-this.refs.password.offsetWidth - 10:'')}}>
              <i className="iconfont icon-weixian"></i><span>{this.state.passwordcon}</span>
            </div>
          </div>
          <button className="login_btn reg" onClick={this.getReg.bind(this)}>注册</button>
          <p className="sign-up-msg">点击 “注册” 即表示您同意并愿意遵守简书<br /> <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a> 和 <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。</p>
        </form>
        <div className="more-sign">
          <h6>社交帐号登录</h6>
          <ul>
            <li><a id="weixin" target="_blank" href=""><i className="iconfont icon-weixin"></i></a></li>
            <li><a target="_blank" href=""><i className="iconfont icon-icon"></i></a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Index;
