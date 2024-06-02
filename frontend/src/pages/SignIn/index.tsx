import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks/redux';
import { logIn } from '../../store/auth.slice';

import { COLOR, FONT_SIZE } from '../../constants';

import { UserAccount } from '../../mocks/user';

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
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: api
    console.log(id, password);
    dispatch(logIn(UserAccount));

    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ fontSize: FONT_SIZE.lg, fontWeight: 700, marginTop: '10%' }}>로그인</div>
      <StyledInput placeholder="ID" onChange={(e) => setId(e.target.value)} />
      <StyledInput type="password" placeholder="PW" onChange={(e) => setPassword(e.target.value)} />
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
