
interface ITooltipProps {
  content: string;
  x: number;
  y: number;
  color: string;
}

const Tooltip = ({ content, x, y, color }: ITooltipProps) => {
  return (
    <div className='absolute bg-white p-[5px] pointer-events-none z-[1000] text-sm rounded shadow-[0_2px_4px_rgba(0,0,0,0.2)]' style={{ top: y + 10, left: x + 10 }}>
      <span
        className='inline-block w-3 h-3 mr-2'
        style={{
          backgroundColor: color,
        }}
      ></span>
      {content}
    </div>
  );
};

export default Tooltip;
