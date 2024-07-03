import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import FakeApiPage from './pages/FakeApiPage';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout>
      <AppHeader />
      <Content className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/fake-api" element={<FakeApiPage />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
