import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AreaChartDataItem {
  label: string;
  value: number;
}

export interface AreaChartProps {
  data: AreaChartDataItem[];
  color?: string; // Hex or tailwind variables
  height?: number;
}

export const AreaChart: React.FC<AreaChartProps> = ({
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
  const maxVal = Math.max(...values, 1) * 1.1; // 10% breathing room
  const minVal = 0;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // Generate standard bezier curve
  const generatePath = () => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = generatePath();
  const fillPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`
    : '';

  // Grid lines
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
    
    // Find closest index
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
    setTooltipPos({
      x: points[closestIdx].x,
      y: points[closestIdx].y - 12,
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <svg
        width={width || '100%'}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.00" />
          </linearGradient>
        </defs>

        {/* Grid lines & Left labels */}
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

        {/* Gradient fill */}
        {fillPath && (
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            d={fillPath}
            fill="url(#area-gradient)"
          />
        )}

        {/* Area Line */}
        {linePath && (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* X Axis Labels */}
        {points.map((pt, i) => {
          // Render only a subset of labels if too crowded
          const step = Math.ceil(points.length / 6);
          if (i % step !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={i}
              x={pt.x}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              className="text-[10px] font-semibold text-muted-foreground/80 fill-current"
            >
              {pt.label}
            </text>
          );
        })}

        {/* Active hover items */}
        {hoverIndex !== null && (
          <g>
            {/* Guide line */}
            <line
              x1={points[hoverIndex].x}
              y1={padding.top}
              x2={points[hoverIndex].x}
              y2={padding.top + chartHeight}
              stroke="currentColor"
              className="text-primary/35"
              strokeWidth="1.5"
            />
            {/* Marker dot */}
            <circle
              cx={points[hoverIndex].x}
              cy={points[hoverIndex].y}
              r="5"
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="shadow-soft-sm"
            />
          </g>
        )}
      </svg>

      {/* Floating HTML Tooltip for clean renders and high-fidelity shadow support */}
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
