import React from 'react'
import GermanDatePicker from './GermanDatePicker'
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker'
import Button from 'react-toolbox/lib/button/Button'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Dialog from 'react-toolbox/lib/dialog/Dialog'

import DeliveryStatus from '../components/DeliveryStatus'
import DeliveryComments from '../container/DeliveryComments'
import { getCountryLabel } from '../constants/countries'
import { getFinancingBankLabel } from '../constants/financingBanks'
import formatDecimalValue from '../tools/formatDecimalValue'
import formatDate from '../tools/formatDate'

const ContractCustomer = (contract) => {
  const {customer} = contract
  const customerName = customer.customer_type === 1
    ? `${customer.first_name} ${customer.last_name}`
    : customer.company_name

  const customerCountry = getCountryLabel(customer.country_code)
  const contactMedia = [customer.phone1, customer.phone2, customer.email ]
  const customerType = customer.customer_type === 1 ? 'Privat' : 'Gewerbe'

  let dealType
  if (customer.country_code === 'DE') {
    dealType = 'Deutschland'
  }
  else if (customer.country_is_eu === 1) {
    dealType = 'innergemeinschaftliche Lieferung'
  }
  else {
    dealType = 'Ausfuhr'
  }

  return (
    <div id='customer-address' className='content-box'>
      <h4>Kunde</h4>
      <p className='customer-no'>{customer.ahr_customer_no}</p>
      <p>{customerName}</p>
      <p>{customer.street}</p>
      <p>{customer.post_code} {customer.city}</p>
      <p>{customerCountry}</p>
      <h4>Kontakt</h4>
      {contactMedia.filter(media => media && media.length > 0).map((media, index) =>
        <p key={index}>{media}</p>
      )}
      <h4>USt.-Behandlung</h4>
      <p>{customerType}</p>
      <p>{dealType}</p>
    </div>
  )
}

const ContractVehicle = (vehicle) => {
  const regDocLocation = vehicle.reg_doc_location.trim().length > 0
    ? <span className='reg-doc-location'>({vehicle.reg_doc_location})</span>
    : ''

  return (
    <div id='contract-vehicle' className='content-box'>
      <h4>Fahrzeug</h4>
      <p className='int-no'>{vehicle.int_no}</p>
      <p>{vehicle.manufacturer} {vehicle.model}</p>
      <p>VIN: {vehicle.vin}</p>
      <p>Brief: {vehicle.reg_doc_no} {regDocLocation}</p>
    </div>
  )
}

const DeliveryDates = (props) => {
  const contract = props.contract.doc
  const { seller } = contract

  const desiredDeliveryDateIsSet = contract.desired_delivery_date !== null
  const arrangedDeliverySelected = contract.arranged_delivery_date !== null

  const arrangedDeliveryDateObj = arrangedDeliverySelected
    ? new Date(contract.arranged_delivery_date)
    : desiredDeliveryDateIsSet
      ? new Date(contract.desired_delivery_date)
      : new Date()

  const classNameNotSelected = arrangedDeliverySelected === false
    ? 'not-selected'
    : ''

  if (arrangedDeliverySelected === false && desiredDeliveryDateIsSet) {
    arrangedDeliveryDateObj.setHours(11)
    arrangedDeliveryDateObj.setMinutes(0)
  }

  const isDelivered = !!contract.delivered

  return (
    <div id='delivery-dates' className='content-box'>
      <h4>Vetragsdaten</h4>
      <p>Verkäufer: {seller}</p>
      <p>Vertragsdatum: {formatDate(contract.contract_completed_date, true)}</p>
      <p>Wunschtermin Auslieferung: {formatDate(contract.desired_delivery_date)}</p>
      <h4>mit Kunden vereinbarter Termin:</h4>
      {(arrangedDeliverySelected === false && desiredDeliveryDateIsSet === false)
        ? <h4 className='no-date-delivery-arranged'>Es wurde noch kein Termin vereinbart!</h4>
        : ''
      }
      <div className={'delivery-date-arranged ' + classNameNotSelected}>
        <GermanDatePicker
          label='Datum'
          dateValue={arrangedDeliveryDateObj}
          disabled={isDelivered}
          onChangeInput={dateObj => props.setDeliveryDateArranged(dateObj)} />
        <TimePicker
          label='Uhrzeit'
          cancelLabel='Abbrechen'
          value={arrangedDeliveryDateObj}
          disabled={isDelivered}
          onChange={dateObj => props.setDeliveryTimeArranged(dateObj)} />
      </div>
      {props.contract.isDirty === true
        ? <Button raised primary onClick={props.saveArrangedDeliveryDate}>speichern</Button>
        : ''
      }
    </div>
  )
}

