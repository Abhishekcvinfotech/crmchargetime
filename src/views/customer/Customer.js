import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  DeleteOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  FilterFilled,
  PlusOutlined,
  CloseOutlined,
  DeleteFilled,
  StopOutlined,
  CopyFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FullscreenOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  FlagTwoTone,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClearOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  InputNumber,
  Table,
  Tooltip,
  Radio,
  Spin,
  Modal,
  Input,
  message,
  Upload,
} from 'antd'
import { notification } from 'antd'
import FrameOne from '../../assets/images/FrameOne.svg'
import Frame from '../../assets/images/Frame.svg'
import FrameTwo from '../../assets/images/FrameTwo.svg'
import AddUser from '../../assets/images/addUser.svg'
import noDeviceId from '../../assets/images/nodeviceid.svg'
import partialMatched from '../../assets/images/partiallymatched_1.svg'
import { CSVLink } from 'react-csv'
import './Customer.css'
import '../universal.css'
import { troesAPi } from '../../api'
// import { troesAPiTwo } from '../../api'
import { useNavigate, Link } from 'react-router-dom'
import { Pagination, Popover } from 'antd'
import { ImportOutlined } from '@ant-design/icons'
import { color } from '@mui/system'
import { alertClasses } from '@mui/material'
import Alerts from './../notifications/alerts/Alerts'
import editPen from '../../assets/images/editPen.svg'
import sheet from '../../assets/images/sheets.png'
import import_one from '../../assets/images/import_one.svg'
import status from '../../assets/images/Group.svg'
import InformationCircleOutline from '../../assets/images/InformationCircleOutline.svg'
import Excelicon from '../../assets/images/excelicon.svg'
import Threedots from '../../assets/images/threedots.svg'
import Rightarrow from '../../assets/images/Rightarrow.svg'
import XOutline from '../../assets/images/XOutline.svg'
import Bxs_copy from '../../assets/images/bxs_copy.svg'
import useCopy from 'use-copy'
import { useRef } from 'react'
import validator from 'validator'
import { HiFilter } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import { BsCloudDownload } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { IoIosClose } from 'react-icons/io'
import { BsPersonPlusFill } from 'react-icons/bs'
import { RiChargingPile2Fill } from 'react-icons/ri'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdEditDocument } from 'react-icons/md'
import { IoPricetags } from 'react-icons/io5'
import { IoIosPaper } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { CenterFocusStrong } from '@mui/icons-material'
import Redcircle from '../../assets/images/Redcircle.svg'
// import swal from 'sweetalert';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import { MDBIcon} from 'mdbreact';

