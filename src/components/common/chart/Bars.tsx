import * as d3 from 'd3';
import dayjs from 'dayjs';

interface IBarProps {
  tasks: ITask[];
  xScale: d3.ScaleTime<number, number>;
  yPosition: number;
  barHeight: number;
  onMouseEnter: (event: React.MouseEvent, task: ITask, color: string) => void;
  onMouseMove: (event: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

const Bars = ({ tasks, xScale, yPosition, barHeight, onMouseEnter, onMouseMove, onMouseLeave }: IBarProps) => {
  const barRadius = 5;
  const colors = ['hsl(235.93, 35%, 70%)', 'hsl(153.5, 40%, 70%)', 'hsl(188.98, 60%, 70%)'];

  return (
    <>
      {tasks.map((task, i) => (
        <rect
          key={i}
          className='bar'
          x={xScale(dayjs(task.startDate).toDate())}
          y={yPosition}
          width={xScale(dayjs(task.endDate).toDate()) - xScale(dayjs(task.startDate).toDate())}
          height={barHeight}
          rx={barRadius}
          ry={barRadius}
          fill={colors[i % tasks.length]}
          onMouseEnter={event => onMouseEnter(event, task, colors[i % tasks.length])}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
};

export default Bars;
