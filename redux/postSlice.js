import {createSlice} from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    postData: [],
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const {setPostData} = postSlice.actions;

export const postSelector = state => state.posts.postData;

export default postSlice.reducer;
