import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

const data = [
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

const MyTimeLineChart = () => {
  return (
    <div style={{ width: 800, height: 500 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        yScale={{
          type: 'linear',
          // stacked: true, // 스택형으로 데이터를 표시
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
        colors={{ scheme: 'pastel1' }}
        lineWidth={2}
        pointSize={10}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        useMesh={true} // 차트와 상호작용 가능
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
};

export default MyTimeLineChart;
