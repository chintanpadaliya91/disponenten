import * as actionTypes from './actionTypes'
import checkResponseStatus from '../tools/checkResponseStatus'

function fetchOpenPayments ({customerId, contractId}) {
  const url = `http://${process.env.REACT_APP_KASSE_API_HOST}:${process.env.REACT_APP_KASSE_API_PORT}/open-payments/${customerId}/${contractId}`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}

function fetchDeliveryStatus (contractId) {
  const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-status`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}

export function fetchDeliverItemStatus ({contractId, customerId}) {
  return async (dispatch, getState) => {
    dispatch(fetchDeliveryItemStatusRequested())

    try {
      const deliveryStatus = await fetchDeliveryStatus(contractId)
      const openPayments = await fetchOpenPayments({contractId, customerId})
      const {delivery, documents, perqus, registration, tasks} = deliveryStatus

      dispatch(fetchDeliveryItemStatusSuccess({
        contractId,
        tasks,
        perqus,
        registration,
        documents,
        delivery,
        openPayments
      }))
    }
    catch (err) {
      dispatch(fetchDeliveryItemStatusFailed(err.message))
    }
  }
}

export function resetDeliverItemStatus () {
  return { type: actionTypes.RESET_DELIVERY_ITEM_STATUS }
}

const fetchDeliveryItemStatusRequested = () => {
  return { type: actionTypes.FETCH_DELIVERY_ITEM_STATUS_REQU }
}

const fetchDeliveryItemStatusSuccess = (result) => {
  return { type: actionTypes.FETCH_DELIVERY_ITEM_STATUS_SUCC, payload: result }
}

const fetchDeliveryItemStatusFailed = (error) => {
  return { type: actionTypes.FETCH_DELIVERY_ITEM_STATUS_FAIL, payload: {error} }
}
