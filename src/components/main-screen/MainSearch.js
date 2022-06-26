import React, {useState, useEffect, useRef} from "react";
import {useHistory, Link} from "react-router-dom";
import MainNavBar from "./MainNavBar";
import MainFooter from "./MainFooter";
import "./MainSearch.scss";
import axios from "axios";

let INITIAL_DATA = {
  advancedQuery: "",
  didYouMean: "",
  filterData: "",
  page: "",
  pageSize: "",
  profile: "",
  query: "",
  sort: "",
};

export default function MainSearch() {
  const history = useHistory();
  const dropHeight = useRef();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [autoComplete, setAutoComplete] = useState(undefined);
  const [imFeelingLucky, setImFeelingLucky] = useState("");
  const [searchMainDropdown, setSearchMainDropdown] = useState(false);

  const handleChange = (e) => {
    const searchContents = e.target.value;
    if (searchContents.match(/^\s*$/)) {
      setSearchMainDropdown(false);
    } else {
      setQuery(searchContents);
      if (autoComplete) setSearchMainDropdown(true);
    }
    if (searchContents.length > 2) {
      handleAutoComplete();
    } else {
      clearAutoComplete();
    }
  };

  const handleFocusOut = (e) => {
    setSearchMainDropdown(false);
  };

  const handleAutoComplete = () => {
    setIsSearching(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_AUTOCOMPLETE_API}${query}`,
      data: {
        numSuggestedSearches: 6,
      },
    })
      .then((res) => {
        const searchData = res.data;
        setAutoComplete(searchData);
      });
  };

  const handlePoodleSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/${query}`);
    }
  };

  const searchSelectedTerm = (e) => {
    history.push(`/${e.target.innerHTML}`);
  };

  const handleImFeelingLucky = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SEARCH_API,
      data: {
        ...INITIAL_DATA,
        query: query,
        page: "1",
        pageSize: "10",
        profile: "all",
      },
    }).then((res) => {
      const searchData = res.data.body.results[0].url;
      setImFeelingLucky(searchData);
      setIsSearching(false);
    });
  };

  const clearAutoComplete = () => {
    setAutoComplete("");
    setIsSearching(false);
    setSearchMainDropdown(false);
  };

  useEffect(() => {
    if (imFeelingLucky) {
      window.location.href = `${imFeelingLucky}`;
    }
  }, [imFeelingLucky]);

  return (
    <div>
      <div className="wrapper" onClick={handleFocusOut}>
        <MainNavBar />
        <div className="hero-container">
          <img
            alt="poodle search hero"
            className="poodle-hero-img"
            src="https://fontmeme.com/permalink/200922/16bf0f375ad5e81bd6128af3a69a0b59.png"
          />
        </div>
        <div className="search-container">
          <div
            className={
              searchMainDropdown ? "search-bar-dropdown" : "search-bar-wrapper"
            }
          >
            <div className="search-icon"></div>
            {isSearching && (
              <div className="search-dropdown-spinner"></div>
            )}
            <input
              onChange={handleChange}
              onKeyDown={handlePoodleSearch}
              type="text"
              className="search-bar-input"
            />
            <div
              ref={dropHeight}
              className={
                searchMainDropdown ? "search-dropdown-contents" : "hide"
              }
            >
              <hr />
              <ul className="search-autocomplete">
                {autoComplete
                  ? autoComplete.body.suggested.map((terms) => {
                      return <li onClick={searchSelectedTerm}> {terms} </li>;
                    })
                  : null}
              </ul>
              <div className="lucky-buttons-dropdown">
                <Link to={`/${query}`}>
                  <input
                    type="button"
                    value="Poodle Search"
                    onClick={handlePoodleSearch}
                  />
                </Link>
                <input
                  type="button"
                  value="I'm Feeling Lucky"
                  onClick={handleImFeelingLucky}
                />
              </div>
            </div>
          </div>
          <div className={`lucky-buttons ${searchMainDropdown ? "hide" : ""}`}>
            <Link to={`/${query}`}>
              <input
                className={`lucky-buttons ${searchMainDropdown ? "hide" : ""}`}
                type="button"
                value="Poodle Search"
              />
            </Link>
            <input
              type="button"
              value="I'm Feeling Lucky"
              onClick={handleImFeelingLucky}
            />
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
}
