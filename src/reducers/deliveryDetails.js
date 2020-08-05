import * as actionTypes from '../actions/actionTypes'
import { initialTaskItems } from '../constants/tasks.js'

export function contract (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONTRACT_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_CONTRACT_SUCC:
      const docAfterFetch = Object.assign({}, state.doc, {...action.payload.contract})
      docAfterFetch.contract_completed_date = new Date(docAfterFetch.contract_completed_date).getTime()
      docAfterFetch.desired_delivery_date = docAfterFetch.desired_delivery_date !== '0000-00-00'
        ? new Date(docAfterFetch.desired_delivery_date).getTime()
        : null
      return Object.assign({}, state, {doc: docAfterFetch}, {isFetching: false})

    case actionTypes.FETCH_CONTRACT_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    case actionTypes.SET_DELIVERY_DATE_ARRANGED:
      const arrangedDeliveryDateSelected = state.doc.arranged_delivery_date !== null
      const dateArrangedObject = arrangedDeliveryDateSelected
        ? new Date(state.doc.arranged_delivery_date)
        : new Date(state.doc.desired_delivery_date)

      dateArrangedObject.setFullYear(action.payload.dateObj.getFullYear())
      dateArrangedObject.setMonth(action.payload.dateObj.getMonth())
      dateArrangedObject.setDate(action.payload.dateObj.getDate())

      if (arrangedDeliveryDateSelected === false) {
        dateArrangedObject.setHours(11)
        dateArrangedObject.setMinutes(0)
      }

      const docAfterDateSet = Object.assign({}, state.doc, {arranged_delivery_date: dateArrangedObject.getTime()})
      return Object.assign({}, state, {doc: docAfterDateSet, isDirty: true})

    case actionTypes.SET_DELIVERY_TIME_ARRANGED:
      const timeArrangedObject = state.doc.arranged_delivery_date !== null
        ? new Date(state.doc.arranged_delivery_date)
        : new Date(state.doc.desired_delivery_date)

      timeArrangedObject.setHours(action.payload.dateObj.getHours())
      timeArrangedObject.setMinutes(action.payload.dateObj.getMinutes())

      const docAfterTimeSet = Object.assign({}, state.doc, {
        arranged_delivery_date: timeArrangedObject.getTime()
      })

      return Object.assign({}, state, {doc: docAfterTimeSet, isDirty: true})

    case actionTypes.SET_DELIVERED:
      const delivered = action.payload.delivered
      const realDeliveryDate = delivered === true
        ? new Date().getTime()
        : null

      const docAfterDeliveredSet = Object.assign({}, state.doc, {
        delivered, real_delivery_date: realDeliveryDate
      })

      return Object.assign({}, state, {doc: docAfterDeliveredSet, isDirty: true})

    case actionTypes.SAVE_DELIVERY_DATA_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.SAVE_DELIVERY_DATA_SUCC:
      return Object.assign({}, state, {isFetching: false, isDirty: false})

    case actionTypes.SAVE_DELIVERY_DATA_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    case actionTypes.SAVE_CONTRACT_REQU:
      return {...state, isFetching: true, error: null}

    case actionTypes.SAVE_CONTRACT_SUCC:
      const contractDocAfterSave = {...state.doc, ...action.payload}
      return {...state, doc: contractDocAfterSave, isFetching: false}

    case actionTypes.SAVE_CONTRACT_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    default:
      return state
  }
}

function sortByTimestampDesc (a, b) {
  if (a.timestamp > b.timestamp) {
    return -1
  }

  if (a.timestamp < b.timestamp) {
    return 1
  }

  return 0
}

export function deliveryComments (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_DELIVERY_COMMENTS_REQU:
      return {...state, isFetching: true, error: null}

    case actionTypes.FETCH_DELIVERY_COMMENTS_SUCC:
      const fetchedDeliveryComments = action.payload.comments.sort(sortByTimestampDesc)
      return {...state, docs: fetchedDeliveryComments, isFetching: false}

    case actionTypes.FETCH_DELIVERY_COMMENTS_FAIL:
      return {...state, isFetching: false, error: action.payload.error}
    default:
      return {...state}
  }
}

export function addDeliveryComment (state = {}, action) {
  switch (action.type) {
    case actionTypes.CHANGE_NEW_DELIVERY_COMMENT:
      const {param, value} = action.payload
      const changeComment = {...state.doc, [param]: value}
      return {...state, doc: changeComment}

    case actionTypes.SAVE_DELIVERY_COMMENT_REQU:
      return {...state, isFetching: true, error: null}

    case actionTypes.SAVE_DELIVERY_COMMENT_SUCC:
      return {...state, doc: {user_id: 0, text: ''}, isFetching: false}

    case actionTypes.SAVE_DELIVERY_COMMENT_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    default:
      return {...state}
  }
}

