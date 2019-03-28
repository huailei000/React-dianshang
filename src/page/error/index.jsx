import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx';
import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="出错啦~" />
        <div className="row">
          <div className="col-md-12">
            <span>找不到路径，</span>
            <Link to="/">点我返回首页</Link>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Error;