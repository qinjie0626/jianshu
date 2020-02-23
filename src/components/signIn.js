import React from 'react'
import '../assets/css/sing_in.css'
import { NavLink } from 'react-router-dom'
import Router from '../router'
import Two from '../router/two'
class Index extends React.Component {
    
    render() {
        console.log(this.props.location.pathname)
        return (
            <div className="sign">
                <div className="logo">
                    <NavLink to="/index"><img src={require('../assets/img/logo.png')} alt="Logo" /></NavLink>
                </div>
                <div className="main" style={{marginTop:(this.props.location.pathname=='/sign/register'?85:115)}}>
                    <h4 className="title">
                        <div className="normal-title">
                            <NavLink activeClassName="active" to="/sign/login">登录</NavLink>
                            <b>·</b>
                            <NavLink activeClassName="active" className="" to="/sign/register">注册</NavLink>
                        </div>
                    </h4>
                    <Router routes={Two}></Router>
                </div>
            </div>
        );
    }
}

export default Index;
