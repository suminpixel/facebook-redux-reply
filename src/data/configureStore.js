import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './rootReducer';
import thunk from 'redux-thunk';

const history = createBrowserHistory(); 
//connected-react-router
//리덕스에서 주소를 변경 및 확인하기 위해 history객체를 관리하는 라이브러리
//단방향 흐름을 통해 리덕스에서 router상태를 동기화 할 수 있다. (history객체 -> store-> router-> component)

const rootReducer = createRootReducer(history);


export default function configureStore() {
  
  //createStore
  //리덕스 스토어를 반환하여 Provider 컴포넌트로 상태를 전달 할 수 있도록 리덕스 스토어를 반환하는  함수
  //인자로 보통 루트 리듀서와 applyMiddleware (리덕스 미들웨어 설정) 를 받는다.
  //router middle ware 나 비동기 로직을 처리할 수 있는 react-thunk등을 사용할 수 있음
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  );

  return {
    store,
    history,
  };
}
