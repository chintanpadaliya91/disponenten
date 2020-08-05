import * as actionTypes from './actionTypes'
import checkResponseStatus from '../tools/checkResponseStatus'

export const fetchContract = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchContractRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-data`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchContractSuccess(result))
      })
      .catch(err => {
        dispatch(fetchContractFailed(err.message))
      })
  }
}

const fetchContractRequested = () => {
  return { type: actionTypes.FETCH_CONTRACT_REQU }
}

const fetchContractSuccess = (contract) => {
  return { type: actionTypes.FETCH_CONTRACT_SUCC, payload: {contract} }
}

const fetchContractFailed = (error) => {
  return { type: actionTypes.FETCH_CONTRACT_FAIL, payload: {error} }
}

// -------------------------------------------------------------------------------------------------

export const fetchDeliveryComments = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchDeliveryCommentsRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-comments`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchDeliveryCommentsSuccess(result))
      })
      .catch(err => {
        dispatch(fetchDeliveryCommentsFailed(err.message))
      })
  }
}

const fetchDeliveryCommentsRequested = () => {
  return { type: actionTypes.FETCH_DELIVERY_COMMENTS_REQU }
}

const fetchDeliveryCommentsSuccess = (comments) => {
  return { type: actionTypes.FETCH_DELIVERY_COMMENTS_SUCC, payload: {comments} }
}

const fetchDeliveryCommentsFailed = (error) => {
  return { type: actionTypes.FETCH_DELIVERY_COMMENTS_FAIL, payload: {error} }
}

// -------------------------------------------------------------------------------------------------

export const changeNewDeliveryComment = ({param, value}) => {
  return { type: actionTypes.CHANGE_NEW_DELIVERY_COMMENT, payload: {param, value} }
}

export const saveNewDeliveryComment = (contractId) => {
  return (dispatch, getState) => {
    dispatch(saveNewDeliveryCommentRequested())

    const newComment = getState().addDeliveryComment.doc
    const commentData = {
      ...newComment,
      type: 2,
      timestamp: Date.now()
    }

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-comments`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(commentData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveNewDeliveryCommentSuccess(result))
      })
      .catch(err => {
        dispatch(saveNewDeliveryCommentFailed(err.message))
      })
  }
}

const saveNewDeliveryCommentRequested = () => {
  return { type: actionTypes.SAVE_DELIVERY_COMMENT_REQU }
}

const saveNewDeliveryCommentSuccess = (comment) => {
  return { type: actionTypes.SAVE_DELIVERY_COMMENT_SUCC, payload: {comment} }
}

const saveNewDeliveryCommentFailed = (error) => {
  return { type: actionTypes.SAVE_DELIVERY_COMMENT_FAIL, payload: {error} }
}

// -------------------------------------------------------------------------------------------------

export const fetchPerquisites = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchPerquisitesRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/perquisites`,)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchPerquisitesSuccess(result))
      })
      .catch(err => {
        dispatch(fetchPerquisitesFailed({error: err.message, contractId}))
      })
  }
}

const fetchPerquisitesRequested = () => {
  return { type: actionTypes.FETCH_PERQUISITES_REQU }
}

const fetchPerquisitesSuccess = (perquisites) => {
  return { type: actionTypes.FETCH_PERQUISITES_SUCC, payload: {perquisites} }
}

const fetchPerquisitesFailed = ({error, contractId}) => {
  return {
    type: actionTypes.FETCH_PERQUISITES_FAIL,
    payload: {error, contractId}
  }
}

// -------------------------------------------------------------------------------------------------

export const fetchPayments = (customerId) => {
  return (dispatch, getState) => {
    dispatch(fetchPaymentsRequested())

    return window.fetch(`http://${process.env.REACT_APP_KASSE_API_HOST}:${process.env.REACT_APP_KASSE_API_PORT}/payments/?filter[customer_id]=${customerId}&page=1&limit=100000`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchPaymentsSuccess(result))
      })
      .catch(err => {
        dispatch(fetchPaymentsFailed({error: err.message, customerId}))
      })
  }
}

const fetchPaymentsRequested = () => {
  return { type: actionTypes.FETCH_PAYMENTS_REQU }
}

const fetchPaymentsSuccess = (payments) => {
  return { type: actionTypes.FETCH_PAYMENTS_SUCC, payload: {payments} }
}

const fetchPaymentsFailed = ({error, customerId}) => {
  return {
    type: actionTypes.FETCH_PAYMENTS_FAIL,
    payload: {error, customerId}
  }
}

