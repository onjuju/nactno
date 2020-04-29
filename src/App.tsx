import React, { useState, useEffect } from "react";
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
import axios from "axios";

library.add(fas);

function App() {
  const [title, setTitle] = useState("");
  const postData = {
    title: "my title",
    boly: "hello man",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      console.log(formData);

      axios.post("http://www.mocky.io/v2/5ea904032d0000dfcd3a423f", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res);
      })
      console.log(files, uploadedFile);
      
    }
  }

  return (
    <div className="App" data-testid="test-app">
      <input type="file" name="myfile" onChange={handleFileChange} />

      <section>
        {/* <Auto /> */}
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
