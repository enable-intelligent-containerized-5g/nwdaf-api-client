import { FC, ReactNode, useState } from "react";
import { Card, Layout, TabsProps, theme } from "antd";
import Logo from "./components/Logo";
import AnalyticsInfoView from "./pages/AnalyticsInfoView";
import ModelGenerationView from "./pages/ModelGenerationView";
import { GithubOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;

const tabs: TabsProps["items"] = [
  { key: "tab1", label: "Analysis Info NF" },
  { key: "tab2", label: "Model Generation" },
];

const contentList: Record<string, ReactNode> = {
  tab1: <AnalyticsInfoView />,
  tab2: <ModelGenerationView />,
};

const App: FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center overflow-y-auto">
      <Card
        className="w-[1280px]"
        title={<Logo className="max-w-[150px] max-h-[150px]" />}
        tabList={tabs}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        extra={
          <a
            target="_blank"
            href="https://github.com/enable-intelligent-containerized-5g"
          >
            <GithubOutlined className="text-4xl" />
          </a>
        }
      >
        <Layout className="h-full">
          <Content
            className="h-full"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="h-full">{contentList[activeTabKey]}</div>
          </Content>
          <Footer className="bg-white">
            <div className="flex justify-center items-center">
              <p className="text-center">
                ©2024 Created by Intelligent 5G Team
              </p>
            </div>
          </Footer>
        </Layout>
      </Card>
    </div>
  );
};

export default App;
