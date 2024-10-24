import './Tooltip.scss';

interface ITooltipProps {
  content: string;
  x: number;
  y: number;
  color: string;
}

const Tooltip = ({ content, x, y, color }: ITooltipProps) => {
  return (
    <div className='tooltip' style={{ top: y + 10, left: x + 10 }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          backgroundColor: color,
          marginRight: '8px',
        }}
      ></span>
      {content}
    </div>
  );
};

export default Tooltip;
