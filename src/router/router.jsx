import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LogInPage from '@/pages/LogInPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LogInPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
