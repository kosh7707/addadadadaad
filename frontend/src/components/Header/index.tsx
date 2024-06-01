import styled from 'styled-components';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { HEADER_HEIGHT } from '../../constants';

const HeaderWrapper = styled.div`
  width: 100vw;
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Header = () => {
  return <HeaderWrapper>Header</HeaderWrapper>;
};

export default Header;
