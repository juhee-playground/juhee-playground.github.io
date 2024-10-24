import * as d3 from 'd3';
import dayjs from 'dayjs';

interface IXAxisProps {
  xScale: d3.ScaleTime<number, number>;
  innerHeight: number;
}

const XAxis = ({ xScale, innerHeight }: IXAxisProps) => {
  const tickValues = [
    dayjs('2017-05-02').toDate(),
    dayjs('2018-07-01').toDate(),
    dayjs('2022-11-30').toDate(),
    dayjs().toDate(),
  ];

  return (
    <g
      className='x-axis'
      transform={`translate(0, ${innerHeight})`}
      ref={node => {
        if (node) {
          d3.select(node).call(
            d3
              .axisBottom(xScale)
              .tickValues(tickValues)
              .tickFormat((domainValue: Date | d3.NumberValue) => {
                if (domainValue instanceof Date) {
                  return d3.timeFormat('%Y-%m-%d')(domainValue);
                } else if (typeof domainValue === 'number') {
                  return domainValue.toString();
                }
                return '';
              }),
          );
        }
      }}
    />
  );
};

export default XAxis;
