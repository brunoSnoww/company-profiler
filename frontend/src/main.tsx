import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProfileDisplay } from './components/ProfileDisplay.tsx';
import {ErrorCard} from "./components/ErrorCard.tsx";
import {NotificationProvider} from "./contexts/NotificationContext.tsx";
import {ModelProvider} from "./contexts/Model.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <div style={{ padding: '2rem' }}>Select a profile to start.</div>
            },
            {
                path: 'profile/:profileUrl',
                element: <ProfileDisplay />,
                errorElement: <ErrorCard />
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <ModelProvider>
                    <RouterProvider router={router} />
                </ModelProvider>
            </NotificationProvider>
        </QueryClientProvider>
    </StrictMode>,
);