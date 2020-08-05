import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeliveryList from '../components/DeliveryList'
import { fetchDeliveryList, sortDeliveryList } from '../actions/deliveryList'
import { resetDeliverItemStatus } from '../actions/deliveryItemStatus'
import { changeDeliveryFilter } from '../actions/deliveryFilter'
import getPaymentsStatusFromState from '../tools/getPaymentsStatusFromState'

class DeliveryListContainer extends Component {
  componentWillMount () {
    this.props.fetchDeliveryList()
  }
  render () {
    return <DeliveryList {...this.props} />
  }
}

function getDeliveryByPrepayedStateSorter (state) {
  return function (a, b) {
    const aPaymentStatus = getPaymentsStatusFromState({state, contractId: a.contract_id})
    const bPaymentStatus = getPaymentsStatusFromState({state, contractId: b.contract_id})

    if (aPaymentStatus === null || bPaymentStatus === null) {
      return 0
    }

    if (aPaymentStatus.newPayments && !bPaymentStatus.newPayments) {
      return -1
    }

    if (!aPaymentStatus.newPayments && bPaymentStatus.newPayments) {
      return 1
    }

    if (aPaymentStatus.payed && !bPaymentStatus.payed) {
      return -1
    }

    if (!aPaymentStatus.payed && bPaymentStatus.payed) {
      return 1
    }

    if (aPaymentStatus.prepayed && !bPaymentStatus.prepayed) {
      return -1
    }

    if (!aPaymentStatus.prepayed && bPaymentStatus.prepayed) {
      return 1
    }

    return 0
  }
}

function countNewPayments (state) {
  return Object.values(state.deliveryItemStatus.docs)
    .filter(item => item.payments.newPayments)
    .length
}

const mapStateToProps = (state) => {
  const docs = (state.deliveryFilter.deliveryType === 1 || state.deliveryFilter.deliveryType === 2) && state.deliveryList.sort.param === 'payments'
    ? state.deliveryList.docs
        .sort(getDeliveryByPrepayedStateSorter(state))
    : state.deliveryList.docs

  const newPaymentsCount = state.deliveryFilter.deliveryType === 1 || state.deliveryFilter.deliveryType === 2
    ? countNewPayments(state)
    : 0

  return {
    list: {
      ...state.deliveryList,
      docs
    },
    filter: state.deliveryFilter,
    newPaymentsCount
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDeliveryList: () => {
      dispatch(resetDeliverItemStatus())
      dispatch(fetchDeliveryList())
    },
    filterOnEnter: (e) => {
      if (e.charCode === 13) {
        dispatch(resetDeliverItemStatus())
        dispatch(fetchDeliveryList())
      }
    },
    changeFilter: (filterParam) => {
      dispatch(changeDeliveryFilter(filterParam))
    },
    sortDeliveryList: ({param, direction}) => {
      dispatch(sortDeliveryList({param, direction}))
    }
  }
}

DeliveryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryListContainer)

export default DeliveryListContainer
