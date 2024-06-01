import UserNavigator from './components/UserNavigator';
import { UserInfoArray, UserInfoLongArray } from '../../mocks/userNavigate';

const MainPage = () => {
  const handleChangeUserClick = (userId: number) => {
    // TODO: 사용자 버튼 클릭되었을 떄, 친구 일기로 이동되도록.
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <UserNavigator userArray={UserInfoArray} handleUserClick={handleChangeUserClick} size="md" />
      <UserNavigator userArray={UserInfoLongArray} handleUserClick={handleChangeUserClick} size="md" />
    </div>
  );
};

export default MainPage;
