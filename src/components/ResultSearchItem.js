import React from 'react'
import ReactHtmlParser from 'react-html-parser';

export default function ResultSearchItem(props) {

    const modifiedUrl = props.url.replace(/https:\/\/|http:\/\//, "").replace(/\//g, " > ")
    // const modifiedDate = props.lastModified.split("T")[0].replace("-", " / ")

    return (
        <div data={props.indx} className="search-result">
            <a className="search-title-hyperlink" href={props.url}>
                <cite>{modifiedUrl}
                    <span className="down-arrow"> ▼</span>
                </cite>
                <h3>{props.title}</h3>
            </a>
            <div className="search-body">
                <span>{ReactHtmlParser(props.body)}</span>
            </div>
        </div>       
    )
}
