import DOMPurify from 'dompurify';

import { EmojiDivLg, StyledEditorRead } from '../styled';
import { XlInputDiv } from '../../../styled';

export interface DiaryReadProps {
  title: string;
  emoji: string;
  content: string;
}

const DiaryRead = ({ title, emoji, content }: DiaryReadProps) => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <XlInputDiv style={{ flexGrow: '1' }}>제목: {title}</XlInputDiv>
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
