import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/MenuItem";

function App() {
  return (
    <div className="App" data-testid="test-app">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
          <Menu.Item index={0}>link 1</Menu.Item>
          <Menu.Item index={1} disabled>
            link 2
          </Menu.Item>
          <Menu.Item index={2}>link 3</Menu.Item>
        </Menu>
        <Menu
          defaultIndex={0}
          onSelect={(index) => console.log(index)}
          mode="vertical"
        >
          <MenuItem index={0}>link 1</MenuItem>
          <MenuItem index={1} disabled>
            link 2
          </MenuItem>
          <MenuItem index={2}>link 3</MenuItem>
        </Menu>
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
