import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetailInfo } from '../types';

interface InitialState {
  value: UserDetailInfo[];
}

const initialState: InitialState = {
  value: [],
};

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    setFollowingList: (state, action: PayloadAction<UserDetailInfo[]>) => {
      state.value = action.payload;
    },
    resetFollowingList: (state) => {
      state.value = [];
    },
  },
});

export const { setFollowingList, resetFollowingList } = followingSlice.actions;
export default followingSlice.reducer;
