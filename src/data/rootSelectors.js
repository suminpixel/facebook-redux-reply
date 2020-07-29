import * as posts from './posts/selectors';
import * as comments from './comments/selectors';
import * as users from './users/selectors';

//rootSelector : selector을 용도나 섹션별로 분배
//셀렉터를 분리한 이유 : 리덕스 스토어의 state를 타입이나 용도 별로 목적에 받게 받아오게끔 하고싶어서
export { comments, posts, users };
