import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { modifyDiary } from '../../../store/diaryList.slice';

import DiaryEdit from './DiaryEdit';
import DiaryRead from './DiaryRead';

import { fetchDiary } from '../../../api/diary';
import { MainButton } from '../../../styled';
import { DiaryInfo } from '../../../types';
import { FONT_SIZE } from '../../../constants';

const DiaryContent = ({ diary_id, user, date, emoji, title, content }: DiaryInfo & { user: string }) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [dTitle, setTitle] = useState<string>(title);
  const [dEmoji, setEmoji] = useState<string>(emoji);
  const [dContent, setContent] = useState<string>(content);

  const auth = useAppSelector((state) => state.auth).value;

  const dispatch = useAppDispatch();
  const handleButtonClick = () => {
    if (!isReadOnly) {
      fetchDiary({ userId: auth.name, date: date, title: dTitle, emoji: dEmoji, content: dContent }).then((res) => {
        console.log('fetchDiary:32 ', res);
        if (res.status === 200) {
          dispatch(
            modifyDiary({
              diary_id: res.data.value[0].diary_id,
              date: res.data.value[0].date,
              title: res.data.value[0].title,
              emoji: res.data.value[0].emoji,
              content: res.data.value[0].content,
            }),
          );
          toast.info('다이어리을 수정하였습니다.');
        } else if (res.status === 400) {
          toast.error('다이어리 작성에 실패했습니다.');
        } else if (res.status === 403) {
        } else {
          toast.warning('관리자에게 문의해주세요.');
        }
      });
    }
    setIsReadOnly((e) => !e);
  };

  useEffect(() => {
    setTitle(title);
    setEmoji(emoji);
    setContent(content);
  }, [title, emoji, content]);

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

      {user === auth.name && (
        <MainButton style={{ float: 'right', boxShadow: 'none', fontSize: FONT_SIZE.xl }} onClick={handleButtonClick}>
          {isReadOnly ? '수정' : '저장'}
        </MainButton>
      )}
    </div>
  );
};

export default DiaryContent;
