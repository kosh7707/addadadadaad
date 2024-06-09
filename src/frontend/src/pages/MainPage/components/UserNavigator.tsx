/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/redux';

import UserButton from '../../../components/UserButton';

import { UserNavigatorWrapper } from '../styled';
import { UserDetailInfo } from '../../../types';
import { RESPONSE_WIDTH } from '../../../constants';

export interface UserNavigatorProps {
  currUser: UserDetailInfo;
  userArray: UserDetailInfo[];
  handleUserClick: (userName: string) => void;
  size: 'sm' | 'md' | 'lg';
}

const UserNavigator = ({ currUser, userArray, handleUserClick, size }: UserNavigatorProps) => {
  const [userDisplayArray, setUserDisplayArray] = useState<UserDetailInfo[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth).value;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const handlePlusButtonClick = () => {
    navigate('/follow');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!userArray) return;
    if (width >= parseInt(RESPONSE_WIDTH.desktop, 10)) setUserDisplayArray(userArray.slice(0, 10));
    else if (width >= parseInt(RESPONSE_WIDTH.tablet, 10)) setUserDisplayArray(userArray.slice(0, 8));
    else setUserDisplayArray(userArray.slice(0, 4));
  }, [width, userArray]);

  return (
    <UserNavigatorWrapper>
      <UserButton
        imageUrl={auth.imageUrl}
        name="me"
        size={size}
        handleButtonClick={() => handleUserClick(auth.name)}
        showText
        isEmphasis={currUser.name === auth.name}
      />
      {userDisplayArray.map((item) => (
        <UserButton
          key={item.name}
          imageUrl={item.imageUrl}
          name={item.name}
          size={size}
          handleButtonClick={() => handleUserClick(item.name)}
          showText
          isEmphasis={currUser.name === item.name}
        />
      ))}
      <UserButton
        key={-1}
        imageUrl="images/plus.png"
        name=""
        size={size}
        handleButtonClick={() => handlePlusButtonClick()}
      />
    </UserNavigatorWrapper>
  );
};

export default UserNavigator;
