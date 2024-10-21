import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const scatterData = [
  {
    id: 'Projects',
    data: [
      { x: '2017-05-02', y: 10, size: 10 }, // 첫 번째 점
      { x: '2018-02-28', y: 15, size: 20 }, // 두 번째 점
      { x: '2018-07-02', y: 7, size: 15 }, // 세 번째 점
      { x: '2020-01-01', y: 20, size: 30 }, // 네 번째 점
      { x: '2021-01-01', y: 30, size: 25 }, // 다섯 번째 점
      { x: '2023-03-02', y: 25, size: 18 }, // 여섯 번째 점
    ],
  },
];

const MyScatterChart = () => (
  <div style={{ width: 500, height: 500 }}>
    <ResponsiveScatterPlot
      data={scatterData}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }} // X축을 날짜로 설정
      xFormat='time:%Y-%m-%d'
      yScale={{ type: 'linear' }} // Y축은 숫자 값
      axisBottom={{
        format: '%Y-%m-%d',
        tickValues: 'every year',
        legend: '날짜',
        legendPosition: 'middle',
        legendOffset: 46,
      }}
      axisLeft={{
        legend: 'Value',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      colors={{ scheme: 'nivo' }} // 색상 테마
      nodeSize={node => node.data.size} // 각 점의 크기를 데이터에 맞춤
      useMesh={true}
      tooltip={({ node }) => (
        <div
          style={{
            padding: '12px',
            background: 'white',
            border: '1px solid #ccc',
          }}
        >
          <strong>{node.serieId}</strong>
          <br />
          날짜: {node.data.x}
          <br />
          값: {node.data.y}
        </div>
      )}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          symbolSize: 12,
          symbolShape: 'circle',
        },
      ]}
    />
  </div>
);

export default MyScatterChart;
