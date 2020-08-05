import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'

import DeliveryStatusField from '../container/DeliveryStatusField'

import { DELIVERY_TYPE_FORERUN,
         DELIVERY_TYPE_DELIVERY,
         DELIVERY_TYPE_FINALCHECK } from '../constants/deliveryTypes'

import SELLERS from '../constants/sellers'

import formatDate from '../tools/formatDate'

function getItemStatus (props) {
  const financed = props.financed
  const deliveryType = props.delivery_type
  const finalChecked = props.final_checked
  const paymentsStatus = props.paymentsStatus
  const deliveryOverdued = props.delivery_overdued

  const statusList = []

  if (deliveryType === DELIVERY_TYPE_FORERUN) {
    if (financed) {
      statusList.push('financed')
    }

    if (paymentsStatus && paymentsStatus.prepayed) {
      statusList.push('possibly-prepayed')
    }
    else {
      statusList.push('new')
    }
  }

  else if (deliveryType === DELIVERY_TYPE_DELIVERY) {
    if (deliveryOverdued) {
      statusList.push('overdued')
    }
  }

  else if (deliveryType === DELIVERY_TYPE_FINALCHECK) {
    if (finalChecked) {
      statusList.push('checked')
    }
    else {
      statusList.push('unchecked')
    }
  }

  return statusList.join(' ')
}

const DeliveryListItem = (props) => {
  const customer = props.customer_type === 1
    ? `P - ${props.first_name} ${props.last_name}`
    : `U - ${props.company_name}`

  const phone = [props.phone1, props.phone2]
    .filter(item => item.length > 0)
    .join(', ')

  const seller = SELLERS
    .filter(item => item.id === props.seller_id)
    .map(item =>
      item.name
        .split(/\s/)
        .map(item => item.substr(0, 2))
        .join('')
    )

  const desiredDeliveryDate = props.desired_delivery_date !== null
    ? <div className='desired-delivery-date'>Wunsch: {formatDate(props.desired_delivery_date)}</div>
    : ''

  const arrangedDeliveryDate = props.arranged_delivery_date !== null
    ? <div><FontIcon value='alarm' />&nbsp;<span>{formatDate(props.arranged_delivery_date, true)}</span></div>
    : <div className='not-arranged'>
      <div>kein Termin vereinbart</div>
      {desiredDeliveryDate}
    </div>

  const isDelivered = !!props.delivered
  const realDeliveryDate = isDelivered
    ? <div><FontIcon value='done' />&nbsp;<span>{formatDate(props.real_delivery_date, true)}</span></div>
    : ''

  const product = props.contract_type === 7
    ? Array.isArray(props.sold_products) ? props.sold_products.join(', ') : 'keine Produkte?'
    : props.manufacturer + ' ' + props.model

  const itemClassName = ['delivery-item']
  if (props.delivered === false && props.delivery_overdued) {
    itemClassName.push('overdued')
  }

  if (props.final_checked) {
    itemClassName.push('checked')
  }

  const classNameDeliveryDate = ['param', 'arranged-delivery-date']
  if (props.delivered) {
    classNameDeliveryDate.push('is-delivered')
  }
  else if (props.delivery_overdued) {
    classNameDeliveryDate.push('is-overdued')
  }

  const itemStatusClassName = getItemStatus(props)

  return (
    <tr
      className={itemClassName.join(' ')}
      onClick={() => props.showDeliveryDetails({contractId: props.contract_id, customerId: props.ahr_customer_id})}>
      <td className={'param status ' + itemStatusClassName}><div /></td>
      <DeliveryStatusField statusName='documents' contractId={props.contract_id} />
      <DeliveryStatusField statusName='tasks' contractId={props.contract_id} />
      <DeliveryStatusField statusName='registration' contractId={props.contract_id} />
      <DeliveryStatusField statusName='openPayments' contractId={props.contract_id} />
      {/*<DeliveryStatusField statusName='tradein' contractId={props.contract_id} />*/}
      <td className='param intno'>{props.int_no}</td>
      <td className='param vehicle'>{product}</td>
      <td>{props.vin}</td>
      <td>{props.reg_doc_no}</td>
      <td>{customer}</td>
      <td>{phone}</td>
      <td>{props.email}</td>
      <td>{seller}</td>
      <td>{props.contract_completed_date}</td>
      <td>...</td>
      <td className={classNameDeliveryDate.join(' ')}>{isDelivered ? realDeliveryDate : arrangedDeliveryDate}</td>
    </tr>
  )
}

export default DeliveryListItem
