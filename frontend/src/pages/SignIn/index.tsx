import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks/redux';
import { logIn } from '../../store/auth.slice';

import { COLOR, FONT_SIZE } from '../../constants';

import { signIn } from '../../api/auth';

const StyledInput = styled.input`
  width: 300px;
  padding: 8px;
  font-size: ${FONT_SIZE.md};
  border: 1px solid ${COLOR.gray};
  border-radius: 10px;
  outline: none;
  &::placeholder {
    font-style: italic;
  }
`;

const StyledButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 10px;
  background-color: ${COLOR.gray};
  color: white;
  font-size: ${FONT_SIZE.md};
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.dark_gray};
  }
`;

const SignIn = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPw, serUserPw] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userId === '') alert('아이디를 입력해주세요.');
    if (userPw === '') alert('비밀번호를 입력해주세요.');
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
        alert(res.data.message);
      } else {
        alert('관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ fontSize: FONT_SIZE.lg, fontWeight: 700, marginTop: '10%' }}>로그인</div>
      <StyledInput placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
      <StyledInput type="password" placeholder="비밀번호" onChange={(e) => serUserPw(e.target.value)} />
      <StyledButton onClick={handleButtonClick}>로그인하기</StyledButton>
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
