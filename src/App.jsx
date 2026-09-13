import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import VaultLayout from './components/layout/VaultLayout';
import { VaultStoreProvider } from '@/lib/vaultStore';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import OtpPage from './pages/OtpPage';
import VaultPlaceholder from './pages/VaultPlaceholder';
import VaultPageNotFound from './pages/VaultPageNotFound';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-void">
        <div className="w-8 h-8 border-4 border-white/10 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <VaultStoreProvider>
      <Routes>
        <Route element={<VaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/categories" element={<VaultPlaceholder title="Categories" eyebrow="ARSENAL INDEX" />} />
          <Route path="/downloads" element={<VaultPlaceholder title="Downloads" eyebrow="VAULT DELIVERY" />} />
          <Route path="/messages" element={<VaultPlaceholder title="Messages" eyebrow="SECURE COMMS" />} />
          <Route path="/notifications" element={<VaultPlaceholder title="Notifications" eyebrow="SYSTEM ALERTS" />} />
          <Route path="/verify" element={<OtpPage />} />
          <Route path="*" element={<VaultPageNotFound />} />
        </Route>
      </Routes>
    </VaultStoreProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App