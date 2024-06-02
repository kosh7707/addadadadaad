/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFollowedList } from '../../store/followed.slice';
import { setFollowingList } from '../../store/following.slice';
import { logIn } from '../../store/auth.slice';
import { setDiaryList } from '../../store/diaryList.slice';

import UserNavigator from './components/UserNavigator';
import Calendar from './components/Calendar';
import DiaryContent from './components/DiaryContent';

import { MainContentWrapper } from './styled';
import { DiaryInfo, UserDetailInfo } from '../../types';

import { UserInfoArray, UserInfoLongArray } from '../../mocks/user';
import { UserAccount } from '../../mocks/user';
import { DiaryInfoArray } from '../../mocks/diary';

const MainPage = () => {
  const [user, setUser] = useState<UserDetailInfo>({ id: -1, name: '', description: '', imageUrl: '' });

  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('MM/DD/YY'));
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());

  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo>({ id: 0, date: '', title: '', emoji: '', content: '' });

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;
  const following = useAppSelector((state) => state.following).value;
  const diaryList = useAppSelector((state) => state.diaryList).value;

  const handleChangeUserClick = (userId: number) => {
    if (user.id === userId) return;

    if (auth.id === userId) {
      setUser(auth);
      return;
    }

    const filtered = following.filter((item) => item.id === userId);
    setUser(filtered[0] ? filtered[0] : { id: -1, name: '', description: '', imageUrl: '' });
    setSelectedDate(dayjs().format('MM/DD/YY'));
  };

  useEffect(() => {
    // TODO: api
    if (auth.name === '') {
      dispatch(setFollowedList(UserInfoArray));
      dispatch(setFollowingList(UserInfoLongArray));
      dispatch(logIn(UserAccount));
      dispatch(setDiaryList(DiaryInfoArray));
    }

    setUser(UserAccount);
  }, []);

  useEffect(() => {
    if (dayjs(selectedDate).month() === selectedMonth) return;
    setSelectedMonth(dayjs(selectedDate).month());
  }, [selectedDate]);

  useEffect(() => {
    const filtered = diaryList.filter((item) => item.date === selectedDate);
    if (filtered.length !== 0) setDiaryInfo(filtered[0]);
    else setDiaryInfo({ id: -1, date: selectedDate, title: '', emoji: '', content: '' });
  }, [selectedDate, diaryList]);

  useEffect(() => {
    // TODO: 해당 달의 diary list api 호출. & diaryList 재설정.
  }, [user, selectedMonth]);

  return (
    <div style={{ width: '100%' }}>
      <UserNavigator currUser={user} userArray={following} handleUserClick={handleChangeUserClick} size="md" />
      <MainContentWrapper>
        <Calendar selectedDate={selectedDate} handleSelectedDate={setSelectedDate} user={user} diaryArray={diaryList} />
        <DiaryContent
          id={diaryInfo.id}
          date={diaryInfo.date}
          title={diaryInfo.title}
          emoji={diaryInfo.emoji}
          content={diaryInfo.content}
        />
      </MainContentWrapper>
    </div>
  );
};

export default MainPage;
