import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import DiaryEdit from './DiaryEdit';
import { StyledButton } from '../styled';
import { DiaryInfo } from '../../../types';
import DiaryRead from './DiaryRead';
import { useAppDispatch } from '../../../hooks/redux';
import { modifyDiary } from '../../../store/diaryList.slice';

const DiaryContent = ({ id, date, emoji, title, content }: DiaryInfo) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [dTitle, setTitle] = useState<string>(title);
  const [dEmoji, setEmoji] = useState<string>(emoji);
  const [dContent, setContent] = useState<string>(content);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTitle(title);
    setEmoji(emoji);
    setContent(content);
  }, [title, emoji, content]);

  const handleButtonClick = () => {
    if (!isReadOnly) {
      dispatch(modifyDiary({ id: -1, date: date, title: dTitle, emoji: dEmoji, content: dContent }));
    }
    setIsReadOnly((e) => !e);
  };

  return (
    <div style={{ padding: '10px' }}>
      {isReadOnly ? (
        <DiaryRead title={dTitle} emoji={dEmoji} content={dContent} />
      ) : (
        <DiaryEdit
          title={dTitle}
          handleTitle={setTitle}
          emoji={dEmoji}
          handleEmoji={setEmoji}
          content={dContent}
          handleContent={setContent}
        />
      )}
      <StyledButton style={{ float: 'right', marginTop: '10px' }} onClick={handleButtonClick}>
        {isReadOnly ? '수정' : '저장'}
      </StyledButton>
    </div>
  );
};

export default DiaryContent;