const Customer = () => {
  const [isShown, setIsShown] = useState(false)
  const [total, setTotal] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [postPerPage, setPostPerPage] = useState(24)
  const [deleted, setDeleted] = useState(false)
  const [forRadioDelete, setForRadioDelete] = useState(false)
  const [statusfilter, setStatusfilter] = useState(false)
  const [installation, setInstallation] = useState(false)
  const [planData, setPlanData] = useState(false)
  const [priceData, setPriceData] = useState(false)
  const [order, setOrder] = useState('ASC')
  const [dataValue, setDataValue] = useState()
  const [clearData, setclearData] = useState(false)
  const [basePackage, setBasePackage] = useState()
  const [basePrice, setBasePrice] = useState(0)
  const [dataAntd, setDataAntd] = useState([])
  const [loading, setLoading] = useState(false)
  const [userDelete, setUserDelete] = useState(false)

  const [userSuspend, setUserSuspend] = useState(false)
  const [userUnSuspend, setUserUnSuspend] = useState(false)
  const [statusvalue, setstatusValue] = useState(0)
  const [value, setValue] = useState(0)
  const [planValue, setPlanValue] = useState(0)
  const [activeData, setActiveData] = useState('')
  const [locateData, setLocateData] = useState([])
  const [radioValue, setRadioValue] = useState('')
  const [package_plan, setPackagePlan] = useState('')
  const [forRefreshing, setForRefreshing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [forSuspend, setForSuspend] = useState(false)
  const [forUnSuspend, setForUnSuspend] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [sevenUsuage, setSevenUsuage] = useState([])
  const [dailyUsusage, setdailyUsusage] = useState('')
  const [monthUsuage, setMonthUsusage] = useState([])
  const [threeMonUsuage, setThreeMonUsusage] = useState([])
  const [yearlyUsuage, setYearlyUsusage] = useState([])
  const [forRemaining, setForRemaining] = useState([])
  // himanshu code
  const [show, setShow] = useState(false)
  const [rowData, SetrowData] = useState([])
  const [selectedData, setSelectedData] = useState()
  const [RowData, SetRowData] = useState([])
  const [updateModal, setUpdateModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [add_line1, setAddress] = useState('')
  const [add_line2, setAddress2] = useState('')
  const [mobile, setMobile] = useState('')
  const [zip_code, setZipcode] = useState('')
  const [state, setState] = useState('')

  const [id, setId] = useState('')
  const [addUserModal, setAddUserModal] = useState(false)

  const [password, setPassword] = useState('')
  const [conpassword, setconPassword] = useState('')
  const [locationId, setLocationId] = useState('')

  const [newZipcode, setNewZipcode] = useState('')
  const [newState, setNewState] = useState('')
  const [fontWeight, setFontWeight] = useState('400')
  const [fontWeight1, setFontWeight1] = useState('400')
  const [fontWeight2, setFontWeight2] = useState('400')
  const [fontWeight3, setFontWeight3] = useState('400')
  const [fontWeight4, setFontWeight4] = useState('400')
  const [fontWeight5, setFontWeight5] = useState('400')
  const [fontWeight6, setFontWeight6] = useState('400')
  const [fontred, setFontred] = useState('#3378FF')

  const [fontred1, setFontred1] = useState('#3378FF')
  const [fontred2, setFontred2] = useState('#3378FF')
  const [fontred3, setFontred3] = useState('#3378FF')
  const [fontred4, setFontred4] = useState('#3378FF')
  const [fontred5, setFontred5] = useState('#3378FF')
  const [fontred6, setFontred6] = useState('#3378FF')
  const [borderred, setborderred] = useState('1px solid #3378FF')
  const [borderred1, setborderred1] = useState('1px solid #3378FF')
  const [borderred2, setborderred2] = useState('1px solid #3378FF')
  const [borderred3, setborderred3] = useState('1px solid #3378FF')
  const [borderred4, setborderred4] = useState('1px solid #3378FF')
  const [borderred5, setborderred5] = useState('1px solid #3378FF')
  const [borderred6, setborderred6] = useState('1px solid #3378FF')
  const inputRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [colorRed, setColorRed] = useState('')
  const [userAdded, setUserAdded] = useState('none')
  const [userUpdated, setUserUpdated] = useState('none')
  const [csvTextColor, setcsvTextColor] = useState('transparent')
  const [csvwidth, setcsvwidth] = useState('136px')
  const [emailError, setEmailError] = useState('')
  const [colorGreen, setColorGreen] = useState('')
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false)
  const [forautoFill, setForAutoFill] = useState('')
  const [uniqueshow, setUniqueShow] = useState(false)
  const [uniqueId, setUniqueId] = useState()
  const [phoneError, setPhoneError] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [ide, setIde] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalGetRequest, setModalGetRequest] = useState([])
  const [csvdata, setcsvData] = useState([])
  const [csvName, setCsvName] = useState('')
  const [userPlay, setUserPlay] = useState(false)
  const [userPause, setUserPause] = useState(false)
  const [popoverVisible, setPopoverVisible] = useState({})
  // const [showPadding, setShowPadding] = useState(false);
  const [showCrossIcon, setShowCrossIcon] = useState(false)
  //content part manish start
  const [sortingState, setSortingState] = useState({
    Device_Id: 'ASC',
    Unique_Id: 'ASC',
    pwa_name: 'ASC',
    pwa_email: 'ASC',
    pwa_add1: 'ASC',
    pwa_state: 'ASC',
    pwa_choice: 'ASC',
    energy_plan: 'ASC',
    energy_price: 'ASC',
    id: 'ASC',
  })

  const [btnpadding, setBtnpadding] = useState('0px')
  const [paddingcolor, setPaddingcolor] = useState('none')
  const [borderRadius, setBorderRadius] = useState('')
  const [clickedButton, setClickedButton] = useState(null)
  
  const [modal2Open, setModal2Open] = useState(false)
  const handleIconPaddingClick = (buttonId) => {
    setClickedButton(buttonId)
    setBtnpadding('7px 8px')
    setPaddingcolor('#F1F1F1')
    setBorderRadius('6px')
    setShowCrossIcon(true)

  }

  const openNotification = () => {
    notification.open({
      // message: 'Notification Title',
      description: '✅ File uploaded successfully',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  useEffect(() => {
    setForAutoFill('')
  })
  // csv wrong upload notification
  const openNotificationCsvWrong = () => {
    notification.open({
      description: '❌ Please upload a valid file format!!',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setColorGreen('green')
      setEmailError('Valid Email!')
    } else {
      setColorGreen('red')
      setEmailError('Enter valid Email!')
    }
  }
  const handleChange = (e) => {
    setEmail(e.target.value)
    validateEmail(email)
  }
  useEffect(() => {
    if (email) {
      validateEmail(email)
    }
  }, [email])

  // console.log(locateData)
  // himanshu code ends
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])
  const showModal = () => {
    setIsModalOpen(true)
    setIsShown((current) => !current)
  }
  const handleOk = async (e) => {
    setIsModalOpen(false)
    e.preventDefault()
    if (package_plan) {
      let result = await fetch(`${troesAPi}/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ package_plan }),
      })
      setForRefreshing((data) => !data)

      setPackagePlan('')
    } else {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const statusFilter = () => {
    document.getElementById('status_filter').style.backgroundColor = '#0c2556'
    document.getElementById('status_filter').style.color = '#fff'
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    setStatusfilter(!statusfilter)
    if (statusfilter === true) {
      document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    }
  }
  const campaignActivity = () => {
    document.getElementById('campaign_activity').style.backgroundColor = '#0c2556'
    document.getElementById('campaign_activity').style.color = '#fff'
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    setInstallation(!installation)
    if (installation === true) {
      document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    }
  }
  const location = () => {
    document.getElementById('location').style.backgroundColor = '#0c2556'
    document.getElementById('location').style.color = '#fff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    setPlanData(!planData)
    if (planData === true) {
      document.getElementById('location').style.backgroundColor = '#1890ff'
    }
  }
  const priceHandle = () => {
    document.getElementById('price_handle').style.backgroundColor = '#0c2556'
    document.getElementById('price_handle').style.color = '#fff'
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    setPriceData(!priceData)
    if (priceData === true) {
      document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    }
  }
  const onChangeed = (e) => {
    console.log('value sof proice is ', e)
    const newValue = parseInt(e.target.value, 10)
    setBasePrice(newValue)
  }
  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }

  const getUsers = () => {
    setLoading(true)
    setFilterStatus('10')
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred('1px solid #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
    axios
      .get(`${troesAPi}/pwa_user`)

      .then((res) => {
        if (res.status === 200) {
          const nbaData = res?.data.customers
          setDataAntd(res.data.customers)
          setData(res.data.customers)
          setActiveData(res.data.customers)
          setTotal(nbaData.length)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const sortedDate = () => {
    getUsers()
    setShowCrossIcon(false)
    setBtnpadding('0px')
    setPaddingcolor('white')
    setClickedButton(null)
  }


  const clearFilter = () => {
    setStatusfilter(false)
    setInstallation(false)
    setPlanData(false)
    setBasePackage(null)
    setBasePrice(0)
    setPriceData(false)
    setDataValue(null)
    setPlanValue(0)
    setValue(0)
    setstatusValue(0)
    document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    document.getElementById('status_filter').style.backgroundColor = '#1890ff'
  }
  useEffect(() => {
    getUsers()
  }, [forSuspend, forUnSuspend, deleted])
  // if(data.energy_plan !== null && data.Device_Id == null){
  //     document.getElementById('flag').style.display = 'block';
  // console.log("hello ")
  // }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = data?.slice(indexOfFirstPage, indexOfLastPage)
  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize)
  }
  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>
    }
    if (type === 'next') {
      return <a>Next</a>
    }
    return originalElement
  }
  const onDeleteUser = async (id) => {
    setLoading(true)
    if (window.confirm('Are you sure? The Account will get deleted permanently!!')) {
      const response = axios
        .delete(`${troesAPi}/pwa_user/${id}`)
        .then(() => {
          setDeleted((data) => !data)
          setLoading(false)
          setUserDelete(true)
          setTimeout(() => {
            setUserDelete(false)
          }, 10000)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    } else {
      setLoading(false)
    }
  }

  const searchHandle = async (e) => {
    setLoading(true)
    var valueToPush = {}
    if (statusvalue !== 0) {
      valueToPush['pwa_status'] = statusvalue
    }
    if (value !== 0) {
      valueToPush['pwa_choice'] = value
    }
    if (planValue !== 0) {
      valueToPush['energy_plan'] = planValue
    }
    if (basePrice !== 0) {
      valueToPush['energy_price'] = basePrice
    }
    let key = e.target.value
    if (key !== '') {
      valueToPush['key'] = key
    }
    axios({
      url: `${troesAPi}/filter1`,
      method: 'post',
      data: valueToPush,
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const applyFilter = async (e) => {
    setLoading(true)
    setIsShown((current) => !current)

    e.preventDefault()
    if (statusvalue !== 0 || value !== 0 || planValue !== 0 || basePrice !== 0) {
      setLoading(true)
      var valueToPush = {}
      if (statusvalue !== 0) {
        valueToPush['pwa_status'] = statusvalue
      }
      if (value !== 0) {
        valueToPush['pwa_choice'] = value
      }
      if (planValue !== 0) {
        valueToPush['energy_plan'] = planValue
      }
      if (basePrice !== 0) {
        valueToPush['energy_price'] = basePrice
      }
      document.getElementById('handle__addFilter').style.background = '#1890ff';
      document.getElementById('handle__addFilter').style.color = '#fff';
      // document.getElementById('handle__addFilter').style.background = 'red'
      setclearData(true)
      axios({
        url: `${troesAPi}/filter1`,
        method: 'post',
        data: valueToPush,
      })
        .then(function (response) {
          setData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      setLoading(false)
    }
  }
  const totalUsers = activeData?.length

  // const sorting = (col) => {
  //   const sortOrder = sortingState[col] === 'ASC' ? 'DSC' : 'ASC'
  //   setSortingState({ ...sortingState, [col]: sortOrder })

  //   const sorted = [...data].sort((a, b) =>
  //     sortOrder === 'ASC'
  //       ? a[col]?.toLowerCase() > b[col]?.toLowerCase()
  //         ? 1
  //         : -1
  //       : a[col]?.toLowerCase() < b[col]?.toLowerCase()
  //       ? 1
  //       : -1,
  //   )
  //   setData(sorted)
  // }

  const sorting = (col) => {
    const sortOrder = sortingState[col] === 'ASC' ? 'DSC' : 'ASC'
    setSortingState({ ...sortingState, [col]: sortOrder })

    const sorted = [...data].sort((a, b) => {
      if (col === 'id') {
        // Assuming 'id' is a numeric field, you can compare it directly.
        return sortOrder === 'ASC' ? a[col] - b[col] : b[col] - a[col]
      } else {
        // For other columns, perform case-insensitive string comparison.
        return sortOrder === 'ASC'
          ? a[col]?.toLowerCase() > b[col]?.toLowerCase()
            ? 1
            : -1
          : a[col]?.toLowerCase() < b[col]?.toLowerCase()
          ? 1
          : -1
      }
    })

    setData(sorted)
  }

  const clearFiltererd = () => {
    document.getElementById('handle__addFilter').style.background = '#f1f1f1'
    // document.getElementById('handle__addFilter').style.background = 'red'
    setclearData(false)
    setValue(0)
    setstatusValue(0)
    setPlanValue(0)
    setBasePrice(0)
    getUsers()
  }

  const onstatusChange = (e) => {
    setstatusValue(e.target.value)
  }
  const onChangePlan = (e) => {
    setValue(e.target.value)
  }

  const statuscut = (e) => {
    setstatusValue(!e.target.checked)
    setstatusValue(false)
  }
  const RadioPlan = (e) => {
    setValue(!e.target.checked)
    setValue(false)
  }
  const onChangeBase = (e) => {
    setPlanValue(e.target.value)
  }
  const RadioBase = (e) => {
    setclearData(false)
    setPlanValue(!e.target.checked)
    setPlanValue(false)
  }
  // himanshu code starts
  const deviceAssigned = () => {
    setLoading(true)
    setFontWeight(700)
    setFontred('red')
    setborderred('1px solid red')
    setFilterStatus('5')
    axios
      .get(`${troesAPi}/assigned`)
      .then((res) => {
        setData(res.data.assigned)
        setTotal(res.data.assigned?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred1('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
  }
  const deviceUnassigned = () => {
    setLoading(true)
    setFontWeight1(700)
    setFontred1('red')
    setborderred1('1px solid red')
    setFilterStatus('4')
    axios
      .get(`${troesAPi}/unassigned`)
      .then((res) => {
        setData(res.data.unassigned)
        setTotal(res.data.unassigned?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
  }

  const Paused = async () => {
    setLoading(true)
    setFontWeight5(700)
    setFontred5('red')
    setborderred5('1px solid red')
    setFilterStatus('5')
    await axios
      .get(`${troesAPi}/pauseuser`)
      .then((res) => {
        setData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred5('red')
    setFontred6('blue')
    setborderred('1px solid #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid red')
    setborderred6('1px solid #3378FF')
  }
  // himanshu code ends
  const registerdAccount = () => {
    setLoading(true)
    setFontWeight2(700)
    setFontred2('red')
    setborderred2('1px solid red')
    setFilterStatus('0')
    axios
      .get(`${troesAPi}/registered`)
      .then((res) => {
        setData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred('1px solid #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
  }
  const activeAccount = () => {
    setLoading(true)
    setFontWeight3(700)
    setFontred3('red')
    setborderred3('1px solid red')
    setFilterStatus('1')
    axios
      .get(`${troesAPi}/active`)
      .then((res) => {
        setData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight4(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred2('blue')
    setFontred4('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred('1px solid #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
  }
  const inActivee = () => {
    setLoading(true)
    setFontWeight4(700)
    setFontred4('red')
    setborderred4('1px solid red')
    setFilterStatus('2')
    axios
      .get(`${troesAPi}/nonactive`)
      .then((res) => {
        setData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight5(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred5('blue')
    setFontred6('blue')
    setborderred('1px solid  #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred5('1px solid #3378FF')
    setborderred6('1px solid #3378FF')
  }
  const AccountSuspended = () => {
    setLoading(true)
    setFontWeight6(700)
    setFontred6('red')
    setborderred6('1px solid red')
    setFilterStatus('3')
    axios
      .get(`${troesAPi}/suspended`)
      .then((res) => {
        setData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight(400)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontWeight4(400)
    setFontWeight6(400)
    setFontred('blue')
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setFontred4('blue')
    setFontred6('red')
    setborderred('1px solid #3378FF')
    setborderred1('1px solid #3378FF')
    setborderred2('1px solid #3378FF')
    setborderred3('1px solid #3378FF')
    setborderred4('1px solid #3378FF')
    setborderred6('1px solid red')
  }
  const getLocationData = (e) => {
    setLoading(true)
    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocateData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  const viewsPlan = () => {
    axios
      .get(`${troesAPi}/plan_package`)
      .then((res) => {
        setRadioValue(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const onDeleteRadio = async (id, e) => {
    if (window.confirm('Are you sure? ')) {
      const response = axios
        .delete(`${troesAPi}/planpackage/${id}`)
        .then(() => {
          setForRadioDelete((data) => !data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  // useEffect(() => {
  //   viewsPlan()
  // }, [])
  useEffect(() => {
    viewsPlan()
  }, [forRefreshing, forRadioDelete])

  const handlePagination = (value) => {
    setPage(value)
  }
  const onSuspendUser = async (id) => {
    let pwa_status = 3
    let strip_id = null
    let energy_plan = null
    let energy_price = null
    let subscription_package_id = null
    let subscription_latest_invoice_id = null
    let subscription_item_id = null
    if (window.confirm('Are you sure? The Account will get suspended permanently!!')) {
      let result = await fetch(`${troesAPi}/suspend/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          pwa_status,
          strip_id,
          energy_plan,
          energy_price,
          subscription_package_id,
          subscription_latest_invoice_id,
          subscription_item_id,
        }),
      })

      setForSuspend((data) => !data)
      setUserSuspend(true)

      setTimeout(() => {
        setUserSuspend(false)
      }, 10000)
    }
  }
  const onUnSuspendUser = async (id) => {
    let pwa_status = 0
    if (window.confirm('Are you sure? The Account will remove from suspended permanently!!')) {
      let result = await fetch(`${troesAPi}/unsuspend/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ pwa_status }),
      })
      setForUnSuspend((data) => !data)
      setUserUnSuspend(true)
      setTimeout(() => {
        setUserUnSuspend(false)
      }, 10000)
    }
  }

  const showModaled = () => {
    setIsOpen(true)
  }
  const showModaledFalse = () => {
    setIsOpen(false)
  }
  const handleOkay = () => {
    setIsOpen(false)
  }
  const handleCan = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    axios
      .get(`${troesAPi}/pricedetails`)
      .then((res) => {
        setForRemaining(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const getFullPrice = Object.keys(forRemaining).map((k) =>
    forRemaining[k].reduce((item, amount) => {
      return +amount.kwh + item
    }, 0),
  )

  // himanshu code starts
  // device popup starts
  //copy to clipboard start
  const [copied, copy, setCopied] = useCopy(selectedData)
  const copyText = () => {
    copy()
    setTimeout(() => {
      setCopied(false)
    }, 1000)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }
  // copy to clipboard ends
  // device popup ends
  let disc = 'none'
  const [display, setDisplay] = useState(disc)
  const changed = (e) => {
    let disp = 'block'
    setDisplay(disp)
  }
  const unchanged = (e) => {
    let disc = 'none'
    setDisplay(disc)
  }
  const passwordcheck = (e) => {
    setconPassword(e.target.value)
  }
  useEffect(() => {
    if (password != conpassword) {
      changed()
    } else {
      unchanged()
    }
  })
  // generate password starts
  var str = `Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)`
  const validate = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage('Strong Password!!')
      setColorRed('green')
    } else {
      setErrorMessage(`${str}`)
      setColorRed('red')
    }
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    validate(password)
  }
  useEffect(() => {
    if (password) {
      validate(password)
    }
  }, [password])
  const generatePassword = () => {
    let pass = 'p@A0'
    let string = 'abcdefghijklmnopqrstuvwxyz1234567890@#$' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let index = 1; index <= 5; index++) {
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }
    setPassword(pass)
    setconPassword(pass)
  }

  // generate password ends
  //update starts
  useEffect(() => {
    setName('')
    setEmail('')
    setAddress('')
    setAddress2('')
    setMobile('')
    setNewZipcode('')
    setNewState('')
  }, [isShown])
  async function onSub(e) {
    e.preventDefault()
    try {
      let result = await fetch(`${troesAPi}/customerupdate/${id}`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ name, email, add_line1, add_line2, mobile }),
      })
      let res = await result.json()
      getUsers()
      setUserUpdated('block')
      setTimeout(() => {
        setUserUpdated('none')
      }, 5000)
      setUpdateModal(false)
      setName('')
      setEmail('')
      setAddress('')
      setAddress2('')
      setMobile('')
    } catch (err) {
      console.log(err)
    }
  }
  const [uniquecopied, uniquecopy, setUniqueCopied] = useCopy(uniqueId)
  const copyUniqueText = () => {
    uniquecopy()
    setTimeout(() => {
      setUniqueCopied(false)
    }, 1000)
    setTimeout(() => {
      setUniqueShow(false)
    }, 1000)
  }

  const updateCancel = () => {
    setUpdateModal(false)
    setName('')
    setEmail('')
    setAddress('')
    setAddress2('')
    setMobile('')
  }
  // update ends
  // csv colour and working change starts
  let yellow = '#cc9ceb'
  const [bgColor, setBgColor] = useState(yellow)
  const handleOnChange = (e) => {
    let purple = '#1890ff'
    let cursorPointer = 'pointer'
    setBgColor(purple)
    setcsvTextColor('black')
    setcsvwidth('314px')
  }

  const [uploaded_file, setUploaded_file] = useState(null)
  const handleFileChange = (event) => {
    setUploaded_file(event.target.files[0])
    handleOnChange()
  }
  const filereplace = () => {
    setTimeout(() => {
      inputRef.current.value = null
      setBgColor(yellow)
      setcsvTextColor('transparent')
      setcsvwidth('136px')
      getUsers()
    }, 2000)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    event.target.value = null
    const formData = new FormData()
    formData.append('uploaded_file', uploaded_file)
    if (uploaded_file && uploaded_file.type === 'text/csv') {
      fetch(`${troesAPi}/importcustomer`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'content-type': 'application/json' },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.error('Error:', error)
        })
      openNotification()
      setIsCsvModalOpen(true)
    } else {
      openNotificationCsvWrong()
    }
    filereplace()
  }

  // add user starts
  const validatephone = () => {
    if (mobile.length == 9) {
      setColorGreen('green')
      setPhoneError('Valid phone number')
    } else if (mobile.length < 9) {
      setColorGreen('red')
      setPhoneError('Enter a valid 10 digit number!')
    } else {
      setColorGreen('green')
      setPhoneError('Valid phone number')
    }
  }

  const handleMobile = (e) => {
    const limit = 10
    setMobile(e.target.value.slice(0, limit))
    validatephone(mobile)
  }
  const handleAdd1 = (e) => {
    setAddress(e.target.value)
  }
  const handleAdd2 = (e) => {
    setAddress2(e.target.value)
  }
  const finalCall = (e) => {
    setLoading(true)
    setName(e.target.value)
    setEmail(e.target.value)
    setMobile(e.target.value)
    setAddress(e.target.value)
    setAddress2(e.target.value)
    setInstallation(e.target.value)
    setLocationId(e.target.value)
    setNewZipcode(e.target.value)
    setNewState(e.target.value)
  }
  useEffect(() => {
    setName('')
    setEmail('')
    setAddress('')
    setAddress2('')
    setMobile('')
    setInstallation('')
    setZipcode('')
    setState('')
    setPassword('')
    setErrorMessage('')
  }, [isShown])
  async function adduser(e) {
    setLoading(true)
    e.preventDefault()
    try {
      let result = await fetch(`${troesAPi}/createcustomer`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          name,
          email,
          mobile,
          locationId,
          password,
          add_line1,
          add_line2,
          newZipcode,
          newState,
        }),
      })

      let res = await result.json()
      if (res.error) {
        setUserAdded('none')
        alert(res.message)
      } else {
        setUserAdded('block')
        setTimeout(() => {
          setUserAdded('none')
        }, 5000)
      }
      getUsers()
      setAddUserModal(false)
      setName('')
      setEmail('')
      setAddress('')
      setAddress2('')
      setMobile('')
      setPassword('')
      setconPassword('')
      setNewZipcode('')
      setEmailError('')
      setNewState('')
      setErrorMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setName('')
    setEmail('')
    setAddress('')
    setAddress2('')
    setMobile('')
    setPassword('')
    setconPassword('')
    setNewZipcode('')
    setNewState('')
    setErrorMessage('')
  }, [isShown])

  const empty = () => {
    setAddUserModal(false)
    setName('')
    setEmail('')
    setAddress('')
    setAddress2('')
    setMobile('')
    setInstallation('')
    setNewZipcode('')
    setNewState('')
    setPassword('')
    setEmailError('')
    setconPassword('')
    setErrorMessage('')
  }
  const handleSelect = (e) => {
    setLocationId(e.target.id)
    axios
      .get(`${troesAPi}/installation/${e.target.selectedOptions[0].getAttribute('data-name')}`)
      .then((res) => {
        setNewZipcode(res.data[0].ZIP_code)
        setNewState(res.data[0].state)
        setLocationId(+res.data.id)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // add user ends
  // himanshu code ends
  const textOne = <span>Customer Report</span>
  const onChangedModal = (e, ide) => {
    setIde(ide)
    setIsModalOpened(true)

    axios
      .get(`${troesAPi}/customerpopup/${ide}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        setModalGetRequest(res.data)
        setCsvName(res.data[0].pwa_name)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleO = (e) => {
    setIsModalOpened(false)
  }
  const handleC = (e) => {
    setIsModalOpened(false)
  }
  const csvDownloadRef = useRef(null)
  const fetchDataOfCustomer = () => {
    setLoading(true)
    setIsModalOpened(false)

    axios
      .get(`${troesAPi}/customerusageexport/${ide}`, { mode: 'no-cors' })
      .then(({ data }) => {
        setcsvData(data)
        setTimeout(() => {
          csvDownloadRef.current.link.click()
        }, 500)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handlePopoverClick = (itemId) => {
    setPopoverVisible((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }
  const pause = async (id, item) => {
    setLoading(true)
    if (item.energy_plan !== null) {
      try {
        let result = await fetch(`${troesAPi}/subscription_pause/${id}`, {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
        let res = await result.json()
        getUsers()
        setLoading(false)
        setUserPause(true)
        handlePopoverClick(id)
        setTimeout(() => {
          setUserPause(false)
        }, 5000)
      } catch (err) {
        console.log(err)
        handlePopoverClick(id)
        setLoading(false)
      }
    } else {
      alert('User has no Subscription found!')
      setLoading(false)
    }
  }
  const play = async (id, item) => {
    setLoading(true)
    if (item.energy_plan !== null) {
      try {
        let result = await fetch(`${troesAPi}/subscription_resume/${id}`, {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
        let res = await result.json()
        getUsers()
        setLoading(false)
        setUserPlay(true)

        handlePopoverClick(id)
        setTimeout(() => {
          setUserPlay(false)
        }, 5000)
      } catch (err) {
        console.log(err)
        handlePopoverClick(id)
        setLoading(false)
      }
    } else {
      alert('User has no Subscription found!')
      setLoading(false)
    }
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     setData('')
  //   },[43200])
  // },[])
  const content = (item) => {
    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Tooltip title="Update">
          <button
            style={{ border: 'none', backgroundColor: '#fff' }}
            onClick={() => {
              setName(item.pwa_name)
              setEmail(item.pwa_email)
              setAddress(item.pwa_add1)
              setAddress2(item.pwa_add2)
              setMobile(item.pwa_mobile)
              setId(item.id)
              setUpdateModal(true)
            }}
          >
            <img src={editPen} alt="edit" className="editn_btn_global" />
          </button>
        </Tooltip>

        {item?.pwa_status === 6 && item.pause_resume == 1 ? (
          <Tooltip title="Resume">
            <button
              style={{ border: 'none', backgroundColor: '#fff', width: '15px' }}
              onClick={() => play(item?.id, item)}
            >
              <PlayCircleOutlined style={{ color: 'blue' }} />
            </button>
          </Tooltip>
        ) : (
          ''
        )}
        {item?.pwa_status == 1 ||
        item.pwa_status == 5 ||
        (item.pwa_status == 4 && item.pause_resume == 0) ? (
          <Tooltip title="Pause">
            <button
              style={{ border: 'none', backgroundColor: '#fff', width: '15px' }}
              onClick={() => pause(item?.id, item)}
            >
              <PauseCircleOutlined style={{ color: 'red', width: '15px' }} />
            </button>
          </Tooltip>
        ) : (
          ''
        )}

        {item.pwa_status === 3 ? (
          ''
        ) : (
          <Tooltip title="Suspend">
            <button
              className="for_suspend_hover"
              style={{ color: 'red', border: 'none', backgroundColor: '#fff', width: '15px' }}
              onClick={() => onSuspendUser(item.id)}
              title="Suspend"
            >
              <StopOutlined style={{ width: '15px' }} />
            </button>
          </Tooltip>
        )}
        {item.pwa_status === 3 ? (
          <Tooltip title="UnSuspend">
            <button
              className="for_suspend_hover"
              style={{ color: 'red', border: 'none', backgroundColor: '#fff', width: '15px' }}
              onClick={() => onUnSuspendUser(item.id)}
              title="UnSuspend"
            >
              <PlusOutlined style={{ width: '15px' }} />
            </button>
          </Tooltip>
        ) : (
          ''
        )}
        <Tooltip title="Delete">
          <button
            style={{ border: 'none', backgroundColor: '#fff', width: '15px' }}
            onClick={() => onDeleteUser(item.id)}
          >
            <DeleteOutlined className="delete_btn_global" style={{ width: '15px' }} />
          </button>
        </Tooltip>
      </div>
    )
  }
  return (
    <>
      <div className="container-fluid customer_information">
        {/* <div className="container-fluid customer_information" style={{position:'relative'}} > */}
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
        <div className="customer_addbutton_wrap">
          <div className="tcount">
            <h2 className="all_customer_of_page">
              {' '}
              <span className="customer_first_span"> Customers </span>{' '}
              <span className="totalcustomer"> ({totalUsers}) </span>{' '}
            </h2>
            <h5 className="linktotalcustomer">
              {' '}
              <span className="arrow_customers">
                <Link to="/"> Total Customer </Link>
              </span>{' '}
              <span>
                {' '}
                <img src={Rightarrow} alt=" right arrow" />{' '}
              </span>
            </h5>

            {/* </Link> </span> </p> */}
          </div>

          {/* <p style={{ paddingBottom: '18px', textAlign: 'right', paddingRight:'25px' }}>
            Total Customers : {totalUsers} <br />
            <Link to="/">
              <span
                className="hoverChange"
                style={{
                  textAlign: 'center',
                  color: 'blue',
                  borderBottom: '1px solid blue',
                  padding: '3px',

                }}
              >
                All Customers
              </span>
            </Link>
          </p> */}
          {/*
          <Button
                // id="button"
                type="primary"
                onClick={() => setAddUserModal(true)}
                className="customer_add_button"
                style={{display:'flex', gap:'5px' ,alignItems:'center'}}
              >
                <img src={AddUser} alt="frame"  style={{ width: '15px', marginTop:'3px' }} />
                Add User
              </Button> */}
          <button onClick={() => setAddUserModal(true)} className="customer_add_button">
            <span className="plusicon">+</span>
            <span>Add Customer</span>
          </button>
        </div>

        <CSVLink
          data={csvdata}
          //headers={headers}
          filename={`${csvName}_Report.csv`}
          target="_blank"
          ref={csvDownloadRef}
        />
        <div className="search_heading" style={{ position: 'relative' }}>
          <div className="add_nine">
            <div className="filter_serach">
              <div className="searchplaceholder">
                <FiSearch className="fiseachicon" />
                <input
                  type="text"
                  id="searchBox"
                  placeholder="Search Customer"
                  onChange={searchHandle}
                  style={{ background: '#fff' }}
                />
              </div>
              <div className="uI_hndle">
                {/* <Button id="handle__addFilter" type="primary" onClick={handleClicked}> */}
                <button
                  id="handle__addFilter"
                  className="filter_button"
                  onClick={handleClicked}
                  style={{ position: 'relative' }}
                >
                  <span className="filter_span">Filter</span>

                  <HiFilter />
                </button>
                {clearData ? (
                  <Button
                    id="clearbutton"
                    className="for_Filter_Clear"
                    onClick={() => clearFiltererd()}
                  >
                    <ClearOutlined
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bolder',
                        display: 'block',
                        float: 'left',
                        color: '#fff',
                        marginTop: '0px',
                      }}
                    />
                    Clear Filter
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div
              // style={{
              //   alignItems: 'center',
              //   position: 'absolute',
              //   right: '20px',
              //   display: 'flex',
              //   gap: '10px',
              //   flexWrap: 'wrap',
              //   marginTop: '-15px',
              // }}
              className="csv_box"
            >
              {/* <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                className="csv_form"
              >
                <input
                  ref={inputRef}
                  type="file"
                  style={{ width: csvwidth, color: csvTextColor }}
                  onChange={handleFileChange}
                  accept=".csv"
                  required
                />

                <button type="submit" className="import_report">
                  <BsCloudDownload className="cloud_downlaod_icon" />
                  <span className="downlaodtext"> Import CSV File </span>
                </button>
              </form> */}
              <div id="file_uplaoder_modal">
                <button type="submit" className="import_report" onClick={() => setModal2Open(true)}>
                  <BsCloudDownload className="cloud_downlaod_icon" />
                  <span className="downlaodtext"> Import CSV File </span>
                </button>

                <Modal
                  title="Import File"
                  centered
                  visible={modal2Open}
                  onOk={() => setModal2Open(false)}
                  onCancel={() => setModal2Open(false)}
                  width={1000}
                >
                  <div>
                    <form onSubmit={handleSubmit} className="csv_form">
                      <input
                        ref={inputRef}
                        type="file"
                        style={{ width: csvwidth, color: csvTextColor }}
                        onChange={handleFileChange}
                        accept=".csv"
                        required
                      />

                      <div className="fileimport_btn">
                        <button
                          type="button"
                          className="fileimport_cancel"
                          onClick={() => setModal2Open(false)}
                        >
                          {' '}
                          <span>Cancel</span>{' '}
                        </button>

                        <button type="submit" className="fileimportok_btn">
                          {/* <BsCloudDownload className="cloud_downlaod_icon" /> */}
                          <span> Import </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>

              {/* <input
                  ref={inputRef}
                  type="file"
                  style={{ width: csvwidth, color: csvTextColor }}
                  onChange={handleFileChange}
                  className="w-55 input_type_file"
                  accept=".csv"
                  required
                /> */}
            </div>
          </div>
          <div className="filter__Active">
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'Assigned' ? btnpadding : 0,
                backgroundColor: clickedButton === 'Assigned' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight, color: fontred }}
                onClick={() => {
                  deviceAssigned()
                  handleIconPaddingClick('Assigned')
                }}
              >
                <span className="forChanging_color" style={{ background: '#DB7E06' }}></span>
                <span style={{ borderBottom: borderred }} className='border_bottom'>Assigned</span>
              </button>
              {clickedButton === 'Assigned' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>

            <div className="forAlignment_Account">
              <div
                style={{
                  padding: clickedButton === 'Un-assigned' ? btnpadding : 0,
                  backgroundColor: clickedButton === 'Un-assigned' ? paddingcolor : 'transparent',
                  borderRadius: borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxSizing: 'border-box',
                }}
              >
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight1, color: fontred1 }}
                  onClick={() => {
                    deviceUnassigned()
                    handleIconPaddingClick('Un-assigned')
                  }}
                >
                  <span className="forChanging_color" style={{ background: '#19B3B3' }}></span>
                  <span style={{ borderBottom: borderred1 }} className='border_bottom'> Un-assigned</span>
                </button>
                {clickedButton === 'Un-assigned' && (
                  <IoIosClose className="sortcross" onClick={sortedDate} />
                )}
              </div>
            </div>
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'Registered' ? btnpadding : 0,
                backgroundColor: clickedButton === 'Registered' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight2, color: fontred2 }}
                onClick={() => {
                  registerdAccount()
                  handleIconPaddingClick('Registered')
                }}
              >
                <span className="forChanging_color" style={{ background: '#3378FF' }}></span>
                <span style={{ borderBottom: borderred2 }} className='border_bottom'> Registered</span>
              </button>
              {clickedButton === 'Registered' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'Active' ? btnpadding : 0,
                backgroundColor: clickedButton === 'Active' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight3, color: fontred3 }}
                onClick={() => {
                  activeAccount()
                  handleIconPaddingClick('Active')
                }}
              >
                <span
                  className="forChanging_color"
                  style={{
                    background: '#3CB72C',
                  }}
                ></span>
                <span style={{ borderBottom: borderred3 }} className='border_bottom'> Active</span>
              </button>
              {clickedButton === 'Active' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'In-active' ? btnpadding : 0,
                backgroundColor: clickedButton === 'In-active' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight4, color: fontred4 }}
                onClick={() => {
                  inActivee()
                  handleIconPaddingClick('In-active')
                }}
              >
                <span
                  className="forChanging_color"
                  style={{
                    background: '#935CED ',
                  }}
                ></span>
                <span style={{ borderBottom: borderred4 }} className='border_bottom'>In-active</span>
              </button>
              {clickedButton === 'In-active' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'Paused' ? btnpadding : 0,
                backgroundColor: clickedButton === 'Paused' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight5, color: fontred5 }}
                onClick={() => {
                  Paused()
                  handleIconPaddingClick('Paused')
                }}
              >
                <span className="forChanging_color" style={{ background: '#8F9FBC' }}></span>
                <span style={{ borderBottom: borderred5 }} className='border_bottom'> Paused</span>
              </button>
              {clickedButton === 'Paused' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>
            <div
              className="forAlignment_Account"
              style={{
                padding: clickedButton === 'Suspended' ? btnpadding : 0,
                backgroundColor: clickedButton === 'Suspended' ? paddingcolor : 'transparent',
                borderRadius: borderRadius,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
              }}
            >
              <button
                className="btn_for_Link"
                style={{ fontWeight: fontWeight6, color: fontred6 }}
                onClick={() => {
                  AccountSuspended()
                  handleIconPaddingClick('Suspended')
                }}
              >
                <span className="forChanging_color" style={{ background: '#F42B3D' }}></span>
                <span style={{ borderBottom: borderred6 }} className='border_bottom'> Suspended</span>
              </button>
              {clickedButton === 'Suspended' && (
                <IoIosClose className="sortcross" onClick={sortedDate} />
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading_part">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}

        <div>
          {isShown && (
            <div className="modal-backdrop" onClick={() => setIsShown(false)}>
              {/* Backdrop content (if needed) */}
            </div>
          )}
          <div
            className={`for_respon__modal_first ${isShown ? 'modal-open' : ''}`}
            style={{
              display: isShown ? 'block' : 'none',
            }}
          >
            <form onSubmit={applyFilter}>
              <div className="add__one">
                <div className="add_filter1wrap_cross">
                  <div className="add_filter1wrap">
                    <span className="add_filter_1">Add Filter</span>

                    {/* <ArrowRightOutlined style={{ fontSize: '16px', marginTop: '5px' }} /> */}
                  </div>
                  <div onClick={() => setIsShown(false)}>
                    <IoMdClose className="crossicon" />
                  </div>
                  {/* <IoMdClose className="crossicon"  onClick={() => clearFilter()}    /> */}
                </div>

                <div className="add__three">
                  <div className="for__marginn">
                    <Button
                      id="status_filter"
                      onClick={statusFilter}
                      className="for_campaign_act commonbutton"
                      style={{ backgroundColor: '#3378FF' }}
                    >
                      <MdEditDocument />
                      <span>Status</span>
                    </Button>
                    <Button
                      id="campaign_activity"
                      onClick={campaignActivity}
                      className="for_campaign_act commonbutton"
                      style={{ backgroundColor: '#3378FF' }}
                    >
                      <IoLocationSharp />
                      <span>Location</span>
                    </Button>
                    <Button
                      id="location"
                      onClick={location}
                      className="for_campaign_act commonbutton"
                      style={{ backgroundColor: '#3378FF' }}
                    >
                      <IoIosPaper />
                      <span>Plan</span>
                    </Button>
                    <Button
                      id="price_handle"
                      onClick={priceHandle}
                      className="for__price_hand commonbutton "
                      style={{ backgroundColor: '#3378FF' }}
                    >
                      <IoPricetags />
                      <span>Price</span>
                    </Button>
                  </div>
                </div>
                <hr
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    color: '#F1F1F1',
                    marginBottom: '12px',
                  }}
                />
                {statusfilter || installation || planData || priceData ? (
                  ''
                ) : (
                  <div className="add__four">
                    <p>
                      <MinusOutlined className="minus_outlined_one" />
                      No Filters applied
                    </p>
                    <p>Add one of the above filters to narrow down your User list</p>
                  </div>
                )}
                {statusfilter ? (
                  <div className="add_five">
                    <div className="add__eleven">
                      <span className="add__forteen">Status</span>
                      <Radio.Group
                        onChange={onstatusChange}
                        value={statusvalue}
                        className="base_PP2"
                      >
                        <Radio value="5" id="amul">
                          <p id="">Assigned</p>
                        </Radio>

                        <Radio value="4" id="amul">
                          <p id="">Un-Assigned</p>
                        </Radio>

                        <Radio value="0" id="amul">
                          <p id="">Registered</p>
                        </Radio>

                        <Radio value="1" id="amul">
                          <p id="">Active</p>
                        </Radio>

                        <Radio value="2" id="amul">
                          <p id="">In-Active</p>
                        </Radio>

                        <Radio value="6" id="amul">
                          <p id="">Paused</p>
                        </Radio>

                        <Radio value="3" id="amul">
                          <p id="">Suspended</p>
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {statusfilter ? (
                  <div>
                    <hr
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        color: '#F1F1F1',
                        marginBottom: '12px',
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
                {installation ? (
                  <div className="add_five">
                    <div className="add__eleven">
                      <span className="add__forteen">Location</span>

                      <Radio.Group
                        onChange={onChangePlan}
                        value={value}
                        className="base_PP2location"
                      >
                        {locateData.map((item, index) => {
                          return (
                            <Radio key={index} value={item.location} id="amul">
                              <p id=""> {item.location}</p>
                            </Radio>
                          )
                        })}
                      </Radio.Group>
                    </div>
                    {/* <span className="plan__uncheck_one" onClick={RadioPlan}>
                    <CloseOutlined />
                  </span> */}
                  </div>
                ) : (
                  ''
                )}
                {installation ? (
                  <div>
                    <hr
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        color: '#F1F1F1',
                        marginBottom: '12px',
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
                {planData ? (
                  <div className="add__eight">
                    <div className="add_twelve">
                      <h6 className="add__sixx">Plan</h6>
                      <div className="add_twenty">
                        <Radio.Group onChange={onChangeBase} value={planValue} className="base_yy2">
                          {radioValue.map((item, index) => {
                            return (
                              <Radio key={index} value={item.package_plan} id="amul">
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <p id=""> {item.package_plan}</p>
                                  <p
                                    className="delete_outline_one"
                                    onClick={() => onDeleteRadio(item.id)}
                                  >
                                    <DeleteOutlined style={{ display: 'block' }} />
                                  </p>
                                </div>
                              </Radio>
                            )
                          })}
                        </Radio.Group>
                        <div className="for__margin__two" style={{ zIndex: '2' }}>
                          <Modal
                            title="Add Plan"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <input
                              onChange={(e) => setPackagePlan(e.target.value)}
                              type="text"
                              name="package_plan"
                              id=""
                              value={package_plan}
                              className="package__plan"
                              placeholder="Add a Package"
                            />
                          </Modal>
                          <button className="dynamic__button" onClick={showModal}>
                            <PlusOutlined className="plus__outlined" />
                          </button>
                          {/* <span className="plan__uncheck" onClick={RadioBase}>
                          <CloseOutlined />
                        </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {planData ? (
                  <div>
                    <hr
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        color: '#F1F1F1',
                        marginBottom: '12px',
                      }}
                    />
                  </div>
                ) : (
                  ''
                )}
                {priceData ? (
                  <div className="price__div">
                    <span className="main_div_of_pric">Price</span>
                    <input
                      id="basePrice"
                      type="number"
                      className="inputprice"
                      min={1}
                      value={basePrice}
                      max={10000}
                      defaultValue={0}
                      onChange={onChangeed}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="mainDivOf_apply">
                  <button className="sub_divOf_Appli" id="apply__filter">
                    {/* <FilterFilled className="filter_outlined" /> */}
                    Apply Filters
                  </button>
                  <button onClick={() => clearFilter()} className="claer_filter">
                    {/* <ClearOutlined className="delete_outlinedd" /> */}
                    Clear All
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="customer_wrapper">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ color: '#fff' }}>
                <tr>
                  <th></th>
                  <th></th>
                  <th scope="col" className="global_th">
                    <div style={{ width: '80px' }}>
                      {' '}
                      <span>S.No.</span>
                    </div>
                  </th>
                  <th scope="col" className="global_th">
                    {' '}
                    <span>File</span>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>

                  <th scope="col" className="global_th" onClick={() => sorting('Device_Id')}>
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '300px',
                        }}
                      >
                        <span>Device Id</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['Device_Id'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th className="global_th" scope="col" onClick={() => sorting('Unique_Id')}>
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '150px',
                        }}
                      >
                        <span>Unique Id</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['Unique_Id'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '3px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th scope="col" className="global_th " onClick={() => sorting('id')}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100px',
                      }}
                    >
                      <span>Id</span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {sortingState['id'] == 'ASC' ? (
                          <ArrowUpOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        ) : (
                          <ArrowDownOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        )}
                      </span>
                    </div>
                  </th>

                  <th
                    onClick={() => sorting('pwa_name')}
                    scope="col"
                    className="global_th text-center"
                  >
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <span style={{}}>Name</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['pwa_name'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th onClick={() => sorting('pwa_email')} scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <span>Email</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['pwa_email'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th onClick={() => sorting('pwa_add1')} scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <span>Address</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['pwa_add1'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th onClick={() => sorting('pwa_state')} scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '100px',
                        }}
                      >
                        <span>State</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['pwa_state'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th onClick={() => sorting('pwa_choice')} scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          width: '200px',
                        }}
                      >
                        <span>Installation</span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sortingState['pwa_choice'] === 'ASC' ? (
                            <ArrowUpOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          ) : (
                            <ArrowDownOutlined
                              style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                            />
                          )}
                        </span>
                      </div>
                    </Tooltip>
                  </th>
                  <th onClick={() => sorting('energy_plan')} scope="col" className="global_th">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '200px',
                      }}
                    >
                      <span>Plan</span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {sortingState['energy_plan'] === 'ASC' ? (
                          <ArrowUpOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        ) : (
                          <ArrowDownOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => sorting('energy_price')} scope="col" className="global_th">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '200px',
                      }}
                    >
                      <span>Price</span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {sortingState['energy_price'] === 'ASC' ? (
                          <ArrowUpOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        ) : (
                          <ArrowDownOutlined
                            style={{ color: '#918d8d', paddingTop: '1px', paddingLeft: '5px' }}
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '200px',
                        }}
                      >
                        <span>Mobile</span>
                      </div>
                    </Tooltip>
                  </th>
                  <th scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '200px',
                        }}
                      >
                        <span>Date</span>
                      </div>
                    </Tooltip>
                  </th>
                  <th scope="col" className="global_th">
                    <Tooltip title="Click To Sort">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '200px',
                        }}
                      >
                        <span>Time</span>
                      </div>
                    </Tooltip>
                  </th>
                  <th scope="col" className="global_th">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="tbody_clr">
                {currentPosts &&
                  currentPosts.map((item, index) => {
                    const displayedIndex = indexOfFirstPage + index + 1
                    function padTo2Digits(num) {
                      return num.toString().padStart(2, '0')
                    }
                    function formatDate(date) {
                      return [
                        padTo2Digits(date.getDate()),
                        padTo2Digits(date.getMonth() + 1),
                        date.getFullYear(),
                      ].join('-')
                    }
                    let numOfDaata = formatDate(new Date(item.pwa_date))
                    let color
                    if (item.pwa_status === 5) {
                      color = 'pink'
                    } else if (item.pwa_status === 4) {
                      color = '#0081a7'
                    } else if (item.pwa_status === 0) {
                      color = '#3378FF'
                    } else if (item.pwa_status === 1) {
                      color = '#3CB72C'
                    } else if (item.pwa_status === 2) {
                      color = 'yellow'
                    } else if (item.pwa_status === 6) {
                      color = '#5A5A5A'
                    } else {
                      color = 'red'
                    }
                    return (
                      <tr key={index} className="trindicator_parent">
                        <td>
                          {' '}
                          <input
                            type="checkbox"
                            className="trindicator"
                            name=""
                            id=""
                            style={{
                              appearance: 'none',
                              backgroundColor: `${color}`,
                            }}
                          />
                        </td>
                        <td>
                          {item?.energy_plan !== null &&
                          item?.Device_Id == null &&
                          item?.flag_status !== '1' ? (
                            <div>
                              {/* <AiFillInfoCircle id="notificationicon" />{' '} */}

                              <img src={InformationCircleOutline} id="notificationicon" />
                              <div className="notification_dropdowncontent ">
                                {item?.energy_plan !== null && item?.Device_Id == null ? (
                                  <div
                                    className="insidenotification  "
                                    style={{ color: '#B30000' }}
                                  >
                                    <BsPersonPlusFill className="noticons" />
                                    <p>Device not assigned</p>
                                  </div>
                                ) : (
                                  '-'
                                )}

                                {item?.flag_status == '1' ? (
                                  <div
                                    className="insidenotification notifictaionline notificationmargin"
                                    style={{ color: '#0044CC' }}
                                  >
                                    <RiChargingPile2Fill className="noticons" />
                                    <p> Device partially matched with customer address</p>
                                  </div>
                                ) : (
                                  ' '
                                )}
                              </div>
                            </div>
                          ) : (
                            <div> </div>
                          )}
                        </td>
                        <td className="px-3">{displayedIndex}</td>
                        <td>
                          <div onClick={(e) => onChangedModal(e, item.id)} value={value}>
                            <Tooltip placement="topLeft" title={textOne}>
                              <img src={Excelicon} alt="upload_img" />
                            </Tooltip>
                          </div>
                        </td>

                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div
                            style={{
                              border: 'none',
                              borderRadius: '4px',
                              // background: '#f5f8ff',
                              padding: '2px',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setShow(true)
                              setSelectedData(item?.Device_Id)
                            }}
                          >
                            {item?.Device_Id ? item?.Device_Id : ' - '}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              border: 'none',
                              borderRadius: '4px',
                              // background: '#f5f8ff',
                              padding: '2px',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setUniqueShow(true)
                              setUniqueId(item?.Unique_Id)
                            }}
                          >
                            {item?.Unique_Id ? item?.Unique_Id : ' - '}{' '}
                          </div>
                        </td>

                        <td style={{ textAlign: 'left' }}>{item?.id}</td>
                        <td>{item?.pwa_name}</td>
                        <td>{item?.pwa_email}</td>
                        <td>
                          {item?.pwa_add1},{item?.pwa_add2} {item?.pwa_zip}
                        </td>
                        <td>{item?.pwa_state}</td>
                        <td>{item?.pwa_choice}</td>
                        <td>{item?.energy_plan ? item?.energy_plan : ' - '}</td>
                        <td>
                          {item?.energy_price ? '$' + (item?.energy_price / 100).toFixed(2) : ' - '}
                        </td>
                        <td>{item?.pwa_mobile}</td>
                        <td>{numOfDaata}</td>
                        <td>{item?.time}</td>

                        <td>
                          <div
                            style={{
                              float: 'left',
                            }}
                          >
                            <Popover
                              placement="leftTop"
                              content={() => content(item)}
                              trigger="click"
                              open={popoverVisible[item?.id]}
                              onOpenChange={() => handlePopoverClick(item?.id)}
                            >
                              <Button
                                style={{
                                  background: 'none',
                                  color: '#8F9FBC',
                                  boxShadow: 'none',
                                  outline: 'none',
                                }}
                              >
                                <img src={Threedots} alt="alt Image" />
                              </Button>
                            </Popover>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          {/* pagination start */}

          <Pagination
            onChange={handlePagination}
            pageSize={postPerPage}
            total={total}
            current={page}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            itemRender={itemRender}
            style={{
              paddingLeft: '12px',
              marginTop: '16px',
              marginBottom: '15px',
              // display: 'flex',
              // justifyContent: 'flex-start',
            }}
          />
          {/* pagination ends */}
          {/*   // himanshu code starts */}
          {show ? (
            <div className="modal display-block">
              <section className="modal-main">
                <div className="App">
                  {/* <img src={FrameTwo} alt="frame" style={{ paddingRight: '10px' }} /> */}
                  <p className="small_modal">Device ID :</p> &nbsp;
                  <p className="small_modal">
                    <span> {selectedData} </span>
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                  }}
                >
                  <button
                    style={{
                      background: 'white',
                      color: '#3A72DE',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                    onClick={() => {
                      copyText()
                    }}
                  >
                    {/* <CopyFilled style={{ color: 'blue' }} /> */}
                    <img src={Bxs_copy} alt="Copied Icon" />
                    {copied ? <span style={{ color: 'blue' }}>Copied</span> : 'Copy ID'}
                  </button>
                  {/* <p
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                    margin:'0',
                  }}
                  onClick={() => {
                    setShow(false)
                  }}
                >
                  X
                </p>  */}

                  <div style={{ cursor: 'pointer' }} onClick={() => setShow(false)}>
                    {' '}
                    <img src={XOutline} alt="cross icon" />{' '}
                  </div>
                </div>
              </section>
            </div>
          ) : (
            ''
          )}
          {uniqueshow ? (
            <div className="modal display-block">
              <section className="modal-main">
                <div className="App">
                  {/* <img src={FrameTwo} alt="frame" style={{ paddingRight: '10px' }} /> */}
                  <p style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                    {' '}
                    Unique ID :
                  </p> &nbsp;
                  <p
                    style={{
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      margin: 'auto',
                    }}
                  >
                    {uniqueId}
                  </p>
                </div>
                <button
                  style={{
                    background: 'white',
                    color: '#3A72DE',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                  onClick={() => {
                    copyUniqueText()
                  }}
                >
                  {/* <CopyFilled style={{ color: 'blue' }} /> */}
                  <div style={{ cursor: 'pointer' }} onClick={() => setShow(false)}>
                    {' '}
                    {/* <img src={XOutline} alt="cross icon" />{' '} */}
                    <img src={Bxs_copy} alt="Copied Icon" />
                  </div>
                  {uniquecopied ? <span style={{ color: 'blue' }}>Copied</span> : 'Copy ID'}
                </button>
                {/* <p
                  style={{
                    color: 'white',
                    marginTop: '-10px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setUniqueShow(false)
                  }}
                >
                  X
                </p> */}

                <div style={{ cursor: 'pointer' }} onClick={() => setUniqueShow(false)}>
                  {' '}
                  <img src={XOutline} alt="cross icon" />{' '}
                </div>
              </section>
            </div>
          ) : (
            ''
          )}
          {/*   // himanshu code ends */}
        </div>
        <div
          className="user__detail__popup__Customer userdeletmodal"
          style={{
            display: userDelete ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' ,gap:'16px' }}>
            {/* <DeleteOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                
                fontSize: '18px',
              }}
            /> */}
             <img src={Redcircle} alt="Cyber Vision infotech " />
            <span className="admin_registerd__pop userdeletmodal_margin  ">User has been deleted.</span>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: userPlay ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PlayCircleOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            />
            <p className="admin_registerd__pop">Subscription Resumed.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: userPause ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PauseCircleOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            />
            <p className="admin_registerd__pop">Subscription Paused.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: userSuspend ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DeleteOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            />
            <p className="admin_registerd__pop">A User has been Suspended.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: userUnSuspend ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PlusOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            />
            <p className="admin_registerd__pop">A User has been UnSuspended.</p>
          </div>
        </div>
      </div>
      {/* // himanshu code starts */}
      {/* add user modal starts */}
      {addUserModal ? (
        <div className="modal-backdrop">
          <div id="addModalsecond">
            <div className="modal_heading ">
              <div className="modal_hedaing_customer">
                <h2>Create User Customer</h2>
                <IoMdClose className="crossicon" onClick={empty} />
              </div>
            </div>
            <hr className="cretaecustomerline"></hr>
            <div className="modal_form">
              <form className="form" onSubmit={(e) => adduser(e)}>
                {/* <div style={{ display: 'none' }}>
                <input type="email" />
                <input type="password" />
              </div> */}
                <div>
                  <label htmlFor="name" style={{ fontWeight: '600' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Eg. John Doe"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    minLength={3}
                    maxLength={20}
                  />
                </div>

                <div>
                  <label
                    className="htmlFor_respn"
                    style={{ marginRight: '10px', fontWeight: '600' }}
                  >
                    Select installation from choices:
                  </label>
                  <select id="option__value" onChange={handleSelect}>
                    <option value="">{`Select installation  from choices:`}</option>
                    {locateData &&
                      locateData.map((item, index) => {
                        return (
                          <option key={index} data-name={item.id} value={item.location}>
                            {item.location}
                          </option>
                        )
                      })}
                  </select>
                </div>

                <div>
                  <label htmlFor="mobile" style={{ fontWeight: '600' }}>
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Eg.99xxxxxxxx"
                    value={mobile}
                    name="name"
                    required
                    onChange={handleMobile}
                    onKeyDown={(evt) =>
                      (evt.key === '-' || evt.key === 'e' || evt.key === 'E' || evt.key === '.') &&
                      evt.preventDefault()
                    }
                    autoComplete="off"
                  />
                  {phoneError ? (
                    <span
                      id="email__error"
                      style={{
                        fontWeight: '400',
                        color: `${colorGreen}`,
                        fontSize: '12px',
                      }}
                    >
                      {phoneError}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div>
                  <label htmlFor="address" style={{ fontWeight: '600' }}>
                    Address Line 1{' '}
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, Street Number, Block..."
                    value={add_line1}
                    name="address"
                    required
                    onChange={handleAdd1}
                    minLength={2}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ fontWeight: '600' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder={`Eg.john@xyz.com ${forautoFill}`}
                    name={forautoFill}
                    value={email}
                    required
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {emailError ? (
                    <span
                      id="email__error"
                      style={{
                        fontWeight: '400',
                        color: `${colorGreen}`,
                        fontSize: '12px',
                      }}
                    >
                      {emailError}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div>
                  <label htmlFor="address2" style={{ fontWeight: '600' }}>
                    Address Line 2{' '}
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, Street Number, Block..."
                    value={add_line2}
                    name="address2"
                    onChange={handleAdd2}
                    minLength={2}
                  />
                </div>

                <div>
                  <label htmlFor="password" style={{ fontWeight: '600' }}>
                    Password
                  </label>
                  <Input.Password
                    value={password}
                    name={forautoFill}
                    onChange={handlePassword}
                    minLength={8}
                    placeholder="Create a strong password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    required
                  />
                  {errorMessage ? (
                    <span
                      style={{
                        fontWeight: '400',
                        color: `${colorRed}`,
                        width: '235px',
                        fontSize: '12px',
                      }}
                    >
                      {errorMessage}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div className="last_line">
                  <div className="part_1">
                    <label htmlFor="zipcode" style={{ fontWeight: '600' }}>
                      Zipcode
                    </label>
                    <input type="text" value={newZipcode} placeholder="Enter Zipcode" readOnly />
                  </div>
                  <div className="part_2">
                    <label htmlFor="State" style={{ fontWeight: '600' }}>
                      State
                    </label>
                    <input type="text" value={newState} placeholder="Select" readOnly />
                  </div>
                </div>

                <div>
                  <label htmlFor="conpassword" style={{ fontWeight: '600' }}>
                    Confirm Password
                  </label>
                  <Input.Password
                    placeholder="Retype the Password"
                    value={conpassword}
                    name="conpassword"
                    onChange={passwordcheck}
                    minLength={8}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    required
                  />
                  <p style={{ color: 'red', display: display, fontSize: '12px' }}>
                    Password did not match❗
                  </p>

                  <span
                    onClick={generatePassword}
                    style={{
                      cursor: 'pointer',
                      // background: 'rgb(24, 144, 255)',
                      // color: 'rgb(255, 255, 255)',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      color: '#3378FF',
                      textDecoration: 'underline',
                      paddingBottom: '1px',

                      // color: 'white',
                      // padding: '5px 10px',
                      // borderRadius: '7px',
                      // width: 'fit-content',
                      // margin: '0',
                      // marginBottom: '3px',
                    }}
                  >
                    Generate Password
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '24px',
                    width: '100%',
                  }}
                >
                  <button className="addcustomerform_cancel" onClick={empty}>
                    Cancel
                  </button>
                  <button className="addcustomerform_btn" required onChange={finalCall}>
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div
        className="user__detail__popup__Customer"
        style={{
          display: userAdded,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserAddOutlined
            style={{
              display: 'block',
              color: '#fff',
              fontWeight: 'bolder',
              paddingRight: '10px',
              marginTop: '-5px',
              fontSize: '18px',
            }}
          />
          <p className="admin_registerd__pop">Customer Added Successfully.</p>
        </div>
      </div>
      {/* add user modal ends */}

      {/* update modal starts */}
      {updateModal ? (
        <div className="modal-backdrop">
          <div id="update_modal">
            <div className="update_modal_heading">
              <h2>Edit Customer Details</h2>
              <IoMdClose className="crossicon" onClick={updateCancel} />
            </div>
            <div className="update_modal_form">
              <form className="update_form" onSubmit={(e) => onSub(e)}>
                <div>
                  <label
                    htmlFor="name"
                    value={name}
                    style={{ fontWeight: '600', marginTop: '0px' }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Eg. John Doe"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={3}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ fontWeight: '600' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Eg.john@xyz.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="mobile" style={{ fontWeight: '600' }}>
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Eg.99xxxxxxxx"
                    value={mobile}
                    name="mobile"
                    onChange={handleMobile}
                    onKeyDown={(evt) =>
                      (evt.key === '-' || evt.key === 'e' || evt.key === 'E' || evt.key === '.') &&
                      evt.preventDefault()
                    }
                    required
                    autoComplete="off"
                  />
                  {phoneError ? (
                    <span
                      id="email__error"
                      style={{
                        fontWeight: '400',
                        color: `${colorGreen}`,
                        fontSize: '12px',
                      }}
                    >
                      {phoneError}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div>
                  <label htmlFor="address" style={{ fontWeight: '600' }}>
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, Street Number, Block..."
                    value={add_line1}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label htmlFor="address2" style={{ fontWeight: '600' }}>
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, Street Number, Block..."
                    value={add_line2}
                    name="address2"
                    onChange={(e) => setAddress2(e.target.value)}
                    minLength={2}
                  />
                </div>
                <section className="update_button">
                  <button
                    type="submit"
                    className="btn2updae_btn"
                    style={{ backgroundColor: '#3378FF' }}
                  >
                    Update
                  </button>
                  <button
                    className="btn_cancel"
                    onClick={updateCancel}
                    style={{ backgroundColor: '#8F9FBC', color: '#FFFFFF' }}
                  >
                    Cancel
                  </button>
                </section>
              </form>
            </div>
          </div>{' '}
        </div>
      ) : (
        ''
      )}
      <div
        className="user__detail__popup__Customer"
        style={{
          display: userUpdated,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserSwitchOutlined
            style={{
              display: 'block',
              color: '#fff',
              fontWeight: 'bolder',
              paddingRight: '10px',
              marginTop: '-5px',
              fontSize: '18px',
            }}
          />
          <p className="admin_registerd__pop">Customer Updated Successfully.</p>
        </div>
      </div>

      {/* update modal ends */}

      <Modal
        title="Customer Report"
        open={isModalOpened}
        onOk={handleO}
        onCancel={handleC}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => fetchDataOfCustomer()}
            style={{ borderRadius: '9px' }}
          >
            Export Report
          </Button>,
          <Button style={{ borderRadius: '9px' }} key="back" onClick={handleC}>
            Cancel
          </Button>,
          <Button
            style={{ borderRadius: '9px' }}
            key=""
            type="primary"
            loading={loading}
            onClick={handleO}
          >
            OK
          </Button>,
        ]}
      >
        <table className="table theadPadding_remove">
          <thead>
            <th style={{ textAlign: 'left' }}>Customer name</th>
            <th style={{ textAlign: 'left' }}>Current Device ID</th>
            <th style={{ textAlign: 'left' }}>Total Usage</th>
          </thead>
          <tbody>
            {Object.values(modalGetRequest).map((item, ind) => {
              return (
                <tr key={ind}>
                  <td style={{ textAlign: 'left' }}> {item.pwa_name}</td>
                  <td style={{ textAlign: 'left' }}> {item.device_id}</td>
                  <td style={{ textAlign: 'left' }}> {item.daily_uses}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Modal>
      {/*   // himanshu code ends */}
    </>
  )
}

export default Customer

// action code
// <td>
//                         {item.pwa_status === 3 ? (
//                           ''
//                         ) : (
//                           <button
//                             className="for_suspend_hover"
//                             style={{ paddingLeft: '9px', color: 'red' }}
//                             onClick={() => onSuspendUser(item.id)}
//                             title="Suspend"
//                           >
//                             <StopOutlined />
//                           </button>
//                         )}

//                         {item.pwa_status === 3 ? (
//                           <button
//                             className="for_suspend_hover"
//                             style={{ paddingLeft: '9px', color: 'red' }}
//                             onClick={() => onUnSuspendUser(item.id)}
//                             title="UnSuspend"
//                           >
//                             <PlusOutlined />
//                           </button>
//                         ) : (
//                           ''
//                         )}
//                         <button
//                           className=""
//                           style={{ paddingLeft: '8px', color: 'red' }}
//                           onClick={() => onDeleteUser(item.id)}
//                         >
//                           <DeleteOutlined />
//                         </button>

//                         <button
//                           onClick={() => {
//                             setName(item.pwa_name)
//                             setEmail(item.pwa_email)
//                             setAddress(item.pwa_add1)
//                             setAddress2(item.pwa_add2)
//                             setMobile(item.pwa_mobile)
//                             // setLocationId(item.pwa_choice)
//                             // setNewZipcode(item.pwa_zip)
//                             // setNewState(item.pwa_state)
//                             setId(item.id)
//                             setUpdateModal(true)
//                             //updateAdmin(SetRowData(item), setId(item.id))
//                           }}
//                         >
//                           <img
//                             src={editPen}
//                             alt="edit"
//                             style={{ width: '20px', paddingLeft: '8px', color: 'red' }}
//                           />
//                         </button>

//                       </td>
