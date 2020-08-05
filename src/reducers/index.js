import { combineReducers } from 'redux'

import { dialogs, dialogsExt } from './dialogs'
import { deliveryFilter } from './deliveryFilter'
import { deliveryList } from './deliveryList'
import { deliveryItemStatus } from './deliveryItemStatus'
import { contract, perquisites, paymentPlan, payments, openPayments,
         tasks, documents, registration, deliveryComments, addDeliveryComment, tradein } from './deliveryDetails'
import { moveCcVehicle } from './moveCcVehicle.js'

export default combineReducers({
  dialogs,
  dialogsExt,
  deliveryFilter,
  deliveryList,
  deliveryItemStatus,
  contract,
  deliveryComments,
  addDeliveryComment,
  perquisites,
  paymentPlan,
  payments,
  openPayments,
  tasks,
  documents,
  registration,
  moveCcVehicle,
  tradein
})
