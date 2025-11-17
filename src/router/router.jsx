import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import DetailsPage from '@/pages/DetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LogInPage from '@/pages/LogInPage';
import SignUpPage from '@/pages/SignUpPage';
import HomePage from '@/pages/HomePage';
import AdminPage from '@/pages/AdminPage';
import LogOutPage from '@/pages/LogOutPage';

import SeatEditor from '@/pages/SeatEditor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/seats/:id',
    element: <SeatEditor />,
  },
  {
    path: '/eventDetails/:id',
    element: <DetailsPage />,
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
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/logout',
    element: <LogOutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
