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
  const [dropdownSearchRan, setDropdownSearchRan] = useState(false);
  const [autoComplete, setAutoComplete] = useState(undefined);
  const [imFeelinLucky, setImFeelinLucky] = useState("");
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
    setDropdownSearchRan(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_AUTOCOMPLETE_API}${query}`,
      data: {
        numSuggestedSearches: 6,
      },
    })
      // .catch((e) => {
      //   console.log(e);
      //   setAutoComplete(undefined);
      // })
      .then((res) => {
        // if (res) {
        const searchData = res.data;
        // console.log(res.data);
        setAutoComplete(searchData);
        // }
      });
  };

  const handleGoggleSearch = (e) => {
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
      setImFeelinLucky(searchData);
      setDropdownSearchRan(false);
    });
  };

  const clearAutoComplete = () => {
    setAutoComplete("");
    setDropdownSearchRan(false);
    setSearchMainDropdown(false);
  };

  useEffect(() => {
    if (imFeelinLucky) {
      window.location.href = `${imFeelinLucky}`;
    }
  }, [imFeelinLucky]);

  return (
    <div>
      <div className="wrapper" onClick={handleFocusOut}>
        <MainNavBar />
        <div className="hero-container">
          <img
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
            {dropdownSearchRan && (
              <div className="search-dropdown-spinner"></div>
            )}
            <input
              onChange={handleChange}
              onKeyDown={handleGoggleSearch}
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
                    onClick={handleGoggleSearch}
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
