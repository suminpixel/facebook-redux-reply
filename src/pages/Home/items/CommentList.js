import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import * as selectors from '../../../data/rootSelectors';
import ReplyForm from './ReplyForm';

const CommentList = ({ postSeq }) => {

  const comments = useSelector(selectors.comments.getCommentsByPost(postSeq));

  return (
    <ul>
      {comments.map((comment, i) => (
        <React.Fragment key={`comment-${i}`}>
          <Comment key={comment.seq} postSeq={postSeq} comment={comment} />
          <ReplyForm postSeq={postSeq} commentSeq={comment.seq} />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default CommentList;