// -------------------------------------------------------------------------------------------------

export const fetchPaymentPlan = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchPaymentPlanRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/payment-plan`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchPaymentPlanSuccess(result))
      })
      .catch(err => {
        dispatch(fetchPaymentPlanFailed({error: err.message, contractId}))
      })
  }
}

const fetchPaymentPlanRequested = () => {
  return { type: actionTypes.FETCH_PAYMENTPLAN_REQU }
}

const fetchPaymentPlanSuccess = (paymentPlan) => {
  return { type: actionTypes.FETCH_PAYMENTPLAN_SUCC, payload: {paymentPlan} }
}

const fetchPaymentPlanFailed = ({error, contractId}) => {
  return {
    type: actionTypes.FETCH_PAYMENTPLAN_FAIL,
    payload: {error, contractId}
  }
}

// -------------------------------------------------------------------------------------------------

export const setDeliverDateArranged = (dateObj) => {
  return { type: actionTypes.SET_DELIVERY_DATE_ARRANGED, payload: {dateObj} }
}

export const setDeliverTimeArranged = (dateObj) => {
  return { type: actionTypes.SET_DELIVERY_TIME_ARRANGED, payload: {dateObj} }
}

export const setDelivered = (delivered) => {
  return { type: actionTypes.SET_DELIVERED, payload: {delivered} }
}

export const saveArrangedDeliveryDate = () => {
  return (dispatch, getState) => {
    dispatch(saveDeliveryDataRequested())

    const contract = getState().contract.doc
    const contractId = contract.contract_id

    const saveData = {
      arranged_delivery_date: contract.arranged_delivery_date,
    }

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-data`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(saveData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveDeliveryDataSuccess(result))
      })
      .catch(err => {
        dispatch(saveDeliveryDataFailed(err.message))
      })
  }
}

const saveDeliveryDataRequested = () => {
  return { type: actionTypes.SAVE_DELIVERY_DATA_REQU }
}

const saveDeliveryDataSuccess = (result) => {
  return { type: actionTypes.SAVE_DELIVERY_DATA_SUCC, payload: {result} }
}

const saveDeliveryDataFailed = (error) => {
  return { type: actionTypes.SAVE_DELIVERY_DATA_FAIL, payload: {error} }
}

export const saveContractDelivery = ({contractId, saveData}) => {
  return (dispatch, getState) => {
    dispatch(saveContractRequested())

    const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/delivery-data`
    return window.fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(saveData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveContractSuccess({...result}))
      })
      .catch(err => {
        dispatch(saveContractFailed({error: err.message, contractId}))
      })
  }
}

const saveContractRequested = () => {
  return { type: actionTypes.SAVE_CONTRACT_REQU }
}

const saveContractSuccess = (contractData) => {
  return { type: actionTypes.SAVE_CONTRACT_SUCC, payload: contractData }
}

const saveContractFailed = ({error, contractId}) => {
  return {
    type: actionTypes.SAVE_CONTRACT_FAIL,
    payload: {error, contractId}
  }
}

// -------------------------------------------------------------------------------------------------

export const fetchTasks = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchTasksRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tasks`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchTasksSuccess(result))
      })
      .catch(err => {
        dispatch(fetchTasksFailed({error: err.message, contractId}))
      })
  }
}

const fetchTasksRequested = () => {
  return { type: actionTypes.FETCH_TASKS_REQU }
}

const fetchTasksSuccess = (tasks) => {
  return { type: actionTypes.FETCH_TASKS_SUCC, payload: {tasks} }
}

const fetchTasksFailed = ({error, contractId}) => {
  return {
    type: actionTypes.FETCH_TASKS_FAIL,
    payload: {error, contractId}
  }
}

export const addTask = ({contractId, taskId}) => {
  return (dispatch, getState) => {
    dispatch(addTaskRequested())

    const taskData = {task_id: taskId, order_date: Date.now()}

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(() => {
        const task = {
          contract_id: parseInt(contractId, 10),
          ...taskData
        }
        dispatch(addTaskSuccess(task))
      })
      .catch(err => {
        dispatch(addTaskFailed({error: err.message, contractId}))
      })
  }
}

const addTaskRequested = () => {
  return { type: actionTypes.ADD_TASK_REQU }
}

const addTaskSuccess = (task) => {
  return { type: actionTypes.ADD_TASK_SUCC, payload: {task} }
}

const addTaskFailed = ({error, contractId}) => {
  return {
    type: actionTypes.ADD_TASK_FAIL,
    payload: {error, contractId}
  }
}

