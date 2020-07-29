import React from 'react';
import moment from 'moment';
import Reply from './Reply';
import * as actions from '../../../data/rootActions';
import * as selectors from '../../../data/rootSelectors';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Comment = ({ comment, postSeq }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.users.getUser);
  const { createAt, writer, contents, replies, seq: commentSeq, likesOfMe, likes } = comment;

  const datetime = moment(createAt).fromNow();

  //좋아요
  const likeHandler = (e) => {
    e.preventDefault();
    //console.log(postSeq);
    dispatch(actions.comments.likeComment(postSeq, commentSeq));
  };

  //삭제
  const deleteHandler = (e) => {
    e.preventDefault();
    //console.log(postSeq);
    dispatch(actions.comments.deleteComment(postSeq, commentSeq));
  };

  return (
    <LiWrapper >
      <Wrapper>
        <p>{writer.name}</p>
        <p>{contents}</p>
      </Wrapper>
      <FunctionWrapper>
        
        <button type="button" onClick={likeHandler} style={{color: likesOfMe ? '#0057e7' : 'black'}}>
          좋아요 {likes} 개
        </button>
        <span>
          댓글 {replies.length} 개
        </span>
        {user.id == writer.id && (
          <button type="button" onClick={deleteHandler} >
            삭제
          </button>
        )}
        <span>{datetime}</span>
      </FunctionWrapper>

      <UlWrapper>
        {replies !== undefined && replies.map((reply) => <Reply key={reply.seq} reply={reply} postSeq={postSeq} />)}
      </UlWrapper>
    </LiWrapper>
  );
};

const LiWrapper = styled.li`
  margin-top: 20px;
`

const UlWrapper = styled.ul`
  padding-left: 24px;
`
const Wrapper = styled.div`
    p{
      &:first-child{
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
    width: 100%;
    background-color: #eeeeee;
    padding: 10px;
    border-radius: 15px;
    border: 0;
  
`;
//    color: #0057e7;
const FunctionWrapper = styled.div`
  font-size: 13px;
  font-weight: bold;
  button{
    background-color: transparent;
    border: 0;
    font-weight: bold;
    &:last-child{
      float: right;
    }
  }
  margin-bottom: 12px;
  span{
    font-size: 13px;
    color: gray;
    margin-left: 6px;
    &:last-child{
      font-weight: normal;
    }
  }
` 
export default Comment;
