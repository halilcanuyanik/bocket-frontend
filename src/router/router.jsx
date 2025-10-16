import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LogInPage from '@/pages/LogInPage';
import SignUpPage from '@/pages/SignUpPage';

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
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/home',
    element: <div>This is home!</div>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
