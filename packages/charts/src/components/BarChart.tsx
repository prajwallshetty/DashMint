import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BarChartDataItem {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDataItem[];
  color?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data = [],
  color = '#4F7061', // Sage brand color
  height = 220,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (data.length === 0) return null;

  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  const chartWidth = Math.max(width - padding.left - padding.right, 0);
  const chartHeight = Math.max(height - padding.top - padding.bottom, 0);

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1) * 1.1;
  const minVal = 0;

  const barWidth = Math.max((chartWidth / data.length) * 0.6, 6);
  const barGap = (chartWidth / data.length) * 0.4;

  const points = data.map((d, i) => {
    const x = padding.left + i * (barWidth + barGap) + barGap / 2;
    const barHeight = ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
    const y = padding.top + chartHeight - barHeight;
    return { x, y, barHeight, label: d.label, value: d.value };
  });

  const gridLinesCount = 4;
  const gridLines = Array.from({ length: gridLinesCount }).map((_, i) => {
    const y = padding.top + (i / (gridLinesCount - 1)) * chartHeight;
    const val = maxVal - (i / (gridLinesCount - 1)) * (maxVal - minVal);
    return { y, value: Math.round(val) };
  });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current || points.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const barCenterX = pt.x + barWidth / 2;
      const diff = Math.abs(barCenterX - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
    setTooltipPos({
      x: points[closestIdx].x + barWidth / 2,
      y: points[closestIdx].y - 10,
    });
  };

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <svg
        width={width || '100%'}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={padding.left + chartWidth}
              y2={line.y}
              stroke="currentColor"
              className="text-border/40"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={line.y + 4}
              textAnchor="end"
              className="text-[10px] font-semibold text-muted-foreground/80 fill-current"
            >
              {line.value}
            </text>
          </g>
        ))}

        {/* Bars */}
        {points.map((pt, i) => (
          <g key={i}>
            <motion.rect
              initial={{ height: 0, y: padding.top + chartHeight }}
              animate={{ height: pt.barHeight, y: pt.y }}
              transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.04 }}
              x={pt.x}
              width={barWidth}
              rx={Math.min(barWidth / 2.5, 8)} // Soft UI rounding corners
              ry={Math.min(barWidth / 2.5, 8)}
              fill={color}
              className="transition-opacity duration-150"
              style={{
                opacity: hoverIndex === null ? 0.95 : hoverIndex === i ? 1 : 0.45,
              }}
            />
          </g>
        ))}

        {/* X Axis labels */}
        {points.map((pt, i) => {
          const step = Math.ceil(points.length / 6);
          if (i % step !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={i}
              x={pt.x + barWidth / 2}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              className="text-[10px] font-semibold text-muted-foreground/80 fill-current"
            >
              {pt.label}
            </text>
          );
        })}
      </svg>

      {/* Floating HTML Tooltip */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              left: tooltipPos.x - 60,
              top: tooltipPos.y - 42,
            }}
            className="absolute z-10 w-[120px] rounded-xl border border-border bg-background px-3 py-1.5 text-center shadow-soft-sm pointer-events-none"
          >
            <div className="text-[10px] font-bold text-muted-foreground/90 uppercase tracking-wide truncate">
              {data[hoverIndex].label}
            </div>
            <div className="text-sm font-extrabold text-foreground leading-tight mt-0.5">
              {data[hoverIndex].value}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
