import React from 'react'
import '../assets/css/detail.css'
import { Popover, Icon, BackTop,Affix } from 'antd';
import api from '../api/api'
import rdom from 'react-dom'
import { NavLink } from 'react-router-dom'
import '../assets/css/navbar.css'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      content: (<div>
        <Popover placement="right" content={(<div><p>分享到微信</p><p>分享到微博</p></div>)}>分享文章></Popover>
        <p>收入专题</p>
        <p>收藏文章</p>
        <p>举报文章</p>
      </div>),
      flag: true,
      detail: {},
      user: {},
      flagwrite: true,
      headerflag: false,
      witch: true,
      top:67
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
  handleScroll(e) {
    const ele = rdom.findDOMNode(this)
    if (e.nativeEvent.deltaY <= 0) {
      if (ele.scrollTop <= 0) {
        this.setState({
          headerflag: false
        })
      }
    } else {
      if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
        this.setState({
          headerflag: true
        })
      }
    }
  }
  getFocus() {
    this.setState({
      flag: false
    })
  }
  getFocusW() {
    this.setState({
      flagwrite: false
    })
  }
  cancel() {
    this.setState({
      flag: true
    })
  }
  cancelW() {
    this.setState({
      flagwrite: true
    })
  }
  componentDidMount() {
    this.$axios({
      url: `${api.asimov}/${this.props.match.params.id}`
    }).then(res => {
      this.setState({
        detail: res.data,
        user: res.data.user
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    // if(this.state.detail.free_content){
    //   let arr = this.refs.content.getElementsByTagName('img')
    //   for(let i=0;i<arr.length;i++){
    //     arr[i].src = arr[i].dataset.originalSrc
    //   }
    // }
    return (
      <div onWheel={this.handleScroll.bind(this)} className="detail">
        <nav>
          <div className={this.state.headerflag ? 'witch_box header-top-run' : 'witch_box'}>
            <NavLink to="/index" className="logo fl">
              <img src={require('../assets/img/nav-logo.png')} alt="" />
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
              <li><img src={require('../assets/img/nav_jsds.png')} alt="" /></li>
              <li className="login"><NavLink to="/sign/login">登录</NavLink></li>
            </ul>
            <div className="container-nav">
              <ul className="navbar-left">
                <li><NavLink to='/index' activeClassName="active">首页</NavLink></li>
                <li className="bgsilver"><NavLink to='/download' activeClassName="active">下载App</NavLink></li>
                <li className="search">
                  <form>
                    <input type="text" placeholder="搜索" style={{ width: (this.state.witch ? '' : 320) }} onFocus={() => this.getWitch()} onBlur={() => this.getBlur()} />
                    <i className={this.state.witch ? 'iconfont icon-zoom' : 'iconfont icon-zoom cur'}></i>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div className={this.state.headerflag ? 'header-title header-title-run' : 'header-title'}>
            <h1>{this.state.detail.public_title}</h1>
            <div className="mycenter">
              <a href="">
                <img src={this.state.user.avatar} alt="" />
                <span>{this.state.user.nickname}</span>
              </a>
              <div className="attention">关注</div>
              <div className="support">赞赏支持</div>
            </div>
          </div>
        </nav>
        <div className="detail-content">
          <div className="content-left">
            <div className="detail_cont_big">
              <h3>{this.state.detail.public_title}</h3>
              <div className="cont_big_title">
                <img src={this.state.user.avatar} alt="" className="head-title" />
                <div className="right-title">
                  <p className="name-title">{this.state.user.nickname}
                    <span className="attention">关注</span></p>
                  <div className="buttom-title">
                    <div className="icon-font">
                      <i className="iconfont icon-zuanshi"></i>14
                    </div>
                    <p className="timer">{this.state.detail.first_shared_at}  <span>字数 {this.state.detail.total_fp_amount}</span><span>阅读 </span></p>
                  </div>
                </div>
              </div>
              <div ref="content" dangerouslySetInnerHTML={{ __html: this.state.detail.free_content }}></div>
              <div className="give-like">
                <div className="give-left">
    <div className="circle-icon one"><i className="iconfont icon-zan"></i></div> {this.state.detail.likes_count}人点赞><div className="circle-icon"><i className="iconfont icon-cai"></i></div>
                </div>
                <div className="give-right">
                  <i className="iconfont icon-shu two"></i>英语启蒙
                  <Popover className="icon-font" content={this.state.content}>
                    <div className="circle-icon">
                      <Icon type="ellipsis" />
                    </div>
                  </Popover>
                </div>
              </div>
              <div className="support">
                <p>"小礼物走一走，来简书关注我"</p>
                <div className="support-btn">赞赏支持</div>
                <p>还没有人赞赏，支持一下</p>
              </div>
              <div className="introduce">
                <div className="introduce-left">
                  <img src={this.state.user.avatar} alt="" className="introduce-left-img" />
                  <div>
                    <div className="introduce-left-title">
                      <a href="">{this.state.user.nickname}</a>
                      <img src="" alt="" />
                      <span></span>
                    </div>
                    <div className="introduce-left-buttom"><span>总资产473 (约43.61元)</span><span>共写了71.3W字</span><span>获得3,115个赞</span><span>共3,645个粉丝</span></div>
                  </div>
                </div>
                <div className="attention">关注</div>
              </div>
            </div>
            <div className="good-comments">
              <div className="write-comment">
                <img src="" alt="" />
                <div className="write-font">
                  <textarea className="" placeholder="写下你的评论..." onFocus={() => this.getFocusW()}></textarea>
                  <div className="smiling-box" style={{ display: (this.state.flagwrite ? 'none' : '') }}>
                    <div><Icon type="smile" className="smiling" /><span>Ctrl + Enter 发表</span></div>
                    <div className="det-footer-btn">
                      <button disabled={this.state.flag} type="button">发布</button>
                      <button type="button" onClick={() => this.cancelW()}>取消</button>
                    </div>
                  </div>
                </div>
              </div>
              <h5>精彩评论<span>6</span></h5>
              <ul className="content-detail">
                <li>
                  <img src={this.state.user.avatar} alt="" className="head-photo" />
                  <div className="right-cont">
                    <p className="nickname">{this.state.user.nickname}</p>
                    <p className="timer">6楼 2019.01.31 08:46</p>
                    <p className="good-content">我对邵老先生的新闻更感兴趣</p>
                    <div className="det-right">
                      <div className="icon-font">
                        <i className="iconfont icon-zan"></i>14
                        </div>
                      <div className="icon-font">
                        <i className="iconfont icon-duanxin"></i>
                        回复</div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="all-comments">
                <div className="title-top">
                  <h5>全部评论<span>30</span><div className="lookAt">只看作者</div></h5>
                  <div className="sort">
                    <span className="active">按时间倒序</span>
                    <span>按时间正序</span>
                  </div>
                </div>
                <ul className="content-detail">
                  <li>
                    <img src={require('../assets/img/banner.png')} alt="" className="head-photo" />
                    <div className="right-cont">
                      <p className="nickname">闲聊先生</p>
                      <p className="timer">6楼 2019.01.31 08:46</p>
                      <p className="good-content">我对邵老先生的新闻更感兴趣</p>
                      <div className="det-right">
                        <div className="icon-font">
                          <i className="iconfont icon-zan"></i>14
                        </div>
                        <div className="icon-font">
                          <i className="iconfont icon-duanxin"></i>
                          回复</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <ul className="paging">
                <li className="number-page number">上一页</li>
                <li className="active">1</li>
                <li>2</li>
                <li>3</li>
                <li className="number-page">下一页</li>
              </ul>
              <div className="lineae"></div>
              <div className="title-top">
                <h5>推荐阅读</h5>
                <div className="sort">
                  更多精彩内容  >
                </div>
              </div>
              <ul className="readRecommend">
                <li>
                  <a href="" className="titlefont">第二次维权</a>
                  <p>继四月份幼儿园甲醛中毒事件后，7月又陷入今年第二次维权。 二宝上课的早教机构因拖欠商场房租，停水停电，不得不暂停营...</p>
                  <div className="read-button">
                    <img src={require('../assets/img/banner.png')} alt="" />
                    <span>慢慢阿维娃</span>
                    <span>阅读 134</span>
                    <span>评论 2</span>
                    <span>赞 1</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-right">
            <div className="myCenter">
              <div className="myCenter-head">
                <img src={this.state.user.avatar} alt=""/>
                <div className="myCenter-head-right">
                  <div className="myCenter-head-name"><span>{this.state.user.nickname}</span> <span className="attention">关注</span></div>
                  <span className="money">总资产2,934 (约270.45元)</span>
                </div>
              </div>
              <div className="lineae"></div>
              <ul className="small-news">
                  <li>
                    <a href="">中年男子救人被逼到自杀：世道变坏，从好人寒心开始</a>
                    <span>阅读 24,041</span>
                  </li>
                </ul>
            </div>
            <Affix offsetTop={this.state.top}>
            <div className="small-read myCenter">
                <h5>推荐阅读</h5>
                <ul className="small-news">
                  <li>
                    <a href="">中年男子救人被逼到自杀：世道变坏，从好人寒心开始</a>
                    <span>阅读 24,041</span>
                  </li>
                </ul>
            </div>
            </Affix>
          </div>
        </div>
        <div className="operation">
          <div className="operation-box">
            <div><i className="iconfont icon-zan"></i></div>
            <p>{this.state.detail.likes_count}赞</p>
          </div>
          <div className="operation-box">
            <div><i className="iconfont icon-zanshang"></i></div>
            <p>赞赏</p>
          </div>
        </div>
        <footer>
          <div className="detail-footer">
            <div className="det-box">
              <div className="font">
                <textarea placeholder="写下你的评论..." className={this.state.flag ? '' : 'witch-big'} onFocus={() => this.getFocus()}></textarea>
                <Icon type="smile" className="smiling" />
              </div>
              <div className="det-right" style={{ display: (this.state.flag ? '' : 'none') }}>
                <div className="icon-font"><i className="iconfont icon-duanxin"></i>评论{this.state.detail.public_comment_count}</div>
                <div className="icon-font"><i className="iconfont icon-zan"></i>赞{this.state.detail.likes_count}</div>
                <Popover className="icon-font" content={this.state.content}>
                  <Icon type="ellipsis" />
                </Popover>
              </div>
              <div className="det-footer-btn" style={{ display: (this.state.flag ? 'none' : '') }}>
                <button disabled={this.state.flag} type="button">发布</button>
                <button type="button" onClick={() => this.cancel()}>取消</button>
              </div>
            </div>
          </div>
          <div className="occupied" style={{ height: (this.state.flag ? 57 : 76) }}></div>
        </footer>
        <BackTop>
          <div className="ant-top-head"><i className="iconfont icon-xiaosanjiao"></i></div>
        </BackTop>
      </div>
    );
  }
}

export default Index;