export function perquisites (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_PERQUISITES_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_PERQUISITES_SUCC:
      const onlySelectedPerquisites = action.payload.perquisites.filter(item => item.selected === true)
      return Object.assign({}, state, {docs: onlySelectedPerquisites}, {isFetching: false})

    case actionTypes.FETCH_PERQUISITES_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    default:
      return state
  }
}

const sortPaymentPlanDateAsc = (a, b) => {
  if (a.date < b.date) {
    return -1
  }

  if (a.date > b.date) {
    return 1
  }

  return 0
}

export function paymentPlan (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENTPLAN_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_PAYMENTPLAN_SUCC:
      const itemsWithTimestamp = action.payload.paymentPlan.map(item => {
        const timestamp = new Date(`${item.date}T00:00:00`).getTime()
        return {...item, date: timestamp}
      }).sort(sortPaymentPlanDateAsc)

      return Object.assign({}, state, {docs: itemsWithTimestamp}, {isFetching: false})

    case actionTypes.FETCH_PAYMENTPLAN_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    default:
      return state
  }
}

const sortPaymentsByDateDesc = (a, b) => {
  if (a.payment_date < b.payment_date) {
    return 1
  }

  if (a.payment_date > b.payment_date) {
    return -1
  }

  return 0
}

export function payments (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENTS_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_PAYMENTS_SUCC:

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const lookbackTime = today.getDay() === 1
        ? 48 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000

      const sortedPayments = action.payload.payments.docs
        .map(item => {
          return {
            ...item,
            is_new: item.payment_date >= today - lookbackTime
          }
        })
        .sort(sortPaymentsByDateDesc)

      return Object.assign({}, state, {docs: sortedPayments}, {isFetching: false})

    case actionTypes.FETCH_PAYMENTS_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    default:
      return state
  }
}


export function openPayments (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_OPENPAYMENTS_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_OPENPAYMENTS_SUCC:
      const openPayments = action.payload.openPayments

      if (openPayments.total > 0) {
        openPayments.status = 'unpaid'
      }
      else if (openPayments.total < 0) {
        openPayments.status = 'overpaid'
      }
      else {
        openPayments.status = 'paid'
      }

      return Object.assign({}, state, {doc: openPayments}, {isFetching: false})

    case actionTypes.FETCH_OPENPAYMENTS_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    default:
      return state
  }
}

export function tasks (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_TASKS_SUCC:
      const preparedInital = Object.values(initialTaskItems).reduce((listObj, item) => {
        listObj[item.task_id] = Object.assign({}, item, {in_contract: false, ordered: false, order_date: null, completed: false, completion_date: null})
        return listObj
      }, {})

      const mergedTasks = action.payload.tasks.reduce((listObj, contractTask) => {
        const initialTask = listObj[contractTask.task_id]
        const mergedItem = Object.assign({}, initialTask, contractTask, {ordered: true})

        listObj[contractTask.task_id] = mergedItem
        return listObj
      }, preparedInital)

      return Object.assign({}, state, {docs: mergedTasks}, {isFetching: false, error: null})

    case actionTypes.FETCH_TASKS_FAIL:
      return Object.assign({}, state, {isFetching: false, error: action.payload.error})

    case actionTypes.ADD_TASK_REQU:
      return Object.assign({}, state, {error: null})

    case actionTypes.ADD_TASK_SUCC:
      const addedTask = action.payload.task
      const taskBeforeAdd = state.docs[addedTask.task_id]
      const taskAfterAdd = {...taskBeforeAdd, ...addedTask, ordered: true}
      const taskListAfterAdd = {...state.docs, [addedTask.task_id]: taskAfterAdd}
      return {...state, docs: taskListAfterAdd, isFetching: false}

    case actionTypes.ADD_TASK_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    case actionTypes.SAVE_TASK_REQU:
      return {...state, error: null}

    case actionTypes.SAVE_TASK_SUCC:
      const savedTask = action.payload.task
      const taskBeforeSave = state.docs[savedTask.task_id]
      const taskAfterSave = {...taskBeforeSave, ...savedTask}
      const taskListAfterSave = {...state.docs, [savedTask.task_id]: taskAfterSave}
      return {...state, docs: taskListAfterSave, isFetching: false}

    case actionTypes.SAVE_TASK_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    case actionTypes.REMOVE_TASK_REQU:
      return {...state, error: null}

    case actionTypes.REMOVE_TASK_SUCC:
      const deletedTaskID = action.payload.taskId
      const initialTask = initialTaskItems[deletedTaskID]
      const removedTask = {...initialTask, ...{in_contract: false, ordered: false, order_date: null, completed: false, completion_date: null}}
      const mergedTaskListAfterDelete = {...state.docs, [deletedTaskID]: removedTask}

      return {...state, docs: mergedTaskListAfterDelete, isFetching: false}

    case actionTypes.REMOVE_TASK_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    default:
      return state
  }
}

