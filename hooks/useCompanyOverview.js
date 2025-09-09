import { useQuery } from '@tanstack/react-query';
import { fetchCompanyOverview } from '../services/fetchCompanyOverview';
import Toast from 'react-native-toast-message';

export const useCompanyOverview = (symbol) => {
  return useQuery({
    queryKey: ['companyOverview', symbol],
    queryFn: () => fetchCompanyOverview(symbol),
    enabled: !!symbol,
    onError: (error) => {
      console.error("Error fetching company overview:", error);
      Toast.show({
        type: 'error',
        text1: 'API Limit exceeded',
      });
    },
  });
};
