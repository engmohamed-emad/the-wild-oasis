import { BrowserRouter, Navigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Settings from './pages/Settings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { max } from 'date-fns';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
    },
  },
});

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyles/>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/cabins" element={<Cabins />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{ marginTop: '8px' }}
      toastOptions={{
        success: {
          duration: 3000
        },
        error: {
          duration: 5000
        },
        style: {
      fontSize: '16px',
      fontWeight: 500,
      borderRadius: '4px',
      maxWidth: '500px',
      padding: '16px 24px',
      backgroundColor: 'var(--color-green-0)',
      color: 'var(--color-grey-700)',
    },
  }}
    />
    </QueryClientProvider>
    </>
  );
}

export default App;
