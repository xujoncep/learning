import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { DocPage } from '@/pages/DocPage';
import { SectionPage } from '@/pages/SectionPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { LoginPage } from '@/pages/LoginPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { HandbooksPage } from '@/pages/HandbooksPage';
import { ProtectedRoute } from '@/lib/auth';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showSearch>
            <HomePage />
          </Layout>
        }
      />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* Protected: dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Public handbooks index */}
      <Route
        path="/handbooks"
        element={<HandbooksPage />}
      />

      {/* Sections: public at /sections/:id, but gate-cse gated inside the page */}
      <Route
        path="/sections/:sectionId"
        element={
          <Layout showSearch>
            <SectionPage />
          </Layout>
        }
      />

      {/* DocPage renders its own chrome (Course vs Article); gates gate-cse internally */}
      <Route path="/docs/*" element={<DocPage />} />

      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
