import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import chargeLogo from "../assets/images/chargeLogo.svg"
import logocrm from "../assets/images/logocrm.png"
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import '../../src/views/customer/Customer.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      className="sidebar_Index"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{
        background: '#0c2556',
        boxShadow: '0 0 30px rgb(12 37 86 / 5%)',
        zIndex: '1',
      }}
    >

      <Link to="/">
        <CSidebarBrand className=" d-md-flex justify-content-start px-3" to="/">
        <img style={{ objectFit:"contain",width:"35px",padding:"14px 0px",marginRight:"10px" }} src={logocrm} alt="chargerLogo" />

          <span style={{ fontSize: '20px', fontWeight: 'bolder', color: '#fff',padding:"9.2px 0px" }}>ChargeTime</span>
        </CSidebarBrand>
      </Link>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
