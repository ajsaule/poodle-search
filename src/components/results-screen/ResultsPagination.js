import React, { useEffect, useState } from "react";

export default function ResultsPagination({apiCall, query, resultsCount, newSearchMade}) {
  const [selectedPage, setSelectedPage] = useState(1)
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  useEffect(() => {
    apiCall(query, selectedPage)
    updatePage(selectedPage)
  }, [selectedPage])

  useEffect(() => {
    setPages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    setSelectedPage(1)
  }, [newSearchMade])

  const togglePreviousAndNext = (action) => {
    if (selectedPage !== 1 && action === 'previous') setSelectedPage(selectedPage - 1)
    else if (selectedPage < Math.ceil(resultsCount / 10) && action === 'next') setSelectedPage(selectedPage + 1)
  }

  const updatePage = (page) => {
    if (page > 5 && page == pages[0]) {
      let decrementedPages = pages.map(page => page - 5)
      setPages(decrementedPages)
    }
    if (page == pages[pages.length - 1]) {
      let incrementedPages = pages.map(page => page + 5)
      setPages(incrementedPages)
    }
    setSelectedPage(page)
  }

  if (resultsCount === 0) {
    return (
      <div>Woofps, seems like theres no results for that search...</div>
    )
  } else {
    return (
      <div className="pagination-container">
        <a className="prev-next" onClick={() => togglePreviousAndNext('previous')}>
          <span>{'<'}</span><span className="ul">Previous</span>
        </a>
        <a onClick={() => togglePreviousAndNext(true)}><span className="first">P</span></a>
        {pages.map((page, idx) => {
          if (Math.ceil(resultsCount / 10) >= (idx + 1)) {
            return (
              <Pagination
                updatePage={updatePage}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setPages={setPages}
                pages={pages}
                page={page}
              />
            )
          }
        }
        )}
        <a
          className="last"
          onClick={() => togglePreviousAndNext('next')}
        >
          <span className="d">d</span><span className="l">l</span><span className="e">e</span>
        </a>
        <a
          className="prev-next"
          onClick={() => togglePreviousAndNext('next')}
        >
          <span>{'>'}</span><span className="ul">Next</span>
        </a>
      </div>
    )
  }
}

const Pagination = ({ updatePage, selectedPage, page }) =>
  <a onClick={() => updatePage(page)} className="page">
    <span className={page == selectedPage ? "checked" : ''}>o</span>
  <a className="pl">{page}</a></a>