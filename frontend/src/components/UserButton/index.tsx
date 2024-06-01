import { BUTTON_CIRCLE_SIZE, COLOR, FONT_SIZE } from '../../constants';
import { UserInfo } from '../../types';

export interface UserButtonProps extends UserInfo {
  size: 'sm' | 'md' | 'lg';
  handleButtonClick: (userId: number) => void;
  showText?: boolean;
  isEmphasis?: boolean;
}

const UserButton = ({
  size,
  id,
  imageUrl,
  name,
  handleButtonClick,
  showText = false,
  isEmphasis = false,
}: UserButtonProps) => {
  const width = size === 'sm' ? BUTTON_CIRCLE_SIZE.sm : size === 'md' ? BUTTON_CIRCLE_SIZE.md : BUTTON_CIRCLE_SIZE.lg;
  const height = size === 'sm' ? BUTTON_CIRCLE_SIZE.sm : size === 'md' ? BUTTON_CIRCLE_SIZE.md : BUTTON_CIRCLE_SIZE.lg;

  const font_size = size === 'sm' ? FONT_SIZE.sm : size === 'md' ? FONT_SIZE.md : FONT_SIZE.lg;

  return (
    <div
      onClick={() => handleButtonClick(id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
    >
      <img src={imageUrl} alt={name} style={{ width: width, height: height, borderRadius: '100%' }} />
      {showText && (
        <span
          style={{
            fontSize: font_size,
            color: `${isEmphasis ? 'black' : COLOR.gray}`,
            fontWeight: `${isEmphasis ? '700' : '400'}`,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default UserButton;
