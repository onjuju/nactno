import React, { useState } from "react";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import Button from "./components/Button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Alert from "./components/Alert";
import Icon from "./components/Icon";
import Menu from "./components/Menu";
import Transition from "./components/Transition";
import Input from "./components/Input";
import Auto from "./AutoCompleteTest";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="App" data-testid="test-app">
      <header className="App-header"></header>
      <section>
        <Auto />
        {/* <Alert content="content" title="title" closable />
        <Input />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="sm"
          prepand="https://"
          icon={{
            icon: "calendar-day",
            theme: "danger",
          }}
          defaultValue="111"
        />
        <br />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          append=".com"
          prepand="https://"
        />
        <br />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="lg"
          icon={{
            icon: "marker",
            theme: "dark",
          }}
        /> */}
        <br />
      </section>
    </div>
  );
}

export default App;
