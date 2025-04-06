import React from "react";
import {
  DashboardOutlined,
  LogoutOutlined,
  PoundOutlined,
  TransactionOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { icon: DashboardOutlined, title: "Dashboard", path: "/dashboard" },
  { icon: TransactionOutlined, title: "Transaction", path: "/transaction" },
  { icon: UserOutlined, title: "Listener", path: "/listener" },
  { icon: UploadOutlined, title: "Blog", path: "/blog" },
  { icon: PoundOutlined, title: "Premium", path: "/premium" },
  { icon: LogoutOutlined, title: "Logout", path: "/logout" },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: item.title,
  path: item.path,
}));

interface AdminLayoutsProps {
  children: React.ReactNode;
}

const AdminLayouts: React.FC<AdminLayoutsProps> = ({ children }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const hanldeOnClick = (path: string) => {
    if (path === "/logout") {
      logout();
      navigate("/");
    } else {
      navigate(path);
    }
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => hanldeOnClick(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: "#decfff",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayouts;
