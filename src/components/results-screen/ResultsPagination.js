import React, { Fragment, useState } from "react";
import './ResultsSearch.scss';

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function ResultsPagination({apiCall, query, resultsCount}) {
  const [selectedPage, setSelectedPage] = useState(1)

  return (
    <div className="pagination-container">
      <a className="first"><span>P</span></a>
      {pages.map((page, idx) => {
        if (Math.ceil(resultsCount / 10) >= (idx + 1)) {
          return (
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              apiCall={apiCall}
              query={query}
              page={page}
            />
          )
        }
      }
      )}
      <a className="last"><span class="d">d</span><span class="l">l</span><span class="e">e</span></a>
    </div>
  )
}

const Pagination = ({ selectedPage, setSelectedPage, apiCall, query, page }) => {

  const updatePage = (query, page) => {
    setSelectedPage(page)
    apiCall(query, page)
  }

  return (
    <a onClick={() => updatePage(query, page)} className="page">
      <span className={page == selectedPage ? "checked" : ''}>o</span>{page}
    </a>
  )
}