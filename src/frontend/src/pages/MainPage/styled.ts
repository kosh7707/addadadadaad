import styled from 'styled-components';
import { COLOR, FONT_SIZE, RESPONSE_WIDTH } from '../../constants';
import ReactQuill from 'react-quill';

/* start of ./index.tsx */
export const MainContentWrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 40% 60%;

  @media screen and (max-width: ${RESPONSE_WIDTH.tablet}) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;
/* end of ./index.tsx */

/* start of components/Calendar.tsx */
export const UserInfoText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 0 1 auto;
`;

export const UserContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CalendarTitle = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-size: ${FONT_SIZE.md};
  font-weight: 700;
`;

export const CalendarBoard = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;
  justify-items: center;
  text-align: center;
`;
/* end of components/Calendar.tsx */

/* start of components/CalendarBoardContent.tsx */
export const EmojiDiv = styled.div`
  width: 24px;
  height: 24px;
  line-height: 28px;
  margin: 5px;
  cursor: pointer;
  border-radius: 100%;
  background-color: ${COLOR.gray};
  font-size: ${FONT_SIZE.xl};
`;
/* end of components/CalendarBoardContent.tsx */

/* start of components/DiaryContent.tsx */
export const EmojiDivLg = styled.div`
  width: 40px;
  height: 40px;
  line-height: 46px;
  text-align: center;
  cursor: pointer;
  border-radius: 100%;
  background-color: ${COLOR.gray};
  font-size: 36px;
`;
/* end of components/DiaryContent.tsx */

/* start of components/DiaryEdit.tsx */
export const StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    min-height: 360px;
    border-color: ${COLOR.gray};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .ql-editor {
      height: 340px;
    }
  }
  .ql-toolbar {
    border-color: ${COLOR.gray};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;
/* end of components/DiaryEdit.tsx */

/* start of components/DiaryRead.tsx */
export const StyledEditorRead = styled.div`
  width: 100%;
  height: 402px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${COLOR.gray};
  li {
    margin-left: 20px;
  }
`;
/* end of components/DiaryRead.tsx */

/* start of components/UserNavigator */
export const UserNavigatorWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  row-gap: 10px;

  @media screen and (max-width: ${RESPONSE_WIDTH.desktop}) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media screen and (max-width: ${RESPONSE_WIDTH.tablet}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
/* start of components/UserNavigator */
