import * as ActionTypes from '../rootActionTypes';
import * as apis from '../../services/comments';

export const getComments = (user) => (dispatch) => {
  apis
    .getCommentsApi(user)
    .then((comments) =>
      dispatch({
        type: ActionTypes.GET_COMMENT_LIST,
        comments: comments,
      })
    )
    .catch((e) => console.log(e));
}

export const likeComment = (postId, commentId) => (dispatch) => {
  apis
    .likeCommentApi(postId, commentId)
    .then(() =>
      dispatch({
        type: ActionTypes.LIKE_COMMENT,
        postId,
        commentId,
      })
    )
    .catch((e) => console.log(e));
}

export const deleteComment = (postId, commentId)  => (dispatch) => {
  apis
    .deleteCommentApi(postId, commentId)
    .then(() =>
      dispatch({
        type: ActionTypes.DELETE_COMMENT,
        postId,
        commentId,
      })
    )
    .catch((e) => console.log(e));
}

export const deleteReply = (postId, commentId, replyId) => (dispatch) => {
  apis
    .deleteReplyApi(postId, commentId, replyId)
    .then(() =>
      dispatch({
        type: ActionTypes.DELETE_REPLY,
        postId,
        commentId,
        replyId,
      })
    )
    .catch((e) => console.log(e));
}



export const writeComment = (postId, contents, writer) => (dispatch) => {
  apis
    .writeCommentApi(postId, contents, writer)
    .then(() =>
      dispatch({
        type: ActionTypes.ADD_COMMENT,
        contents,
        writer,
        postId,
      })
    )
    .catch((e) => console.log(e));
}

export const writeReply = (postId, commentId, contents, writer) => (dispatch) => {
  apis
    .writeReplyApi(postId, commentId, contents, writer)
    .then(() =>
      dispatch({
        type: ActionTypes.ADD_REPLY,
        commentId,
        writer,
        contents,
        postId,
      })
    )
    .catch((e) => console.log(e));
}
