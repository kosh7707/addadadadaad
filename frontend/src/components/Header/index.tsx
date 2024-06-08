import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut } from '../../store/auth.slice';
import { resetDiaryList } from '../../store/diaryList.slice';
import { resetFollowedList } from '../../store/followed.slice';
import { resetFollowingList } from '../../store/following.slice';

import { signOut } from '../../api/auth';

import { A } from '../../styled';
import { HeaderLayout, HeaderWrapper } from './styled';
import { FONT_SIZE, HEADER_HEIGHT } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  const navigator = useNavigate();

  const handleSignOutClick = () => {
    // TODO: api만 남기기
    dispatch(logOut());
    dispatch(resetDiaryList());
    dispatch(resetFollowedList());
    dispatch(resetFollowingList());
    navigator('/');
    signOut().then((res) => {
      if (res.status === 200) {
        dispatch(logOut());
        dispatch(resetDiaryList());
        dispatch(resetFollowedList());
        dispatch(resetFollowingList());
        navigator('/');
        toast.info('로그아웃 되었습니다.');
      } else if (res.status === 403) {
      } else {
        toast.warning('관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <HeaderWrapper>
      <HeaderLayout>
        <A href="/" style={{ fontSize: FONT_SIZE.xl, lineHeight: HEADER_HEIGHT }}>
          Diary
        </A>
        {auth.isAuth ? (
          <div onClick={handleSignOutClick} style={{ cursor: 'pointer' }}>
            <VscSignOut style={{ fontSize: FONT_SIZE.xl, marginTop: '6px' }} />
          </div>
        ) : (
          <A href="/sign-in">
            <VscSignIn style={{ fontSize: FONT_SIZE.xl, marginTop: '6px' }} />
          </A>
        )}
      </HeaderLayout>
    </HeaderWrapper>
  );
};

export default Header;
