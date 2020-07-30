/**
 * 데이터 불러오기
 */
export async function getCommentsApi(user) {
  //기존데이터 더미데이터 사용
  if (localStorage.getItem('comments') == null || localStorage.getItem('comments') == undefined) {
    localStorage.setItem('comments', JSON.stringify(TEMP_COMMENT_DATA));
  }
  const results = localStorage.getItem('comments');
  return JSON.parse(results);
}

/**
 * 댓글 작성
 */
export async function writeCommentApi(postId, contents, user) {
  const fullData = JSON.parse(localStorage.getItem('comments'));
  const previewComments = fullData[postId] ? fullData[postId] : [];
  const addcomments = [
    ...previewComments,
    {
      seq: previewComments.length,
      contents: contents,
      likes: 0,
      likesOfMe: false,
      writer: user,
      replies: [],
      createAt: Date.now(),
    },
  ];
  const results = {
    ...fullData,
    [postId]: addcomments,
  };
  return localStorage.setItem('comments', JSON.stringify(results));
}

/**
 * 댓글 삭제
 */
export async function deleteCommentApi(postId, commentId) {
  const fullData = JSON.parse(localStorage.getItem('comments'));
  const comments = fullData[postId].filter((f) => f.seq !== commentId);
  const results = {
    ...fullData,
    [postId]: comments,
  };
  return localStorage.setItem('comments', JSON.stringify(results));
}

/**
 * 댓글 좋아요/취소
 */
export async function likeCommentApi(postId, commentId) {
  const fullData = JSON.parse(localStorage.getItem('comments'));
  const newLikedComment = fullData[postId].find((f) => f.seq == commentId);
  if (newLikedComment.likesOfMe === false) {
    newLikedComment.likes += 1;
    newLikedComment.likesOfMe = true;
  } else {
    newLikedComment.likes -= 1;
    newLikedComment.likesOfMe = false;
  }
  const comments = fullData[postId].map((comment, i) => {
    if (comment.seq == commentId) {
      return newLikedComment;
    } else {
      return comment;
    }
  });
  const results = {
    ...fullData,
    [postId]: comments,
  };
  return localStorage.setItem('comments', JSON.stringify(results));
}

/**
 * 대댓글 작성
 */
export async function writeReplyApi(postId, commentId, contents, user) {
  const fullData = JSON.parse(localStorage.getItem('comments'));
  const previewComments = fullData[postId] ? fullData[postId] : [];
  const comments = previewComments.map((comment, i) => {
    if (comment.seq == commentId) {
      return {
        ...comment,
        replies: [
          ...comment.replies,
          {
            postSeq: postId,
            commentSeq: comment.seq,
            seq: comment.replies.length,
            contents: contents,
            likes: 0,
            likesOfMe: false,
            writer: user,
            replies: [],
            createAt: Date.now(),
          },
        ],
      };
    } else {
      return comment;
    }
  });

  const results = {
    ...fullData,
    [postId]: comments,
  };
  return localStorage.setItem('comments', JSON.stringify(results));
}

/**
 * 대댓글 삭제
 */
export async function deleteReplyApi(postId, commentId, replyId) {
  const fullData = JSON.parse(localStorage.getItem('comments'));
  const comments = fullData[postId].map((comment, i) => {
    if (comment.seq == commentId) {
      comment.replies = comment.replies.filter((f) => f.seq !== replyId);
      return comment;
    } else {
      return comment;
    }
  });

  const results = {
    ...fullData,
    [postId]: comments,
  };
  return localStorage.setItem('comments', JSON.stringify(results));
}

const TEMP_COMMENT_DATA = {
  0: [
    {
      seq: 0,
      writer: {
        id: 'hong',
        name: '홍길동',
        profileImageUrl:
          'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2556DA38594B51FE36',
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
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2556DA38594B51FE36',
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
