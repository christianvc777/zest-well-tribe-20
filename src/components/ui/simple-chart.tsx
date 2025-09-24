import { useMemo } from "react";

interface SimpleChartProps {
  data: Array<{ day: string; value: number }>;
  height?: number;
  color?: string;
}

export function SimpleChart({ data, height = 120, color = "hsl(var(--primary))" }: SimpleChartProps) {
  const { maxValue, chartData, pathData } = useMemo(() => {
    const maxVal = Math.max(...data.map(d => d.value));
    const padding = 20;
    const chartWidth = 300;
    const chartHeight = height - padding * 2;
    
    const chartPoints = data.map((point, index) => ({
      ...point,
      x: (index / (data.length - 1)) * chartWidth + padding,
      y: height - ((point.value / maxVal) * chartHeight + padding)
    }));

    const path = chartPoints
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return {
      maxValue: maxVal,
      chartData: chartPoints,
      pathData: path
    };
  }, [data, height]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-card rounded-lg">
      <svg viewBox={`0 0 340 ${height}`} className="w-full h-full">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <line
            key={index}
            x1="20"
            y1={height - (ratio * (height - 40) + 20)}
            x2="320"
            y2={height - (ratio * (height - 40) + 20)}
            stroke="hsl(var(--muted))"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        
        {/* Chart line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {chartData.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={color}
            className="hover:r-4 transition-all"
          />
        ))}
        
        {/* X-axis labels */}
        {chartData.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={height - 5}
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--muted-foreground))"
          >
            {point.day}
          </text>
        ))}
        
        {/* Y-axis labels */}
        {[0, 0.5, 1].map((ratio, index) => (
          <text
            key={index}
            x="15"
            y={height - (ratio * (height - 40) + 20) + 3}
            textAnchor="end"
            fontSize="10"
            fill="hsl(var(--muted-foreground))"
          >
            {Math.round(maxValue * ratio)}
          </text>
        ))}
      </svg>
    </div>
  );
}