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
  const fallbackColors = [
    'hsl(235.93, 35%, 70%)',
    'hsl(153.5, 40%, 70%)',
    'hsl(188.98, 60%, 70%)',
    'hsl(270, 35%, 68%)',
  ];

  return (
    <>
      {tasks.map((task, i) => {
        const color = task.color ?? fallbackColors[i % fallbackColors.length];
        return (
        <rect
          key={i}
          className='bar'
          x={xScale(dayjs(task.startDate).toDate())}
          y={yPosition}
          width={xScale(dayjs(task.endDate).toDate()) - xScale(dayjs(task.startDate).toDate())}
          height={barHeight}
          rx={barRadius}
          ry={barRadius}
          fill={color}
          onMouseEnter={event => onMouseEnter(event, task, color)}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
        );
      })}
    </>
  );
};

export default Bars;
