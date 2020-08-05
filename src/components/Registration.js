import React from 'react'

import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Input from 'react-toolbox/lib/input/Input'
import GermanDatePicker from './GermanDatePicker'

import '../styles/Registration.css'

const NoRegistration = (props) => {
  return (
    <div>keine Zulassung gewählt</div>
  )
}

const WhoRegisters = (registration) => {
  let operator = 'nicht gewählt'
  if (registration['who-registers'] === 'royal') {
    operator = 'AH Royal'
  }
  else if (registration['who-registers'] === 'customer') {
    operator = 'Kunde'
  }

  return (
    <section className='register-param who-registers'>
      <label className='register-param-label'>Zulassung durch</label>
      <span className='register-param-value'>{operator}</span>
    </section>
  )
}

const TemporaryDocuments = () => {
  return (
    <section className='register-param temporary-documents'>
      <label className='register-param-label'>Dokumente</label>
      <ul className='register-param-value'>
        <li>Zulassungsantrag</li>
        <li>Personalausweis / Pass mit Anmeldebescheinigung</li>
        <li>ZB I</li>
        <li>"grüne Versicherungskarte"</li>
      </ul>
    </section>
  )
}

const LicenceDocuments = () => {
  return (
    <section className='register-param licences-documents'>
      <label className='register-param-label'>Dokumente</label>
      <ul className='register-param-value'>
        <li>Zulassungsantrag</li>
        <li>elektronische Versicherungsbescheinigung (eVB)</li>
        <li>SEPA-Mandat</li>
        <li>Personalausweis / Pass mit Anmeldebescheinigung</li>
        <li>Gewerbeanmeldung</li>
        <li>ZB I</li>
        <li>ZB II</li>
        <li>HU/AU (mind. 1 Monat gültig)</li>
        <li>ABE</li>
        <li>Wunschkennzeichenbestätigung</li>
      </ul>
    </section>
  )
}

const LicensingOffice = (registration) => {
  const licencingOffice = registration['who-registers'] === 'royal'
    ? <span>Berlin via ZD "aktiv"</span>
    : <div>
      <div>{registration['registration-office-name']}</div>
      <div>{registration['registration-office-street']}</div>
      <div>{registration['registration-office-plz']}</div>
    </div>

  return (
    <section className='register-param licencing-office'>
      <label className='register-param-label'>Zulassungsstelle</label>
      <div className='register-param-value'>{licencingOffice}</div>
    </section>
  )
}

const LicenceDocsPostage = ({registration, saveRegistration, setRegistrationData}) => {
  const dateObj = registration.reg_docs_sent_date
    ? new Date(parseInt(registration.reg_docs_sent_date, 10))
    : null

  return (
    <section className='register-param licence-docs-postage'>
      <label className='register-param-label'>Versand der Dokumente</label>
      <div className='register-param-value'>
        <Checkbox
          checked={parseInt(registration.reg_docs_sent, 10) === 1}
          label='Dokumente versandt'
          onChange={(value) => saveRegistration({certType: registration['certificate-type'], saveData: {reg_docs_sent: value ? 1 : 0}})} />
        <GermanDatePicker
          label='versandt am'
          dateValue={dateObj}
          onChangeInput={(dateObj) => saveRegistration({certType: registration['certificate-type'], saveData: {reg_docs_sent_date: dateObj.getTime()}})} />
        <Input
          type='text'
          label='Tracking-ID'
          value={registration.reg_docs_sent_trackingid}
          onChange={(value) => setRegistrationData({certType: registration['certificate-type'], setData: {reg_docs_sent_trackingid: value}})}
          onBlur={() => saveRegistration({certType: registration['certificate-type'], saveData: {reg_docs_sent_trackingid: registration.reg_docs_sent_trackingid}})} />
      </div>
    </section>
  )
}

const LicenceDocsArrival = ({registration, saveRegistration}) => {
  const dateObj = registration.reg_docs_arrival_date
    ? new Date(parseInt(registration.reg_docs_arrival_date, 10))
    : null

  return (
    <section className='register-param licence-docs-arrival'>
      <label className='register-param-label'>Erhalt der Dokumente</label>
      <span className='register-param-value'>
        <Checkbox
          checked={parseInt(registration.reg_docs_arrived, 10) === 1}
          label='Dokumente zurückerhalten'
          onChange={(value) => saveRegistration({certType: registration['certificate-type'], saveData: {reg_docs_arrived: value ? 1 : 0}})} />
        <GermanDatePicker
          label='erhalten am'
          dateValue={dateObj}
          onChangeInput={(dateObj) => saveRegistration({certType: registration['certificate-type'], saveData: {reg_docs_arrival_date: dateObj.getTime()}})} />
      </span>
    </section>
  )
}