export const saveTask = ({contractId, taskId, taskData}) => {
  return (dispatch, getState) => {
    dispatch(saveTaskRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveTaskSuccess(result))
      })
      .catch(err => {
        dispatch(saveTaskFailed({error: err.message, contractId}))
      })
  }
}

const saveTaskRequested = () => {
  return { type: actionTypes.SAVE_TASK_REQU }
}

const saveTaskSuccess = (task) => {
  return { type: actionTypes.SAVE_TASK_SUCC, payload: {task} }
}

const saveTaskFailed = ({error, contractId}) => {
  return {
    type: actionTypes.SAVE_TASK_FAIL,
    payload: {error, contractId}
  }
}

export const removeTask = ({contractId, taskId}) => {
  return (dispatch, getState) => {
    dispatch(removeTaskRequested())

    const contractId = getState().contract.doc.contract_id
    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(() => {
        dispatch(removeTaskSuccess(taskId))
      })
      .catch(err => {
        dispatch(removeTaskFailed({error: err.message, contractId}))
      })
  }
}

const removeTaskRequested = () => {
  return { type: actionTypes.REMOVE_TASK_REQU }
}

const removeTaskSuccess = (taskId) => {
  return { type: actionTypes.REMOVE_TASK_SUCC, payload: {taskId} }
}

const removeTaskFailed = ({error, contractId}) => {
  return {
    type: actionTypes.REMOVE_TASK_FAIL,
    payload: {error, contractId}
  }
}

// -------------------------------------------------------------------------------------------------

export const fetchOpenPayments = ({customerId, contractId}) => {
  return (dispatch, getState) => {
    dispatch(fetchOpenPaymentsRequested())

    return window.fetch(`http://${process.env.REACT_APP_KASSE_API_HOST}:${process.env.REACT_APP_KASSE_API_PORT}/open-payments/${customerId}/${contractId}`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchOpenPaymentsSuccess(result))
      })
      .catch(err => {
        dispatch(fetchOpenPaymentsFailed({error: err.message, customerId}))
      })
  }
}

const fetchOpenPaymentsRequested = () => {
  return { type: actionTypes.FETCH_OPENPAYMENTS_REQU }
}

const fetchOpenPaymentsSuccess = (openPayments) => {
  return { type: actionTypes.FETCH_OPENPAYMENTS_SUCC, payload: {openPayments} }
}

const fetchOpenPaymentsFailed = ({error, customerId}) => {
  return {
    type: actionTypes.FETCH_OPENPAYMENTS_FAIL,
    payload: {error, customerId}
  }
}

// -------------------------------------------------------------------------------------------------

function fetchDefaultDocuments () {
  const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/documents-definition`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}

function fetchContractDocuments (contractId) {
  const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/documents-check`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}

export const fetchDocuments = (contractId) => {
  return async (dispatch, getState) => {
    dispatch(fetchDocumentsRequested())

    try {
      const defaultDocs = await fetchDefaultDocuments()
      const contractDocs = await fetchContractDocuments(contractId)

      dispatch(fetchDocumentsSuccess({
        defaultDocs,
        contractDocs
      }))
    }
    catch (err) {
      dispatch(fetchDocumentsFailed(err.message))
    }
  }
}

const fetchDocumentsRequested = () => {
  return { type: actionTypes.FETCH_CONTRACTDOCS_REQU }
}

const fetchDocumentsSuccess = (result) => {
  return { type: actionTypes.FETCH_CONTRACTDOCS_SUCC, payload: result }
}

const fetchDocumentsFailed = (error) => {
  return {
    type: actionTypes.FETCH_CONTRACTDOCS_FAIL,
    payload: error
  }
}

