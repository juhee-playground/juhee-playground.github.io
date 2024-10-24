import { useRef } from 'react';

import * as d3 from 'd3';
import dayjs from 'dayjs';

import Bars from '@/components/common/chart/Bars';
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

  const xScale = d3
    .scaleTime()
    .domain([firstDay.toDate(), today.toDate()])
    .range([0, width - margin.left - margin.right]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Bars tasks={tasks} xScale={xScale} yPosition={50} barHeight={20} />
        <XAxis xScale={xScale} innerHeight={height - margin.top - margin.bottom} />
      </g>
    </svg>
  );
};

export default TimelineChart;
