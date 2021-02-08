import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame, DataModel } from 'types';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import { processData } from './util/process';

const Plot = createPlotlyComponent(Plotly);

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: DataModel[] | null;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    data: null,
  };

  componentDidMount() {
    const series = this.props.data.series as Array<Frame>;
    if (series.length == 0) return;
    const data = processData(series);
    this.setState({ data });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Array<Frame>;
      if (series.length == 0) {
        this.setState({ data: null });
        return;
      }

      const data = processData(series);
      this.setState({ data });
    }
  }

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (!data) return <div>No data</div>;

    return (
      <div
        style={{
          width,
          height,
          padding: 0,
        }}
      >
        {/*         <img className="scatter3d-pane" src={Icon} onClick={this.onDownload} /> */}
        <Plot
          data={data}
          layout={{
            width: width,
            height: height - 50,
            margin: {
              l: 50,
              r: 50,
              b: 0,
              t: 0,
              pad: 0,
            },
            scene: {
              aspectmode: 'auto',
              xaxis: { title: 'X' },
              yaxis: { title: 'Y' },
              zaxis: { title: 'Z' },
              camera: {
                center: { x: 0, y: 0, z: 0 },
                eye: { x: 1.46, y: 1.58, z: 0.22 },
                up: { x: 0, y: 0, z: 1 },
              },
            },
            hoverlabel: {
              align: 'right',
              padding: {
                l: 10,
                r: 10,
                t: 10,
                b: 10,
              },
            },
          }}
          config={{ displayModeBar: false }}
        />
      </div>
    );
  }
}
