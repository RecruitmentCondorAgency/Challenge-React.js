import { FC } from "react";
import "../assets/css/styles.css";
import { BrowserRoutes } from "../components/Routes/BrowserRoutes";
import { useQueryClient } from "../common/hooks";
import { QueryClientProvider } from "@tanstack/react-query";

export const App: FC = () => {
  const { queryClient } = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRoutes />
    </QueryClientProvider>
  );
};
