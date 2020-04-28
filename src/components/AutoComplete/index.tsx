import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import classnames from "classnames";
import Input, { InputProps } from "../Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import useOutsideClick from "../../hooks/useOutsideClick";

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
  const [highlightIndex, setHighightIndex] = useState(-1);

  const ifTriggerSearch = useRef(false);

  // 防抖的搜索值
  const searchValue = useDebounce(inputValue, 400);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (searchValue && ifTriggerSearch.current) {
      const results = fetchSuggestions(searchValue);
      if (results instanceof Promise) {
        setLoading(true);
        setSuggestions([]);
        results
          .then((data) => {
            setSuggestions(data);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighightIndex(-1);
  }, [fetchSuggestions, searchValue]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        // enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        // up
        highlight(highlightIndex - 1);
        break;
      case 40:
        // down
        highlight(highlightIndex + 1);
        break;
      case 27:
        // esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    ifTriggerSearch.current = true;
  };

  const handleSelect = (item: DataSoutceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
    ifTriggerSearch.current = false;
  };

  const renderTemplate = (item: DataSoutceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classnames("suggestion-item", {
            "item-highlighted": index === highlightIndex,
          });
          return (
            <li
              className={classes}
              key={index}
              onClick={() => {
                console.log("li click");
                handleSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="nact-auto-complete" ref={wrapperRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
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
