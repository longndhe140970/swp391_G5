import { Layout } from "antd";
import Footer from "./Footer";
import Header from "./Header";
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

const MainLayout = ({ children }) => {
  return (<>
    <Layout style={layoutStyle}>
      <Header />
      <div className="w-full min-h-screen bg-white">{children}</div>
      <Footer />
    </Layout>
  </>);
}

export default MainLayout;