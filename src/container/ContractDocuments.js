import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments, saveDocument, saveContractDelivery } from '../actions/deliveryDetails'
import { showDialog, hideDialog } from '../actions/dialogs'
import ContractDocuments from '../components/ContractDocuments'

class ContractDocumentsContainer extends Component {
  componentWillMount () {
    this.props.fetchDocuments()
  }
  render () {
    return <ContractDocuments {...this.props} />
  }
}

const allDocsCheckedBySeller = (documents) => {
  const missingDocs = documents.filter(doc => doc.missing)
  return missingDocs.length === 0
}

const allDocsCheckedByDispo = (documents) => {
  const missingDocs = documents.filter(doc => {
    if (doc.missing) {
      return doc.dispo_checked === false
    }

    if (doc.seller_checked) {
      return doc.dispo_checked === false
    }

    return false
  })

  return missingDocs.length === 0
}

const mapStateToProps = (state) => {
  const documentsList = Object.values(state.documents.docs)
  return {
    documents: state.documents,
    allDocsCheckedBySeller: allDocsCheckedBySeller(documentsList),
    allDocsCheckedByDispo: allDocsCheckedByDispo(documentsList),
    allDocsConfirmedByDispo: state.contract.doc.all_docs_confirmed,
    dlgConfirmAllDocumentsIsActive: state.dialogs.dlgConfirmAllDocuments || false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDocuments: () => {
      const contractId = ownProps.contractId
      dispatch(fetchDocuments(contractId))
    },
    setSellerChecked: (documentId, sellerChecked) => {
      const contractId = ownProps.contractId
      const documentData = {
        seller_checked: sellerChecked
      }
      dispatch(saveDocument({
        contractId,
        documentId,
        documentData
      }))
    },
    setDispoChecked: (documentId, dispoChecked) => {
      const contractId = ownProps.contractId
      const documentData = {
        dispo_checked: dispoChecked
      }
      dispatch(saveDocument({
        contractId,
        documentId,
        documentData
      }))
    },
    resetAllDocsConfirmed: () => {
      const contractId = ownProps.contractId
      const saveData = {all_docs_confirmed: false}
      dispatch(saveContractDelivery({contractId, saveData}))
      saveContractDelivery({contractId, saveData: {all_docs_confirmed: false}})
    },
    showDlgConfirmAllDocuments: () => {
      dispatch(showDialog('dlgConfirmAllDocuments'))
    },
    dlgActionCancel: () => {
      dispatch(hideDialog('dlgConfirmAllDocuments'))
    },
    dlgActionConfirm: () => {
      const contractId = ownProps.contractId
      const saveData = {all_docs_confirmed: true}
      dispatch(saveContractDelivery({contractId, saveData}))
      dispatch(hideDialog('dlgConfirmAllDocuments'))
    }
  }
}

ContractDocumentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDocumentsContainer)

export default ContractDocumentsContainer
