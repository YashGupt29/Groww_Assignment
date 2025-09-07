import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});
