// ROUTER
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// PUBLIC
import LandingPage from '@/pages/LandingPage';
import DetailsPage from '@/pages/DetailsPage';
import SeatSelectionPage from '@/features/event/pages/SeatSelectionPage';
import NotFoundPage from '@/pages/NotFoundPage';

// AUTH
import LogInPage from '@/features/auth/pages/LogInPage';
import SignUpPage from '@/features/auth/pages/SignUpPage';
import LogOutPage from '@/features/auth/pages/LogOutPage';

// USER
import UserLayout from '@/components/layout/UserLayout';
import HomePage from '@/features/auth/user/pages/HomePage';

// ADMIN
import AdminLayout from '@/components/layout/AdminLayout';
import AdminPanel from '@/features/auth/admin/pages/AdminPanel';
import ShowsPage from '@/features/show/pages/ShowsPage';
import EventsPage from '@/features/event/pages/EventsPage';
import EventPage from '@/features/event/pages/EventPage';
import VenuesPage from '@/features/venue/pages/VenuesPage';
import PerformersPage from '@/features/performer/pages/PerformersPage';
import UsersPage from '@/features/user/pages/UsersPage';
import VenuePage from '@/features/venue/pages/VenuePage';
import SeatEditionPage from '@/features/venue/pages/SeatEditionPage';
import SeatPricingPage from '@/features/event/pages/SeatPricingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/event-details/:id',
    element: <DetailsPage />,
  },
  {
    path: '/event-seats/:id',
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
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPanel />,
      },
      {
        path: '/admin/shows',
        element: <ShowsPage />,
      },
      {
        path: '/admin/events',
        element: <EventsPage />,
      },
      {
        path: '/admin/events/:id',
        element: <EventPage />,
      },
      {
        path: '/admin/events/update-pricing/:id',
        element: <SeatPricingPage />,
      },
      {
        path: '/admin/venues',
        element: <VenuesPage />,
      },
      {
        path: '/admin/venues/:id',
        element: <VenuePage />,
      },
      {
        path: '/admin/performers',
        element: <PerformersPage />,
      },
      {
        path: '/admin/users',
        element: <UsersPage />,
      },
      {
        path: '/admin/venues/edit-seats/:id',
        element: <SeatEditionPage />,
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
