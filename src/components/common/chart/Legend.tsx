import { cn } from '@/utils/classNames';

interface ILegendProps {
  data: { id: string; label: string; value: number; color: string }[];
  orientation?: 'horizontal' | 'vertical';
}

const Legend = ({ data, orientation = 'horizontal' }: ILegendProps) => {
  return (
    <ul
      className={cn(
        'list-none p-0 m-0',
        orientation === 'horizontal' ? 'flex flex-wrap justify-center [&_li]:mr-4' : '[&_li]:mb-1 [&_li:last-child]:mb-0',
        '[&_li]:flex [&_li]:items-center'
      )}
    >
      {data.map(item => (
        <li key={item.id}>
          <span className='inline-block w-3 h-3 rounded-full mr-2' style={{ backgroundColor: item.color }}></span>
          <span className='text-xs text-inherit opacity-70'>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
