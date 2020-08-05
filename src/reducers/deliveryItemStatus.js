import {
  FETCH_DELIVERY_ITEM_STATUS_REQU,
  FETCH_DELIVERY_ITEM_STATUS_SUCC,
  FETCH_DELIVERY_ITEM_STATUS_FAIL,
  RESET_DELIVERY_ITEM_STATUS } from '../actions/actionTypes'

import { initialTaskItems } from '../constants/tasks.js'

const allContractPerqsOrdered = (tasks) => {
  const unorderedTasks = tasks.filter(task =>
    task.in_contract === true && task.ordered === false
  )

  return unorderedTasks.length === 0
}

const allTasksCompleted = (tasks) => {
  const uncompletedTasks = tasks.filter(task =>
    task.ordered === true && task.completed === false
  )
  return uncompletedTasks.length === 0
}

const getTaskStatus = ({perqus, tasks}) => {
  const preparedInital = Object.values(initialTaskItems).reduce((listObj, item) => {
    listObj[item.task_id] = Object.assign({}, item, {in_contract: false, ordered: false, order_date: null, completed: false, completion_date: null})
    return listObj
  }, {})

  const mergedTasks = tasks.reduce((listObj, contractTask) => {
    const initialTask = listObj[contractTask.task_id]
    const mergedItem = Object.assign({}, initialTask, contractTask, {ordered: true})

    listObj[contractTask.task_id] = mergedItem
    return listObj
  }, preparedInital)

  const syncedTasks = Object.values(mergedTasks).map(task => {
    const inContract = task.hasOwnProperty('perquId') && !!perqus.find(perqu => perqu.selected && perqu.perquId === task.perquId)
    return {...task, in_contract: inContract}
  })

  let taskStatusValue = ''
  if (allContractPerqsOrdered(syncedTasks) === false) {
    taskStatusValue = 'status-red'
  }
  else if (allTasksCompleted(syncedTasks) === false) {
    taskStatusValue = 'status-orange'
  }
  else {
    taskStatusValue = 'status-green'
  }

  return {
    value: taskStatusValue,
    label: ''
  }
}

const getOpenPaymentsStatus = (props) => {
  const { total, contractBills, newPayments } = props
  let statusValue = ''
  let statusLabel = ''

  if (total <= 0) {
    statusValue = 'status-green'
  }
  else {
    if (contractBills > total) {
      statusValue = 'status-orange'
    }
    else {
      statusValue = 'status-red'
    }
  }

  if (newPayments > 0) {
    statusLabel = '€'
  }

  return {
    value: statusValue,
    label: statusLabel
  }
}

const getDocumentsStatus = ({documents, delivery}) => {
  const missingDocuments = Object.values(documents).filter(doc => doc.mandatory && doc.dispo_checked === false)

  let statusValue = 'status-red'
  if (missingDocuments.length === 0) {
    statusValue = delivery.all_docs_confirmed === true
      ? 'status-green'
      : 'status-orange'
  }

  return {
    value: statusValue,
    label: ''
  }
}

const getRegistrationStatus = ({registration, tasks}) => {
  const missingRegDocsSent = registration.filter(reg => parseInt(reg.reg_docs_sent, 10) === 0)
  const missingRegDocsArrived = registration.filter(reg => parseInt(reg.reg_docs_arrived, 10) === 0)

  let statusValue = ''
  let statusLabel = ''

  if (registration.length === 0) {
    statusValue = ''
    statusLabel = '✕'
  }
  else if (missingRegDocsSent.length > 0) {
    statusValue = 'status-red'
  }
  else if (missingRegDocsArrived.length > 0) {
    statusValue = 'status-orange'
  }
  else {
    statusValue = 'status-green'
  }

  const tuevIsOrdered = tasks.filter(task =>
    task.task_id === 'TASK_MAIN_INSPECTION' &&
    task.order_date > 0 &&
    task.completion_date === 0
  ).reduce((acc, task) => true, false)

  if (missingRegDocsSent.length > 0 && tuevIsOrdered) {
    statusLabel = 'TÜV'
  }

  return {
    value: statusValue,
    label: statusLabel
  }
}

const getTradeinStatus = () => {
  return {
    value: '',
    label: '...'
  }
}

const getPaymentsStatus = (props) => {
  const { total, contractBills, newPayments } = props

  if (total <= 0) {
    return {
      new: false,
      prepayed: false,
      newPayments: newPayments > 0,
      payed: true
    }
  }
  else {
    if (contractBills > total) {
      return {
        new: false,
        prepayed: true,
        newPayments: newPayments > 0,
        payed: false
      }
    }
    else {
      return {
        new: true,
        prepayed: false,
        newPayments: newPayments > 0,
        payed: false
      }
    }
  }
}

export function deliveryItemStatus (state = {}, action) {
  switch (action.type) {
    case RESET_DELIVERY_ITEM_STATUS:
      return {...state, docs: {}}

    case FETCH_DELIVERY_ITEM_STATUS_REQU:
      return {...state, isFetching: true, error: null}

    case FETCH_DELIVERY_ITEM_STATUS_SUCC:
      const { tasks, perqus, openPayments, delivery, documents, registration } = action.payload

      const taskStatus = getTaskStatus({tasks, perqus})
      const paymentsStatus = getPaymentsStatus(openPayments)
      const openPaymentsStatus = getOpenPaymentsStatus(openPayments)
      const documentsStatus = getDocumentsStatus({documents, delivery})
      const registrationStatus = getRegistrationStatus({registration, tasks})
      const tradeinStatus = getTradeinStatus()

      const itemStatus = {
        ...state.docs[action.payload.contractId],
        tasks: taskStatus,
        openPayments: openPaymentsStatus,
        payments: paymentsStatus,
        documents: documentsStatus,
        registration: registrationStatus,
        tradein: tradeinStatus
      }

      const preparedDocs = {...state.docs, [action.payload.contractId]: itemStatus}

      return {...state, docs: preparedDocs, isFetching: false}

    case FETCH_DELIVERY_ITEM_STATUS_FAIL:
      return {...state, isFetching: false, error: action.payload.error}

    default:
      return {...state}
  }
}
