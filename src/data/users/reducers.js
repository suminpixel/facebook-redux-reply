import * as ActionTypes from '../rootActionTypes';

const initialState = {
  id: 'sumin',
  name: '이수민',
  profileImageUrl: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t31.0-8/20935107_126183028009063_1467195264240257468_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=H4pYEKc4mcYAX8I8T0q&_nc_oc=AQnA8IRwbfM5ixLlptPQ3O2sRHOukyqGwwTTEp3tTNCIArYyD0fbTk3dVjeAFBXSj8U&_nc_ht=scontent-ssn1-1.xx&oh=24630e746265220f870543bbc778638a&oe=5F452348',
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
