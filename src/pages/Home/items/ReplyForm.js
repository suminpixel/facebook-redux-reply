import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../data/rootActions';
import * as selectors from '../../../data/rootSelectors';
import styled from 'styled-components';

const ReplyForm = (props) => {
  const dispatch = useDispatch();

  //post id, comment id
  const { postSeq, commentSeq } = props;

  //작성 댓글 state
  const [contents, setContents] = useState('');

  //my profile data 로드
  const user = useSelector(selectors.users.getUser);

  const writeReply = useCallback(
    (postSeq, commentSeq, contents) => {
      //댓글 작성
      dispatch(actions.comments.writeReply(postSeq, commentSeq, contents, user));
    },
    [user]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (contents == '') return;
    writeReply(postSeq, commentSeq, contents);
    setContents('');
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
      <input
        placeholder={'댓글 달기'}
        spellCheck="false"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 24px;
  input {
    width: 100%;
    padding: 10px;
    background-color: #eeeeee;
    border-radius: 15px;
    border: 0;
  }
`;

export default ReplyForm;
