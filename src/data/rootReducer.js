import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import user from './users/reducers';
import posts from './posts/reducers';
import comments from './comments/reducers';

const createRootReducer = (history) =>
  combineReducers({
    comments,
    posts,
    router: connectRouter(history),
    user,
  });

//combineReducers 
//리듀서(함수)들을 인자로 받아 key-value 로 이루어진 일종의 객체로 바인딩하는 역할을 하는 헬퍼 함수
//리듀서 함수 ? : 현재 상태와 상태를 가공하는 액션을 받아 새로운 상태를 리턴하는 함수
export { createRootReducer };