const DlgConfirmPrepayed = (props) => {
  const contract = props.contract.doc
  const vehicle = contract.vehicle

  const bodyText = contract.contract_type !== 7
    ? <p>Das Fahrzeug {vehicle.manufacturer} {vehicle.model} <span className='bold'>{vehicle.int_no}</span> wird nach <span className='bold'>"im Verkauf"</span> verschoben und aus der Werbung genommen.</p>
    : <p>Das Produkt wurde angezahlt</p>

  return (
    <Dialog
      active={props.dlgConfirmPrepayed} >
      <h4 className='dialog-title'>Kunde hat Fahrzeug/Produkt angezahlt</h4>
      <div className='dialog-body'>{bodyText}</div>
      <div className='dialog-buttons'>
        <Button
          primary
          raised
          onClick={() => props.confirmPrepayed({contractId: contract.contract_id, ccVehicleId: contract.vehicle.ccid})}>OK</Button>
        <Button
          raised
          onClick={() => props.hideDialog('dlgConfirmPrepayed')}>Abbrechen</Button>
      </div>
    </Dialog>
  )
}

const DlgConfirmDelivered = (props) => {
  const contract = props.contract.doc
  const vehicle = contract.vehicle

  const bodyText = contract.contract_type !== 7
    ? <p>Das Fahrzeug {vehicle.manufacturer} {vehicle.model} <span className='bold'>{vehicle.int_no}</span> wurde ausgeliefert.</p>
    : <p>Das Produkt wurde ausgeliefert</p>

  return (
    <Dialog
      active={props.dlgConfirmDelivered} >
      <h4 className='dialog-title'>Fahrzeug/Produkt ist ausgeliefert</h4>
      <div className='dialog-body'>{bodyText}</div>
      <div className='dialog-buttons'>
        <Button
          primary
          raised
          onClick={() => props.confirmDelivered({contractId: contract.contract_id})}>OK</Button>
        <Button
          raised
          onClick={() => props.hideDialog('dlgConfirmDelivered')}>Abbrechen</Button>
      </div>
    </Dialog>
  )
}

const DlgConfirmFinalChecked = (props) => {
  const contract = props.contract.doc
  const vehicle = contract.vehicle

  const bodyText = contract.contract_type !== 7
    ? <p>Das Fahrzeug {vehicle.manufacturer} {vehicle.model} <span className='bold'>{vehicle.int_no}</span> wird nach <span className='bold'>"verkaufte"</span> verschoben kann provisionert werden.</p>
    : <p>Das Produkt kann provisionert werden.</p>

  return (
    <Dialog
      active={props.dlgConfirmFinalChecked} >
      <h4 className='dialog-title'>VL-Check abgeschlossen</h4>
      <div className='dialog-body'>
        {bodyText}
        <ul>
          <li>Alle Dokumente inkl. Unterschrift sind vorhanden?</li>
          <li>Das Fahrzeug/Produkt ist vollständig bezahlt?</li>
          <li>Alle Aufträge sind erledigt?</li>
        </ul>
      </div>
      <div className='dialog-buttons'>
        <Button
          primary
          raised
          onClick={() => props.confirmFinalChecked({contractId: contract.contract_id})}>OK</Button>
        <Button
          raised
          onClick={() => props.hideDialog('dlgConfirmFinalChecked')}>Abbrechen</Button>
      </div>
    </Dialog>
  )
}

