import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks/redux';
import { logIn } from '../../store/auth.slice';

import { signIn } from '../../api/auth';
import { MainButton, MdInput } from '../../styled';
import { COLOR, FONT_SIZE } from '../../constants';

const SignIn = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPw, serUserPw] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userId === '' || userPw === '') return 0;

    signIn({ userId, userPw }).then((res) => {
      if (res.status === 200) {
        // TODO: id 삭제
        dispatch(
          logIn({
            id: 1,
            imageUrl: 'images/user.png',
            name: res.data.value.user_id,
            description: res.data.value.description,
          }),
        );
        navigate('/');
      } else if (res.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.warning('관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ fontSize: FONT_SIZE.xl, fontWeight: 700, marginTop: '10%' }}>로그인</div>
      <MdInput placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
      <MdInput type="password" placeholder="비밀번호" onChange={(e) => serUserPw(e.target.value)} />
      <MainButton onClick={handleButtonClick}>로그인하기</MainButton>
      <div style={{ color: COLOR.gray, fontSize: FONT_SIZE.md, marginTop: '20px' }}>
        아직 회원이 아니신가요?{' '}
        <a href="/sign-up" style={{ color: COLOR.dark_gray }}>
          회원가입
        </a>{' '}
        하시겠습니까?
      </div>
    </div>
  );
};

export default SignIn;
