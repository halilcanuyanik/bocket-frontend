// ROUTER
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// SPLASH
import LandingPage from '@/pages/LandingPage';

// AUTH
import LogInPage from '@/pages/LogInPage';
import SignUpPage from '@/pages/SignUpPage';

// USER
import HomePage from '@/pages/HomePage';
import DetailsPage from '@/pages/DetailsPage';
import SeatSelectionPage from '@/pages/SeatSelectionPage';
import TicketsPage from '@/pages/TicketsPage';

// ADMIN
import AdminPage from '@/pages/AdminPage';
import SeatEditorPage from '@/pages/SeatEditorPage';

// COMMON
import AccountPage from '@/pages/AccountPage';
import LogOutPage from '@/pages/LogOutPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/eventDetails/:id',
    element: <DetailsPage />,
  },
  {
    path: '/seats/:id',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <SeatSelectionPage />
      </ProtectedRoute>
    ),
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
    path: '/account',
    element: <AccountPage />,
  },
  {
    path: '/tickets',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <TicketsPage />
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
