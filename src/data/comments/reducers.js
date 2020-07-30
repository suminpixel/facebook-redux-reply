import * as ActionTypes from '../rootActionTypes';

const INITIAL_STATE = {
  
}
export default function comments(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_COMMENT_LIST:
      return action.comments;

    case ActionTypes.GET_COMMENTS:
      return state[action.postId];

    case ActionTypes.ADD_COMMENT: {
      const previewComments = state[action.postId] ? state[action.postId] : [];
      const comments = [
        ...previewComments,
        {
          seq: previewComments.length,
          contents: action.contents,
          likes: 0,
          likesOfMe: false,
          writer: action.writer,
          replies: [],
          createAt: Date.now(),
        },
      ];

      return {
        ...state,
        [action.postId]: comments,
      };
    }
    case ActionTypes.DELETE_COMMENT: {
      const comments = state[action.postId].filter((f) => f.seq !== action.commentId);

      return {
        ...state,
        [action.postId]: comments,
      };
    }
    case ActionTypes.DELETE_REPLY: {
      //console.log(action.replyId);
      const comments = state[action.postId].map((comment, i) => {
        if (comment.seq == action.commentId) {
          comment.replies = comment.replies.filter((f) => f.seq !== action.replyId);
          return comment;
        } else {
          return comment;
        }
      });

      return {
        ...state,
        [action.postId]: comments,
      };
    }
    case ActionTypes.LIKE_COMMENT: {
      //console.log(action.postId);
      //console.log(action.commentId);
      const newLikedComment = state[action.postId].find((f) => f.seq == action.commentId);
      if (newLikedComment.likesOfMe === false) {
        newLikedComment.likes += 1;
        newLikedComment.likesOfMe = true;
      } else {
        newLikedComment.likes -= 1;
        newLikedComment.likesOfMe = false;
      }
      const comments = state[action.postId].map((comment, i) => {
        if (comment.seq == action.commentId) {
          return newLikedComment;
        } else {
          return comment;
        }
      });
      return {
        ...state,
        [action.postId]: comments,
      };
    }
    case ActionTypes.ADD_REPLY: {
      const previewComments = state[action.postId] ? state[action.postId] : [];
      const comments = previewComments.map((comment, i) => {
        if (comment.seq == action.commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                postSeq: action.postId,
                commentSeq: comment.seq,
                seq: comment.replies.length,
                contents: action.contents,
                likes: 0,
                likesOfMe: false,
                writer: action.writer,
                replies: [],
                createAt: Date.now(),
              },
            ],
          };
        } else {
          return comment;
        }
      });

      return {
        ...state,
        [action.postId]: comments,
      };
    }
    default:
      return state;
  }
}
