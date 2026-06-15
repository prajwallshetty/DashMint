import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export interface PieChartDataItem {
  label: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  height?: number;
  donut?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  data = [],
  height = 200,
  donut = true,
}) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  if (data.length === 0) return null;

  const total = data.reduce((acc, d) => acc + d.value, 0);

  // Math dimensions
  const size = height;
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const innerRadius = donut ? radius * 0.65 : 0;

  // Generate paths
  let accumulatedAngle = -90; // Start at top center

  const segments = data.map((d, i) => {
    const percentage = d.value / total;
    const angle = percentage * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle = endAngle;

    // Convert angles to polar coordinates
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    
    // Outer arc coords
    const x1 = center + radius * Math.cos(toRadians(startAngle));
    const y1 = center + radius * Math.sin(toRadians(startAngle));
    const x2 = center + radius * Math.cos(toRadians(endAngle));
    const y2 = center + radius * Math.sin(toRadians(endAngle));

    // Inner arc coords (for donut chart)
    const ix1 = center + innerRadius * Math.cos(toRadians(endAngle));
    const iy1 = center + innerRadius * Math.sin(toRadians(endAngle));
    const ix2 = center + innerRadius * Math.cos(toRadians(startAngle));
    const iy2 = center + innerRadius * Math.sin(toRadians(startAngle));

    const largeArcFlag = angle > 180 ? 1 : 0;

    let path = '';
    if (donut) {
      path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        L ${ix1} ${iy1}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix2} ${iy2}
        Z
      `;
    } else {
      path = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
    }

    // Centroid angle for offset animations
    const midAngle = startAngle + angle / 2;
    const dx = Math.cos(toRadians(midAngle)) * 5;
    const dy = Math.sin(toRadians(midAngle)) * 5;

    return {
      path,
      dx,
      dy,
      label: d.label,
      value: d.value,
      percentage: Math.round(percentage * 100),
      color: d.color,
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 select-none">
      {/* Chart SVG */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible">
          {segments.map((seg, i) => {
            const isHovered = hoverIndex === i;
            return (
              <motion.path
                key={i}
                d={seg.path}
                fill={seg.color}
                stroke="white"
                strokeWidth="2.5"
                animate={{
                  x: isHovered ? seg.dx : 0,
                  y: isHovered ? seg.dy : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer origin-center transition-opacity duration-150"
                style={{
                  opacity: hoverIndex === null ? 0.95 : isHovered ? 1 : 0.65,
                }}
              />
            );
          })}
        </svg>

        {/* Center label for Donut chart */}
        {donut && (
          <div
            className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
            style={{
              left: center - innerRadius * 0.9,
              top: center - innerRadius * 0.9,
              width: innerRadius * 1.8,
              height: innerRadius * 1.8,
            }}
          >
            <span className="text-[10px] font-bold text-muted-foreground/85 uppercase tracking-wider">
              {hoverIndex !== null ? data[hoverIndex].label : 'Total'}
            </span>
            <span className="text-xl font-black text-foreground tracking-tight leading-none mt-1">
              {hoverIndex !== null ? data[hoverIndex].value : total}
            </span>
            {hoverIndex !== null && (
              <span className="text-[10px] font-extrabold text-primary leading-none mt-1">
                {segments[hoverIndex].percentage}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legends column */}
      <div className="flex flex-col gap-2.5 shrink-0 self-center">
        {segments.map((seg, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={cn(
              'flex items-center gap-3.5 px-3 py-1.5 rounded-xl border border-transparent transition-all duration-150 cursor-pointer',
              hoverIndex === i && 'border-border/40 bg-secondary/35'
            )}
          >
            <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <div className="flex items-center justify-between gap-6 w-full text-xs font-bold">
              <span className="text-muted-foreground/90 hover:text-foreground">{seg.label}</span>
              <span className="text-foreground">{seg.value} ({seg.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
