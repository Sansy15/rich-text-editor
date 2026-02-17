// Type definitions for the application

export interface EditorConfig {
  namespace: string;
  theme: Record<string, string>;
  nodes: any[];
  onError: (error: Error) => void;
}

export interface MathNodeData {
  value: string;
  inline: boolean;
}

export interface TableConfig {
  rows: number;
  columns: number;
}
