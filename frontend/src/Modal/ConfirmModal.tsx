import { VscChromeClose } from 'react-icons/vsc';
import * as S from './styled';

export interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  handleConfirmButtonClick: () => void;
}

const ConfirmModal = ({ open, handleClose, title, message, handleConfirmButtonClick }: ConfirmModalProps) => {
  return (
    <S.ModalWrapper style={{ display: `${open ? 'block' : 'none'}` }} onClick={handleClose}>
      <S.ModalContentLayout>
        <S.ModalContentTitle>
          {title}
          <VscChromeClose onClick={handleClose} />
        </S.ModalContentTitle>
        <S.ModalContentMessage>{message}</S.ModalContentMessage>
        <S.ModalContentFoot>
          <S.ModalButtonMain onClick={handleConfirmButtonClick}>확인</S.ModalButtonMain>
          <S.ModalButtonSub onClick={handleClose}>취소</S.ModalButtonSub>
        </S.ModalContentFoot>
      </S.ModalContentLayout>
    </S.ModalWrapper>
  );
};

export default ConfirmModal;
