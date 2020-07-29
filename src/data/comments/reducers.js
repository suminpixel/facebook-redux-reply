import * as ActionTypes from '../rootActionTypes';

const INITIAL_STATE = {
  0: [
    {
      seq: 0,
      writer: {
        id: 'hong',
        name: '홍길동',
        profileImageUrl:
          'https://scontent-ssn1-1.xx.fbcdn.net/v/t31.0-8/20935107_126183028009063_1467195264240257468_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=H4pYEKc4mcYAX8I8T0q&_nc_oc=AQnA8IRwbfM5ixLlptPQ3O2sRHOukyqGwwTTEp3tTNCIArYyD0fbTk3dVjeAFBXSj8U&_nc_ht=scontent-ssn1-1.xx&oh=24630e746265220f870543bbc778638a&oe=5F452348',
      },
      contents: `React, Mobx, Redux 를 사용해 Facebook 댓글 구현하기 (Facebook 웹사이트 참고)`,
      createAt: '2020-07-29',
      likes: 1,
      likesOfMe: true,
      replies: [
        {
          seq: 0,
          postSeq: 0,
          commentSeq: 0,
          writer: {
            id: 'hong',
            name: '홍길동',
            profileImageUrl:
              'https://scontent-ssn1-1.xx.fbcdn.net/v/t31.0-8/20935107_126183028009063_1467195264240257468_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=H4pYEKc4mcYAX8I8T0q&_nc_oc=AQnA8IRwbfM5ixLlptPQ3O2sRHOukyqGwwTTEp3tTNCIArYyD0fbTk3dVjeAFBXSj8U&_nc_ht=scontent-ssn1-1.xx&oh=24630e746265220f870543bbc778638a&oe=5F452348',
          },
          contents:
            'React, Mobx, Redux와 같은 Framework, Library를 사용하는 이유와 설계 의의를 이해하고 그에 맞게 코드를 작성할 수 있는가',
          createAt: '2020-07-30',
          likes: 3,
          likesOfMe: true,
        },
      ],
    },
  ],
};
export default function comments(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
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
