import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilContact,
  cilPeople,
  cilProfile,
  cilAccountLogout,
  cilAsterisk,
  cilUser,
  cilUserFemale,
  cilApplications,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import FramePeople from '../src/assets/images/FramePeople.svg'
import adminAccount from '../src/assets/images/adminAccount.svg'
import location from '../src/assets/images/location.svg'
import ion_pricetags from '../src/assets/images/price.svg'
import asset_icon from '../src/assets/images/asset_icon.svg'
import partners_icon from '../src/assets/images/partners_icon.svg'
import financetab from '../src/assets/images/financetab.svg'
import partnerrate from '../src/assets/images/partnerrate.svg'
import chargingrate from '../src/assets/images/chargingrate.svg'
import base from '../src/assets/images/base2.svg'
import Notification from '../src/assets/images/notificationicon.svg'
import appNotification from '../src/assets/images/appnotificationicon.svg'
import splash from '../src/assets/images/splashicon.svg'

const userRole = 'admin';

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Navigation',
  },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customer',
    icon: <img src={FramePeople} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Admin Accounts',
  //   to: '/admin',
  //   icon: <img src={adminAccount} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  // },
  ...(userRole === 'admin'
    ? [
        {
          component: CNavItem,
          name: 'Admin Accounts',
          to: '/admin',
          icon: <img src={adminAccount} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
        },
      ]
    : []),

  {
    component: CNavTitle,
    name: 'Application',
  },
  
  {
    component: CNavGroup,
    name: 'Installation',
    icon: <img src={location} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px'}} />,
    items: [
      {
        component: CNavItem,
        name: 'Installation Base',
        to: '/location',
        icon: <img src={base} style={{ paddingRight: '13px', paddingLeft: '20px', height: '18px'}} />,
      },
      {
        component: CNavGroup,
        name: 'Notifications',
        icon: <img src={Notification} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
        items: [
          {
            component: CNavItem,
            name: 'Splash Screen',
            to: '/splash',
            icon: <img src={splash} style={{ marginLeft:'2px',  paddingRight: '17px', paddingLeft: '20px', height: '18px' }} />,
          },
          {
            component: CNavItem,
            name: 'App Notification',
            to: '/notification',
            icon: <img src={appNotification} style={{marginLeft:'2px', paddingRight: '12px', paddingLeft: '20px', height: '18px'}} />,
          },
        ],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Partners ',
    to: '/partner',
    icon: <img src={partners_icon} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Installation',
  //   to: '/location',
  //   icon: <img src={location} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Voucher ',
  //   to: '/Voucher',
  //   icon: <img src={partners_icon} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  // },
  {
    component: CNavItem,
    name: 'Price Management',
    to: '/price',
    icon: <img src={ion_pricetags} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
  },
  {
    component: CNavItem,
    name: 'Assets Management',
    to: '/assets',
    icon: <img src={asset_icon} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
  },


  // {
  //   component: CNavItem,
  //   name: 'Graph',
  //   to: '/trasactiondetails/:id',
  //   icon: <img src={ion_pricetags} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'GraphOne',
  //   to: 'graphone',
  //   icon: <img src={ion_pricetags} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  // },

  // finace section
  // {
  //   component: CNavGroup,
  //   name: 'Finance',
  //   icon: <img src={financetab} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  //   items: [
  //     // {
  //     //   component: CNavItem,
  //     //   name: 'CoreUI Free',
  //     //   to: '/icons/coreui-icons',
  //     //   badge: {
  //     //     color: 'success',
  //     //     text: 'NEW',
  //     //   },
  //     // },
  //     {
  //       component: CNavItem,
  //       name: 'Partner Invoice',
  //       to: '/finance',
  //       icon: <img src={partnerrate} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Charging Rate',
  //       to: '/charging',
  //       icon: <img src={chargingrate} style={{ paddingRight: '15px', paddingLeft: '20px' }} />,
  //     },
  //   ],
  // },

  ...(userRole === 'admin'
    ? [
        {
          component: CNavGroup,
          name: 'Finance',
          icon: <img src={financetab} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
          items: [
            {
              component: CNavItem,
              name: 'Partner Invoice',
              to: '/finance',
              icon: <img src={partnerrate} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
            },
            {
              component: CNavItem,
              name: 'Charging Rate',
              to: '/charging',
              icon: <img src={chargingrate} style={{ paddingRight: '15px', paddingLeft: '20px', height: '18px' }} />,
            },
          ],
        },
      ]
    : []),
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Login',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   to: '/login',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },

  //     //     {
  //     //       component: CNavItem,
  //     //       name: 'Error 404',
  //     //       to: '/404',
  //     //     },
  //     //     {
  //     //       component: CNavItem,
  //     //       name: 'Error 500',
  //     //       to: '/500',
  //     //     },
  //   ],
  // },
  //{
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  //},
]

export default _nav
