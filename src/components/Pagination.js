import React from 'react'

import IconButton from 'react-toolbox/lib/button/IconButton'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'

// import '../styles/Pagination.css'

const limitItems = [
    { value: 10, label: '10 Einträge' },
    { value: 25, label: '25 Einträge' },
    { value: 50, label: '50 Einträge' }
]

const Pagination = (props) => {

  const currentPage = props.page
  const numOfPages = props.pages
  const total = props.total
  const limit = props.limit

  const firstPage = 1
  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage = currentPage < numOfPages ? currentPage + 1 : numOfPages
  const lastPage = numOfPages

  let pagesStart = 1
  let pagesCount = 5

  if (numOfPages > pagesCount) {
    if (currentPage > 3 && currentPage < (numOfPages - 3)) {
      pagesStart = currentPage - 2
    }

    else if (currentPage < 3) {
      pagesStart = 1
    }

    else if (currentPage > (numOfPages - 3)) {
      pagesStart = numOfPages - pagesCount
    }
  }
  else {
    pagesCount = numOfPages
  }

  const pageNumbers = []
  for (let i = pagesStart; i < (pagesStart + pagesCount); i++)
    pageNumbers.push(i)

  const onClickFirstPage = () => props.onClickPage(firstPage, limit)
  const onClickPrevPage = () => props.onClickPage(prevPage, limit)
  const onClickPage = (page) => props.onClickPage(page, limit)
  const onClickNextPage = () => props.onClickPage(nextPage, limit)
  const onClickLastPage = () => props.onClickPage(lastPage, limit)
  const onChangeLimit = (newLimit) => props.onClickPage(firstPage, newLimit)

  const startItem = (currentPage - 1) * limit + 1
  const endItem = currentPage * limit

  const isVisible = numOfPages > 0 ? 'visible' : ''

  return (
    <div className={"pagination " + isVisible}>
      <div className="page-buttons">
        <IconButton
          icon="skip_previous"
          primary
          onClick={onClickFirstPage}
          disabled={props.is_fetching} />
        <IconButton
          icon="fast_rewind"
          primary
          onClick={onClickPrevPage}
          disabled={props.is_fetching} />
        {pageNumbers.map( (num, index) => {
          const isActive = (currentPage === num ? "active" : "")
          return <IconButton key={index} primary onClick={ () => onClickPage(num) } disabled={props.is_fetching}>
            <span className={"page-num " + isActive}>{num}</span>
          </IconButton>
        })}
        <IconButton
          icon="fast_forward"
          primary
          onClick={onClickNextPage}
          disabled={props.is_fetching} />
        <IconButton
          icon="skip_next"
          primary
          onClick={onClickLastPage}
          disabled={props.is_fetching} />
      </div>
      <div className="pagination-items">{startItem + ' bis ' + (endItem < total ? endItem : total) }</div>
      <Dropdown className="select-limit"
        source={limitItems}
        onChange={onChangeLimit}
        value={limit}
        disabled={props.is_fetching} />
    </div>
  )
}

export default Pagination