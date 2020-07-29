import React, { useEffect, useMemo } from 'react';
import Post from './items/Post';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../data/rootActions';
import * as selectors from '../../data/rootSelectors';
import '../../assets/style/app.css';

//TODO: 배포전 주석 정리
const Home = () => {

  const dispatch = useDispatch();

  const postsState = useSelector(selectors.posts.getPosts);

  //post data 로드
  useEffect(() => {
    dispatch(actions.posts.getPosts());
  }, []);

  //useMemo : redering 중에 실행 . 디펜던시에 넣은 값이 변화가 없는 경우, 이전에 실행했던 연산의 결과 기억했다 반환
  //(리덕스 스토어) post 리스트 로드
  const posts = useMemo(() => 
    postsState.ids.map((id) => postsState.entities[id]
  ),[ postsState.entities, postsState.ids]);

  const postList = useMemo(() => 
    posts.map((post) => <Post key={post.seq} post={post} />
  ), [posts]);
  
  return (
    <div className="container">
      {postList}
    </div>
  );
};

export default Home;
