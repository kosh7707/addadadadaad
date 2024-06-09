import styled from 'styled-components';
import { FONT_SIZE } from '../constants';

export const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContentLayout = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
`;

export const ModalContentTitle = styled.div`
  width: 100%;
  font-size: ${FONT_SIZE.xl};
  display: flex;
  justify-content: space-between;
`;

export const ModalContentMessage = styled.div`
  width: 100%;
  height: 110px;
  font-size: ${FONT_SIZE.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContentFoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;
  padding: 0px 10px;
`;
