import React from 'react';
import { Layout, theme } from 'antd';
import SideBar from './Components/SideBar';
const { Content, Sider } = Layout;

const ManagerLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider className='w-full' style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <SideBar />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px 26px',
            height: '95vh'
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerLayout;