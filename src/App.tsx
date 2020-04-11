import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert";
import Menu from "./components/Menu";
import Tabs from "./components/Tabs";

const { TabItem } = Tabs;

function App() {
  return (
    <div className="App" data-testid="test-app">
      <header className="App-header">
        <Tabs mode="card">
          <TabItem label="tab1">
            content1<h2>321</h2>
          </TabItem>
          <TabItem label="tab2" disabled>
            content2
          </TabItem>
          <TabItem label="选择卡3">content3</TabItem>
          <TabItem label="选择想444444444">
            <Tabs mode="default">
              <TabItem label="tab1">
                content1<h2>321</h2>
              </TabItem>
              <TabItem disabled label="tab2">
                content2
              </TabItem>
              <TabItem label="选择卡3">content3</TabItem>
              <TabItem label="选择想444444444">content4</TabItem>
            </Tabs>
          </TabItem>
        </Tabs>
        {/* <Menu defaultIndex={"0"} onSelect={(index) => console.log(index)}>
          <Menu.Item>link 1</Menu.Item>
          <Menu.Item disabled>link 2</Menu.Item>
          <Menu.Item>link 3</Menu.Item>
        </Menu>
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
          mode="horizontal"
        >
          <Menu.Item>item 321</Menu.Item>
          <Menu.SubMenu title="drop">
            <Menu.Item>sub 1</Menu.Item>
            <Menu.Item>sub 2</Menu.Item>
            <Menu.Item>sub 3</Menu.Item>
            <Menu.Item>sub 4</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
          mode="vertical"
          defaultOpenSubMenus={[]}
        >
          <Menu.Item>item 321</Menu.Item>
          <Menu.SubMenu title="drop 1">
            <Menu.Item>sub 1</Menu.Item>
            <Menu.Item>sub 2</Menu.Item>
            <Menu.Item>sub 3</Menu.Item>
            <Menu.Item>sub 4</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="drop 22">
            <Menu.Item>sub 1</Menu.Item>
            <Menu.Item>sub 2</Menu.Item>
            <Menu.Item>sub 3</Menu.Item>
            <Menu.Item>sub 4</Menu.Item>
          </Menu.SubMenu>
        </Menu> */}
        {/* <Button className="button1" size={ButtonSize.Small} autoFocus>
          按钮1
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          hello
        </Button>
        <Button btnType={ButtonType.Danger}>hello</Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          link to url
        </Button>
        <Button
          btnType={ButtonType.Link}
          disabled={true}
          href="http://www.baidu.com"
        >
          <span>link to url</span>
        </Button>
        <Button
          btnType={ButtonType.Primary}
          onClick={() => window.alert("nnn")}
          target="_blank"
        >
          按钮3
        </Button> */}
        {/* <Alert type="default" content="default content" />
        <Alert type="success" content="success content" title="提示标题" />
        <Alert type="danger" content="danger content" title="提示标题" />
        <Alert
          type="warning"
          content="warning content"
          title="提示标题"
          closable
        /> */}
      </header>
    </div>
  );
}

export default App;
