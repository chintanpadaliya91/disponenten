const ITEMS_CARCONTRACT = [
  {value: 1, label: 'Anzahlung Bar'},
  {value: 2, label: 'Barzahlung'},
  {value: 3, label: 'Restzahlung Bar'},
  {value: 4, label: 'Überweisung'},
  {value: 5, label: 'EC'},
  {value: 6, label: 'Scheck'}
]

export function getClearingLabelCarContract (value = null) {
  if (value === null) {
    return 'n/a'
  }

  const item = ITEMS_CARCONTRACT.find(item => String(item.value) === String(value))

  if (item === void 0) {
    return `n/a (${value})`
  }

  return item.label
}

// -------------------------------------------------------------------------------------------------

const CLEARING_TYPE_CASH = 1
const CLEARING_TYPE_CASH_INZ = 2
const CLEARING_TYPE_EC = 3
const CLEARING_TYPE_VISA = 4
const CLEARING_TYPE_MAESTRO = 5
const CLEARING_TYPE_UEBERWEISUNG = 6
const CLEARING_TYPE_UEBERWEISUNGBANK = 7
const CLEARING_TYPE_FAIL = 8

const ITEMS_KASSE = {
  [CLEARING_TYPE_CASH]: {
    value: CLEARING_TYPE_CASH,
    label: 'Bar'
  },
  [CLEARING_TYPE_CASH_INZ]: {
    value: 2,
    label: 'Bar Inz.'
  },
  [CLEARING_TYPE_EC]: {
    value: 3,
    label: 'EC/girocard'
  },
  [CLEARING_TYPE_VISA]: {
    value: 4,
    label: 'VISA'
  },
  [CLEARING_TYPE_MAESTRO]: {
    value: 5,
    label: 'Maestro'
  },
  [CLEARING_TYPE_UEBERWEISUNG]: {
    value: 6,
    label: 'Überweisung'
  },
  [CLEARING_TYPE_UEBERWEISUNGBANK]: {
    value: 7,
    label: 'Überweisung fin. Bank'
  },
  [CLEARING_TYPE_FAIL]: {
    value: 8,
    label: 'Fehlerfassung - keine Auszahlung'
  }
}

export function getClearingLabelKasse (value = null) {
  if (value === null) {
    return 'n/a'
  }

  if (ITEMS_KASSE.hasOwnProperty(value) === false) {
    return `n/a (${value})`
  }

  return ITEMS_KASSE[value].label
}