const RegistrationComments = ({registration, setRegistrationData, saveRegistration}) => {
  return (
    <section className='register-param registration-comments'>
      <label className='register-param-label'>Bemerkung</label>
      <span className='register-param-value'>
        <Input
          type='text'
          multiline
          rows={5}
          label='Bemerkung'
          value={registration.dispo_comments}
          onChange={(value) => setRegistrationData({certType: registration['certificate-type'], setData: {dispo_comments: value}})}
          onBlur={(value) => saveRegistration({certType: registration['certificate-type'], saveData: {dispo_comments: registration.dispo_comments}})} />
      </span>
    </section>
  )
}

const TemporaryRegistration = (props) => {
  const registration = props.registration.docs.temporary

  let statusClassName = 'status-red'

  if (parseInt(registration.reg_docs_sent, 10) === 0) {
    statusClassName = 'status-red'
  }
  else if (parseInt(registration.reg_docs_arrived, 10) === 0) {
    statusClassName = 'status-orange'
  }
  else {
    statusClassName = 'status-green'
  }

  return (
    <div className={statusClassName}>
      <h4>Kurzzeitkennzeichen</h4>
      <WhoRegisters {...registration} />
      <TemporaryDocuments />
      <LicensingOffice {...registration} />
      <LicenceDocsPostage
        registration={registration}
        setRegistrationData={props.setRegistrationData}
        saveRegistration={props.saveRegistration} />
      <LicenceDocsArrival
        registration={registration}
        saveRegistration={props.saveRegistration} />
      <RegistrationComments
        registration={registration}
        setRegistrationData={props.setRegistrationData}
        saveRegistration={props.saveRegistration} />
    </div>
  )
}

const LicenceRegistration = (props) => {
  const registration = props.registration.docs.licence

  let statusClassName = 'status-red'

  if (parseInt(registration.reg_docs_sent, 10) === 0) {
    statusClassName = 'status-red'
  }
  else if (parseInt(registration.reg_docs_arrived, 10) === 0) {
    statusClassName = 'status-orange'
  }
  else {
    statusClassName = 'status-green'
  }

  return (
    <div className={statusClassName}>
      <h4>Normales Kennzeichen</h4>
      <WhoRegisters {...registration} />
      <LicenceDocuments />
      <LicensingOffice {...registration} />
      <LicenceDocsPostage
        registration={registration}
        setRegistrationData={props.setRegistrationData}
        saveRegistration={props.saveRegistration} />
      <LicenceDocsArrival
        registration={registration}
        saveRegistration={props.saveRegistration} />
      <RegistrationComments
        registration={registration}
        setRegistrationData={props.setRegistrationData}
        saveRegistration={props.saveRegistration} />
    </div>
  )
}

const ExportRegistration = (props) => {
  let statusClassName = 'status-red'
  return (
    <div className={statusClassName}>Zollkennzeichen</div>
  )
}

const Registration = (props) => {
  const isFetching = props.registration.isFetching
  const errorMessage = props.registration.error

  const registration = props.registration.docs
  const noRegistrationDesired = Object.values(registration).length === 0 || registration.hasOwnProperty('no-register')

  if (isFetching) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Zulassung</h4>
        <div className='component-body'>
          <div>Zulassungsdaten werden geladen...</div>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Zulassung</h4>
        <div className='component-body'>
          <div className='error-message'>Fehler beim Laden: {errorMessage}</div>
        </div>
      </div>
    )
  }

  if (noRegistrationDesired) {
    return (
      <div className='component status-green'>
        <h4 className='component-heading'>Zulassung</h4>
        <div className='component-body'>
          <NoRegistration {...props} />
        </div>
      </div>
    )
  }

  let statusClassName = ''

  return (
    <div className={'component ' + statusClassName}>
      <h4 className='component-heading'>Zulassung</h4>
      <div id='registration' className='component-body'>
        {registration.hasOwnProperty('temporary') ? <TemporaryRegistration {...props} /> : ''}
        {registration.hasOwnProperty('licence') ? <LicenceRegistration {...props} /> : ''}
        {registration.hasOwnProperty('export') ? <ExportRegistration {...props} /> : ''}
      </div>
    </div>
  )
}

export default Registration
