import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR, FONT_SIZE } from '../../constants';

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

const SignUp = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: api
    console.log(id, password, description);

    navigate('/sign-in');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ fontSize: FONT_SIZE.lg, fontWeight: 700, marginTop: '10%' }}>회원가입</div>
      <StyledInput placeholder="아이디" onChange={(e) => setId(e.target.value)} />
      <StyledInput type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <StyledInput placeholder="한 줄 소개" onChange={(e) => setDescription(e.target.value)} />
      <StyledButton onClick={handleButtonClick}>등록하기</StyledButton>
    </div>
  );
};

export default SignUp;
