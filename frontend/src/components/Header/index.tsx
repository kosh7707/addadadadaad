import styled from 'styled-components';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { FONT_SIZE, HEADER_HEIGHT, PAGE_MAX_WIDTH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut } from '../../store/auth.slice';
import { resetDiaryList } from '../../store/diaryList.slice';
import { resetFollowedList } from '../../store/followed.slice';
import { resetFollowingList } from '../../store/following.slice';
import { signOut } from '../../api/auth';

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
    signOut().then((res) => {
      if (res.status === 200) {
        dispatch(logOut());
        dispatch(resetDiaryList());
        dispatch(resetFollowedList());
        dispatch(resetFollowingList());
      } else if (res.status === 403) {
      } else {
        alert('관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <HeaderWrapper>
      <HeaderLayout>
        <StyeldA href="/" style={{ fontSize: FONT_SIZE.xl, lineHeight: HEADER_HEIGHT }}>
          Diary
        </StyeldA>
        {auth.isAuth ? (
          <div onClick={handleSignOutClick}>
            <VscSignOut style={{ fontSize: FONT_SIZE.xl, marginTop: '6px' }} />
          </div>
        ) : (
          <StyeldA href="/sign-in">
            <VscSignIn style={{ fontSize: FONT_SIZE.xl, marginTop: '6px' }} />
          </StyeldA>
        )}
      </HeaderLayout>
    </HeaderWrapper>
  );
};

export default Header;
