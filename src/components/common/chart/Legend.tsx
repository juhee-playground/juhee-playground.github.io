import './Legend.scss';

interface ILegendProps {
  data: { id: string; label: string; value: number; color: string }[];
  orientation?: 'horizontal' | 'vertical';
}

const Legend = ({ data, orientation = 'horizontal' }: ILegendProps) => {
  return (
    <ul className={`legend legend--${orientation}`}>
      {data.map(item => (
        <li key={item.id}>
          <span className='color-indicator' style={{ backgroundColor: item.color }}></span>
          <span className='label-text'>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
