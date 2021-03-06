import { combineReducers } from 'redux';
import * as ActionTypes from '../rootActionTypes';

const INITIAL_STATE = {
  0: {
    seq: 0,
    writer: {
      id: 'sumin',
      name: '이수민',
      profileImageUrl:
        'https://scontent-ssn1-1.xx.fbcdn.net/v/t31.0-8/20935107_126183028009063_1467195264240257468_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=H4pYEKc4mcYAX8I8T0q&_nc_oc=AQnA8IRwbfM5ixLlptPQ3O2sRHOukyqGwwTTEp3tTNCIArYyD0fbTk3dVjeAFBXSj8U&_nc_ht=scontent-ssn1-1.xx&oh=24630e746265220f870543bbc778638a&oe=5F452348',
    },
    contents: '클로버추얼패션',
    createAt: '2020-07-28',
    likes: 3,
    comments: 0,
    likesOfMe: false,
  },
  1: {
    seq: 1,
    writer: {
      id: 'hong',
      name: '홍길동',
      profileImageUrl:
        'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2556DA38594B51FE36',
    },
    contents: `React, Mobx, Redux 를 사용해 Facebook 댓글 구현하기 (Facebook 웹사이트 참고)`,
    createAt: '2020-07-21',
    likes: 1,
    comments: 0,
    likesOfMe: false,
  },
};

const INITIAL_IDS_STATE = [0, 1];

function entities(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  
    case ActionTypes.LIKE_POST: {
      const newLikedPost = { ...state[action.postId] };
      if(newLikedPost.likesOfMe ){
        newLikedPost.likes -= 1;
        newLikedPost.likesOfMe = false;
      }else{
        newLikedPost.likes += 1;
        newLikedPost.likesOfMe = true;
      }
      return {
        ...state,
        [action.postId]: newLikedPost,
      };
    }
    default:
      return state;
  }
}

function ids(state = INITIAL_IDS_STATE, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return [...state];
    default:
      return state;
  }
}

export default combineReducers({
  entities,
  ids,
});
