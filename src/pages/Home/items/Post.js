import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import * as actions from '../../../data/rootActions';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../../data/rootSelectors';

const Post = ({ post }) => {

  const dispatch = useDispatch();
  
  //post data state 초기화
  const {
    seq,
    createAt,
    writer: { name, profileImageUrl },
    contents,
    likes,
    likesOfMe,
  } = post;
  
  //comment 갯수 get
  //TODO: action reply 까지 셈 필요
  const commentsCount = useSelector(selectors.comments.getCommentsCount(seq));

  //작성 날짜 표기
  const datetime = moment(createAt).fromNow();

  //좋아요
  const likeHandler = (e) => {
    e.preventDefault();
    dispatch(actions.posts.likePost(seq));
  };

  return (
    <Wrapper>
      <div>
        <NameWrapper> 
          <img src={profileImageUrl} alt={name}/>
          <span> {name} </span>
          <br/>
          <span> {datetime}</span>
        </NameWrapper>
        <ContentsWrapper>
          <p>{contents}</p>
          <button type="button" 
            onClick={likeHandler} 
            style={{color: likesOfMe ? '#0057e7 ' : 'black'}}>
              좋아요 {likes} 개
          </button>
          <span>댓글 {commentsCount} 개</span>
        </ContentsWrapper>
       </div>
      <CommentList postSeq={seq} />
      <CommentForm postSeq={seq} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 22px;

`

const ContentsWrapper = styled.div`
   p{
      font-weight: bold;
      font-size: 20px;
      margin-top: 11px;
      margin-bottom: 13px;
  }
  span{
        font-size: 15px;
        color: gray;
        float: right;
  }
  button{
    background-color: transparent;
    border: 0;
    font-weight: bold;
    font-size: 15px;
    span{
      margin-left: 8px;
    }
  }
  border-bottom: 1px solid #dddddd;
  padding-bottom: 12px;
`

const NameWrapper = styled.div`
  background-color: white;
  img{
    &:first-child{
      object-fit: cover;
      width: 40px;
      height: 41px;
      border-radius: 20px;
      margin: 0;
      padding: 0;
      float: left;
      margin-right: 11px;
    }
    
  }
  span{
      font-size: 15px;
      font-weight: bold;
      &:last-child{
        font-size: 13px;
        color: gray;
        font-weight: normal;
    }
  }
`
export default Post;
