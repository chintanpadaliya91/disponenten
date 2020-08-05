import React from 'react'
import Layout from 'react-toolbox/lib/layout/Layout'
import Panel from 'react-toolbox/lib/layout/Panel'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import Button from 'react-toolbox/lib/button/Button'
import { Link } from 'react-router-dom'

import '../styles/Dialog.css'

const AppLayout = (props) => {
  const { children, error, title = '', showBtnBackToList } = props
  const errMsg = error !== null ? error : ''
  return (
    <div>
      <Layout>
        <Panel>
          <AppBar className='app-bar' title={'AHR Dispo Dashboard' + (title ? ' - ' + title : '')}>
            <h1>{errMsg}</h1>
            <Link to='/delivery-list'>
              {showBtnBackToList
                ? <Button raised primary>zur Liste</Button>
                : ''
              }
            </Link>
            <span id='app-version'>v{process.env.REACT_APP_APP_VERSION}</span>
          </AppBar>
          <div>{children}</div>
        </Panel>
      </Layout>
    </div>
  )
}

export default AppLayout
