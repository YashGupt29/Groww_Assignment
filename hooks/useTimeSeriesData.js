import { useQuery } from '@tanstack/react-query';
// import { fetchTimeSeriesData } from '../services/fetchTimeSeriesData'; // Commented out API call
import { generateDummyTimeSeriesData } from '../utils/dummyTimeSeriesData'; // Import dummy data generator

export const useTimeSeriesData = (symbol, duration) => {
  return useQuery({
    queryKey: ['timeSeriesData', symbol, duration],
    queryFn: () => generateDummyTimeSeriesData(duration, symbol), // Use dummy data
    enabled: !!symbol && !!duration,
  });
};
