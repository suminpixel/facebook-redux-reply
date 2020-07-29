import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './data/configureStore';
import App from './App';

const { store, history } = configureStore();

ReactDOM.render(
  <Provider store={store}> 
    {/* 리덕스 스토어를 전달하며, 하위 리액트 컴포넌트가 공유된 스토어에 접근 할 수 있도록 하는 컴포넌트 */}
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