export const saveDocument = ({contractId, documentId, documentData}) => {
  return (dispatch, getState) => {
    dispatch(saveDocumentRequested())

    const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/documents-check/${documentId}`
    return window.fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(documentData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveDocumentSuccess(result))
      })
      .catch(err => {
        dispatch(saveDocumentFailed({error: err.message, contractId}))
      })
  }
}

const saveDocumentRequested = () => {
  return { type: actionTypes.SAVE_CONTRACTDOC_REQU }
}

const saveDocumentSuccess = (document) => {
  return { type: actionTypes.SAVE_CONTRACTDOC_SUCC, payload: {document} }
}

const saveDocumentFailed = ({error, contractId}) => {
  return {
    type: actionTypes.SAVE_CONTRACTDOC_FAIL,
    payload: {error, contractId}
  }
}

//--------------------------------------------------------------------------------------------------
/*function fetchTradeinHead (contractId) {
  const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tradein`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}

function fetchTradeinCar (contractId) {
  const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tradein/car`
  return window.fetch(url)
    .then(checkResponseStatus)
    .then(response => response.json())
}


export const fetchTradein = (contractId) => {
  return async (dispatch, getState) => {
    dispatch(fetchTradeinRequested())

    try {

      const [tradein, tradeinCar] = await Promise.all([
        fetchTradeinHead(contractId),
        fetchTradeinCar(contractId)
      ])

      dispatch(fetchTradeinSuccess({tradein, tradeinCar}))
    }
    catch (err) {
      dispatch(fetchTradeinFailed({error: err.message, contractId}))
    }
  }
}

*/

export const fetchTradein = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchTradeinRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tradein`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchTradeinSuccess(result))
      })
      .catch(err => {
        dispatch(fetchTradeinFailed({error: err.message, contractId}))
      })
  }
}

const fetchTradeinRequested = () => {
  return { type: actionTypes.FETCH_TRADEIN_REQU }
}

const fetchTradeinSuccess = (tradein) => {
  return { type: actionTypes.FETCH_TRADEIN_SUCC, payload: tradein }
}

const fetchTradeinFailed = (error) => {
  return {
    type: actionTypes.FETCH_TRADEIN_FAIL,
    payload: error
  }
}
//...........................................
export const saveTradeinCar = ({contractId, saveData}) => {
  return (dispatch, getState) => {
    dispatch(saveTradeinCarRequested())

    const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/tradein/car`
    return window.fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(saveData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveTradeinCarSuccess({...result, 'contractId': contractId }))
      })
      .catch(err => {
        dispatch(saveTradeinCarFailed({error: err.message, contractId}))
      })
  }
}

export const setTradeinCarData = ({setData}) => {
  return { type: actionTypes.SET_TRADEINCAR_DATA, payload: {setData} }
}

const saveTradeinCarRequested = () => {
  return { type: actionTypes.SAVE_TRADEINCAR_REQU }
}

const saveTradeinCarSuccess = (result) => {
  return { type: actionTypes.SAVE_TRADEINCAR_SUCC, payload: {result} }
}

const saveTradeinCarFailed = ({error, contractId}) => {
  return {
    type: actionTypes.SAVE_TRADEINCAR_FAIL,
    payload: {error, contractId}
  }
}

//--------------------------------------------------------------------------------------------------

export const fetchRegistration = (contractId) => {
  return (dispatch, getState) => {
    dispatch(fetchRegistrationRequested())

    return window.fetch(`http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/registration-certificate`)
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(fetchRegistrationSuccess(result))
      })
      .catch(err => {
        dispatch(fetchRegistrationFailed({error: err.message, contractId}))
      })
  }
}

const fetchRegistrationRequested = () => {
  return { type: actionTypes.FETCH_REGISTRATION_REQU }
}

const fetchRegistrationSuccess = (result) => {
  return { type: actionTypes.FETCH_REGISTRATION_SUCC, payload: result }
}

const fetchRegistrationFailed = (error) => {
  return {
    type: actionTypes.FETCH_REGISTRATION_FAIL,
    payload: error
  }
}

export const saveRegistration = ({contractId, certType, saveData}) => {
  return (dispatch, getState) => {
    dispatch(saveRegistrationRequested())

    const url = `http://${process.env.REACT_APP_CARCONTRACT_API_HOST}:${process.env.REACT_APP_CARCONTRACT_API_PORT}/api/contracts/${contractId}/registration-certificate/${certType}`
    return window.fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(saveData)
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(result => {
        dispatch(saveRegistrationSuccess({...saveData, 'certificate-type': certType}))
      })
      .catch(err => {
        dispatch(saveRegistrationFailed({error: err.message, contractId}))
      })
  }
}

export const setRegistrationData = ({certType, setData}) => {
  return { type: actionTypes.SET_REGISTRATION_DATA, payload: {certType, setData} }
}

const saveRegistrationRequested = () => {
  return { type: actionTypes.SAVE_REGISTRATION_REQU }
}

const saveRegistrationSuccess = (registration) => {
  return { type: actionTypes.SAVE_REGISTRATION_SUCC, payload: {registration} }
}

const saveRegistrationFailed = ({error, contractId}) => {
  return {
    type: actionTypes.SAVE_REGISTRATION_FAIL,
    payload: {error, contractId}
  }
}

// -------------------------------------------------------------------------------------------------
