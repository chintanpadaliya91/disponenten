import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Switch from 'react-toolbox/lib/switch/Switch'
import Dialog from 'react-toolbox/lib/dialog/Dialog'

import { DOCUMENT_GROUPS } from '../constants/contractDocuments'

const DlgConfirmAllDocuments = (props) => {
  const { dlgActionCancel, dlgActionConfirm, dlgConfirmAllDocumentsIsActive } = props
  const actions = [
    {label: 'Bestätigen', onClick: dlgActionConfirm},
    {label: 'Abbrechen', onClick: dlgActionCancel}
  ]

  return (
    <div>
      <Dialog
        active={dlgConfirmAllDocumentsIsActive}
        actions={actions}
        title='Alle Dokumente vorhanden'>
        <p>Alle benötigten Dokumente sind vorhanden und geprüft.</p>
      </Dialog>
    </div>
  )
}

const DocumentGroup = (props) => {
  const {grouped, allDocsConfirmedByDispo} = props
  return (
    <table className="document-group">
      <thead>
        <tr>
          <th className='document-id'>{grouped.groupLabel}</th>
          <th className='seller-checked' />
          <th className='dispo-checkd' />
        </tr>
      </thead>
      <tbody>
        {grouped.docs.map((doc, index) =>
          <tr className={doc.missing && !doc.dispo_checked ? 'missing' : ''} key={index}>
            <td>{doc.label}</td>
            <td className='seller-checked'>
              <Checkbox
                checked={doc.seller_checked}
                disabled={true}
                onChange={(sellerChecked) => props.setSellerChecked(doc.document_id, sellerChecked)} />
            </td>
            <td className='dispo-checked'>
              <Checkbox
                checked={doc.dispo_checked}
                disabled={allDocsConfirmedByDispo}
                onChange={(dispoChecked) => props.setDispoChecked(doc.document_id, dispoChecked)} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const DocumentsList = (props) => {
  const documents = Object.values(props.documents.docs)
  const { allDocsCheckedByDispo, allDocsConfirmedByDispo, showDlgConfirmAllDocuments, resetAllDocsConfirmed } = props

  const groupedDocs = Object.values(DOCUMENT_GROUPS)

    .map(group => {
      const grouped = documents.filter(doc => doc.groupId === group.id)
      if (grouped.length === 0) {
        return null
      }

      return {
        groupLabel: DOCUMENT_GROUPS[group.id].label,
        docs: grouped
      }
    })
    .filter(group => group !== null)

  const switchAction = allDocsConfirmedByDispo === true
    ? () => resetAllDocsConfirmed()
    : () => showDlgConfirmAllDocuments()

  return (
    <div id='contract-documents'>
      <table>
        <thead>
          <tr>
            <th className='document-id' />
            <th className='seller-checked'>Verkäufer</th>
            <th className='dispo-checked'>Dispo</th>
          </tr>
        </thead>
      </table>
      {groupedDocs.map((grouped, index) => {
        return <DocumentGroup {...props} grouped={grouped} key={index} />
      })}
      <section id='confirm-all-docs'>
        <Switch
          checked={allDocsConfirmedByDispo}
          disabled={allDocsCheckedByDispo === false}
          label="alle Dokumente sind vorhanden"
          onChange={switchAction}
        />
      </section>
    </div>
  )
}

const ContractDocuments = (props) => {
  const isFetching = props.documents.isFetching
  const errorMessage = props.documents.error
  const { allDocsCheckedBySeller, allDocsCheckedByDispo, allDocsConfirmedByDispo } = props

  let statusClassName = 'status-orange'

  if (allDocsCheckedBySeller === false) {
    statusClassName = 'status-red'
  }

  if (allDocsCheckedByDispo) {
    statusClassName = 'status-orange'
  }

  if (allDocsConfirmedByDispo) {
    statusClassName = 'status-green'
  }

  if (isFetching) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Dokumente</h4>
        <div className='component-body'>
          <div>Dokumente werden geladen...</div>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Dokumente</h4>
        <div className='component-body'>
          <div className='error-message'>Fehler beim Laden: {errorMessage}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={'component ' + statusClassName}>
      <h4 className='component-heading'>Dokumente</h4>
      <div className='component-body'>
        <DocumentsList {...props} />
        <DlgConfirmAllDocuments {...props} />
      </div>
    </div>
  )
}

export default ContractDocuments
