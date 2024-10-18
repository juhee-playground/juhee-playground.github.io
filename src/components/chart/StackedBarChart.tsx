import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';

const data = [
  {
    id: 'Company A',
    startDate: '2017-05-02',
    endDate: '2020-12-31',
    duration: 44, // 기간을 월 단위로 계산하여 표시
  },
  {
    id: 'Company B',
    startDate: '2021-01-01',
    endDate: format(new Date(), 'yyyy-MM-dd'), // 현재 날짜
    duration: 34,
  },
];

const MyStackedBarChart = () => {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveBar
        data={data}
        keys={['duration']} // 일한 기간(월 단위)을 기준으로 표시
        indexBy='id' // 회사 이름
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'category10' }} // 색상 테마
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 32,
          format: value => format(new Date(value), 'yyyy-MM-dd'),
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Months Worked',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};

export default MyStackedBarChart;
