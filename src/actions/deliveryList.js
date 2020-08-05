import * as actionTypes from './actionTypes'
import checkResponseStatus from '../tools/checkResponseStatus'

export const fetchDeliveryList = () => {
  return (dispatch, getState) => {
    dispatch(fetchDeliveryListRequested())

    const filter = {...getState().deliveryFilter}

    const filterQuery = Object.keys(filter).reduce((obj, filterKey) => {
      const filterValue = filter[filterKey]

      if (filterValue === '') {
        return obj
      }

      obj.push(`filter[${filterKey}]=${filterValue}`)
      return obj
    }, [])

    let url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/deliveries`
    if (filterQuery.length > 0) {
      url += `?${filterQuery.join('&')}`
    }

    return window.fetch(url)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchDeliveryListSuccess(result))
      })
      .catch(err => {
        dispatch(fetchDeliveryListFailed(err.message))
      })
  }
}

const fetchDeliveryListRequested = () => {
  return { type: actionTypes.FETCH_DELIVERY_LIST_REQU }
}

const fetchDeliveryListSuccess = (deliverList) => {
  return { type: actionTypes.FETCH_DELIVERY_LIST_SUCC, payload: {deliverList} }
}

const fetchDeliveryListFailed = (error) => {
  return { type: actionTypes.FETCH_DELIVERY_LIST_FAIL, payload: {error} }
}

export const sortDeliveryList = (sort) => {
  return { type: actionTypes.SORT_DELIVERY_LIST, payload: {sort} }
}
