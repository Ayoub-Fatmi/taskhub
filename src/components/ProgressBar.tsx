type ProgressBarProps = {
    segments: {
      value: number;
      color: string;
      label?: string;
    }[];
    total: number;
  };
  
  export const ProgressBar = ({ segments, total }: ProgressBarProps) => {
    let accumulatedWidth = 0;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        {segments.map((segment, index) => {
          const width = (segment.value / total) * 100;
          const style = {
            width: `${width}%`,
            backgroundColor: segment.color,
            marginLeft: `${accumulatedWidth}%`
          };
          accumulatedWidth += width;
  
          return (
            <div 
              key={index}
              className="h-4 rounded-full" 
              style={style}
              title={segment.label}
            ></div>
          );
        })}
      </div>
    );
  };