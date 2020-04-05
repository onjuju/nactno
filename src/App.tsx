import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="button1" size={ButtonSize.Small} autoFocus>
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
        </Button>
        <span>321</span>
        <h1>Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
        <hr />
        <code>const a = 321;</code>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
