import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
