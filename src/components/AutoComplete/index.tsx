import React, { FC, useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input";
import Icon from "../Icon";
import { useEffect } from "@storybook/addons";

interface DataSourceObject {
  value: string;
}
export type DataSoutceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 返回筛选后的结果 */
  fetchSuggestions: (
    keyword: string
  ) => DataSoutceType[] | Promise<DataSoutceType[]>;
  /** 选中某个结果 */
  onSelect?: (item: DataSoutceType) => void;
  renderOption?: (item: DataSoutceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState<DataSoutceType[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (inputValue) {
  //     const results = fetchSuggestions(inputValue);
  //     if (results instanceof Promise) {
  //       setLoading(true);
  //       setSuggestions([]);
  //       results.then((data) => {
  //         setLoading(false);
  //         setSuggestions(data);
  //       });
  //     } else {
  //       setSuggestions(results);
  //     }
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [fetchSuggestions, inputValue]);
  useEffect(() => {
    console.log(312);
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleSelect = (item: DataSoutceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
  };

  const renderTemplate = (item: DataSoutceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="nact-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
