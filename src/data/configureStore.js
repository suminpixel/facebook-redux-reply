import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './rootReducer';
import thunk from 'redux-thunk';

const history = createBrowserHistory(); 
const rootReducer = createRootReducer(history);

export default function configureStore() {
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
