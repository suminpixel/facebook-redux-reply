import * as ActionTypes from '../rootActionTypes';

export function getComments(postId, comments) {
  return {
    type: ActionTypes.GET_COMMENTS,
    comments,
    postId,
  };
}

export function likeComment(postId, commentId) {
  return {
    type: ActionTypes.LIKE_COMMENT,
    postId,
    commentId,
  };
}

export function deleteComment(postId, commentId) {
  return {
    type: ActionTypes.DELETE_COMMENT,
    postId,
    commentId,
  };
}

export function deleteReply(postId, commentId, replyId) {
  return {
    type: ActionTypes.DELETE_REPLY,
    postId,
    commentId,
    replyId
  };
}

export function getReplies(commentId, replies) {
  return {
    type: ActionTypes.GET_COMMENTS,
    replies,
    commentId,
  };
}


export function writeComment(postId, contents, writer) {
  return {
    type: ActionTypes.ADD_COMMENT,
    contents,
    writer,
    postId,
  };
}

export function writeReply(postId, commentId, contents, writer) {
  return {
    type: ActionTypes.ADD_REPLY,
    commentId,
    writer,
    contents,
    postId,
  };
}
