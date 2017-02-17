import React, {Component, PropTypes} from "react";
import {Link} from 'react-router-dom';

import NavLink from './NavLink';

import './index.css';

export default class AppNav extends Component {

  constructor() {
    super(...arguments);
    this.handleToggleAppNav = this.handleToggleAppNav.bind(this);
  }

  handleToggleAppNav() {
    const {toggleAppNav, appNavIsShow} = this.props;
    toggleAppNav(!appNavIsShow);
  }

  render() {
    const {props, handleToggleAppNav} = this;
    const {appNavIsShow, me, logout} = props;
    const accesstoken = me.get('accesstoken');
    const loginname = me.get('loginname');
    const avatar_url = me.get('avatar_url');

    return (
      <div>
        {appNavIsShow && <div className="page_cover" onClick={handleToggleAppNav}></div>}
        <div className={`app_nav_wrap ${appNavIsShow ? '' : 'hide'}`}>
          <div className="app_nav_me">
            {
              accesstoken ?
                (
                  <Link to={`/user/${loginname}`} onClick={handleToggleAppNav}>
                    <img src={avatar_url} className="app_nav_avatar" alt={loginname}/>
                  </Link>
                ) :
                (
                  <Link to="/login">
                    <button className="app_nav_log_btn" onClick={handleToggleAppNav}>登录</button>
                  </Link>
                )
            }
          </div>
          <nav className="app_nav">
            <NavLink to="/topics/all" name="全部" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/good" name="精华" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/share" name="分享" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/ask" name="问答" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/job" name="招聘" onClick={handleToggleAppNav}/>
            <NavLink to="/message" name="消息" onClick={handleToggleAppNav}/>
            <NavLink to="/collection" name="收藏" onClick={handleToggleAppNav}/>
          </nav>
          {
            accesstoken && <button className="app_nav_log_btn" onClick={logout}>登出</button>
          }
        </div>
      </div>
    );
  }
}

AppNav.propTypes = {
  appNavIsShow: PropTypes.bool.isRequired,
  toggleAppNav: PropTypes.func.isRequired
};