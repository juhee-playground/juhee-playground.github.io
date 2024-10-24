import { useRef, useState } from 'react';

import * as d3 from 'd3';
import dayjs from 'dayjs';

import Bars from '@/components/common/chart/Bars';
import Tooltip from '@/components/common/chart/Tooltip';
import XAxis from '@/components/common/chart/Xasix';

interface ITimeScaleChartProps {
  width: number;
  height: number;
  tasks: ITask[];
}

const today = dayjs();
const firstDay = dayjs('2017-05-02');

const TimelineChart = ({ width, height, tasks }: ITimeScaleChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const margin = { top: 40, right: 20, bottom: 50, left: 20 };

  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number; color: string } | null>(null);

  const handleMouseEnter = (event: React.MouseEvent, task: ITask, color: string) => {
    const duration = dayjs(task.endDate).diff(dayjs(task.startDate), 'month');
    setTooltip({
      content: `${task.name} ${dayjs(task.startDate).format('YY.MM')}~${dayjs(task.endDate).format(
        'YY.MM',
      )} (${duration}개월)`,
      x: event.pageX,
      y: event.pageY,
      color,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      setTooltip({ ...tooltip, x: event.pageX, y: event.pageY });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const xScale = d3
    .scaleTime()
    .domain([firstDay.toDate(), today.toDate()])
    .range([0, width - margin.left - margin.right]);

  return (
    <>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Bars
            tasks={tasks}
            xScale={xScale}
            yPosition={50}
            barHeight={20}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <XAxis xScale={xScale} innerHeight={height - margin.top - margin.bottom} />
        </g>
      </svg>
      {tooltip && <Tooltip content={tooltip.content} x={tooltip.x} y={tooltip.y} color={tooltip.color} />}
    </>
  );
};

export default TimelineChart;
