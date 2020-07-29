import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import * as selectors from '../data/rootSelectors';


function DefaultLayout(props) {

  const { component: Component, ...rest } = props;
  
  const dispatch = useDispatch();


  useEffect(()=>{
  },[])

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <>
          <Component {...matchProps} {...rest} />
        </>
      )}
    />
  );
}

export default DefaultLayout;