export function documents (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONTRACTDOCS_REQU:
      return Object.assign({}, state, {isFetching: true, error: null})

    case actionTypes.FETCH_CONTRACTDOCS_SUCC:
      const {defaultDocs, contractDocs} = action.payload
      const mergedDocs = Object.values(contractDocs)
        .map(doc => {
          if (defaultDocs.hasOwnProperty(doc.document_id) === false) {
            return Object.assign({}, doc, {groupId: 'misc', label: doc.document_id})
          }

          const groupId = defaultDocs[doc.document_id].groupId
          const label = defaultDocs[doc.document_id].label
          const missing = doc.mandatory === true && doc.seller_checked === false

          return Object.assign({}, doc, {groupId, label, missing})
        })
        .reduce((acc, item) => ({...acc, [item.document_id]: item}), {})

      return Object.assign({}, state, {docs: mergedDocs, isFetching: false})

    case actionTypes.FETCH_CONTRACTDOCS_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    // .............................................................................................

    case actionTypes.SAVE_CONTRACTDOC_REQU:
      return Object.assign({}, state, {error: null})

    case actionTypes.SAVE_CONTRACTDOC_SUCC:
      const savedDoc = action.payload.document
      const docBeforeSave = state.docs[savedDoc.document_id]
      const docAfterSave = {...docBeforeSave, ...savedDoc}
      const contractDocsAfterSave = {...state.docs, [savedDoc.document_id]: docAfterSave}
      return {...state, docs: contractDocsAfterSave, isFetching: false}

    case actionTypes.SAVE_CONTRACTDOC_FAIL:
      return {...state, error: action.payload.error}

    default:
      return state
  }
}

//------------------------------------------------------------------------------

export function tradein (state = {}, action) {
   switch (action.type) {
     case actionTypes.FETCH_TRADEIN_REQU:
       return {...state, isFetching: true, error: null}

     case actionTypes.FETCH_TRADEIN_SUCC:
       //console.log(actionTypes.FETCH_TRADEIN_SUCC, action.payload)
       return {...state, isFetching: false, data: action.payload}

     case actionTypes.FETCH_TRADEIN_FAIL:
       return {...state, error: action.payload.error}

     case actionTypes.SET_TRADEINCAR_DATA:
       //console.log(actionTypes.SET_TRADEINCAR_DATA, action.payload)
       const setRegdoc = {...state , ...action.payload.tradein}
       return {...state, data: setRegdoc}

   //----------------------------------------------------------------------------
     case actionTypes.SAVE_TRADEINCAR_REQU:
       return Object.assign({}, state, {error: null})


     case actionTypes.SAVE_TRADEINCAR_SUCC:
       //console.log(actionTypes.SAVE_TRADEINCAR_SUCC, action.payload)
       const savedTradein = action.payload.tradein
       const setData = {...state.data, ...savedTradein}
       return {...state, docs: setData, isFetching: false}


     case actionTypes.SAVE_TRADEINCAR_FAIL:
       return {...state, isFetching: false, error: action.payload.error}

     default:
         return state
   }
}

//---------------------------------------------------------------------------------------------------
export function registration (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_REGISTRATION_REQU:
      return {...state, isFetching: true, error: null}

    case actionTypes.FETCH_REGISTRATION_SUCC:
      const fetchedRegDocs = action.payload.reduce((acc, item) => {
        const certType = item['certificate-type']
        return {...acc, [certType]: item}
      }, {})

      return {...state, docs: fetchedRegDocs, isFetching: false}

    case actionTypes.FETCH_REGISTRATION_FAIL:
      return {...state, error: action.payload.error}

    case actionTypes.SET_REGISTRATION_DATA:
      const setCertType = action.payload.certType
      const setCertDoc = {...state.docs[setCertType], ...action.payload.setData}
      const docsAfterSet = {...state.docs, [setCertType]: setCertDoc}
      return {...state, docs: docsAfterSet}

    // .............................................................................................

    case actionTypes.SAVE_REGISTRATION_REQU:
      return Object.assign({}, state, {error: null})

    case actionTypes.SAVE_REGISTRATION_SUCC:
      const savedReg = action.payload.registration
      const certType = savedReg['certificate-type']
      const savedRegDoc = {...state.docs[certType], ...savedReg}
      const regDocsAfterSave = {...state.docs, [certType]: savedRegDoc }
      return {...state, docs: regDocsAfterSave, isFetching: false}

    case actionTypes.SAVE_REGISTRATION_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    default:
      return state
  }
}
