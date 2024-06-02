import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetailInfo } from '../types';

interface InitialState {
  value: UserDetailInfo[];
}

const initialState: InitialState = {
  value: [],
};

export const followedSlice = createSlice({
  name: 'followed',
  initialState,
  reducers: {
    setFollowedList: (state, action: PayloadAction<UserDetailInfo[]>) => {
      state.value = action.payload;
    },
    resetFollowedList: (state) => {
      state.value = [];
    },
  },
});

export const { setFollowedList, resetFollowedList } = followedSlice.actions;
export default followedSlice.reducer;
