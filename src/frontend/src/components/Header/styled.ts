import styled from 'styled-components';
import { HEADER_HEIGHT, PAGE_MAX_WIDTH } from '../../constants';

export const HeaderWrapper = styled.div`
  width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const HeaderLayout = styled.div`
  width: 100%;
  max-width: ${PAGE_MAX_WIDTH};
  height: ${HEADER_HEIGHT};
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
