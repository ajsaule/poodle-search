import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ResultSearchItem from './ResultSearchItem';
import ResultSearchItems from './ResultSearchItems';
import axios from 'axios';
import './ResultsSearch.scss';

export default function ResultsSearch() {

    const queryUrlParams = useParams()
    const [query, setQuery] = useState(queryUrlParams.slug)
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(true)
    // const [autoComplete, setAutoComplete] = useState('')
    // const [searchMainDropdown, setSearchMainDropdown] = useState(false)

    useEffect(() => {
        handleInitialGoggleSearch(query)
    }, [])

    const apiCall = (query) => {
        axios({
            method: 'post',
            url: process.env.REACT_APP_SEARCH_API,
            data: {
                "advancedQuery": "",
                "didYouMean": "",
                "filterData": "",
                "page": "1",
                "pageSize": "10",
                "profile": "all",
                "query": query,
                "sort": ""
            }
        })
            .then(res => {
                const searchData = res.data;
                setResponse(searchData)
                renderGoggleSearch(searchData)
            })
    }

    const handleGoggleSearch = e => {
        const queryInputValue = e.target.value
        if (e.key === 'Enter') {
            apiCall(queryInputValue)
        }
    }

    const handleInitialGoggleSearch = urlQuery => {
        apiCall(urlQuery)
    }

    let components = []
    const renderGoggleSearch = apiResponse => {
        setLoading(false)
        components = apiResponse.body.results.map(result => (
            <div>
                <ResultSearchItem
                    url={result.url}
                    title={result.title}
                    body={result.body} />
            </div>
            
        ))
        
    }

    if (loading) {
        return (
            <div className="loading-screen"></div>
        )
    } else {
        return (
            <div>
                <div className="nav-container">
                    <nav className="nav-search-bar">
                        <Link to="/">
                            <img className="poodle-hero-top-left" src="https://fontmeme.com/permalink/200922/16bf0f375ad5e81bd6128af3a69a0b59.png" />
                        </Link>
                        <div className="search-bar-wrapper">
                            <div className="search-icon"></div>
                            <input
                                onKeyDown={handleGoggleSearch}
                                type="text"
                                className="search-bar-input"
                                defaultValue={queryUrlParams.slug}
                            />
                        </div>
                    </nav>
                </div>
                <div className="tools-date-filter">
                    <select name="Filter">
                        <option value="All time">All time</option>
                        <option value="10">10 years go</option>
                        <option value="5">5 years ago</option>
                        <option value="3">3 years go</option>
                        <option value="2">2 years go</option>
                        <option value="1<">Last year</option>
                        <option value="0">Today</option>
                    </select>
                </div>
                <div className="search-results-container">
                    <div className="search-speed-and-results">
                        <span>
                            About {response.body.resultsCount} results ({response.time} seconds)
                        </span>
                    </div>
                    <ResultSearchItems data={response.body.results}/>
                </div>
            </div>
        )
    }
}