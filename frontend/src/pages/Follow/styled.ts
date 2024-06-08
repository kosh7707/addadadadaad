import styled from 'styled-components';
import { FONT_SIZE } from '../../constants';

export const FollowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 6fr;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const TextDiv = styled.div`
  padding: 10px;
  font-size: ${FONT_SIZE.lg};
  font-weight: 600;
`;

export const UserGridDiv = styled.div`
  padding: 10px;
  grid-column-start: 2;
  grid-column-end: 4;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: ${FONT_SIZE.lg};
`;

export const SearchWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
