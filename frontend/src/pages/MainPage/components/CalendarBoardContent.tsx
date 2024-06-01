/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { EmojiDiv } from '../styled';
import { DiaryInfo } from '../../../types';

export interface CalendarBoardContentProps {
  selectedDate: string;
  handleDateClick: (date: string | null) => void;
  diaryArray: DiaryInfo[];
}

const CalendarBoardContent = ({ selectedDate, handleDateClick, diaryArray }: CalendarBoardContentProps) => {
  const [array, setArray] = useState<(string | null)[]>([]);

  const initArray = (firstDay: number, daysInMoth: number) => {
    return Array.from({ length: firstDay + daysInMoth }, (v, i) =>
      i < firstDay
        ? null
        : dayjs(selectedDate)
            .startOf('month')
            .set('date', i - firstDay + 1)
            .format('MM/DD/YY'),
    );
  };

  const HeadEmoji = ({ date }: { date: string }) => {
    const result = diaryArray.filter((item) => date === item.date);

    return <EmojiDiv>{result.length !== 0 && result[0].emoji}</EmojiDiv>;
  };

  useEffect(() => {
    const firstDay = dayjs(selectedDate).startOf('month').day();
    const daysInMonth = dayjs(selectedDate).daysInMonth();
    setArray(initArray(firstDay, daysInMonth));
  }, [selectedDate]);

  return (
    <>
      {array.map((item, _) => (
        <div key={item ? item.toString() : `${item}${_}`} onClick={() => handleDateClick(item)}>
          {item && (
            <>
              <HeadEmoji date={item} />
              <span style={{ cursor: 'pointer' }}>{dayjs(item).date()} </span>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default CalendarBoardContent;
