import * as actionTypes from './actionTypes'
import checkResponseStatus from '../tools/checkResponseStatus'

export const moveVehicleToInsale = (ccid) => {
  return (dispatch, getState) => {
    dispatch(moveVehicleToInsaleRequested())
    const postData = {
      vehicleCcId: ccid,
      userId: 9999,
      userName: 'OsYa',
      source: 'dispo-dash'
    }

    return window.fetch(`http://${process.env.REACT_APP_AHR_API_HOST}:${process.env.REACT_APP_AHR_API_PORT}/carcopy/vehicle-insale`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(moveVehicleToInsaleSuccess(result))
      })
      .catch(err => {
        dispatch(moveVehicleToInsaleFailed(err.message))
      })
  }
}

const moveVehicleToInsaleRequested = () => {
  return { type: actionTypes.MOVE_CCVEHICLE_INSALE_REQU }
}

const moveVehicleToInsaleSuccess = (result) => {
  return { type: actionTypes.MOVE_CCVEHICLE_INSALE_SUCC, payload: {result} }
}

const moveVehicleToInsaleFailed = (error) => {
  return { type: actionTypes.MOVE_CCVEHICLE_INSALE_FAIL, payload: {error} }
}
