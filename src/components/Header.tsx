import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => (
  <Header>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/blog">Blog</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/fake-api">Fake API</Link></Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
