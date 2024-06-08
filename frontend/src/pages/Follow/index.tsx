/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { VscChevronLeft, VscSettings } from 'react-icons/vsc';
import styled from 'styled-components';
import { BUTTON_CIRCLE_SIZE, FONT_SIZE } from '../../constants';
import { UserDetailInfo } from '../../types';
import ConfirmModal from '../../Modal/ConfirmModal';

export const FollowTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 6fr;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const TextDiv = styled.div`
  padding: 10px;
  font-size: ${FONT_SIZE.lg};
  font-weight: 600;
`;

export const UserGridDiv = styled.div`
  padding: 10px;
  grid-column-start: 2;
  grid-column-end: 4;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: ${FONT_SIZE.lg};
`;

const Follow = () => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserDetailInfo[]>([]);

  const [unfollowModalOpen, setUnfollowModalOpen] = useState<boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');

  const dispatch = useAppDispatch();

  const following = useAppSelector((state) => state.following).value;
  const followed = useAppSelector((state) => state.followed).value;

  const handleFollowSettingClick = (userName: string) => {
    setSelectedUserName(userName);
    setModalMessage(`정말 ${userName}을 팔로우 취소 하시겠습니까?`);
    setUnfollowModalOpen(true);
  };

  const handleUnfollowClick = () => {
    // TODO: api 연결
    setUnfollowModalOpen(false);
  };

  const handleModalClose = () => {
    setUnfollowModalOpen(false);
  };

  useEffect(() => {
    if (isFollowed) setUserList(followed);
    else setUserList(following);
  }, [isFollowed]);

  return (
    <>
      <div style={{ marginTop: '40px' }}>
        <FollowTitleWrapper>
          <a href="/" style={{ fontSize: FONT_SIZE.xl }}>
            <VscChevronLeft />
          </a>
          <TextDiv
            style={{ borderBottom: `${!isFollowed ? '2px solid black' : '0'}` }}
            onClick={() => setIsFollowed(false)}
          >
            팔로잉
          </TextDiv>
          <TextDiv
            style={{ borderBottom: `${isFollowed ? '2px solid black' : '0'}` }}
            onClick={() => setIsFollowed(true)}
          >
            팔로우
          </TextDiv>
          {userList.map((item) => {
            return (
              <UserGridDiv>
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
              </UserGridDiv>
            );
          })}
        </FollowTitleWrapper>
      </div>
      <ConfirmModal
        open={unfollowModalOpen}
        handleClose={handleModalClose}
        title="팔로우 취소"
        message={modalMessage}
        handleConfirmButtonClick={handleUnfollowClick}
      />
    </>
  );
};

export default Follow;
