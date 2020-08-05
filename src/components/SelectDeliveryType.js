import React from 'react'

import Button from 'react-toolbox/lib/button/Button'

import { DELIVERY_TYPES, DELIVERY_TYPE_FORERUN, DELIVERY_TYPE_DELIVERY,
         DELIVERY_TYPE_FINALCHECK } from '../constants/deliveryTypes'

const SelectDeliveryType = (props) => {
  const disabledClassName = props.listIsLoading
    ? 'disabled'
    : ''

  return (
    <div id='select-delivery-type' className={disabledClassName}>
      {Object.values(DELIVERY_TYPES).map((item, index) => {
        const selectedClassName = props.deliveryType === item.value
          ? 'selected'
          : ''

        const counterFinancedItems = (props.deliveryType === DELIVERY_TYPE_FORERUN && props.deliveryType === item.value && props.financedItemsCount > 0)
          ? <div className='counter blue financed' title='finanziert'>{props.financedItemsCount}</div>
          : ''

        const counterNewItems = (props.deliveryType === DELIVERY_TYPE_FORERUN && props.deliveryType === item.value && props.newItemsCount > 0)
          ? <div className='counter red new' title='Neuzugang'>{props.newItemsCount}</div>
          : ''

        //const counterPossiblyPrepayedItems = (props.deliveryType === DELIVERY_TYPE_FORERUN && props.deliveryType === item.value && props.possiblyPrepayedItems > 0)
        //   ? <div className='counter green prepayed' title='angezahlt?'>{props.possiblyPrepayedItems}</div>
        //   : ''

        const counterOverduedItems = (props.deliveryType === DELIVERY_TYPE_DELIVERY && props.deliveryType === item.value && props.overduedItemsCount > 0)
          ? <div className='counter red overdued' title='überfällig'>{props.overduedItemsCount}</div>
          : ''

        const counterCheckedItems = (props.deliveryType === DELIVERY_TYPE_FINALCHECK && props.deliveryType === item.value && props.checkedItemsCount > 0)
          ? <div className='counter green checked' title='vom VL gecheckt'>{props.checkedItemsCount}</div>
          : ''

        const counterUncheckedItems = (props.deliveryType === DELIVERY_TYPE_FINALCHECK && props.deliveryType === item.value && props.uncheckedItemsCount > 0)
          ? <div className='counter red unchecked' title='warten auf VL Check'>{props.uncheckedItemsCount}</div>
          : ''

        return <div key={index} className='button-container'>
          <Button
            className={selectedClassName}
            flat
            primary
            disabled={props.listIsLoading}
            onClick={() => props.changeDeliveryType(item.value)}>
            {item.label}
          </Button>
          {props.listIsLoading && props.deliveryType === item.value
            ? <div className='counter-container is-loading' />
            : <div className='counter-container'>
              {counterNewItems}

              {counterFinancedItems}
              {counterOverduedItems}
              {counterCheckedItems}
              {counterUncheckedItems}
            </div>
          }
        </div>
      }
      )}
    </div>
  )
}

export default SelectDeliveryType
