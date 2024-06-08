import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import { EmojiDivLg, StyledReactQuill } from '../styled';
import { XlInput } from '../../../styled';

export interface DiaryEditProps {
  title: string;
  handleTitle: React.Dispatch<React.SetStateAction<string>>;
  emoji: string;
  handleEmoji: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  handleContent: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryEdit = ({ title, handleTitle, emoji, handleEmoji, content, handleContent }: DiaryEditProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTitle(e.target.value);
  };

  const handleEmojiChange = (e: any) => {
    handleEmoji(e.emoji);
    setIsOpen(false);
  };

  const handleContentChange = (content: any) => {
    handleContent(content);
  };

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <XlInput
          style={{ flexGrow: '1' }}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
          value={title}
        />
        <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
          <EmojiDivLg onClick={() => setIsOpen(true)}>{emoji}</EmojiDivLg>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={handleEmojiChange}
            style={{ position: 'absolute', zIndex: '80', left: '100%', transform: 'translate(-100%, 10px)' }}
          />
        </div>
      </div>
      <StyledReactQuill theme="snow" onChange={handleContentChange} value={content} />
    </div>
  );
};

export default DiaryEdit;
