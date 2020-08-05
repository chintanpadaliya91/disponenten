import * as actionTypes from './actionTypes'

export const showDialog = (dlgName) => {
  return { type: actionTypes.SHOW_DIALOG, payload: {dlgName} }
}

export const hideDialog = (dlgName) => {
  return { type: actionTypes.HIDE_DIALOG, payload: {dlgName} }
}

export const showDialogExt = (props) => {
  return { type: actionTypes.SHOW_DIALOG_EXT, payload: props }
}

export const hideDialogExt = (dlgName) => {
  return { type: actionTypes.HIDE_DIALOG_EXT, payload: {dlgName} }
}
