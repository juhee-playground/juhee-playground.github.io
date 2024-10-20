import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

const lineData = [
  {
    id: '와이유파트너스',
    data: [
      { x: '2017-05-02', y: 0 },
      { x: '2018-02-28', y: dayjs('2018-02-28').diff(dayjs('2017-05-02'), 'month') },
    ],
  },
  {
    id: '핏투게더',
    data: [
      { x: '2018-07-02', y: dayjs('2018-02-28').diff(dayjs('2017-05-02'), 'month') },
      { x: '2022-11-30', y: dayjs('2022-11-30').diff(dayjs('2018-07-02'), 'month') },
    ],
  },
  {
    id: 'Freelancer',
    data: [
      { x: '2023-03-02', y: dayjs('2022-11-30').diff(dayjs('2018-07-02'), 'month') },
      { x: dayjs().format('YYYY-MM-DD'), y: dayjs().diff(dayjs('2023-03-02'), 'month') },
    ],
  },
];

const scatterData = [
  {
    id: 'React Project',
    data: [
      { x: '2023-03-01', y: 5, size: 20 }, // React 프로젝트 5개월
      { x: '2024-01-01', y: 8, size: 32 }, // React 프로젝트 30개월
    ],
  },
  {
    id: 'Vue Project',
    data: [
      { x: '2019-01-02', y: 2, size: 8 }, // Vue 프로젝트
      { x: '2019-05-02', y: 36, size: 144 }, // Vue 프로젝트
      { x: '2020-05-02', y: 12, size: 36 }, // Vue 프로젝트
      { x: '2023-07-10', y: 3, size: 9 }, // Vue 프로젝트
    ],
  },
  {
    id: 'PHP Project',
    data: [
      { x: '2017-05-02', y: 11, size: 44 }, // PHP 프로젝트
      { x: '2018-08-02', y: 9, size: 36 },
    ],
  },
];

const MyTimeLineChart = () => {
  return (
    <div style={{ width: 800, height: 500 }}>
      <ResponsiveLine
        data={lineData} // Line 데이터
        margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        yScale={{
          type: 'linear',
        }}
        axisBottom={{
          format: '%Y-%m-%d',
          tickValues: 'every year',
          legend: '날짜',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          legend: '개월 수',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableArea={true} // 차트에 영역을 채우기
        colors={{ scheme: 'category10' }} // 색상 구분
        lineWidth={2}
        pointSize={10} // 기본 점 크기 설정 (라인 차트)
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        useMesh={true} // 차트와 상호작용 가능
        layers={[
          'grid',
          'markers',
          'areas',
          'lines',
          'slices',
          'axes',
          'legends',
          // Custom points layer 추가
          ({ points }) =>
            scatterData.flatMap(series =>
              series.data.map(scatterPoint => {
                const linePoint = points.find(
                  point => point.data.xFormatted === scatterPoint.x && point.data.y === scatterPoint.y,
                );

                if (!linePoint) return null;

                return (
                  <circle
                    key={`${series.id}-${scatterPoint.x}-${scatterPoint.y}`}
                    cx={linePoint.x}
                    cy={linePoint.y}
                    r={scatterPoint.size}
                    fill={linePoint.serieColor}
                    stroke='white'
                    strokeWidth={2}
                  />
                );
              }),
            ),
        ]}
      />
    </div>
  );
};

export default MyTimeLineChart;
