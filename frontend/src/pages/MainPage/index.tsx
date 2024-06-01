/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import UserNavigator from './components/UserNavigator';

import { UserDetailInfo } from '../../types';

import { UserInfoArray, UserInfoLongArray } from '../../mocks/user';
import { UserAccount, UserAccountLong } from '../../mocks/user';

const MainPage = () => {
  const [friendArray, setFriendArray] = useState<UserDetailInfo[]>([]);
  const [user, setUser] = useState<UserDetailInfo>({ id: -1, name: '', description: '', imageUrl: '' });

  const handleChangeUserClick = (userId: number) => {
    // TODO: 사용자 버튼 클릭되었을 떄, 친구 일기로 이동되도록.
    if (user.id === userId) return;

    const filtered = friendArray.filter((item) => item.id === userId);
    if (filtered.length !== 0) {
      setUser(filtered[0]);
    }
  };

  useEffect(() => {
    setFriendArray(UserInfoLongArray);
    setUser(UserAccount);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <UserNavigator currUser={user} userArray={friendArray} handleUserClick={handleChangeUserClick} size="md" />
    </div>
  );
};

export default MainPage;
