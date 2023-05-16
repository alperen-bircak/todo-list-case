import { Input } from "antd";
import React, { useRef, useState } from "react";

const SearchBar = ({ onSearch, timeout = 1000 }) => {
  const prevFunc = useRef();

  const timeoutFunction = (text) => {
    if (onSearch) {
      onSearch(text);
    }
  };
  const startTimeout = (text) => {
    if (prevFunc.current) {
      window.clearTimeout(prevFunc.current);
    }

    prevFunc.current = window.setTimeout(() => timeoutFunction(text), timeout);
  };
  return (
    <>
      <Input
        placeholder="You can search here!"
        allowClear
        onChange={(e) => {
          startTimeout(e.target.value);
        }}
        style={{ width: "100%" }}
        size="large"
      />{" "}
    </>
  );
};

export default SearchBar;
