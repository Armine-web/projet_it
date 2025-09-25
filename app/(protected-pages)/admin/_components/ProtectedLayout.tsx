'use client'

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Spin, Layout, Menu, theme } from 'antd';
import Link from 'next/link';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href='/admin/dashboard'>Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link href="/admin/navbar">Navbar</Link>, '2', <DesktopOutlined />),
  getItem('Home Page', 'sub1', <UserOutlined />, [
    getItem(<Link href="/admin/home/services">Service</Link>, '3'),
    getItem(<Link href="/admin/home/slider">Slider</Link>, '4'),
    getItem(<Link href="/admin/alex">Alex</Link>, '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem(<Link href="/admin/team-1">Team 1</Link>, '6'),
    getItem(<Link href="/admin/team-2">Team 2</Link>, '8'),
  ]),
  getItem(<Link href="/admin/files">Files</Link>, '9', <FileOutlined />),
];

export function ProtectedLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true)
  }, []);

  
  
  const pathname = usePathname();
  const pathToKey: Record<string, string> = { // Նոր
  '/admin/dashboard': '1',
  '/admin/navbar': '2',
  '/admin/slider': '3',
  '/admin/top-products': '4',
  '/admin/alex': '5',
  '/admin/team-1': '6',
  '/admin/team-2': '8',
  '/admin/files': '9',
};

if (!mounted) return <div className=' flex justify-center items-center h-[100vh]'><Spin size="large" /></div>
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <div style={{color: 'white', textAlign: 'center', fontWeight: 'bold', padding: '1rem', }}>Welome</div>
        <Menu theme="dark"  selectedKeys={[pathToKey[pathname] || '']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: '1rem', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}  > <button>Logaut</button> </Header> 
        <Content style={{ margin: '0 16px' }}>

            {children}
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;