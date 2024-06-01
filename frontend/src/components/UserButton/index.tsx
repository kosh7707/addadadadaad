import { BUTTON_CIRCLE_SIZE, COLOR, FONT_SIZE } from '../../constants';
import { UserInfo } from '../../types';

export interface UserButtonProps extends UserInfo {
  size: 'sm' | 'md' | 'lg';
  handleButtonClick: (userId: number) => {};
  showText?: boolean;
}

const UserButton = ({ size, id, imageUrl, text, handleButtonClick, showText = false }: UserButtonProps) => {
  const width = size === 'sm' ? BUTTON_CIRCLE_SIZE.sm : size === 'md' ? BUTTON_CIRCLE_SIZE.md : BUTTON_CIRCLE_SIZE.lg;
  const height = size === 'sm' ? BUTTON_CIRCLE_SIZE.sm : size === 'md' ? BUTTON_CIRCLE_SIZE.md : BUTTON_CIRCLE_SIZE.lg;

  const font_size = size === 'sm' ? FONT_SIZE.sm : size === 'md' ? FONT_SIZE.md : FONT_SIZE.lg;

  return (
    <div
      onClick={() => handleButtonClick(id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img src={imageUrl} alt={text} style={{ width: width, height: height, borderRadius: '100%' }} />
      {showText && <span style={{ fontSize: font_size, color: COLOR.gray }}>{text}</span>}
    </div>
  );
};

export default UserButton;
