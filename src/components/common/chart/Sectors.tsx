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

const INNER_RADIUS_RATIO = 0.3;
const ARC_PADDING = 0.06;
const CORNER_RADIUS = 4;
const LABEL_POSITION_MULTIPLIER = 1.3;
const POLYLINE_OFFSET = 0.9;

const Sectors = ({ data, onMouseEnter, onMouseMove, onMouseLeave }: ISectorProps) => {
  const pieGenerator = d3.pie<IPieData>().value(d => d.value);
  const radius = 100;
  const arcGenerator = d3
    .arc<d3.PieArcDatum<IPieData>>()
    .innerRadius(radius * INNER_RADIUS_RATIO)
    .outerRadius(radius)
    .padAngle(ARC_PADDING)
    .cornerRadius(CORNER_RADIUS);

  const outerArc = d3.arc<d3.PieArcDatum<IPieData>>().outerRadius(radius).innerRadius(radius);

  return (
    <>
      {pieGenerator(data).map((d, i) => {
        const [x, y] = outerArc.centroid(d);
        const labelX = x * LABEL_POSITION_MULTIPLIER;
        const labelY = y * LABEL_POSITION_MULTIPLIER;
        const midAngle = (d.startAngle + d.endAngle) / 2;

        const labelAnchor = midAngle < Math.PI ? 'start' : 'end';
        return (
          <g key={i} className='sector'>
            <path
              d={arcGenerator(d) || undefined}
              fill={d.data.color}
              onMouseEnter={event => onMouseEnter(event, d, d.data.color)}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            />
            <text
              transform={`translate(${arcGenerator.centroid(d)})`}
              textAnchor='middle'
              style={{ fill: 'black', fontSize: '14px' }}
            >
              {d.data.value}
            </text>
            <polyline
              points={`${outerArc.centroid(d)[0]},${outerArc.centroid(d)[1]} ${labelX * POLYLINE_OFFSET},${
                labelY * POLYLINE_OFFSET
              } ${labelX},${labelY}`}
              fill='none'
              stroke='gray'
              strokeWidth='1'
            />
            <text
              transform={`translate(${labelX}, ${labelY})`}
              textAnchor={labelAnchor}
              dominantBaseline='middle'
              style={{ fill: 'gray', fontSize: '11px' }}
            >
              {d.data.label}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default Sectors;
