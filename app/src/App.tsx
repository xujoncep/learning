import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { DocPage } from '@/pages/DocPage';
import { SectionPage } from '@/pages/SectionPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { LoginPage } from '@/pages/LoginPage';
import { DevLoginPage } from '@/pages/DevLoginPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { HandbooksPage } from '@/pages/HandbooksPage';
import { CoursesIndexPage } from '@/pages/CoursesIndexPage';
import { SubjectPage } from '@/pages/SubjectPage';
import { AboutPage } from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import { AdminPage } from '@/pages/AdminPage';
import { ProtectedRoute, AdminRoute } from '@/lib/auth';

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
      <Route path="/dev-login" element={<DevLoginPage />} />
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

      {/* Courses catalog — list of every course, links into per-section chapter pages */}
      <Route
        path="/courses"
        element={
          <Layout showSearch>
            <CoursesIndexPage />
          </Layout>
        }
      />

      {/* About — team, mission, tech stack */}
      <Route
        path="/about"
        element={
          <Layout showSearch>
            <AboutPage />
          </Layout>
        }
      />

      {/* Blog — placeholder, coming soon */}
      <Route
        path="/blog"
        element={
          <Layout showSearch>
            <BlogPage />
          </Layout>
        }
      />

      {/* Subject hub: groups related sections (e.g., DBMS → Concepts + MCQ) */}
      <Route
        path="/subjects/:subjectId"
        element={
          <Layout showSearch>
            <SubjectPage />
          </Layout>
        }
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

      {/* Admin: requires apiUser.is_admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout>
              <AdminPage />
            </Layout>
          </AdminRoute>
        }
      />

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
