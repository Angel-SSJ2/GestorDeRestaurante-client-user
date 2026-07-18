import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage';
import { ExplorePage } from '../pages/ExplorePage';
import { ReservationsPage } from '../pages/ReservationsPage';
import { MenuPage } from '../pages/MenuPage';
import { EventsPage } from '../pages/EventsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import { PublicRoute } from '../shared/components/PublicRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<AuthPage />} />
      </Route>
      <Route path="/restaurant/:id/menu" element={<MenuPage />} />
      <Route path="/events" element={<EventsPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
