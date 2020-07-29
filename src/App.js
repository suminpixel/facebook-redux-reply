import React, { Component } from 'react';
import Home from './pages/Home';
import { Switch } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { ConnectedRouter } from 'connected-react-router';
import './assets/style/app.css';

class App extends Component {
  render() {
    
    const { history } = this.props;

    return (
   
      <ConnectedRouter history={history}>   
      {/* ConnectedRouter : 리덕스 스토어의 히스토리 데이터를 props로 하위 컴포넌트에 전달해주는 역할 */}
        <Switch>
           {/* compo인자로 전달된 컴포를 router로 감싸서 랜더링 해주는 common layout용도의 컴포 제작 */}
          <DefaultLayout path="/" component={Home} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
