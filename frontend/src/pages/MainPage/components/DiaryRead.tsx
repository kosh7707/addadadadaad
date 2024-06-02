import DOMPurify from 'dompurify';

import { EmojiDivLg, StyledEditorRead, StyledInputDiv } from '../styled';

export interface DiaryReadProps {
  title: string;
  emoji: string;
  content: string;
}

const DiaryRead = ({ title, emoji, content }: DiaryReadProps) => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <StyledInputDiv>제목: {title}</StyledInputDiv>
        <EmojiDivLg>{emoji}</EmojiDivLg>
      </div>
      <StyledEditorRead
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      ></StyledEditorRead>
    </div>
  );
};

export default DiaryRead;
