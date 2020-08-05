import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeliveryListItem from '../components/DeliveryListItem'
import { fetchDeliverItemStatus } from '../actions/deliveryItemStatus'
import { showDialogExt } from '../actions/dialogs'

import getPaymentsStatusFromState from '../tools/getPaymentsStatusFromState'

class DeliveryListItemContainer extends Component {
  componentWillMount () {
    this.props.fetchDeliverItemStatus({
      customerId: this.props.ahr_customer_id,
      contractId: this.props.contract_id
    })
  }

  render () {
    return <DeliveryListItem {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const contractId = ownProps.contract_id
  const paymentsStatus = getPaymentsStatusFromState({state, contractId})

  return {
    paymentsStatus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDeliverItemStatus: (contractId) => {
      dispatch(fetchDeliverItemStatus(contractId))
    },
    showDeliveryDetails: ({contractId, customerId}) => {
      const dlgProps = {
        dlgName: 'dlgDeliveryDetails',
        dlgData: {
          contractId,
          customerId
        }
      }
      dispatch(showDialogExt(dlgProps))
    }
  }
}

DeliveryListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryListItemContainer)

export default DeliveryListItemContainer
