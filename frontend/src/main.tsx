import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NotificationProvider} from "./contexts/NotificationContext.tsx";

const qc = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchOnMount: false
        },
    },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={qc}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
      </QueryClientProvider>
  </StrictMode>,
)
