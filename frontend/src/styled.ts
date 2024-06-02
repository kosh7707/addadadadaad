import styled from 'styled-components';

import { HEADER_HEIGHT, PAGE_MAX_WIDTH } from './constants';

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
