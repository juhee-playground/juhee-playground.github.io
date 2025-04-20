import { QueryCache, QueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

const MILISECOND = 1000;
const SECOND = 600;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      if ((error as AxiosError).code === 'ERR_NETWORK') {
        toast.error(`서버와 연결되지 않습니다`);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: MILISECOND * SECOND,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default queryClient;
