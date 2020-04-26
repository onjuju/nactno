import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import AutoComplete, { DataSoutceType } from "./index";
import { action } from "@storybook/addon-actions";

interface LakerPlayerProps {
  value: string;
  number: number;
}

const SimpleComplete = () => {
  const lakers = [
    "pope",
    "caruso",
    "cooke",
    "AD",
    "green",
    "McGee",
    "james",
    "kobe",
  ];
  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "james", number: 23 },
    { value: "pope", number: 1 },
    { value: "davis", number: 6 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
    { value: "caruso", number: 4 },
  ];

  // const handleFetch = (query: string) => {
  //   return lakers
  //     .filter((name) => name.includes(query))
  //     .map((name) => ({ value: name }));
  // };

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.items);
        const formatItems = res.items.slice(0, 10).map((user: any) => ({
          value: user.login,
          ...user,
        }));
        return Promise.resolve(formatItems);
      });
  };
  const renderOption = (item: any) => {
    return (
      <>
        <span>
          <img src={item.avatar_url} style={{ width: "50px" }} />
        </span>
        <span>Name: {item.login}</span>
      </>
    );
  };

  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((item) => item.value.includes(query));
  // };

  // const renderOption = (i: DataSoutceType) => {
  //   const item = i as DataSoutceType<LakerPlayerProps>;
  //   return (
  //     <h2>
  //       Name: {item.value} - {item.number}
  //     </h2>
  //   );
  // };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      renderOption={renderOption}
    />
  );
};

storiesOf("AutoComplete Component", module).add(
  "AutoComplete",
  SimpleComplete
);
