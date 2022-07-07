import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ResultSearchItem from './ResultSearchItem';
import ResultSearchItems from './ResultSearchItems';
import ResultsPagination from './ResultsPagination';
import axios from 'axios';
import './ResultsSearch.scss';

export default function ResultsSearch() {

    const history = useHistory()
    const queryUrlParams = useParams()
    const [query, setQuery] = useState(queryUrlParams.slug)
    const [searchTerm, setSearchTerm] = useState(queryUrlParams.slug)
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(true)
    const [newSearchMade, setNewSearchMade] = useState(false)
    // const [autoComplete, setAutoComplete] = useState('')
    // const [searchMainDropdown, setSearchMainDropdown] = useState(false)

    useEffect(() => {
        handleInitialPoodleSearch(query)
        setSearchTerm(query.slug)
    }, [])

    useEffect(() => {
        if (searchTerm) history.push(`/${searchTerm}`);
        else history.push(`/${queryUrlParams.slug}`);
    }, [searchTerm])

    const apiCall = (query, page = 1) => {
        axios({
            method: 'post',
            url: process.env.REACT_APP_SEARCH_API,
            data: {
                "advancedQuery": "",
                "didYouMean": "",
                "filterData": "",
                "page": page,
                "pageSize": "10",
                "profile": "all",
                "query": query,
                "sort": ""
            }
        })
            .then(res => {
                const searchData = res.data;
                setResponse(searchData)
                setLoading(false)
                // renderPoodleSearch(searchData)
            })
    }

    const handlePoodleSearch = e => {
        const queryInputValue = e.target.value
        if (e.key === 'Enter') {
            apiCall(queryInputValue)
            setSearchTerm(queryInputValue)
            history.push(`/${query}`);
            setNewSearchMade(!newSearchMade)
        }
    }

    const handleInitialPoodleSearch = urlQuery => {
        apiCall(urlQuery)
    }

    // const renderPoodleSearch = (apiResponse, resultsList = [])=> {
    //     resultsList = apiResponse.body.results.map(result => (
    //         <div>
    //             <ResultSearchItem
    //                 url={result.url}
    //                 title={result.title}
    //                 body={result.body} />
    //         </div>
    //     ))
    //     setLoading(false)
    // }

    const NavContainer = () =>
        <div className="nav-container">
            <nav className="nav-search-bar">
                <Link to="/">
                    <img className="poodle-hero-top-left" src="https://fontmeme.com/permalink/200922/16bf0f375ad5e81bd6128af3a69a0b59.png" />
                </Link>
                <div className="search-bar-wrapper">
                    <div className="search-icon"></div>
                    <input
                        onKeyDown={handlePoodleSearch}
                        type="text"
                        className="search-bar-input"
                        defaultValue={searchTerm || queryUrlParams.slug}
                    />
                </div>
            </nav>
        </div>

    const DateFilter = () => 
        <div className="tools-date-filter">
            {/* <select name="Filter">
                <option value="All time">All time</option>
                <option value="10">10 years go</option>
                <option value="5">5 years ago</option>
                <option value="3">3 years go</option>
                <option value="2">2 years go</option>
                <option value="1<">Last year</option>
                <option value="0">Today</option>
            </select> */}
        </div>

    if (loading) {
        return (
            <div className="loading-screen">
                <div style={{ paddingTop: '200px', textAlign: 'center'}}>Loading...</div>
            </div>
        )
    } else {
        return (
            <div>
                <NavContainer />
                <DateFilter />
                <div className="search-results-container">
                    <div className="search-speed-and-results">
                        <span>
                            About {response.body.resultsCount} results ({response.time} seconds)
                        </span>
                    </div>
                    <ResultSearchItems resultData={response.body.results} />
                    <ResultsPagination
                        query={searchTerm}
                        apiCall={apiCall}
                        resultsCount={response.body.resultsCount}
                        newSearchMade={newSearchMade}
                    />
                </div>
            </div>
        )
    }
}