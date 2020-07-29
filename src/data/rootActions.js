import { routerActions as router } from 'connected-react-router';
import * as posts from './posts/actions';
import * as comments from './comments/actions';

export { comments, posts, router };

// 많은 리덕스 데이터 관리 모듈들의 액션을 한번에 묶어 사용
// 기능외,  auth (인증 관련..) , components(modal..)