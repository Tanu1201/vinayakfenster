import { useDarkMode } from '@/context/darkMode'
import { HomeOutlined } from '@ant-design/icons'
import {
  Layout as AntLayout,
  Breadcrumb,
  ConfigProvider,
  Menu,
  Skeleton,
  theme
} from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout: FC<{
  children: React.ReactNode
  title?: string
  loading?: boolean
  breadcrumbs?: { label: string; link?: string }[]
}> = ({ children, title, loading, breadcrumbs }) => {
  const { isDarkMode } = useDarkMode()

  const [collapsed, setCollapsed] = useState(true)
  const [collapsedWidth, setCollapsedWidth] = useState(80)

  useEffect(() => {
    const fn = () => setCollapsedWidth(window.innerWidth >= 768 ? 80 : 0)
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : null}

      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        <AntLayout hasSider>
          <AntLayout.Sider
            style={{
              position: 'fixed',
              zIndex: 1000,
              overflow: 'auto',
              height: '100dvh'
            }}
            trigger={null}
            collapsible
            breakpoint="md"
            collapsedWidth={collapsedWidth}
            collapsed={collapsed}
            theme={isDarkMode ? 'light' : 'dark'}
          >
            <Menu
              theme={isDarkMode ? 'light' : 'dark'}
              mode="inline"
              defaultSelectedKeys={
                breadcrumbs?.length &&
                breadcrumbs[breadcrumbs.length - 1]?.label
                  ? [breadcrumbs[breadcrumbs.length - 1]?.label!]
                  : []
              }
              items={[
                {
                  key: 'Home',
                  label: <Link href="/">Home</Link>,
                  icon: <HomeOutlined />
                }
              ]}
            />
          </AntLayout.Sider>
          <AntLayout
            className={`transition-all duration-300 ${
              collapsed ? 'md:ml-[80px]' : 'md:ml-[200px]'
            }`}
          >
            <Header
              sidebarCollapsed={collapsed}
              toggleSidebar={() => setCollapsed(prev => !prev)}
            />
            <AntLayout.Content
              className={`min-h-[calc(100dvh-110px)] px-2 md:px-4 lg:px-8`}
            >
              {breadcrumbs ? (
                <Breadcrumb
                  className="my-3"
                  items={breadcrumbs.map((b, i) => ({
                    key: i,
                    title: b.link ? (
                      <Link href={b.link}>{b.label}</Link>
                    ) : (
                      b.label
                    )
                  }))}
                />
              ) : null}
              {loading ? <Skeleton active /> : children}
            </AntLayout.Content>
            <Footer />
          </AntLayout>
        </AntLayout>
      </ConfigProvider>
    </>
  )
}
