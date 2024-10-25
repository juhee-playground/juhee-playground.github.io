import { useRef, useState } from 'react';

import * as d3 from 'd3';

import Legend from '@/components/common/chart//Legend';
import Sectors from '@/components/common/chart/Sectors';
import Tooltip from '@/components/common/chart/Tooltip';

interface IPieChartProps {
  data: IPieData[];
  width: number;
  height: number;
}

const PieChart = ({ data, width, height }: IPieChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  //   const margin = { top: 40, right: 30, bottom: 50, left: 30 };

  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number; color: string } | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: d3.PieArcDatum<IPieData>,
    color: string,
  ) => {
    setTooltip({
      content: `${d.data.label}: ${d.data.value}`,
      x: event.pageX,
      y: event.pageY,
      color,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    if (tooltip) {
      setTooltip({ ...tooltip, x: event.pageX, y: event.pageY });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          <Sectors
            data={data}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </g>
      </svg>
      {tooltip && <Tooltip content={tooltip.content} x={tooltip.x} y={tooltip.y} color={tooltip.color} />}
      <Legend data={data} />
    </div>
  );
};

export default PieChart;
