interface ILegendProps {
  data: { id: string; label: string; value: number; color: string }[];
}

const Legend = ({ data }: ILegendProps) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: item.color,
              marginRight: '8px',
            }}
          ></span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
