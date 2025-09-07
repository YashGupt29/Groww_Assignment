import { useQuery } from '@tanstack/react-query';
import { fetchCompanyOverview } from '../services/fetchCompanyOverview';

export const useCompanyOverview = (symbol) => {
  return useQuery({
    queryKey: ['companyOverview', symbol],
    queryFn: () => fetchCompanyOverview(symbol),
    enabled: !!symbol,
  });
};
