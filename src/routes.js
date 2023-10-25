import React from 'react'

const Customer = React.lazy(() => import('./views/customer/Customer'))
const Admin = React.lazy(() => import('./views/admin/Admin'))
const Location = React.lazy(() => import('./views/location/Location'))
const Price = React.lazy(() => import('./views/price/PriceThree'))
const Asset = React.lazy(() => import('./views/asset/AssetTwo'))
const Partner = React.lazy(() => import('./views/partner/Partner'))
// const Voucher = React.lazy(() => import('./views/voucher/Voucher'))
const Charging = React.lazy(() => import('./views/charging/Charging'))
const Finance = React.lazy(() => import('./views/finance/Finance'))
const Notification = React.lazy(() => import('./views/notification/Notification'))
const Splash = React.lazy(() => import('./views/splash/Splash'))
const Trash = React.lazy(() => import('./views/trash/Trash'))
const LogFile = React.lazy(() => import('./views/log/LogFile'))

//const Graph = React.lazy(() => import('./views/graph/Graph'))
// const Charts = React.lazy(() => import('./views/charts/Charts'))
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//const GraphOne = React.lazy(() => import('./views/testing/GraphOne'))
import { notification } from 'antd';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/customer', name: 'Customer', element: Customer },
  { path: '/admin', name: 'Admin', element: Admin },
  { path: '/location', name: 'Location', element: Location },
  { path: '/price', name: 'Price', element: Price },
  { path: '/assets', name: 'Asset', element: Asset },
  { path: '/partner', name: 'Partner', element: Partner },
  // { path: '/voucher', name: 'Voucher', element: Voucher },
  { path: '/charging', name: 'Charging Rate', element: Charging },
  { path: '/finance', name: 'Finance', element: Finance },
  { path: '/notification', name: 'Notification', element: Notification },
  { path: '/splash', name: 'Splash', element: Splash },
  { path: '/Trash', name: 'Trash', element: Trash },
  { path: '/logfile', name: 'LogFile', element: LogFile },


  // { path: '/trasactiondetails/:id', name: 'Graph', element: Graph },
  // { path: '/graphone', name: 'GraphOne', element: GraphOne },

  // { path: '/charts', name: 'Charts', element: Charts },
  //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
