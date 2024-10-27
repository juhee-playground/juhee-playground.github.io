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

  const outerArc = d3
    .arc<d3.PieArcDatum<IPieData>>()
    .outerRadius(radius) // 라벨 선의 시작 위치 반지름 조정
    .innerRadius(radius);

  return (
    <>
      {pieGenerator(data).map((d, i) => {
        const [x, y] = outerArc.centroid(d); // 라벨 선의 시작 위치를 외곽 중심으로 설정
        const labelX = x * 1.3; // 라벨 위치를 중심에서 더 멀리 배치
        const labelY = y * 1.3;
        const midAngle = (d.startAngle + d.endAngle) / 2; // 섹터의 중간 각도

        // 라벨을 오른쪽 또는 왼쪽에 배치
        const labelAnchor = midAngle < Math.PI ? 'start' : 'end'; // 라벨을 오른쪽 또는 왼쪽으로 정렬
        return (
          <g key={i} className='sector'>
            <path
              d={arcGenerator(d) || undefined} // arc 경로 생성
              fill={d.data.color} // 색상 지정
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
            {/* 섹터 근처에 라벨 표시 */}
            {/* 라벨과 선 */}
            <polyline
              points={`${outerArc.centroid(d)[0]},${outerArc.centroid(d)[1]} ${labelX * 0.9},${
                labelY * 0.9
              } ${labelX},${labelY}`}
              fill='none'
              stroke='gray'
              strokeWidth='1'
            />
            <text
              transform={`translate(${labelX}, ${labelY})`}
              textAnchor={labelAnchor}
              dominantBaseline='middle'
              style={{ fill: 'gray', fontSize: '12px' }}
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
