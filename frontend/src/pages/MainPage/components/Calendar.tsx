import React from 'react';
import dayjs from 'dayjs';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';

import CalendarBoardContent from './CalendarBoardContent';
import UserButton from '../../../components/UserButton';

import { UserInfoText, UserContentWrapper, CalendarTitle, CalendarBoard } from '../styled';
import { DiaryInfo, UserDetailInfo } from '../../../types';
import { COLOR, FONT_SIZE } from '../../../constants';

const weekHead = ['일', '월', '화', '수', '목', '금', '토'];

export interface CalendarProps {
  selectedDate: string;
  handleSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  user: UserDetailInfo;
  diaryArray: DiaryInfo[];
}

const Calendar = ({ selectedDate, handleSelectedDate, user, diaryArray }: CalendarProps) => {
  const handleDateClick = (date: string | null) => {
    if (date === null) return;
    handleSelectedDate(date);
  };

  const handleSelfClick = (name: string) => {};

  const handlePrevMonthClick = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'month').endOf('month').format('MM/DD/YY');
    handleSelectedDate(newDate);
  };

  const handleNextMonthClick = () => {
    const newDate = dayjs(selectedDate).add(1, 'month').startOf('month').format('MM/DD/YY');
    handleSelectedDate(newDate);
  };

  return (
    <div style={{ padding: '10px' }}>
      {user && (
        <UserContentWrapper>
          <UserButton
            size="lg"
            id={user.id}
            imageUrl={user.imageUrl}
            name={user.name}
            handleButtonClick={handleSelfClick}
          />
          <div style={{ width: 'calc(100% - 90px)', display: 'flex', flexDirection: 'column' }}>
            <UserInfoText style={{ fontSize: FONT_SIZE.xl, fontWeight: 'bold' }}>
              {user.name === '' ? '로그인하지 않았습니다.' : user.name}
            </UserInfoText>
            <UserInfoText style={{ fontSize: FONT_SIZE.md, color: COLOR.gray }}>{user.description}</UserInfoText>
          </div>
        </UserContentWrapper>
      )}
      <CalendarTitle>
        <div>
          <span style={{ marginRight: '10px' }}>
            {dayjs(selectedDate).year()}년 {dayjs(selectedDate).month() + 1}월
          </span>
          <span>😀 {diaryArray?.length}</span>
        </div>
        <div>
          <VscTriangleLeft onClick={handlePrevMonthClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
          <VscTriangleRight onClick={handleNextMonthClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
        </div>
      </CalendarTitle>
      <CalendarBoard>
        {weekHead.map((item, _) => (
          <div key={item} style={{ cursor: 'default' }}>
            {item}
          </div>
        ))}
      </CalendarBoard>
      <CalendarBoard>
        <CalendarBoardContent selectedDate={selectedDate} handleDateClick={handleDateClick} diaryArray={diaryArray} />
      </CalendarBoard>
    </div>
  );
};

export default Calendar;
