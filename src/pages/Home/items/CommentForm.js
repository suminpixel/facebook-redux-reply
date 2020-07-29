import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../data/rootActions';
import * as selectors from '../../../data/rootSelectors';
import styled from 'styled-components';

const CommentForm = (props) => {
  const dispatch = useDispatch();

  //post id
  const { postSeq, commentSeq } = props;

  //작성 댓글 state
  const [contents, setContents] = useState('');

  //my profile data 로드
  const user = useSelector(selectors.users.getUser);

  const writeComment = useCallback(
    (postId, contents) => {
      //댓글 작성
      dispatch(actions.comments.writeComment(postId, contents, user));
    },
    [user]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (contents == '') return;
    writeComment(postSeq, contents);
    setContents('');
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <input
          placeholder={'댓글을 입력하세요...'}
          spellCheck="false"
          //ref={textareaEl}
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  input {
    width: 100%;
    background-color: #eeeeee;
    padding: 10px;
    border-radius: 15px;
    border: 0;
  }
`;

export default CommentForm;
