import React from 'react';
import moment from 'moment';
import ReplyForm from './ReplyForm';
import * as actions from '../../../data/rootActions';
import * as selectors from '../../../data/rootSelectors';
import { useDispatch , useSelector} from 'react-redux';
import styled from 'styled-components';

const Reply = ({ reply , postSeq}) => {

  const { createAt, writer, contents, seq , commentSeq} = reply;
  const dispatch = useDispatch();
  const user = useSelector(selectors.users.getUser);
  const datetime = moment(createAt).fromNow();

  //삭제
  const deleteHandler = (e) => {
    e.preventDefault();
    //console.log(g(`${postSeq} / ${commentSeq} / ${seq}`)
    dispatch(actions.comments.deleteReply(postSeq, commentSeq, seq));
  };

  return (
    <LiWrapper >
     <Wrapper>
        <p>{writer.name}</p>
        <p>{contents}</p>
      </Wrapper>
      <FunctionWrapper>
        {user.id == writer.id && (
          <button type="button" onClick={deleteHandler} >
            삭제
          </button>
        )}
        <span>{datetime}</span>
      </FunctionWrapper>
    </LiWrapper>
  );
};

const LiWrapper = styled.li`
  margin-top: 10px;
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

export default Reply;
