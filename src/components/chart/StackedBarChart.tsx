import { ResponsiveBar } from '@nivo/bar';
import dayjs from 'dayjs';

const data = [
  {
    year: '',
    와이유파트너스: 11, // 와이유파트너스에서 일한 기간 (월 단위)
    핏투게더: 53, // 핏투게더에서 일한 기간 (월 단위)
    Freelancer: dayjs().diff(dayjs('2023-01-01'), 'month'), // 현재까지 프리랜서로 일한 기간 (월 단위)
  },
];

const MyStackedBarChart = () => {
  return (
    <div style={{ width: 600, height: 500 }}>
      <ResponsiveBar
        data={data}
        keys={['와이유파트너스', '핏투게더', 'Freelancer']} // 회사별 경력 기간을 스택으로 나눔
        indexBy='year' // X축에 표시될 값
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        padding={0.3}
        layout='horizontal' // 가로 방향 레이아웃
        colors={{ scheme: 'pastel1' }} // 색상 테마
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '전체경력',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          ticksPosition: 'before',
          tickSize: 0,
          tickPadding: 12,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyStackedBarChart;
