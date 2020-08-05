import {
  FETCH_DELIVERY_LIST_REQU,
  FETCH_DELIVERY_LIST_SUCC,
  FETCH_DELIVERY_LIST_FAIL,
  SORT_DELIVERY_LIST } from '../actions/actionTypes'
import sortByDeliveryState from '../tools/sortByDeliveryState'

export function deliveryList (state = {}, action) {
  switch (action.type) {
    case FETCH_DELIVERY_LIST_REQU:
      return Object.assign({}, state, {isFetching: true, error: null, sort: {param: null, direction: 1}})

    case FETCH_DELIVERY_LIST_SUCC:
      const fetchedResult = action.payload.deliverList
      fetchedResult.docs = fetchedResult.docs
        // !!! tmp. fix until CarContract stops delivering contract_type 7 without sold_products
        .filter(item => {
          if (item.contract_type === 7 && item.hasOwnProperty('sold_products') === false) {
            return false
          }

          return true
        })
        .map(item => {
          if (!item.desired_delivery_date || item.desired_delivery_date === '0000-00-00') {
            return {
              ...item,
              desired_delivery_date: null
            }
          }

          return {
            ...item,
            desired_delivery_date: new Date(item.desired_delivery_date)
          }
        })
        .map(item => {
          if (item.delivered === true || item.arranged_delivery_date === null) {
            return {...item, delivery_overdued: false}
          }

          // specify overdue date for delivery
          const today = new Date()
          const arrangedDeliveryDate = new Date(item.arranged_delivery_date)
          const yyyy = arrangedDeliveryDate.getFullYear()
          const mm = arrangedDeliveryDate.getMonth() + 1
          const dd = arrangedDeliveryDate.getDate()
          const overdueDate = new Date(`${yyyy}-${mm}-${dd} 00:00:00`)

          return {
            ...item,
            delivery_overdued: today.getTime() >= overdueDate.getTime()
          }
        })
        .sort(sortByDeliveryState)

      return Object.assign({}, state, fetchedResult, {isFetching: false})

    case FETCH_DELIVERY_LIST_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    case SORT_DELIVERY_LIST:
      return {
        ...state,
        sort: action.payload.sort
      }

    default:
      return state
  }
}
