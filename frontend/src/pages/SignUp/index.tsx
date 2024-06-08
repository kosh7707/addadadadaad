import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR, FONT_SIZE } from '../../constants';
import { signUp } from '../../api/auth';

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
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userId === '') alert('사용할 아이디를 입력해주세요.');
    if (userPw === '') alert('사용할 비밀번호를 입력해주세요.');
    if (userId === '' || userPw === '') return 0;

    signUp({ userId, userPw, description }).then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/sign-in');
      } else if (res.status === 400 && res.data.message === '유저 아이디 중복') {
        alert('중복된 id입니다. 다른 id로 가입해주세요.');
      } else {
        alert('관리자에게 문의해주세요.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ fontSize: FONT_SIZE.lg, fontWeight: 700, marginTop: '10%' }}>회원가입</div>
      <StyledInput placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
      <StyledInput type="password" placeholder="비밀번호" onChange={(e) => setUserPw(e.target.value)} />
      <StyledInput placeholder="한 줄 소개" onChange={(e) => setDescription(e.target.value)} />
      <StyledButton onClick={handleButtonClick}>등록하기</StyledButton>
    </div>
  );
};

export default SignUp;
