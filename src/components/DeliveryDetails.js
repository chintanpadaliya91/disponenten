import React from 'react'
import ContractData from '../container/ContractData'
import ContractPurchases from '../container/ContractPurchases'
import ContractPaymentPlan from '../container/ContractPaymentPlan'
import CustomerPayments from '../container/CustomerPayments'
import TaskList from '../container/TaskList'
import ContractDocuments from '../container/ContractDocuments'
import Registration from '../container/Registration'
import TradeIn from '../container/InZahlungNahme'

import Dialog from 'react-toolbox/lib/dialog/Dialog'

import '../styles/DeliveryDetails.css'


const DeliveryDetails = (props) => {
  if (props.dlgDeliveryDetails === false) {
    return (
      <div />
    )
  }

  return (
    <Dialog
      active={props.dlgDeliveryDetails}
      id='dlg-delivery-details'
      className='fullscreen'
      type='fullscreen'
      onEscKeyDown={props.hideDeliveryDetails}
      >
      <div id='delivery-details'>
        <ContractData {...props} />
        <div className="flexed-columns">
          <div className="left-column">
            <ContractPurchases {...props} />
            <ContractPaymentPlan {...props} />
            <CustomerPayments {...props} />
            <TradeIn {...props}/>
            <Registration {...props} />
          </div>
          <div className="right-column">
            <ContractDocuments {...props} />
            <TaskList {...props} />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DeliveryDetails
