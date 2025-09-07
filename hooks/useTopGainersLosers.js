import { useQuery } from '@tanstack/react-query';
import { fetchTopGainersLosers } from '../services/api';

export const useTopGainersLosers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topGainersLosers'],
    queryFn: fetchTopGainersLosers,
  });
  return { data, isLoading, error };
};
