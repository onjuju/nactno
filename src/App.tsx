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
       
         
      </header>
    </div>
  );
}

export default App;
