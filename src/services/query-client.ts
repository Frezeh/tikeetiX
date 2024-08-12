import { QueryCache, QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (_, query) => {
      let errorMsg = query?.meta?.errorMessage as string;
      if (errorMsg) {
        //toast.error(errorMsg);
      }
    },
  }),
});
