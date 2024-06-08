/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFollowedList } from '../../store/followed.slice';
import { setFollowingList } from '../../store/following.slice';
import { setDiaryList } from '../../store/diaryList.slice';

import UserNavigator from './components/UserNavigator';
import Calendar from './components/Calendar';
import DiaryContent from './components/DiaryContent';

import { MainContentWrapper } from './styled';
import { DiaryInfo, UserDetailInfo } from '../../types';

import { UserInfoArray, UserInfoLongArray } from '../../mocks/user';
import { DiaryInfoArray } from '../../mocks/diary';
import { getDiary } from '../../api/diary';
import { getFollowedList, getFollowingList } from '../../api/follow';

const MainPage = () => {
  const [user, setUser] = useState<UserDetailInfo>({ id: -1, name: '', description: '', imageUrl: '' });

  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('MM/DD/YY'));
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());

  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo>({ diary_id: 0, date: '', title: '', emoji: '', content: '' });

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
    if (auth.isAuth) {
      getDiary({ userId: auth.name, year: dayjs(selectedDate).year(), month: dayjs(selectedDate).month() + 1 }).then(
        (res: any) => {
          console.log('getDiary:53 ', res);
          if (res.status === 200) {
            dispatch(setDiaryList(res.data.value));
          }
        },
      );
      getFollowingList({ userId: auth.name }).then((res: any) => {
        console.log('getFollowingList:64 ', res);
        if (res.status === 200) {
          const tmp = res.data.value.forEach((item: { user_id: string; description: string }) => {
            return { id: 1, imageUrl: 'images/user.png', name: item.user_id, description: item.description };
          });
          dispatch(setFollowingList(tmp));
        }
      });
      getFollowedList({ userId: auth.name }).then((res: any) => {
        console.log('getFollowedList:79 ', res);
        if (res.status === 200) {
          const tmp = res.data.value.forEach((item: { user_id: string; description: string }) => {
            return { id: 1, imageUrl: 'images/user.png', name: item.user_id, description: item.description };
          });
          dispatch(setFollowedList(tmp));
        }
      });
      setUser(auth);
    }
  }, []);

  useEffect(() => {
    if (dayjs(selectedDate).month() === selectedMonth) return;
    setSelectedMonth(dayjs(selectedDate).month());
  }, [selectedDate]);

  useEffect(() => {
    const filtered = diaryList.filter((item) => item.date === selectedDate);
    if (filtered.length !== 0) setDiaryInfo(filtered[0]);
    else setDiaryInfo({ diary_id: -1, date: selectedDate, title: '', emoji: '', content: '' });
  }, [selectedDate, diaryList]);

  useEffect(() => {
    getDiary({ userId: user.name, year: dayjs(selectedDate).year(), month: dayjs(selectedDate).month() + 1 }).then(
      (res: any) => {
        console.log('getDiary:86 ', res);
        if (res.status === 200) {
          dispatch(setDiaryList(res.data.value));
        }
      },
    );
  }, [user, selectedMonth]);

  return (
    <div style={{ width: '100%' }}>
      <UserNavigator currUser={user} userArray={following} handleUserClick={handleChangeUserClick} size="md" />
      <MainContentWrapper>
        <Calendar selectedDate={selectedDate} handleSelectedDate={setSelectedDate} user={user} diaryArray={diaryList} />
        <DiaryContent
          diary_id={diaryInfo.diary_id}
          user={user.name}
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
