import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '*',
    element: <div>404 No page found!</div>,
  },
]);
