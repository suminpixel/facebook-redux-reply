import React, { useEffect, useMemo } from 'react';
import Post from './items/Post';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../data/rootActions';
import * as selectors from '../../data/rootSelectors';
import '../../assets/style/app.css';

const Home = () => {

  const dispatch = useDispatch();
  const postsState = useSelector(selectors.posts.getPosts);
  const user = useSelector(selectors.users.getUser);

  //post data 로드
  useEffect(() => {
    dispatch(actions.posts.getPosts());
    dispatch(actions.comments.getComments(user));
  }, []);

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
