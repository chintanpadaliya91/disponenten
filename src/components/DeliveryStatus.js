import React from 'react'

import { DELIVERY_TYPES, DELIVERY_TYPE_FORERUN, DELIVERY_TYPE_DELIVERY,
         DELIVERY_TYPE_FINALCHECK, DELIVERY_TYPE_ARCHIVE } from '../constants/deliveryTypes'

import formatDate from '../tools/formatDate'

import '../styles/DeliveryStatus.css'

const DELIVERY_TYPE_ACTIONS = {
  [DELIVERY_TYPE_FORERUN]: 'angezahlt',
  [DELIVERY_TYPE_DELIVERY]: 'ausgeliefert',
  [DELIVERY_TYPE_FINALCHECK]: 'gecheckt',
  [DELIVERY_TYPE_ARCHIVE]: 'abgerechnet'
}

const StatusItem = (props) => {
  const circleClassName = ['circle']
  if (props.is_checked) {
    circleClassName.push('checked')
  }

  const arrowClassName = ['arrow']

  if (props.is_checked && !props.is_current) {
    arrowClassName.push('checked')
  }
  else if (props.is_pending && props.is_current) {
    arrowClassName.push('is-pending')
  }

  return (
    <div className='delivery-status-item'>
      <div className='status-title'>{props.title}</div>
      <div className='status-details'>
        <div className={circleClassName.join(' ')} />
        <div>
          {props.show_arrow ? <div className={arrowClassName.join(' ')} /> : <div className='arrow-placeholder' />}
          {props.is_checked && !props.is_current
            ? <div>
              <div>{props.delivery_action} am {formatDate(props.action_date, true)}</div>
              <div />
            </div>
            : ''}
        </div>
      </div>
    </div>
  )
}

function isStatusChecked (props) {
  if (props.delivery_type === DELIVERY_TYPE_FORERUN) {
    return true
  }

  if (props.delivery_type === DELIVERY_TYPE_DELIVERY) {
    return props.prepayed
  }

  if (props.delivery_type === DELIVERY_TYPE_FINALCHECK) {
    return props.delivered
  }

  if (props.delivery_type === DELIVERY_TYPE_ARCHIVE) {
    return props.comm_accounted
  }

  return false
}

function getCurrentStatus (props) {
  if (props.comm_accounted) {
    return DELIVERY_TYPE_ARCHIVE
  }

  if (props.delivered || props.final_checked) {
    return DELIVERY_TYPE_FINALCHECK
  }

  if (props.prepayed) {
    return DELIVERY_TYPE_DELIVERY
  }

  return DELIVERY_TYPE_FORERUN
}

function isPendingForNextStatus (props) {
  const currentStatus = getCurrentStatus(props)

  if (props.delivery_type === currentStatus) {
    if (props.delivery_type === DELIVERY_TYPE_FINALCHECK) {
      return props.delivered && props.final_checked
    }
    else {
      return true
    }
  }

  return false
}

function getDeliveryActionDate (props) {
  if (props.delivery_type === DELIVERY_TYPE_ARCHIVE) {
    return props.comm_accounted_date
  }

  if (props.delivery_type === DELIVERY_TYPE_FINALCHECK && props.final_checked) {
    return props.final_checked_date
  }

  if (props.delivery_type === DELIVERY_TYPE_DELIVERY && props.delivered) {
    return props.real_delivery_date
  }

  if (props.delivery_type === DELIVERY_TYPE_FORERUN && props.prepayed) {
    return props.prepayed_date
  }

  return null
}

const DeliveryStatus = (props) => {
  return (
    <div id='delivery-status'>
      {DELIVERY_TYPES.map((item, index) => {
        const statusProps = {
          title: item.label,
          delivery_type: item.value,
          delivery_action: DELIVERY_TYPE_ACTIONS[item.value],
          action_date: getDeliveryActionDate({...props, delivery_type: item.value}),
          show_arrow: item.value !== DELIVERY_TYPE_ARCHIVE,
          is_checked: isStatusChecked({...props, delivery_type: item.value}),
          is_current: getCurrentStatus(props) === item.value,
          is_pending: isPendingForNextStatus({...props, delivery_type: item.value})
        }
        return <StatusItem key={index} {...statusProps} />
      })}
    </div>
  )
}

export default DeliveryStatus
