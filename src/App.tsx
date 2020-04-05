import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <Alert type="default" content="default content" />
        <Alert type="success" content="success content" title="提示标题" />
        <Alert type="danger" content="danger content" title="提示标题" />
        <Alert
          type="warning"
          content="warning content"
          title="提示标题"
          closable
        />
        learn react
      </header>
    </div>
  );
}

export default App;
