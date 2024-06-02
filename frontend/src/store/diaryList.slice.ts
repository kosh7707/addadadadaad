import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiaryInfo } from '../types';

interface InitialState {
  value: DiaryInfo[];
}

const initialState: InitialState = {
  value: [],
};

export const diaryListSlice = createSlice({
  name: 'diaryList',
  initialState,
  reducers: {
    setDiaryList: (state, action: PayloadAction<DiaryInfo[]>) => {
      state.value = action.payload;
    },
    modifyDiary: (state, action: PayloadAction<DiaryInfo>) => {
      const result = state.value.filter((item) => item.date !== action.payload.date);
      state.value = [...result, action.payload];
      localStorage.setItem('diary', JSON.stringify(state.value));
    },
    resetDiaryList: (state) => {
      state.value = [];
    },
  },
});

export const { setDiaryList, modifyDiary, resetDiaryList } = diaryListSlice.actions;
export default diaryListSlice.reducer;
