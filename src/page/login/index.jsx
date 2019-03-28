import React from 'react';
import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new Mutil();
const _user = new User();

import './index.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }

  componentWillMount() {
    document.title = '登录 - MALL ADMIN'
  }

  // 用户信息改变
  onInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value 
    this.setState({
      [inputName]: inputValue
    })
  }

  // 键盘按下事件
  onInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit()
    }
  }

  // 用户提交表单
  onSubmit(e) {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo)
    if(checkResult.status) {
      _user.login(loginInfo).then((res) => {
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    }else {
      _mm.errorTips(checkResult.msg);
    } 
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">账号</label>
                <input type="email"
                  name="username"
                  className="form-control"
                  placeholder="请输入用户名"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input type="password"
                  name="password"
                  className="form-control"
                  placeholder="请输入密码"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={e => this.onSubmit(e)}>登录</button>
              </div>
            </div>
          </div>
        </div>
        )
      }
    }
    
export default Login;