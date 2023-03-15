import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useQueryClient = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: false,
          },
          queries: {
            retry: false,
            staleTime: Infinity,
          },
        },
      })
  );
  return { queryClient };
};
