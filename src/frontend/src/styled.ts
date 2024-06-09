import styled from 'styled-components';

import { COLOR, FONT_SIZE, HEADER_HEIGHT, PAGE_MAX_WIDTH } from './constants';

import './global.css';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  overflow: hidden;
  margin-top: ${HEADER_HEIGHT};
`;

export const PageLayout = styled.div`
  width: 100%;
  max-width: ${PAGE_MAX_WIDTH};
  height: 100%;
  overflow: hidden;
  margin: auto;
`;

export const Button = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 10px;
  font-size: ${FONT_SIZE.lg};
  cursor: pointer;
  box-shadow: 3px 3px 2px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${COLOR.dark_gray};
    color: white;
  }
`;

export const MainButton = styled(Button)`
  background-color: ${COLOR.gray};
  color: white;
`;

export const SubButton = styled(Button)`
  background-color: white;
  color: ${COLOR.gray};
`;

export const Input = styled.input`
  width: 280px;
  padding: 8px;
  border: 1px solid ${COLOR.gray};
  border-radius: 10px;
  outline: none;
  &::placeholder {
    color: ${COLOR.gray};
    font-size: 0.8em;
    font-style: italic;
  }
`;

export const MdInput = styled(Input)`
  font-size: ${FONT_SIZE.md};
`;
export const XlInput = styled(Input)`
  font-size: ${FONT_SIZE.xl};
`;

export const XlInputDiv = styled.div`
  width: 300px;
  padding: 8px 8px 7px 8px;
  font-size: ${FONT_SIZE.xl};
  border: 1px solid ${COLOR.gray};
  border-radius: 10px;
`;

export const A = styled.a`
  color: inherit;
  text-decoration: none;
`;
