import React from 'react'
import AppLayout from './AppLayout'
import Input from 'react-toolbox/lib/input/Input'

import SelectDeliveryType from '../container/SelectDeliveryType'
import DeliveryListItem from '../container/DeliveryListItem'
import DeliveryDetails from '../container/DeliveryDetails'

import '../styles/DeliveryList.css'

const DeliverListTableHead = (props) => {
  return (
    <thead>
      <tr>
        <th></th>
        <th className='traffic-lights'>D</th>
        <th className='traffic-lights'>A</th>
        <th className='traffic-lights'>Z</th>
        <th className='traffic-lights'>
          <span
            className={props.list.sort.param === ' payments' ? 'pointer red' : 'pointer'}
            onClick={() => props.sortDeliveryList({param: 'payments', direction: 1})}>&euro;</span>
          <div>
            {(props.newPaymentsCount > 0)
              ? <span className='counter red'>{props.newPaymentsCount}</span>
              : ''
            }
          </div>

        </th>
        {/*<th className='traffic-lights'>I</th>*/}
        <th className='param intno'>
          <Input
            type='text'
            label='int. No'
            value={props.filter.intNo}
            onChange={value => props.changeFilter({intNo: value})}
            onKeyPress={e => props.filterOnEnter(e)} />
        </th>
        <th className='param vehicle'>Fahrzeug/Produkt(e)</th>
        <th className='param vin'>
          <Input
            type='text'
            label='VIN'
            value={props.filter.vin}
            onChange={value => props.changeFilter({vin: value})}
            onKeyPress={e => props.filterOnEnter(e)} />
        </th>
        <th className='param reg-doc-no'>
          <Input
            type='text'
            label='Brief'
            value={props.filter.regDocNo}
            onChange={value => props.changeFilter({regDocNo: value})}
            onKeyPress={e => props.filterOnEnter(e)} />
        </th>
        <th className='param customer'>
          <Input
            type='text'
            label='Kunde'
            value={props.filter.customer}
            onChange={value => props.changeFilter({customer: value})}
            onKeyPress={e => props.filterOnEnter(e)} />
        </th>
        <th className='param phone'>Telefon</th>
        <th className='param email'>Email</th>
        <th className='param seller'>Verkäufer</th>
        <th>VK-Datum</th>
        <th>Zulassung</th>
        <th><div>Auslieferungstermin /</div><div>ausgeliefert</div></th>
      </tr>
    </thead>
  )
}

const DeliverListTableBody = (props) => {
  return (
    <tbody>
      {props.list.docs.map((doc, index) => {
        const docProps = {...doc, delivery_type: props.filter.deliveryType}
        return (<DeliveryListItem key={index} {...docProps} />)
      })}
    </tbody>
  )
}

const DeliveryList = (props) => {
  return (
    <AppLayout title={'Liste der Auslieferungen'} showBtnBackToList={false}>
      <SelectDeliveryType {...props} />
      <table id='delivery-list'>
        <DeliverListTableHead {...props} />
        {props.list.isFetching
          ? <tbody><tr><td colSpan='3'>Daten werden geladen</td></tr></tbody>
          : <DeliverListTableBody {...props} />
        }
      </table>
      <DeliveryDetails />
    </AppLayout>
  )
}

export default DeliveryList
