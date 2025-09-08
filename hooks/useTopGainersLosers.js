import { useQuery } from '@tanstack/react-query';
import { fetchTopGainersLosers } from '../services/fetchTopGainersLosersApi';

export const useTopGainersLosers = () => {
  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ['topGainersLosers'],
    queryFn: fetchTopGainersLosers,
  });
  return { data, isLoading, error,refetch };
};
