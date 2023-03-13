import { FC } from "react";
import "../assets/css/styles.css";
import { BrowserRoutes } from "../components/Routes/BrowserRoutes";
import { useQueryClient } from "../common/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "../providers/notification/notification.provider";
import { LoggedUserProvider } from "../providers/auth/auth.provider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../common/utils/mui.utils";

export const App: FC = () => {
  const { queryClient } = useQueryClient();

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <LoggedUserProvider>
            <BrowserRoutes />
          </LoggedUserProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
