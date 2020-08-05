import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContractData from '../components/ContractData'
import { fetchContract,
         setDeliverDateArranged, setDeliverTimeArranged, saveArrangedDeliveryDate,
         saveContractDelivery } from '../actions/deliveryDetails'
import { moveVehicleToInsale } from '../actions/moveCcVehicle'
import { showDialog, hideDialog } from '../actions/dialogs'

class ContractDataContainer extends Component {
  componentWillMount () {
    const contractId = this.props.contractId
    this.props.fetchContract(contractId)
  }
  render () {
    return <ContractData {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    dlgConfirmPrepayed: state.dialogs.dlgConfirmPrepayed,
    dlgConfirmDelivered: state.dialogs.dlgConfirmDelivered,
    dlgConfirmFinalChecked: state.dialogs.dlgConfirmFinalChecked
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchContract: (contractId) => {
      dispatch(fetchContract(contractId))
    },
    setDeliveryDateArranged: (timestamp) => {
      dispatch(setDeliverDateArranged(timestamp))
    },
    setDeliveryTimeArranged: (timestamp) => {
      dispatch(setDeliverTimeArranged(timestamp))
    },
    saveArrangedDeliveryDate: () => {
      dispatch(saveArrangedDeliveryDate())
    },
    showDialog: (dlgName) => {
      dispatch(showDialog(dlgName))
    },
    hideDialog: (dlgName) => {
      dispatch(hideDialog(dlgName))
    },
    confirmPrepayed: async ({contractId, ccVehicleId}) => {
      const saveData = {prepayed: true}
      await dispatch(saveContractDelivery({contractId, saveData}))
      if (ccVehicleId > 0) {
        try {
          await dispatch(moveVehicleToInsale(ccVehicleId))
        }
        catch (err) {
          console.error('[ContractDataContainer] [confirmPrepayed]', err)
        }
      }
      dispatch(hideDialog('dlgConfirmPrepayed'))
    },
    confirmDelivered: async ({contractId}) => {
      const saveData = {delivered: true}
      await dispatch(saveContractDelivery({contractId, saveData}))
      dispatch(hideDialog('dlgConfirmDelivered'))
    },
    confirmFinalChecked: async ({contractId}) => {
      const saveData = {final_checked: true}
      await dispatch(saveContractDelivery({contractId, saveData}))
      dispatch(hideDialog('dlgConfirmFinalChecked'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDataContainer)

// export default ContractDataContainer
