import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {}

export const defaults: PanelOptions = {};

export interface Buffer extends Vector {
  buffer: Array<{ coordinate: { x: number; y: number; z: number }; timestamp: number }>;
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}

export interface DataModel {
  x: number[];
  y: number[];
  z: number[];
  text: string[];
  hovertemplate: string;
  type: string;
  mode: string;
  marker: object;
}
