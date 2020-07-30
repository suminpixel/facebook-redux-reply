import * as ActionTypes from '../rootActionTypes';

export function getPosts() {
  return {
    type: ActionTypes.GET_POSTS,
  };
}

export function likePost(postId) {
  return {
    type: ActionTypes.LIKE_POST,
    postId,
  };
}
