import * as d3 from 'd3';

interface IPieData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface ISectorProps {
  data: IPieData[];
  onMouseEnter: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: d3.PieArcDatum<IPieData>,
    color: string,
  ) => void;
  onMouseMove: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave: () => void;
}

const Sectors = ({ data, onMouseEnter, onMouseMove, onMouseLeave }: ISectorProps) => {
  const pieGenerator = d3.pie<IPieData>().value(d => d.value);
  const radius = 100;
  const arcGenerator = d3
    .arc<d3.PieArcDatum<IPieData>>()
    .innerRadius(radius * 0.3)
    .outerRadius(radius)
    .padAngle(0.06)
    .cornerRadius(4);

  return (
    <>
      {pieGenerator(data).map((d, i) => (
        <g key={i} className='sector'>
          <path
            d={arcGenerator(d) || undefined} // arc 경로 생성
            fill={d.data.color} // 색상 지정
            onMouseEnter={event => onMouseEnter(event, d, d.data.color)}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          />
        </g>
      ))}
    </>
  );
};

export default Sectors;
