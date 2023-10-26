import React from 'react'
import '../src/nav.css'
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

// react icons start
import { FaUsers } from 'react-icons/fa';
import { BiSolidUser } from 'react-icons/bi';
import {HiLocationMarker} from 'react-icons/hi';
import {FaBuildingShield} from 'react-icons/fa6';
import {IoNotifications} from 'react-icons/io5';
import {FaMobileScreenButton } from 'react-icons/fa6';
import {BiSolidMobileVibration} from 'react-icons/bi' ;
import {FaUserGroup} from 'react-icons/fa6';
import {ImPriceTags} from 'react-icons/im' ;
import {RiHandCoinFill} from 'react-icons/ri';
import {FaMoneyBills}  from 'react-icons/fa6';
import {BiSolidUserVoice} from  'react-icons/bi';
import {FaChargingStation } from 'react-icons/fa';
import {FaTrashCan } from 'react-icons/fa6'
 // import { LiaUserSolid} from 'react-icons/li';
// import LiaUserSolidIcon from './LiaUserSolidIcon';

//  react js icons end

const userRole = 'admin';

const _nav = [
  
  {
    component: CNavTitle,
    name: 'Navigation',
  },
  

  
  
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customer',
    icon: <FaUsers className='faiconsdashboard' />,
  },
  
  ...(userRole === 'admin'
    ? [
        {
          component: CNavItem,
          name: 'Admin Accounts',
          to: '/admin',
          icon:  <BiSolidUser className='faiconsdashboard' />,
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
    icon: <HiLocationMarker  className='faiconsdashboard' />,
    items: [
      {
        component: CNavItem,
        name: 'Installation Base',
        to: '/location',
        icon: <FaBuildingShield  className='faiconsdashboard' />,
      },

    ],
  },

  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <IoNotifications  className='faiconsdashboard'  />,
    items: [
      {
        component: CNavItem,
        name: 'Splash Screen',
        to: '/splash',
        icon: <FaMobileScreenButton className='faiconsdashboard' />,
      },
      {
        component: CNavItem,
        name: 'App Notifications',
        to: '/notification',
        icon: <BiSolidMobileVibration className='faiconsdashboard' />,

      },
      {
        component: CNavItem,
        name: 'Trash',
        to: '/Trash',
        icon: <FaTrashCan className='faiconsdashboard' style={{marginLeft:"30px"}} />,
      
      },

    ],
  },
  
  

  {
    component: CNavItem,
    name: 'Partners ',
    to: '/partner',
    icon: <FaUserGroup className='faiconsdashboard' />,
  },
  
  {
    component: CNavItem,
    name: 'Price Management',
    to: '/price',
    icon: <ImPriceTags className='faiconsdashboard' />,
  },
  {
    component: CNavItem,
    name: 'Assets Management',
    to: '/assets',
    icon: <RiHandCoinFill  className='faiconsdashboard' />,
  },


  

  ...(userRole === 'admin'
    ? [
        {
          component: CNavGroup,
          name: 'Finance',
          icon: <FaMoneyBills className='faiconsdashboard' />,
          items: [
            {
              component: CNavItem,
              name: 'Partner Invoice',
              to: '/finance',
              icon: <BiSolidUserVoice  className='faiconsdashboard' />,
            },
            {
              component: CNavItem,
              name: 'Charging Rate',
              to: '/charging',
              icon: <FaChargingStation className='faiconsdashboard'  />,
            },
          ],
        },
      ]
    : []),
    {
      component: CNavItem,
      name: 'Log File ',
      to: '/logfile',
      icon: <FaUserGroup className='faiconsdashboard' />,
    },
  
]

export default _nav
