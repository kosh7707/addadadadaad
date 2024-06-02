import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetailInfo } from '../types';

interface AuthSliceState extends UserDetailInfo {
  isAuth: boolean; // 로그인되어 있는지.
}

interface InitialState {
  value: AuthSliceState;
}

const initialState: InitialState = {
  value: {
    id: 0,
    isAuth: false,
    name: '',
    description: '',
    imageUrl: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<UserDetailInfo>) => ({
      value: {
        id: action.payload.id,
        isAuth: true,
        name: action.payload.name,
        description: action.payload.description,
        imageUrl: action.payload.imageUrl,
      },
    }),
  },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
