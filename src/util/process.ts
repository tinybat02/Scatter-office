import { Frame } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const processData = (series: Array<Frame>) => {
  const xData: number[] = [];
  const yData: number[] = [];
  const zData: number[] = [];
  const textData: string[] = [];

  series[0].fields[0].values.buffer.map((point) => {
    xData.push(point.coordinate.x);
    yData.push(point.coordinate.y);
    zData.push(point.coordinate.z);

    const datetime = dayjs(point.timestamp).tz('Europe/Berlin');
    textData.push(datetime.format('HH:mm:ss'));
  });

  return [
    {
      x: xData,
      y: yData,
      z: zData,
      text: textData,
      hovertemplate: '<b>%{text}</b><br>' + '%{z} z<br>' + '%{x} x<br>' + '%{y} y',
      type: 'scatter3d',
      mode: 'markers',
      marker: { size: 5 },
    },
  ];
};
