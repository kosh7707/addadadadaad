/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { VscChevronLeft, VscSettings } from 'react-icons/vsc';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import ConfirmModal from '../../Modal/ConfirmModal';
import AlertModal from '../../Modal/AlertModal';

import * as S from './styled';
import { UserDetailInfo } from '../../types';
import { BUTTON_CIRCLE_SIZE, FONT_SIZE } from '../../constants';
import { MainButton, MdInput } from '../../styled';
import { fetchFollow, fetchUnfollow, getFollowingList } from '../../api/follow';
import { setFollowingList } from '../../store/following.slice';
import { useNavigate } from 'react-router-dom';

const Follow = () => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserDetailInfo[]>([]);

  const [unfollowModalOpen, setUnfollowModalOpen] = useState<boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const [followModalOpen, setFollowModalOpen] = useState<boolean>(false);
  const [searchUserName, setSearchUserName] = useState<string>('');

  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);

  const [modalMessage, setModalMessage] = useState<string>('');

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth).value;
  const following = useAppSelector((state) => state.following).value;
  const followed = useAppSelector((state) => state.followed).value;

  const navigate = useNavigate();

  const handleSignInModalClose = () => {
    setSignInModalOpen(false);
    navigate('/sign-in');
  };

  const handleSearchUserClick = () => {
    if (!auth.isAuth) return;
    if (searchUserName === '') return;
    setModalMessage(`${searchUserName}을 팔로우 하시겠습니까?`);
    setFollowModalOpen(true);
  };

  const handleFollowSettingClick = (userName: string) => {
    setSelectedUserName(userName);
    setModalMessage(`${userName}을 팔로우 취소 하시겠습니까?`);
    setUnfollowModalOpen(true);
  };

  const handleUnfollowClick = () => {
    fetchUnfollow({ userId: selectedUserName }).then((res) => {
      if (res.status === 200) {
        toast.info(`${selectedUserName}님을 팔로우 취소하였습니다.`);
        getFollowingList({ userId: auth.name }).then((data) => {
          if (data.status === 200) {
            const tmp = data.data.value.map((item: { user_id: string; description: string }) => {
              return { imageUrl: 'images/user.png', name: item.user_id, description: item.description };
            });
            dispatch(setFollowingList(tmp));
          }
        });
      } else if (res.status === 400) {
        toast.error(`${selectedUserName}님을 팔로우 취소하는데 실패하였습니다.`);
      } else {
        toast.warning('관리자에게 문의해주세요.');
      }
    });
    setUnfollowModalOpen(false);
  };

  const handleFollowClick = () => {
    fetchFollow({ userId: searchUserName }).then((res) => {
      if (res.status === 200) {
        toast.info(`${searchUserName}님을 팔로우 하였습니다.`);
        getFollowingList({ userId: auth.name }).then((data) => {
          if (data.status === 200) {
            const tmp = data.data.value.map((item: { user_id: string; description: string }) => {
              return { imageUrl: 'images/user.png', name: item.user_id, description: item.description };
            });
            dispatch(setFollowingList(tmp));
          }
        });
      } else if (res.status === 400) {
        toast.error(`${searchUserName}님을 팔로우하는데 실패하였습니다.`);
      } else {
        toast.warning('관리자에게 문의해주세요.');
      }
    });
    setFollowModalOpen(false);
  };

  const handleModalClose = () => {
    setUnfollowModalOpen(false);
    setFollowModalOpen(false);
    setModalMessage('');
  };

  useEffect(() => {
    if (isFollowed) setUserList(followed);
    else setUserList(following);
  }, [isFollowed]);

  useEffect(() => {
    if (auth.isAuth) return;
    setModalMessage(`로그인이 필요합니다.`);
    setSignInModalOpen(true);
  }, []);

  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <S.SearchWrapper>
          <MdInput
            value={searchUserName}
            placeholder="팔로우할 사용자의 이름을 입력하세요."
            onChange={(e) => {
              setSearchUserName(e.target.value);
            }}
          />
          <MainButton onClick={handleSearchUserClick}>검색</MainButton>
        </S.SearchWrapper>
        <S.FollowWrapper>
          <a href="/" style={{ fontSize: FONT_SIZE.xl }}>
            <VscChevronLeft />
          </a>
          <S.TextDiv
            style={{ borderBottom: `${!isFollowed ? '2px solid black' : '0'}` }}
            onClick={() => setIsFollowed(false)}
          >
            팔로잉
          </S.TextDiv>
          <S.TextDiv
            style={{ borderBottom: `${isFollowed ? '2px solid black' : '0'}` }}
            onClick={() => setIsFollowed(true)}
          >
            팔로우
          </S.TextDiv>
          {userList &&
            userList.map((item) => {
              return (
                <S.UserGridDiv>
                  <img
                    src={item.imageUrl}
                    alt="userImage"
                    style={{ width: BUTTON_CIRCLE_SIZE.md, height: BUTTON_CIRCLE_SIZE.md, borderRadius: '100%' }}
                  />
                  {item.name}
                  {!isFollowed && (
                    <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'flex-end' }}>
                      <VscSettings onClick={() => handleFollowSettingClick(item.name)} />
                    </div>
                  )}
                </S.UserGridDiv>
              );
            })}
        </S.FollowWrapper>
      </div>
      <ConfirmModal
        open={unfollowModalOpen}
        handleClose={handleModalClose}
        title="팔로우 취소"
        message={modalMessage}
        handleConfirmButtonClick={handleUnfollowClick}
      />
      <ConfirmModal
        open={followModalOpen}
        handleClose={handleModalClose}
        title="팔로우"
        message={modalMessage}
        handleConfirmButtonClick={handleFollowClick}
      />
      <AlertModal open={signInModalOpen} handleClose={handleSignInModalClose} title="알림" message={modalMessage} />
    </>
  );
};

export default Follow;
