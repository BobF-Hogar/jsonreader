import {call, put, takeEvery} from 'redux-saga/effects';
import {setPostData} from './postSlice';
import getPosts from '../api/posts';

export const actions = {
  fetchPosts: 'FETCH_POSTS_REQUESTED',
};

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchPosts(action) {
  try {
    const postData = yield call(getPosts, action.payload.url);
    // put({type: 'POST_FETCH_SUCCEEDED', postData});
    yield put(setPostData(postData));
  } catch (e) {
    //yield put({type: 'POST_FETCH_FAILED', message: e.message});
    console.error(e.message);
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* postSaga() {
  yield takeEvery(actions.fetchPosts, fetchPosts);
}
