// ROUTER
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// PUBLIC
import LandingPage from '@/pages/public/LandingPage';
import DetailsPage from '@/pages/public/DetailsPage';
import SeatSelectionPage from '@/pages/public/SeatSelectionPage';
import NotFoundPage from '@/pages/public/NotFoundPage';

// AUTH
import LogInPage from '@/pages/public/LogInPage';
import SignUpPage from '@/pages/public/SignUpPage';
import LogOutPage from '@/pages/common/LogOutPage';

// USER
import UserLayout from '@/components/layout/UserLayout';
import HomePage from '@/pages/user/HomePage';
import TicketsPage from '@/pages/user/TicketsPage';

// ADMIN
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import VenuesPage from '@/pages/admin/VenuesPage';
import VenuePage from '@/pages/admin/VenuePage';
import SeatEditorPage from '@/pages/admin/SeatEditorPage';

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
    element: <SeatSelectionPage />,
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
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/home/tickets',
        element: <TicketsPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard/venues',
        element: <VenuesPage />,
      },
      {
        path: '/dashboard/venues/:id',
        element: <VenuePage />,
      },
      {
        path: '/dashboard/editSeats/:id',
        element: <SeatEditorPage />,
      },
    ],
  },
  {
    path: '/logout',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <LogOutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
