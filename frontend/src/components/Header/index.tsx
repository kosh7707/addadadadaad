import styled from 'styled-components';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { FONT_SIZE, HEADER_HEIGHT, PAGE_MAX_WIDTH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut } from '../../store/auth.slice';
import { resetDiaryList } from '../../store/diaryList.slice';
import { resetFollowedList } from '../../store/followed.slice';
import { resetFollowingList } from '../../store/following.slice';

export const HeaderWrapper = styled.div`
  width: 100vw;
  height: ${HEADER_HEIGHT};
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

export const StyeldA = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const StyledButton = styled.div`
  color: inherit;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  const handleSignOutClick = () => {
    dispatch(logOut());
    dispatch(resetDiaryList());
    dispatch(resetFollowedList());
    dispatch(resetFollowingList());
  };

  return (
    <HeaderWrapper>
      <HeaderLayout>
        <StyeldA href="/" style={{ fontSize: FONT_SIZE.lg, lineHeight: HEADER_HEIGHT }}>
          Diary
        </StyeldA>
        {auth.isAuth ? (
          <div onClick={handleSignOutClick}>
            <VscSignOut style={{ fontSize: FONT_SIZE.lg, marginTop: '6px' }} />
          </div>
        ) : (
          <StyeldA href="/sign-in">
            <VscSignIn style={{ fontSize: FONT_SIZE.lg, marginTop: '6px' }} />
          </StyeldA>
        )}
      </HeaderLayout>
    </HeaderWrapper>
  );
};

export default Header;
