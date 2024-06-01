/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import UserButton from '../../../components/UserButton';
import { UserInfo } from '../../../types';
import { RESPONSE_WIDTH } from '../../../constants';
import { useEffect, useState } from 'react';

export interface UserNavigatorProps {
  userArray: UserInfo[];
  handleUserClick: (userId: number) => void;
  size: 'sm' | 'md' | 'lg';
}

const UserNavigatorWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(16, 1fr);
  row-gap: 10px;

  @media screen and (max-width: ${RESPONSE_WIDTH.desktop}) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media screen and (max-width: ${RESPONSE_WIDTH.tablet}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const UserNavigator = ({ userArray, handleUserClick, size }: UserNavigatorProps) => {
  const [userDisplayArray, setUserDisplayArray] = useState<UserInfo[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width >= parseInt(RESPONSE_WIDTH.desktop, 10)) setUserDisplayArray(userArray.slice(0, 15));
    else if (width >= parseInt(RESPONSE_WIDTH.tablet, 10)) setUserDisplayArray(userArray.slice(0, 9));
    else if (width >= parseInt(RESPONSE_WIDTH.mobile, 10)) setUserDisplayArray(userArray.slice(0, 5));
  }, [width]);

  const handlePlusButtonClick = () => {
    console.log('plus button clicked');
    // TODO: 팔로우/팔로잉 목록으로 이동.
  };

  return (
    <UserNavigatorWrapper>
      {userDisplayArray.map((item) => (
        <UserButton
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          text={item.text}
          size={size}
          handleButtonClick={() => handleUserClick}
          showText
        />
      ))}
      <UserButton
        key={-1}
        id={-1}
        imageUrl="images/plus.png"
        text=""
        size={size}
        handleButtonClick={() => handlePlusButtonClick}
      />
    </UserNavigatorWrapper>
  );
};

export default UserNavigator;
