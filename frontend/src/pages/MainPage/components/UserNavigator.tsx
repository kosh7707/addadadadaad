/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import UserButton from '../../../components/UserButton';
import { UserDetailInfo } from '../../../types';
import { RESPONSE_WIDTH } from '../../../constants';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

export interface UserNavigatorProps {
  currUser: UserDetailInfo;
  userArray: UserDetailInfo[];
  handleUserClick: (userId: number) => void;
  size: 'sm' | 'md' | 'lg';
}

const UserNavigatorWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  row-gap: 10px;

  @media screen and (max-width: ${RESPONSE_WIDTH.desktop}) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media screen and (max-width: ${RESPONSE_WIDTH.tablet}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const UserNavigator = ({ currUser, userArray, handleUserClick, size }: UserNavigatorProps) => {
  const [userDisplayArray, setUserDisplayArray] = useState<UserDetailInfo[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  const auth = useAppSelector((state) => state.auth).value;

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
    if (width >= parseInt(RESPONSE_WIDTH.desktop, 10)) setUserDisplayArray(userArray.slice(0, 10));
    else if (width >= parseInt(RESPONSE_WIDTH.tablet, 10)) setUserDisplayArray(userArray.slice(0, 8));
    else setUserDisplayArray(userArray.slice(0, 4));
  }, [width, userArray]);

  const handlePlusButtonClick = () => {
    console.log('plus button clicked');
    // TODO: 팔로우/팔로잉 목록으로 이동.
  };

  return (
    <UserNavigatorWrapper>
      <UserButton
        id={auth.id}
        imageUrl={auth.imageUrl}
        name={auth.name}
        size={size}
        handleButtonClick={() => handleUserClick(auth.id)}
        showText
        isEmphasis={currUser.id === auth.id}
      />
      {userDisplayArray.map((item) => (
        <UserButton
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          size={size}
          handleButtonClick={(id: number) => handleUserClick(id)}
          showText
          isEmphasis={currUser.id === item.id}
        />
      ))}
      <UserButton
        key={-1}
        id={-1}
        imageUrl="images/plus.png"
        name=""
        size={size}
        handleButtonClick={() => handlePlusButtonClick()}
      />
    </UserNavigatorWrapper>
  );
};

export default UserNavigator;
