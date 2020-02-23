import React from 'react'
import '../assets/css/index.css'
import { BackTop } from 'antd';
import Swiper from 'swiper'
import api from '../api/api'
import { Skeleton, Popover } from 'antd';
import NavBar from '../components/page/navbar'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [],
      loading: true,
      flag:true,
      moreList:[]
    }
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.$axios({
      url: api.now
    }).then(res => {
      console.log(res)
      this.setState({
        list: res.data
      })
      this.setState({
        moreList: res.data.splice(0,8)
      })
    }).catch(err => {
      console.log(err)
    })
    if (this.state.list.length != 0) {
      this.setState({
        loading: false
      })
    }
  }
  evenMore() {
    this.$axios({
      url: api.now
    }).then(res => {
      let arr = res.data.splice(0, 8)
      this.setState({
        list: [...this.state.list, ...arr]
      })
    }).catch(err => {
      console.log(err)
    })
  }
  moreFun(){
    this.setState({
      moreList:this.state.list
    })
    this.setState({
      flag:false
    })
  }
  render() {
    let list = this.state.list.map(item => {
      return <li key={item.object.data.id} onClick={() => this.props.history.push({ pathname: '/detail/' + item.object.data.slug })}>
        <div className="content">
          <a href="" className="title">{item.object.data.title}</a>
          <p className="content-font">
            {item.object.data.public_abbr}
          </p>
          <div className="meta">
            <span className="js-red"><i className="iconfont icon-zuanshi"></i>{item.object.data.total_rewards_count}</span>
            <a href="" className="nickname">{item.object.data.user.nickname}</a>
            <span><i className="iconfont icon-duanxin"></i>{item.object.data.public_comments_count}</span>
            <span><i className="iconfont icon-shi-aixin"></i>{item.object.data.likes_count}</span>
          </div>
          <a href="" className="wrap-img">
            <img src={item.object.data.user.avatar} alt="" />
          </a>
        </div>
      </li>
    })
    return (
      <div>
        <nav>
          <NavBar blog={this.props.location.pathname}></NavBar>
        </nav>
        <div className="container main clearfix">
          <div className="main-left fl">
            <div className="swiper-container banner-box">
              <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={require('../assets/img/banner.png')} alt="" /></div>
                <div className="swiper-slide"><img src={require('../assets/img/banner1.png')} alt="" /></div>
              </div>
              <div className="swiper-pagination circle"></div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            <ul className="js-article">
              {
                this.state.list.length == 0 ? <Skeleton loading={this.state.loading}></Skeleton> : list
              }
            </ul>
            <div className="load-more" onClick={this.evenMore.bind(this)}>阅读更多</div>
          </div>
          <div className="main-right fl">
            <ul className="board">
              <li><img src={require('../assets/img/banner-s1.png')} alt="" className="imgcircle" /></li>
              <li><img src={require('../assets/img/banner-s2.png')} alt="" className="imgcircle" /></li>
              <li><img src={require('../assets/img/banner-s3.png')} alt="" className="imgcircle" /></li>
              <li><img src={require('../assets/img/banner-s4.png')} alt="" className="imgcircle" /></li>
              <Popover placement="top" content={<img className="imgbox" src={require('../assets/img/download.png')} alt="" />}>
                <li className="last-li">
                  <img src={require('../assets/img/download.png')} alt="" className="img" />
                  <div>
                    <p>下载简书手机App    ></p>
                    <span>随时随地发现创作内容</span>
                  </div>
                </li>
              </Popover>
            </ul>
            <div className="recommend-auther">
              <div className="title">
                <span>推荐作者</span> 
                <a className="page-change">
                  <i className="iconfont icon-huanyipi"></i>
                换一批</a></div>
              <ul className="auther-list">
                {
                  this.state.moreList.map(item=>{
                    return <li key={item.object.data.user.id}>
                    <img src={item.object.data.user.avatar} alt=""/>
                    <div className="auther-title">
                      <div className="auther-title-top"><span>{item.object.data.user.nickname}</span><div><i className="iconfont icon-jia"></i>关注</div></div>
                      <p>写了431.2k字 · 2.3k喜欢</p>
                    </div>
                  </li>
                  })
                }
              </ul>
              <div style={{display:(this.state.flag?'':'none')}} onClick={this.moreFun.bind(this)} className="find-more">查看更多  ></div>
            </div>
          </div>
        </div>
        <footer className="container">
          <div className=" js-footer">
            <a target="_blank" href="">关于简书</a><em> · </em><a target="_blank" href="">联系我们</a><em> · </em><a target="_blank" href="">加入我们</a><em> · </em><a target="_blank" href="">简书出版</a><em> · </em><a target="_blank" href="">品牌与徽标</a><em> · </em><a target="_blank" href="">帮助中心</a><em> · </em><a target="_blank" href="">合作伙伴</a>      <div className="icp">
              ©2012-2019 上海佰集信息科技有限公司 / 简书 / 沪ICP备11018329号-5 /
              <a target="_blank" href="">
                <img src="https://cdn2.jianshu.io/assets/web/smrz-557fa318122c99a66523209bf9753a27.png" alt="Smrz" />
              </a>        <a target="_blank" href="">沪公网安备31010402002252号 / </a>
              <a target="_blank" href="">
                <img src="https://cdn2.jianshu.io/assets/web/wxb-a216456895eb66c17497dbd3da443cf8.png" alt="Wxb" />
              </a>        简书网举报电话：021-34770013 /
              <a target="_blank" href="">
                <img src="https://cdn2.jianshu.io/assets/web/fanzha-10518f0f6b33635180b190975ae68ca6.jpg" alt="Fanzha" />
              </a>        亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听
              <a target="_blank" href="">
                <img src="https://cdn2.jianshu.io/assets/web/zggsrz-5695587dccf490ca3e651f4228f7479e.png" alt="Zggsrz" />
              </a>
            </div>
          </div>
        </footer>
        <BackTop>
          <div className="ant-back-top-inner"><i className="iconfont icon-shangjiantou"></i></div>
        </BackTop>
      </div>
    );
  }
}

export default Index;
