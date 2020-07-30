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
        <Switch>
          <DefaultLayout path="/" component={Home} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
