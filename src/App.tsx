import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import Button from "./components/Button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Alert from "./components/Alert";
import Icon from "./components/Icon";
import Menu from "./components/Menu";
import Transition from "./components/Transition";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App" data-testid="test-app">
      <header className="App-header">
        {/* <Icon icon="ship" theme="primary" size="2x" />
        <Icon icon="ship" theme="danger" size="2x" />
        <Icon icon="ship" theme="info" size="2x" />
        <Icon icon="ship" theme="dark" size="2x" />
        <Icon icon="ship" theme="success" size="2x" />
        <Icon icon="ship" theme="warning" size="2x" /> */}
        <Menu defaultIndex={"0"} onSelect={(index) => console.log(index)}>
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
          <Menu.SubMenu title="dropdown">
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
        </Menu>
        <Button size="lg" onClick={() => setShow((show) => !show)}>
          SET SHOW
        </Button>

        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>
              Edit<code>src/App.tsx</code> and save to reload
            </p>
            <p>
              Edit<code>src/App.tsx</code> and save to reload
            </p>
            <p>
              Edit<code>src/App.tsx</code> and save to reload
            </p>
            <p>
              Edit<code>src/App.tsx</code> and save to reload
            </p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-right" wrapper>
          <Button btnType="primary" size="sm">
            sm button!
          </Button>
        </Transition>
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
        />
        learn react
        /> */}
      </header>
    </div>
  );
}

export default App;
