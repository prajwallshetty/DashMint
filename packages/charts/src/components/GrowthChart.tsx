import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export interface GrowthChartDataItem {
  label: string;
  actual: number;
  target: number;
}

export interface GrowthChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: GrowthChartDataItem[];
  height?: number;
  actualColor?: string;
  targetColor?: string;
}

export const GrowthChart: React.FC<GrowthChartProps> = ({
  data = [],
  height = 220,
  actualColor = '#4F7061', // Primary brand color
  targetColor = '#DDD8CD', // Border/Muted color
  className,
  ...props
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

  const values = data.flatMap((d) => [d.actual, d.target]);
  const maxVal = Math.max(...values, 1) * 1.1;
  const minVal = 0;

  const groupWidth = Math.max((chartWidth / data.length) * 0.7, 16);
  const groupGap = (chartWidth / data.length) * 0.3;
  const barWidth = groupWidth / 2.2;

  const points = data.map((d, i) => {
    const groupX = padding.left + i * (groupWidth + groupGap) + groupGap / 2;
    const actualX = groupX;
    const targetX = groupX + barWidth + (groupWidth * 0.05);

    const actualHeight = ((d.actual - minVal) / (maxVal - minVal)) * chartHeight;
    const actualY = padding.top + chartHeight - actualHeight;

    const targetHeight = ((d.target - minVal) / (maxVal - minVal)) * chartHeight;
    const targetY = padding.top + chartHeight - targetHeight;

    return {
      groupX,
      actualX,
      targetX,
      actualY,
      actualHeight,
      targetY,
      targetHeight,
      label: d.label,
      actual: d.actual,
      target: d.target,
    };
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
      const groupCenterX = pt.groupX + groupWidth / 2;
      const diff = Math.abs(groupCenterX - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
    setTooltipPos({
      x: points[closestIdx].groupX + groupWidth / 2,
      y: Math.min(points[closestIdx].actualY, points[closestIdx].targetY) - 10,
    });
  };

  return (
    <div ref={containerRef} className={cn('w-full relative select-none', className)} {...props}>
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

        {/* Double Columns */}
        {points.map((pt, i) => (
          <g key={i}>
            {/* Actual Column */}
            <motion.rect
              initial={{ height: 0, y: padding.top + chartHeight }}
              animate={{ height: pt.actualHeight, y: pt.actualY }}
              transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.04 }}
              x={pt.actualX}
              width={barWidth}
              rx={Math.min(barWidth / 2.5, 6)}
              ry={Math.min(barWidth / 2.5, 6)}
              fill={actualColor}
              className="transition-opacity duration-150"
              style={{
                opacity: hoverIndex === null ? 0.95 : hoverIndex === i ? 1 : 0.45,
              }}
            />

            {/* Target Column */}
            <motion.rect
              initial={{ height: 0, y: padding.top + chartHeight }}
              animate={{ height: pt.targetHeight, y: pt.targetY }}
              transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.04 + 0.02 }}
              x={pt.targetX}
              width={barWidth}
              rx={Math.min(barWidth / 2.5, 6)}
              ry={Math.min(barWidth / 2.5, 6)}
              fill={targetColor}
              className="transition-opacity duration-150"
              style={{
                opacity: hoverIndex === null ? 0.85 : hoverIndex === i ? 0.95 : 0.35,
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
              x={pt.groupX + groupWidth / 2}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              className="text-[10px] font-semibold text-muted-foreground/80 fill-current"
            >
              {pt.label}
            </text>
          );
        })}
      </svg>

      {/* Comparative HTML Tooltip */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              left: tooltipPos.x - 70,
              top: tooltipPos.y - 60,
            }}
            className="absolute z-10 w-[140px] rounded-xl border border-border bg-background px-3 py-2.5 text-center shadow-soft-sm pointer-events-none flex flex-col gap-1"
          >
            <div className="text-[10px] font-bold text-muted-foreground/90 uppercase tracking-wide truncate">
              {data[hoverIndex].label}
            </div>
            <div className="flex items-center justify-between text-xs font-bold w-full border-t border-border/40 pt-1 mt-0.5">
              <span className="text-muted-foreground">Actual:</span>
              <span className="text-foreground">{data[hoverIndex].actual}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold w-full">
              <span className="text-muted-foreground">Target:</span>
              <span className="text-foreground">{data[hoverIndex].target}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
