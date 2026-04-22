import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { DocPage } from '@/pages/DocPage';
import { SectionPage } from '@/pages/SectionPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/sections/:sectionId"
        element={
          <Layout showSidebar={false} showSearch>
            <SectionPage />
          </Layout>
        }
      />
      {/* DocPage renders its own chrome (header/sidebar) — Course vs Article */}
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