const ContractStatus = (props) => {
  const contract = props.contract.doc

  const prepayedDate = contract.prepayed_date > 0 ? formatDate(contract.prepayed_date, true) : ''
  const realDeliveryDate = contract.real_delivery_date > 0 ? formatDate(contract.real_delivery_date, true) : ''
  const finalCheckedDate = contract.final_checked_date > 0 ? formatDate(contract.final_checked_date, true) : ''

  return (
    <div id='contract-status' className='content-box'>
      <h4>Status</h4>
      <div>
        <div className={contract.prepayed ? 'status-item checked' : 'status-item'}>
          <Checkbox
            checked={contract.prepayed}
            disabled={contract.prepayed}
            label='angezahlt'
            onChange={() => props.showDialog('dlgConfirmPrepayed')} />
          <div className='status-date'>{prepayedDate}</div>
        </div>
        <div className={contract.delivered ? 'status-item checked' : 'status-item'}>
          <Checkbox
            checked={contract.delivered}
            disabled={!contract.prepayed || contract.delivered}
            label='ausgeliefert'
            onChange={() => props.showDialog('dlgConfirmDelivered')} />
          <div className='status-date'>{realDeliveryDate}</div>
        </div>
        <div className={contract.final_checked ? 'status-item checked' : 'status-item'}>
          <Checkbox
            checked={contract.final_checked}
            disabled={!contract.delivered || contract.final_checked}
            label='VL-Check'
            onChange={() => props.showDialog('dlgConfirmFinalChecked')} />
          <div className='status-date'>{finalCheckedDate}</div>
        </div>
        <div className={contract.comm_accounted ? 'status-item checked' : 'status-item'}>
          <Checkbox
            checked={contract.comm_accounted}
            disabled={true}
            label='archiviert' />
        </div>

      </div>
      <DlgConfirmPrepayed {...props} />
      <DlgConfirmDelivered {...props} />
      <DlgConfirmFinalChecked {...props} />
    </div>
  )
}

const ContractFinancing = (financing) => {
    const bankLabel = getFinancingBankLabel(financing.bank)
  return (
    <div id='contract-financing' className='content-box'>
      <h4>Finanzierung</h4>
      {!!financing.total === false
        ? <p>keine Finanzierung</p>
        : <div>
          <p>Bank: {bankLabel}</p>
          <p>fin. Summe: {formatDecimalValue(financing.total / 100)}&nbsp;&euro;</p>
          <p>
            {financing.advance_payment > 0
            ? <span>Anzahlung: <span className='advance-payment'>{formatDecimalValue(financing.advance_payment / 100)}&nbsp;&euro;</span></span>
            : <span className='advance-payment'>vollfinanziert</span>
          }
          </p>
        </div>
      }
    </div>
  )
}

const redeemBalancers = {
  0: 'Autohaus Royal (AHR kassiert Ablöse vom Kunden)',
  1: 'Ablöse wird durch den Kunden mitfinanziert',
  2: 'Kunde löst selber ab'
}

const ContractTradein = (tradein) => {
  return (
    <div id='contract-financing' className='content-box'>
      <h4>Inzahlungnahme</h4>
      {!!tradein.desired === false
        ? <p>keine Inzahlungnahme</p>
        : <div>
          <p>{tradein.vehicle}</p>
          <p>Wert Inz.: {formatDecimalValue(tradein.rating_value / 100)}&nbsp;&euro;</p>
          <p>Abl&ouml;se: {tradein.redeem ? 'ja' : 'nein'}</p>
          {tradein.redeem
            ? <div>
              <p>Wert Ablöse: {formatDecimalValue(tradein.redeem_value / 100)}&nbsp;&euro;</p>
              <p>Wer löst ab: {redeemBalancers[tradein.redeem_balancer]}</p>
            </div>
            : ''
          }
        </div>
    }
    </div>
  )
}

const ContractData = (props) => {
  const contract = props.contract.doc
  const isFetching = props.contract.isFetching
  const errorMessage = props.contract.error

  if (isFetching) {
    return (
      <div className='component' id='contract-data'>
        <h4 className='component-heading'>
          <span>allgemeine Vetragsdaten</span>
        </h4>
        <div className='component-body'>
          <div>allgemeine Vetragsdaten wird geladen...</div>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='component' id='contract-data'>
        <h4 className='component-heading'>
          <span>allgemeine Vetragsdaten</span>
          <Button primary raised>Schließen</Button>
        </h4>
        <div className='component-body'>
          <div className='error-message'>Fehler beim Laden: {errorMessage}</div>
        </div>
      </div>
    )
  }

  const { vehicle, financing, tradein } = contract
  const { contractId } = props

  const contractVehicle = contract.contract_type === 7
    ? ''
    : <ContractVehicle {...vehicle} />

  return (
    <div className='component' id='contract-data'>
      <h4 className='component-heading'>
        <span>allgemeine Vetragsdaten</span>
        <DeliveryStatus {...contract} />
        <Button primary raised onClick={props.hideDeliveryDetails}>Schließen</Button>
      </h4>
      <div className='component-body'>
        <div className='flex-row'>
          <ContractCustomer {...contract} />
          {contractVehicle}
          <div>
            <ContractFinancing {...financing} />
            <ContractTradein {...tradein} />
          </div>
          <DeliveryDates {...props} />
          <ContractStatus {...props} />
          <DeliveryComments contractId={contractId} />
        </div>
      </div>
    </div>
  )
}

export default ContractData
