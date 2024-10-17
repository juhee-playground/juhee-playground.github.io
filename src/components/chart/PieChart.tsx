import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'Vue',
    label: 'Vue',
    value: 50,
    color: 'hsl(153.5, 40%, 70%)', // 채도를 낮추고 밝기를 높임
  },
  {
    id: 'React',
    label: 'React',
    value: 30,
    color: 'hsl(188.98, 60%, 70%)', // 채도를 낮추고 밝기를 높임
  },
  {
    id: 'Php',
    label: 'Php',
    value: 20,
    color: 'hsl(235.93, 35%, 70%)', // 채도를 낮추고 밝기를 높임
  },
];

const MyPieChart = () => {
  return (
    <div style={{ width: 400, height: 360 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5} // 도넛 모양을 위해 중앙이 비도록 설정
        padAngle={2} // 각 데이터 조각 간의 패딩
        cornerRadius={3} // 각 조각의 모서리를 둥글게
        colors={{ datum: 'data.color' }} // 각 데이터의 color 필드를 사용
        borderWidth={1} // 데이터 조각의 테두리 두께
        borderColor={{ from: 'color' }} // 테두리 색상
        arcLabelsSkipAngle={10} // 각도가 작으면 라벨 생략
        arcLabelsTextColor='#242424'
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#333333',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyPieChart;
