export const getComments = (state) => state.comments;

export const getCommentsByPost = (postSeq) => (state) => state.comments[postSeq] || [];

export const getCommentsCount = (postId) => (state) => {
  const comments = state.comments[postId];
  const count = comments ? comments.reduce((r, c) => r + c.replies.length, comments.length)  : 0;
  return count;
};

export const getRepliesByPost = (commentSeq) => (state) => state.replies[commentSeq] || [];