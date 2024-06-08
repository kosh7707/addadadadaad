/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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
    // TODO: api
    console.log(document.cookie);
    if (auth.isAuth) {
      getDiary({ userId: auth.name, year: dayjs(selectedDate).year(), month: dayjs(selectedDate).month() + 1 }).then(
        (res: any) => {
          if (res.status === 200) {
            dispatch(setDiaryList(res.data.value));
          } else if (res.status === 400) {
            alert('다이어리 조회에 실패했습니다.');
          } else if (res.status === 403) {
          } else {
            alert('관리자에게 문의해주세요.');
          }
        },
      );
      // dispatch(setFollowedList(UserInfoArray));
      // dispatch(setFollowingList(UserInfoLongArray));
      // dispatch(setDiaryList(DiaryInfoArray));

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
        if (res.status === 200) {
          dispatch(setDiaryList(res.data.value));
        } else if (res.status === 400) {
          alert('다이어리 조회에 실패했습니다.');
        } else if (res.status === 403) {
        } else {
          alert('관리자에게 문의해주세요.');
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
