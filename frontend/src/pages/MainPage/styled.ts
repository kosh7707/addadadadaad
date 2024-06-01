import styled from 'styled-components';
import { COLOR, FONT_SIZE, RESPONSE_WIDTH } from '../../constants';

/* start of ./index.tsx */
export const MainContentWrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 40% 60%;

  @media screen and (max-width: ${RESPONSE_WIDTH.tablet}) {
    grid-template-columns: 1fr;
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
  font-size: ${FONT_SIZE.lg};
`;
/* end of components/CalendarBoardContent.tsx */
