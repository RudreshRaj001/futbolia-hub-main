declare module 'web-vitals' {
  type MetricName = 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB';

  interface Metric {
    name: MetricName;
    value: number;
    delta: number;
    id: string;
    entries: PerformanceEntry[];
  }

  type ReportHandler = (metric: Metric) => void;

  export function getCLS(onReport: ReportHandler, reportAllChanges?: boolean): void;
  export function getFCP(onReport: ReportHandler): void;
  export function getFID(onReport: ReportHandler): void;
  export function getLCP(onReport: ReportHandler, reportAllChanges?: boolean): void;
  export function getTTFB(onReport: ReportHandler): void;
} 