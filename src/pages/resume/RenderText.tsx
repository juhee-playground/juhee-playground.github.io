import React from 'react';

interface RichText {
  text: {
    content: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
}

interface RenderTextProps {
  richTextArray: RichText[];
}

const RenderText: React.FC<RenderTextProps> = ({ richTextArray }) => {
  const renderText = () => {
    return richTextArray
      .map(richText => {
        const { content } = richText.text;
        const { bold, italic, underline, strikethrough, code, color } = richText.annotations;

        let style = '';
        if (color !== 'default') style += `color: ${color}; `;
        if (bold) style += 'font-weight: bold; ';
        if (italic) style += 'font-style: italic; ';
        if (underline) style += 'text-decoration: underline; ';
        if (strikethrough) style += 'text-decoration: line-through; ';
        if (code) style += 'font-family: monospace; ';

        return `<span style="${style}">${content}</span>`;
      })
      .join('');
  };

  return <span dangerouslySetInnerHTML={{ __html: renderText().replace(/\n/g, '<br />') }} />;
};

export default RenderText;
