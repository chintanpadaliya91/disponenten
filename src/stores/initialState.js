const initialState = {
  deliveryFilter: {
    intNo: '',
    vin: '',
    regDocNo: '',
    customer: '',
    deliveryType: 2
  },
  deliveryList: {
    isFetching: false,
    error: null,
    docs: [],
    tabHints: {
      forrun: {
        financed: 0,
        unpayed: 0,
        prepayed: 0
      },
      delivery: {
        overdued: 0
      },
      finalCheck: {
        checked: 0,
        unchecked: 0
      }
    },
    page: 1,
    limit: 20,
    pages: 0,
    total: 0,
    sort: {
      param: null,
      direction: 1
    }
  },
  deliveryItemStatus: {
    isFetching: false,
    error: null,
    docs: {}
  },
  contract: {
    isFetching: true,
    error: null,
    isDirty: false,
    doc: {
      contract_id: null,
      contract_completed_date: null,
      desired_delivery_date: null,
      arranged_delivery_date: null,
      real_delivery_date: null,
      delivered: false,
      vehicle: null,
      customer: null,
      seller: null,
      financing: null,
      tradein: null
    }
  },
  deliveryComments: {
    isFetching: true,
    error: null,
    docs: []
  },
  addDeliveryComment: {
    isFetching: true,
    error: null,
    doc: {
      user_id: 0,
      text: ''
    }
  },
  perquisites: {
    isFetching: true,
    error: null,
    docs: []
  },
  paymentPlan: {
    isFetching: true,
    error: null,
    docs: []
  },
  payments: {
    isFetching: true,
    error: null,
    docs: []
  },
  openPayments: {
    isFetching: true,
    error: null,
    doc: {
      status: '',
      total: 0,
      bills: 0,
      payments: 0
    }
  },
  tasks: {
    isFetching: true,
    error: null,
    docs: {}
  },
  documents: {
    isFetching: true,
    error: null,
    docs: {}
  },
  tradein: {
    isFetching: true,
    error: null,
    data: {}
  },
  registration: {
    isFetching: true,
    error: null,
    docs: {}
  },
  moveCcVehicle: {
    isFetching: false,
    result: null,
    error: null
  },
  dialogs: {
    dlgConfirmAllDocuments: false,
    dlgAddDeliveryComment: false,
    dlgConfirmPrepayed: false,
    dlgConfirmDelivered: false,
    dlgConfirmFinalChecked: false
  },
  dialogsExt: {
    dlgDeliveryDetails: {
      active: false,
      data: {}
    }
  }
}

export default initialState
