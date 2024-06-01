/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import UserNavigator from './components/UserNavigator';
import Calendar from './components/Calendar';

import { MainContentWrapper } from './styled';
import { DiaryInfo, UserDetailInfo } from '../../types';

import { UserInfoArray, UserInfoLongArray } from '../../mocks/user';
import { UserAccount, UserAccountLong } from '../../mocks/user';
import { DiaryInfoArray } from '../../mocks/diary';

const MainPage = () => {
  const [friendArray, setFriendArray] = useState<UserDetailInfo[]>([]);
  const [user, setUser] = useState<UserDetailInfo>({ id: -1, name: '', description: '', imageUrl: '' });
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('MM/DD/YY'));
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
  const [diaryArray, setDiaryArray] = useState<DiaryInfo[]>([]);

  const handleChangeUserClick = (userId: number) => {
    // TODO: 사용자 버튼 클릭되었을 떄, 친구 일기로 이동되도록.
    if (user.id === userId) return;

    const filtered = friendArray.filter((item) => item.id === userId);
    if (filtered.length !== 0) {
      setUser(filtered[0]);
      setSelectedDate(dayjs().format('MM/DD/YY'));
    }
  };

  useEffect(() => {
    setFriendArray(UserInfoLongArray);
    setDiaryArray(DiaryInfoArray);
    setUser(UserAccount);
  }, []);

  useEffect(() => {
    if (dayjs(selectedDate).month() === selectedMonth) return;
    setSelectedMonth(dayjs(selectedDate).month());
  }, [selectedDate]);

  useEffect(() => {
    // TODO: api 호출.
    setDiaryArray(DiaryInfoArray);
  }, [user, selectedMonth]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <UserNavigator currUser={user} userArray={friendArray} handleUserClick={handleChangeUserClick} size="md" />
      <MainContentWrapper>
        <Calendar
          selectedDate={selectedDate}
          handleSelectedDate={setSelectedDate}
          user={user}
          diaryArray={diaryArray}
        />
        <div style={{ border: '1px solid red' }}>content2</div>
      </MainContentWrapper>
    </div>
  );
};

export default MainPage;
