import * as actionTypes from './actionTypes'

export const changeDeliveryFilter = (filterParam) => {
  return { type: actionTypes.CHANGE_DELIVERY_FILTER, payload: {filterParam} }
}
