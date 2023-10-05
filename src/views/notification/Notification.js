import React from 'react'
import axios, { Axios } from 'axios'
import { troesAPi } from '../../api'
import { Button, Drawer, Spin, Radio, Popover, Tooltip } from 'antd'
import './Notification.css'
import '../universal.css'
import {
  DeleteOutlined,
  FilterFilled,
  StopOutlined,
  PlusOutlined,
  MinusOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  FieldTimeOutlined,
  UserOutlined,
  SettingOutlined,
  ClearOutlined,
} from '@ant-design/icons'
import { Pagination } from 'antd'
import editPen from '../../assets/images/editPen.svg'
import { useState, useEffect } from 'react'
import FrameTwo from '../../assets/images/FrameTwo.svg'
import FrameOne from '../../assets/images/FrameOne.svg'
import Frame from '../../assets/images/Frame.svg'
import user from '../../assets/images/filterUser.svg'
import Source from '../../assets/images/Source.svg'
import Timing from '../../assets/images/Timing.svg'
import Trash from '../../assets/images/trash.svg'
import AddNotification from '../../assets/images/addNotification.svg'
import { SaveOutlined } from '@ant-design/icons'
import { TimePicker } from 'antd'
import { Input, Select } from 'antd'
const { TextArea } = Input
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker
import moment from 'moment'
import { Route, Link, Routes } from 'react-router-dom'
import { CListGroup } from '@coreui/react'
import { useRef } from 'react'
import dayjs from 'dayjs'
import { getStyle } from '@coreui/utils'
import { FiSearch } from 'react-icons/fi'
import { HiFilter } from 'react-icons/hi'
const Notification = () => {
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showMessageTroes, setShowMessageTroes] = useState(false)
  const [notificationId, setNotificationId] = useState()
  const [source_trigger, setSourceTrigger] = useState('')
  const [notification_type, setnotification_type] = useState('')
  const [eventTrigger, setEventTrigger] = useState()
  const [startDate, setStartDate] = useState()
  const [stopDate, setStopDate] = useState()
  const [startTime, setStartTime] = useState()
  const [stopTime, setStopTime] = useState()
  const [message, setMessage] = useState('')
  const [locationId, setLocationId] = useState('')
  const [data, setData] = useState([])
  const [dataTroes, setDataTroes] = useState([])
  const [openRowIndex, setOpenRowIndex] = useState(null)
  const [openRowIndexTroes, setOpenRowIndexTroes] = useState(null)
  const [postPerPage, setPostPerPage] = useState(1000)
  const [total, setTotal] = useState('')
  const [troesTotal, setTroesTotal] = useState('')
  const [page, setPage] = useState(1)
  const [Troespage, setTroesPage] = useState(1)
  const [activeData, setActiveData] = useState('')
  const [notificationCount, setNotificationCount] = useState('')
  const [troesLen, settroesLen] = useState('')
  const [inputid, setInputid] = useState('1')

  // const [search_string, setsearch_string] = useState('')
  const [NotificationUpdated, setNotificationUpdated] = useState('none')
  const [NotificationAdded, setNotificationAdded] = useState('none')
  const [NotificationDeleted, setNotificationDeleted] = useState('none')
  const [fontWeight1, setFontWeight1] = useState('400')
  const [fontWeight2, setFontWeight2] = useState('400')
  const [fontWeight3, setFontWeight3] = useState('400')
  const [fontred1, setFontred1] = useState('blue')
  const [fontred2, setFontred2] = useState('blue')
  const [fontred3, setFontred3] = useState('blue')
  const [borderred1, setborderred1] = useState('1px solid blue')
  const [borderred2, setborderred2] = useState('1px solid blue')
  const [borderred3, setborderred3] = useState('1px solid blue')
  const [isInputActive, setIsInputActive] = useState(false)
  const [notificationIds, setNotificationIds] = useState([])

  // filter starts
  const [isShown, setIsShown] = useState(false)
  const [statusfilter, setStatusfilter] = useState(false)
  const [installation, setInstallation] = useState(false)
  const [planData, setPlanData] = useState(false)
  const [priceData, setPriceData] = useState(false)
  const [order, setOrder] = useState('ASC')
  const [dataValue, setDataValue] = useState()
  const [clearData, setclearData] = useState(false)
  const [basePackage, setBasePackage] = useState()
  const [basePrice, setBasePrice] = useState(0)
  const [statusvalue, setstatusValue] = useState(0)
  const [locateData, setLocateData] = useState([])
  const [locate, setLocate] = useState([])
  const [event, setEvent] = useState([])
  const [eventTroes, setEventTroes] = useState([])
  const [planValue, setPlanValue] = useState(0)
  const [value, setValue] = useState(0)
  const [filterColor, setFilterColor] = useState('green')
  const [update, setUpdate] = useState('0')
  const format = 'HH:mm'
  const [editableValues, setEditableValues] = useState(
    data.map((item) => ({ item, update: false })),
  )
  const [editableValuesTroes, setEditableValuesTroes] = useState(
    dataTroes.map((item) => ({ item, update: false })),
  )

  //
  const maxWords = 500
  const searchBoxRef = useRef(null)
  // filter ends

  // filter start

  const onstatusChange = (e) => {
    setstatusValue(e.target.value)
  }
  const onChangePlan = (e) => {
    setValue(e.target.value)
  }
  const statusPlan = (e) => {
    setValue(!e.target.checked)
    setValue(false)
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
  const statusFilter = () => {
    // document.getElementById('status_filter').style.backgroundColor = '#0c2556'
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
    // document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    // document.getElementById('status_filter').style.backgroundColor = '#1890ff'
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
    // document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    setPlanData(!planData)
    if (planData === true) {
      document.getElementById('location').style.backgroundColor = '#1890ff'
    }
  }
  const priceHandle = () => {
    document.getElementById('price_handle').style.backgroundColor = '#0c2556'
    document.getElementById('price_handle').style.color = '#fff'
    // document.getElementById('location').style.backgroundColor = '#1890ff'
    document.getElementById('campaign_activity').style.backgroundColor = '#1890ff'
    // document.getElementById('status_filter').style.backgroundColor = '#1890ff'
    setPriceData(!priceData)
    if (priceData === true) {
      document.getElementById('price_handle').style.backgroundColor = '#1890ff'
    }
  }
  const disabledDateEnd = (current) => {
    return current && current < moment().startOf('day')
  }

  const disabledDateTimeEnd = (current) => {
    let range = (start, end) => {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    }

    if (current) {
      const currentMoment = moment()
      const selectedMoment = moment(current)

      if (selectedMoment.isSame(currentMoment, 'day')) {
        return {
          disabledHours: () => range(0, currentMoment.hour()),
          disabledMinutes: (hour) =>
            hour === currentMoment.hour() ? range(0, currentMoment.minute()) : [],
          disabledSeconds: (hour, minute) =>
            hour === currentMoment.hour() && minute === currentMoment.minute()
              ? range(0, currentMoment.second())
              : [],
        }
      }
    }
    return {}
  }
  const onChangeed = (value) => {
    setBasePrice(1)
    setStartDate(moment(value).format('YYYY-MM-DD HH:mm:ss'))
  }

  const onChangeedTwo = (value) => {
    // alert('test')
    setBasePrice(1)
    setStopDate(moment(value).format('YYYY-MM-DD HH:mm:ss'))
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

  // filter ends
  const [message_time, setmessage_time] = useState(null)

  // get data starts
  const getUsers = () => {
    setLoading(true)
    setFontWeight1(400)
    setFontWeight2(400)
    setFontWeight3(400)
    setFontred1('blue')
    setFontred2('blue')
    setFontred3('blue')
    setborderred1('1px solid blue')
    setborderred2('1px solid blue')
    setborderred3('1px solid blue')
    axios
      .get(`${troesAPi}/getnotification`)
      .then((res) => {
        const nbaData = res.data.result.Emporia
        setData(res.data.result.Emporia)
        setDataTroes(res.data.result.TROes)
        setNotificationCount(nbaData.length + res.data.result.TROes.length)
        setEditableValues(res.data.result.Emporia)
        setEditableValuesTroes(res.data.result.TROes)
        settroesLen(res.data.result.TROes.length)
        setTotal(nbaData.length)
        setTroesTotal(res.data.result.TROes.length)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])
  // get data ends

  const [expandedRows, setExpandedRows] = useState([])
  const [expandedRowsTroes, setExpandedRowsTroes] = useState([])

  const toggleRowExpansion = (index) => {
    const newExpandedRows = [...expandedRows]
    newExpandedRows[index] = !newExpandedRows[index]
    setExpandedRows(newExpandedRows)
  }

  const toggleRowExpansionTroes = (index) => {
    const newExpandedRows = [...expandedRowsTroes]
    newExpandedRows[index] = !newExpandedRows[index]
    setExpandedRowsTroes(newExpandedRows)
  }

  // paginations starts
  const handlePagination = (value) => {
    setPage(value)
  }

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

  // troes pagination
  const handleTroesPagination = (value) => {
    setTroesPage(value)
  }

  const indexOfLastPageTroes = Troespage * postPerPage
  const indexOfFirstPageTroes = indexOfLastPageTroes - postPerPage
  const currentPostsTroes = dataTroes?.slice(indexOfFirstPageTroes, indexOfLastPageTroes)
  const onShowSizeChangeTroes = (current, pageSize) => {
    setPostPerPage(pageSize)
  }
  const itemRenderTroes = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>
    }
    if (type === 'next') {
      return <a>Next</a>
    }
    return originalElement
  }
  // paginations ends

  const onOk = (value) => {
    console.log('onOk: ', value)
  }

  const checkExpand = (index) => {
    setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index))
    toggleRowExpansion(index)
    setShowMessage(true)
  }
  const checkShrink = (index) => {
    toggleRowExpansion(index)
    setShowMessage(false)
  }

  const checkExpandTroes = (index) => {
    setOpenRowIndexTroes((prevIndex) => (prevIndex === index ? null : index))
    toggleRowExpansionTroes(index)
    setShowMessageTroes(true)
  }
  const checkShrinkTroes = (index) => {
    toggleRowExpansionTroes(index)
    setShowMessageTroes(false)
  }

  const updateData = async (id, nid) => {
    setLoading(true)
    try {
      const updatedItem = editableValues.find((item) => item.id === id)
      const {
        notification_id,
        source_trigger,
        event_trigger,
        startDate,
        notification_type,
        endDate,
        message,
        location_id,
        message_time,
      } = updatedItem

      let result = await fetch(`${troesAPi}/updatenotification/${id}`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          notification_id:
            notification_id !== null && notification_id !== undefined ? notification_id : nid,
          source_trigger: source_trigger,
          event_trigger: event_trigger,
          notification_type: notification_type,
          startDate: startDate,
          endDate: endDate,
          message: message,
          location_id: location_id,
          message_time,
        }),
      })
      let res = await result.json()

      setNotificationUpdated('block')
      setLoading(false)
      getUsers()
      setTimeout(() => {
        setNotificationUpdated('none')
      }, 5000)
    } catch (err) {
      console.log(err)
    }
  }

  const updateTroesData = async (id, nid) => {
    setLoading(true)
    try {
      const updatedItem = editableValuesTroes.find((item) => item.id === id)
      const {
        notification_id,
        source_trigger,
        event_trigger,
        notification_type,
        startDate,
        endDate,
        message,
        location_id,
        message_time,
      } = updatedItem
      let result = await fetch(`${troesAPi}/updatenotification/${id}`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          notification_id:
            notification_id !== null && notification_id !== undefined ? notification_id : nid,
          source_trigger,
          event_trigger,
          notification_type,
          startDate,
          endDate,
          message,
          location_id,
          message_time,
        }),
      })
      let res = await result.json()

      setNotificationUpdated('block')
      setLoading(false)
      getUsers()
      setTimeout(() => {
        setNotificationUpdated('none')
      }, 5000)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (value) => {
    setSourceTrigger(value)
    setUpdate('1')
  }
  const handleEventChange = (value) => {
    setEventTrigger(value)
    setUpdate('1')
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
    // setclearData(true)
  }

  const getLocationData = (e) => {
    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocateData(res.data.customers)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  const handleTextChange = (event) => {
    const inputText = event.target.value
    const words = inputText.trim()
    if (words.length <= maxWords) {
      setMessage(inputText)
    }
  }
  const content = (item) => {
    return <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}></div>
  }
  async function createNewNotification() {
    setLoading(true)
    setNotificationId('')
    setSourceTrigger('')
    setEventTrigger('')
    setnotification_type('')
    setStartDate('')
    setStopDate('')
    setMessage('')
    try {
      let result = await fetch(`${troesAPi}/addnotification`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          source_trigger: 'Emporia',
          notificationId,
          eventTrigger,
          notification_type,
          startDate,
          stopDate,
          message,
        }),
      })
      let res = await result.json()
      if (res.error) {
        alert(res.message)
        setLoading(false)
      } else {
        getUsers()
        setNotificationAdded('block')
        setTimeout(() => {
          setNotificationAdded('none')
        }, 5000)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  useEffect(() => {}, [isShown])

  async function createNewTroesNotification() {
    setLoading(true)
    setNotificationId('')
    setSourceTrigger('')
    setnotification_type('')
    setEventTrigger('')
    setStartDate('')
    setStopDate('')
    setMessage('')
    try {
      let result = await fetch(`${troesAPi}/addnotification`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          notificationId,
          source_trigger: 'TROes',
          eventTrigger,
          notification_type,
          startDate,
          stopDate,
          message,
        }),
      })
      let res = await result.json()
      if (res.error) {
        alert(res.message)
        setLoading(false)
      } else {
        getUsers()
        setNotificationAdded('block')
        setTimeout(() => {
          setNotificationAdded('none')
        }, 5000)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  useEffect(() => {}, [isShown])

  const onDeleteNotification = async (id) => {
    setLoading(true)
    if (window.confirm('Do you really want to move this notification into trash!')) {
      const response = axios
        .post(`${troesAPi}/gotrashnotification/${id}`)
        .then(() => {
          setLoading(false)
          setNotificationDeleted('block')
          setData((prevData) => prevData.filter((item) => item.id !== id))
          getUsers()
          setTimeout(() => {
            setNotificationDeleted('none')
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

  const activeNotification = () => {
    setLoading(true)
    setFontWeight1(700)
    setFontred1('red')
    setborderred1('1px solid red')
    axios
      .get(`${troesAPi}/getactivenotification`)
      .then((res) => {
        setLoading(false)
        setData(res.data.result.Emporia)
        setEditableValues(res.data.result.Emporia)
        setDataTroes(res.data.result.TROes)
        setEditableValuesTroes(res.data.result.TROes)
        setTotal(res.data.result.Emporia.length)
        settroesLen(res.data.result.TROes.length)

        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight2(400)
    setFontWeight3(400)
    setFontred2('blue')
    setFontred3('blue')
    setborderred2('1px solid blue')
    setborderred3('1px solid blue')
  }

  const inActivee = () => {
    setLoading(true)
    setFontWeight2(700)
    setFontred2('red')
    setborderred2('1px solid red')
    axios
      .get(`${troesAPi}/getinactivenotification`)
      .then((res) => {
        setData(res.data.result.Emporia)
        setEditableValues(res.data.result.Emporia)
        setDataTroes(res.data.result.TROes)
        setEditableValuesTroes(res.data.result.TROes)
        setTotal(res.data.result.Emporia.length)
        settroesLen(res.data.result.TROes.length)

        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight1(400)
    setFontWeight3(400)
    setFontred1('blue')
    setFontred3('blue')
    setborderred1('1px solid blue')
    setborderred3('1px solid blue')
  }
  // searching starts
  const searchHandle = async (e) => {
    setLoading(true)
    const search_string = searchBoxRef.current.value
    axios
      .get(`${troesAPi}/searchindata?search_string=${search_string}`)
      .then((res) => {
        setData(res.data.result.Emporia)
        setEditableValues(res.data.result.Emporia)
        setDataTroes(res.data.result.TROes)
        setEditableValuesTroes(res.data.result.TROes)
        setTotal(res.data.result?.Emporia.length)
        setTotal(res.data.result.Emporia.length)
        settroesLen(res.data.result.TROes.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // searching ends
  // filter ends
  const applyFilter = async (e) => {
    setLoading(true)
    setIsShown((current) => !current)

    e.preventDefault()
    if (statusvalue !== 0 || value !== 0 || basePrice !== 0) {
      setLoading(true)
      var valueToPush = {}
      // if (statusvalue !== 0) {
      //   valueToPush['pwa_status'] = statusvalue
      // }
      if (value !== 0) {
        valueToPush['location_id'] = value
      }
      // if (planValue !== 0) {
      //   valueToPush['source_trigger'] = planValue
      // }
      if (basePrice !== null) {
        valueToPush['startDate'] = startDate
        valueToPush['endDate'] = stopDate
      }
      // document.getElementById('handle__addFilter').style.background = '#0c2556'
      setclearData(true)
      axios({
        url: `${troesAPi}/filterdata`,
        method: 'POST',
        data: valueToPush,
      })
        .then(function (response) {
          setData(response.data.result.Emporia)
          setEditableValues(response.data.result.Emporia)
          setDataTroes(response.data.result.TROes)
          setEditableValuesTroes(response.data.result.TROes)
          setTotal(response.data.result.Emporia.length)
          settroesLen(response.data.result.TROes.length)
          setLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      setLoading(false)
    }
  }
  const clearFiltererd = () => {
    // document.getElementById('handle__addFilter').style.background = '#1890ff'
    setclearData(false)
    setValue(0)
    setstatusValue(0)
    setPlanValue(0)
    setBasePrice(0)
    getUsers()
  }
  // filter ends

  const scheduledNotification = () => {
    setLoading(true)
    setFontWeight3(700)
    setFontred3('red')
    setborderred3('1px solid red')
    axios
      .get(`${troesAPi}/getshedulenotification`)
      .then((res) => {
        setData(res.data.result.Emporia)
        setEditableValues(res.data.result.Emporia)
        setDataTroes(res.data.result.TROes)
        setEditableValuesTroes(res.data.result.TROes)
        setTotal(res.data.result.Emporia.length)
        settroesLen(res.data.result.TROes.length)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setFontWeight1(400)
    setFontWeight2(400)
    setFontred1('blue')
    setFontred2('blue')
    setborderred1('1px solid blue')
    setborderred2('1px solid blue')
  }
  const getLocation = (e) => {
    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocate(res.data.customers)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocation()
  }, [])

  const getEvent = (e) => {
    axios
      .get(`${troesAPi}/eventtrigger`)
      .then((res) => {
        setEvent(res.data.result)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getEvent()
  }, [])

  const getEventTroes = (e) => {
    axios
      .get(`${troesAPi}/eventtriggertroes`)
      .then((res) => {
        setEventTroes(res.data.result)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getEventTroes()
  }, [])
  //  const value= notificationCount + troesLen
  // const handleMapping = (notid) => {
  //   const notificationid = notid
  //   const filteredIds = currentPosts.map((item) => item.notification_id)
  //   const matchedIds = filteredIds.filter((id) => id === notificationid)
  //   const filteredIdsTroes = currentPostsTroes.map((item) => item.notification_id)
  //   const matchedIdsTroes = filteredIdsTroes.filter((id) => id === notificationid)

  //   if (matchedIds.length > 0) {
  //     alert('This Notification ID is already taken.')
  //     getUsers()
  //   }

  //   if (matchedIdsTroes.length > 0) {
  //     alert('This Notification ID is already taken.')
  //     getUsers()
  //   }
  // }
  const handleMapping = (id, notid) => {
    const notificationid = notid
    const filteredIds = currentPosts.map((item) => item.notification_id)
    const matchedIds = filteredIds.filter((id) => id === notificationid)
    const filteredIdsTroes = currentPostsTroes.map((item) => item.notification_id)
    const matchedIdsTroes = filteredIdsTroes.filter((id) => id === notificationid)

    if (matchedIds.length > 0) {
      const updatedItem = editableValues.find((item) => item.id === id)
      const { notification_id } = updatedItem
      if (!alert('This Notification ID is already taken.')) {
        updatedItem.notification_id = ''
        getUsers()
      }
    }

    if (matchedIdsTroes.length > 0) {
      const updatedItem = editableValuesTroes.find((item) => item.id === id)
      const { notification_id } = updatedItem
      if (!alert('This Notification ID is already taken.')) {
        updatedItem.notification_id = ''
        getUsers()
      }
    }
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf('day')
  }
  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }
  const disabledDateTime = (current) => {
    if (current) {
      const currentMoment = moment()
      const selectedMoment = moment(current)
      if (selectedMoment.isSame(currentMoment, 'day')) {
        return {
          disabledHours: () => range(0, currentMoment.hour()),
          disabledMinutes: (hour) =>
            hour === currentMoment.hour() ? range(0, currentMoment.minute()) : [],
          disabledSeconds: (hour, minute) =>
            hour === currentMoment.hour() && minute === currentMoment.minute()
              ? range(0, currentMoment.second())
              : [],
        }
      }
    }
    return {}
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        ''
      )}
      <div style={{ position: 'relative' }}>


        <div  className='tnotification_wrap'>
          <h2 className="all_customer_of_page" >
            Notifications
          </h2>

          <p className='totalnotification' onClick={() => getUsers()}>
            ({notificationCount})  Total Notifications
          </p>
        </div>


        <div  className='filter_wrap'>
          <div className="add_nine" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="serachicon">
                <FiSearch className="fiseachicon" />
                <input
                  type="text"
                  id="searchBox"
                  placeholder="Search"
                  ref={searchBoxRef}
                  onChange={searchHandle}
                  style={{ background: '#fff' }}
                />
              </div>

              <div className="uI_hndle" style={{ gap: '10px' }}>
                {/* <button id="button" type="primary" onClick={handleClicked}>
                  <FilterFilled
                    style={{
                      color: '#fff',
                      fontSize: '20px',
                      fontWeight: 'bolder',
                      display: 'block',
                      float: 'left',
                    }}
                  />
                </button> */}

                <button
                  id="handle__addFilter"
                  className="filter_button"
                  onClick={handleClicked}

                >
                  <span className="filter_span">Filter</span>

                  <HiFilter />
                </button>

                {clearData ? (
                  <Button
                    className="for_Filter_Clear"
                    style={{
                      background: 'white',
                      color: 'red',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      marginTop: '0px',
                    }}
                    onClick={clearFiltererd}
                  >
                    <ClearOutlined />
                  </Button>
                ) : (
                  ''
                )}
              </div>


            </div>
            {/* <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >

                <Link to="/Trash">
                  <button id="button" style={{ gap: '10px', marginTop: '-13px' }}>
                    <img src={Trash} alt="frame" style={{ width: '22px', height: '15px' }} />
                    Trash
                  </button>
                </Link>

              <div style={{ marginTop: '-13px' }}>
                <Button
                  type="primary"
                  id="button"
                  className="btncsv"
                  onClick={() => createNewNotification()}
                  style={{ display: 'flex', gap: '10px' }}
                >
                  <img
                    src={AddNotification}
                    alt="frame"
                    style={{ width: '22px', height: '15px' }}
                  />
                  Add New Emporia Notification
                </Button>
              </div>
            </div> */}

            <div style={{ display: 'flex' , gap:'24px', }}>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'green',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight1, color: fontred1, borderBottom: borderred1 }}
                  onClick={activeNotification}
                >
                  Active
                </button>
              </div>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'red',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight2, color: fontred2, borderBottom: borderred2 }}
                  onClick={inActivee}
                >
                  In-active
                </button>
              </div>

              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'blue',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight3, color: fontred3, borderBottom: borderred3 }}
                  onClick={scheduledNotification}
                >
                  Scheduled
                </button>
              </div>
            </div>




          </div>
          <div

          >
            {/* <div className="test">
              <Link to="/Trash">
                <span className="trash recycleBin">
                  <span className="span"></span>
                  <i></i>
                </span>
                <p className="trashp">Go to Trash Page</p>
              </Link>
            </div> */}
            {/* <div style={{ display: 'flex' ,  }}>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'green',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight1, color: fontred1, borderBottom: borderred1 }}
                  onClick={activeNotification}
                >
                  Active
                </button>
              </div>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'red',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight2, color: fontred2, borderBottom: borderred2 }}
                  onClick={inActivee}
                >
                  In-active
                </button>
              </div>

              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'blue',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  style={{ fontWeight: fontWeight3, color: fontred3, borderBottom: borderred3 }}
                  onClick={scheduledNotification}
                >
                  Scheduled
                </button>
              </div>
            </div> */}
          </div>
        </div>
        {/* filter modal code starts */}

        <div
          className="for_respon__modal filterModal"
          style={{
            display: isShown ? 'block' : 'none',
          }}
        >
          <form onSubmit={applyFilter}>
            <div className="add__one">
              <div className="filterwrap">
                <span className="add_filter_1">Add Filter</span>
                <ArrowRightOutlined style={{ fontSize: '16px', marginTop: '5px' }} />
              </div>
              <br />
              <div className="add__three">
                <p>Find the Users you are looking for : </p>
                <div className="for__marginn">
                  <Button
                    id="campaign_activity"
                    onClick={campaignActivity}
                    className="for_campaign_act"
                  >
                    <img src={FrameTwo} alt="frame" className="for_img_two" />
                    Location
                  </Button>
                  {/* <Button
                    id="status_filter"
                    onClick={statusFilter}
                    className="for_campaign_act"
                    style={{ alignItems: 'center', display: 'flex' }}
                  >
                    <img
                      src={user}
                      alt="frame"
                      className="for_img_two"
                      style={{ width: '26px', height: '23px' }}
                    />
                    User
                  </Button> */}

                  {/* <Button id="location" onClick={location} className="for_campaign_act">
                    <img
                      src={Source}
                      alt="frame"
                      className="for__plan_hand"
                      style={{ width: '28px', height: '23px' }}
                    />
                    Source Trigger
                  </Button> */}
                  <Button
                    id="price_handle"
                    onClick={priceHandle}
                    className="for__price_hand"
                    style={{ alignItems: 'center', display: 'flex' }}
                  >
                    <img
                      src={Timing}
                      alt="frame"
                      className="for_img_two"
                      style={{ width: '26px', height: '23px' }}
                    />
                    Timing
                  </Button>
                </div>
              </div>
              <hr style={{ width: '100%' }} />
              {statusfilter || installation || priceData ? (
                ''
              ) : (
                <div className="add__four">
                  <p>
                    <MinusOutlined className="minus_outlined_one" />
                    No Filters applied
                  </p>
                  <p>Add one of the above filters to narrow down your Notification list</p>
                </div>
              )}
              {installation ? (
                <div className="add_five">
                  <div className="add__eleven">
                    <span className="add__forteen">Location</span>
                    <Radio.Group
                      onChange={onChangePlan}
                      className="base_PP2"
                      style={{ paddingLeft: '28px' }}
                    >
                      {locateData.map((item, index) => {
                        return (
                          <Radio key={index} value={item.id} id="amul">
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
                  <hr style={{ width: '100%', margin: 'auto' }} />
                </div>
              ) : (
                ''
              )}

              {statusfilter ? (
                <div>
                  <hr style={{ width: '100%', margin: 'auto' }} />
                </div>
              ) : (
                ''
              )}

              {planData ? (
                <div
                  className="add__eight"
                  style={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div className="add_twelve">
                    <span className="add__sixx">Trigger</span>
                    <div className="add_twenty">
                      <Radio.Group
                        onChange={onChangeBase}
                        value={planValue}
                        className="base_yy2"
                        style={{ paddingLeft: '40px' }}
                      >
                        <Radio value={'Emporia'} id="amul">
                          <div
                            style={{
                              display: 'flex',
                            }}
                          >
                            <p id="">Emporia</p>
                          </div>
                        </Radio>
                        <Radio value={'TROes'} id="amul">
                          <div
                            style={{
                              display: 'flex',
                            }}
                          >
                            <p id="">TROes</p>
                          </div>
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {planData ? (
                <div>
                  <hr style={{ width: '100%', margin: 'auto' }} />
                </div>
              ) : (
                ''
              )}
              {priceData ? (
                <div className="price__div" style={{ gap: '20px' }}>
                  <p className="main_div_of_pric">Start Date: </p>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                      onChange={onChangeed}
                      onOk={onOk}
                      disabledDate={disabledDateEnd}
                      disabledTime={disabledDateTimeEnd}
                    />
                  </Space>

                  <p className="main_div_of_pric">End Date: </p>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                      onChange={onChangeedTwo}
                      onOk={onOk}
                      disabledDate={disabledDateEnd}
                      disabledTime={disabledDateTimeEnd}
                    />
                  </Space>
                </div>
              ) : (
                ''
              )}
              <div className="mainDivOf_apply">
                <button className="sub_divOf_Appli" id="apply__filter">
                  <FilterFilled className="filter_outlined" />
                  Apply Filter
                </button>
                <Button onClick={clearFilter} className="claer_filter">
                  <ClearOutlined className="delete_outlinedd" />
                  Clear Filter
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* filter modal code ends */}

        {/* hero content */}

        <div className='emporia_wrap'>
        <p className="emporia_troes"> Emporia Notifications</p>

            <div>
                <button

                  id="button"
                  className="btncsv"
                  onClick={() => createNewNotification()}
                  style={{ display: 'flex', gap: '10px' }}
                >
                  <img
                    src={AddNotification}
                    alt="frame"
                    style={{ width: '22px', height: '15px' }}
                  />
                  Add  Emporia Notification
                </button>
              </div>

        </div>


        <div
          className="table_wrap"

        >

          <table className="table table-hover NotificationTable">
            <thead className="">
              <tr>
                <th className="t_Name px-2 global_th">S.No.</th>
                <th className="t_Name px-2 global_th"></th>
                <th className="t_Name px-2 global_th"></th>
                <th className="t_Name px-2 global_th">Notification Id</th>
                <th className="t_Name px-2 global_th">Notification Type</th>
                <th className="t_Name px-2 global_th">Source Trigger</th>
                <th className="t_Name px-2 global_th">Event Trigger</th>
                <th className="t_Name px-2 global_th">Installation</th>
                <th className="t_Name px-2 global_th">Start</th>
                <th className="t_Name px-2 global_th">Stop</th>
                <th className="t_Name px-2 global_th">Time</th>
                <th className="t_Name px-2 global_th">Action</th>
              </tr>
            </thead>
            <tbody style={{ background: '#fff' }}>
              {currentPosts &&
                currentPosts.map((item, index) => {
                  {
                    /* if(item.source_trigger==='Emporia'){ */
                  }
                  const displayedIndex = indexOfFirstPage + index + 1
                  let color
                  if (item.status === 1) {
                    color = 'green'
                  } else if (item.status === 0) {
                    color = 'red'
                  } else if (item.status === 2) {
                    color = 'blue'
                  } else {
                    color = 'yellow'
                  }
                  let nid

                  return (
                    <React.Fragment key={index}>
                      <tr className="trSelect" style={{ position: 'relative' }}>
                        <td className="px-2">{displayedIndex}</td>
                        <td className="px-2">
                          <input
                            type="checkbox"
                            style={{
                              appearance: 'none',
                              backgroundColor: `${color}`,
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              marginTop: '10px',
                            }}
                          />
                        </td>
                        <td className="px-2">
                          {expandedRows[index] ? (
                            <MinusOutlined
                              onClick={() => checkShrink(index)}
                              style={{ color: 'blue' }}
                            />
                          ) : (
                            <PlusOutlined
                              onClick={() => checkExpand(index)}
                              style={{ color: 'blue' }}
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {item.notification_id === null ? (
                            <input
                              placeholder="Notification Id"
                              value={editableValues[index].notification_id}
                              onFocus={() => setIsInputActive(true)}
                              onBlur={(e) => {
                                handleMapping(item.id, e.target.value)
                                setIsInputActive(false)
                              }}
                              onChange={(e) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].update = true
                                setNotificationId(e.target.value)
                                setInputid('0')
                              }}
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          ) : (
                            <input
                              placeholder="Notification Id"
                              value={item.notification_id}
                              readOnly
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {item.notification_type === 0 ? (
                            <input
                              placeholder="Notification Type"
                              value="Conditional"
                              readOnly
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Select
                              style={{ width: 140 }}
                              value={
                                (editableValues[index].notification_type === 0
                                  ? 'Conditional'
                                  : '') ||
                                (editableValues[index].notification_type === 1
                                  ? 'Un-Conditional'
                                  : '') ||
                                editableValues[index].notification_type
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].notification_type = value
                                if (updatedValues[index].notification_type === 0) {
                                  updatedValues[index].startDate = '1895-01-01 00:00:00'
                                  updatedValues[index].endDate = '1895-01-01 00:00:00'
                                  setStartDate('1895-01-01 00:00:00')
                                  setStopDate('1895-01-01 00:00:00')
                                }

                                setEditableValues(updatedValues)
                                setnotification_type(value)

                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={[
                                {
                                  value: 0,
                                  label: 'Conditional',
                                },
                                {
                                  value: 1,
                                  label: 'Un-Conditional',
                                },
                              ]}
                            />
                          )}
                        </td>
                        <td className="px-2">
                          <Select
                            style={{ width: 120 }}
                            value={editableValues[index].source_trigger}
                            onChange={(value) => {
                              setInputid('1')
                              const updatedValues = [...editableValues]
                              updatedValues[index].source_trigger = value
                              setEditableValues(updatedValues)
                              setSourceTrigger(value)
                              updatedValues[index].update = true
                            }}
                            options={[
                              {
                                value: 'Emporia',
                                label: 'Emporia',
                              },
                            ]}
                          />
                        </td>
                        <td>
                          {editableValues[index].notification_type === 0 ? (
                            <Select
                              style={{ width: 180 }}
                              value={
                                editableValues[index].eventtriggername === null
                                  ? editableValues[index].event_trigger
                                  : editableValues[index].eventtriggername
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index] = {
                                  ...editableValues[index],
                                  event_trigger: value,
                                  update: true,
                                }
                                setEditableValues(updatedValues)
                                setEventTrigger(value)
                                setInputid('1')
                              }}
                              options={event.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                            />
                          ) : (
                            <input
                              placeholder="Event trigger"
                              value={
                                editableValues[index].notification_type === 0
                                  ? editableValues[index].eventtriggername
                                  : editableValues[index].event_trigger
                              }
                              onChange={(e) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].event_trigger = e.target.value
                                setEditableValues(updatedValues)
                                setEventTrigger(e.target.value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {editableValues[index].notification_type === 0 ? (
                            <Select
                              style={{ width: 170 }}
                              value={
                                editableValues[index].location_id === 0
                                  ? 'All Locations'
                                  : editableValues[index].location_id
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].location_id = value
                                setEditableValues(updatedValues)
                                setLocationId(value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              options={[
                                {
                                  value: 0,
                                  label: 'All Locations',
                                },
                              ]}
                            />
                          ) : (
                            <Select
                              style={{ width: 170 }}
                              value={
                                editableValues[index].location_id === 0
                                  ? 'All Locations'
                                  : editableValues[index].location_id
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].location_id = value
                                updatedValues[index].update = true
                                setEditableValues(updatedValues)
                                setLocationId(value)
                                setInputid('1')
                              }}
                              options={[
                                {
                                  value: 0,
                                  label: 'All Locations',
                                },
                                ...locate.map((item) => ({
                                  value: item.id,
                                  label: item.location,
                                })),
                              ]}
                            />
                          )}
                        </td>

                        <td className="px-2">
                          {editableValues[index].notification_type === 0 ? (
                            <input
                              placeholder="24/7"
                              value={
                                editableValues[index].startDate == '1895-01-01 00:00:00'
                                  ? '24/7'
                                  : ''
                              }
                              readOnly
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Space direction="vertical" size={12} className="removeIcon">
                              <DatePicker
                                showTime
                                format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                                onChange={(value) => {
                                  if (value) {
                                    setStartDate(value.format('YYYY-MM-DD hh:mm:ss'))
                                    const updatedValues = [...editableValues]
                                    updatedValues[index].startDate =
                                      value.format('YYYY-MM-DD hh:mm:ss')
                                    setEditableValues(updatedValues)
                                    updatedValues[index].update = true
                                    setInputid('1')
                                  } else {
                                    setStartDate(null)
                                  }
                                }}
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                                value={
                                  editableValues[index].startDate
                                    ? moment(editableValues[index].startDate)
                                    : ''
                                }
                              />
                            </Space>
                          )}
                        </td>
                        <td className="px-2">
                          {editableValues[index].notification_type === 0 ? (
                            <input
                              placeholder="24/7"
                              value={
                                editableValues[index].endDate == '1895-01-01 00:00:00' ? '24/7' : ''
                              }
                              readOnly
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Space direction="vertical" size={12} className="removeIcon">
                              <DatePicker
                                showTime
                                format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                                value={
                                  editableValues[index].endDate
                                    ? moment(editableValues[index].endDate)
                                    : ''
                                }
                                onChange={(value) => {
                                  if (value) {
                                    setStopDate(value.format('YYYY-MM-DD hh:mm:s'))
                                    const updatedValues = [...editableValues]
                                    updatedValues[index].endDate =
                                      value.format('YYYY-MM-DD hh:mm:ss')
                                    setEditableValues(updatedValues)
                                    updatedValues[index].update = true
                                    setInputid('1')
                                  } else {
                                    setStopDate(null)
                                  }
                                }}
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                              />
                            </Space>
                          )}
                        </td>
                        {/* <td className="px-2">
                          <input
                            type="time"
                            value={editableValues[index].message_time}
                            onChange={(e) => {
                              const updatedValues = [...editableValues]
                              updatedValues[index].message_time = e.target.value
                              updatedValues[index].update = true
                              setEditableValues(updatedValues)
                              setmessage_time(e.target.value)
                              setInputid('1')
                            }}
                            style={{ border: 'none', padding: '4px' }}
                            className="inputRender"
                          />
                        </td> */}
                        <td className="px-2 ">
                          {editableValues[index].notification_type === 0 ? (
                            <input
                              type="time"
                              value={editableValues[index].message_time}
                              readOnly
                              style={{ border: 'none' }}
                              className="inputRender"
                            />
                          ) : (
                            <input
                              type="time"
                              value={editableValues[index].message_time}
                              onChange={(e) => {
                                const updatedValues = [...editableValues]
                                updatedValues[index].message_time = e.target.value
                                updatedValues[index].update = true
                                setEditableValues(updatedValues)
                                setmessage_time(e.target.value)
                                setInputid('1')
                              }}
                              style={{ border: 'none' }}
                              className="inputRender"
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {editableValues[index].update ? (
                            <Tooltip title="Update">
                              <button
                                className="actionbtn updateBtn"
                                onClick={(e) => {
                                  if (inputid === '0') {
                                    const updatedValues = [...editableValues]
                                    updatedValues[index].notification_id = notificationId
                                    setEditableValues(updatedValues)
                                  }
                                  updateData(item.id, notificationId)
                                }}
                              >
                                <SaveOutlined style={{ color: 'blue' }} />
                              </button>
                            </Tooltip>
                          ) : (
                            <button className="actionbtn updateBtn" style={{ opacity: '0' }}>
                              <SaveOutlined style={{ color: 'blue' }} />
                            </button>
                          )}
                          {editableValues[index].notification_type === 0 ? (
                            <Tooltip title="">
                              <button
                                className="actionbtn"
                                style={{ paddingLeft: '10px', color: 'red', cursor: 'not-allowed' }}
                              >
                                <DeleteOutlined />
                              </button>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Delete">
                              <button
                                className="actionbtn"
                                style={{ paddingLeft: '10px', color: 'red' }}
                                onClick={() => onDeleteNotification(item.id)}
                              >
                                <DeleteOutlined />
                              </button>
                            </Tooltip>
                          )}
                        </td>
                        {isInputActive && editableValues[index].update ? (
                          <div
                            style={{
                              position: 'absolute',
                              background: 'white',
                              left: '30px',
                              top: '-65px',
                              border: '1px solid black',
                            }}
                          >
                            <span>
                              <b>Note:</b> Notification ID should be in this format
                            </span>
                            <br />
                            <span>Ex: Em-001...Em-010... </span>
                          </div>
                        ) : (
                          ''
                        )}
                      </tr>
                      {openRowIndex === index && showMessage ? (
                        <tr>
                          <td colSpan={4}></td>
                          <td colSpan={1}>Message:</td>
                          <td colSpan={4}>
                            <div>
                              <TextArea
                                placeholder="Notification Message..."
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                                value={editableValues[index].message}
                                onChange={(e) => {
                                  const updatedValues = [...editableValues]
                                  updatedValues[index].message = e.target.value
                                  setEditableValues(updatedValues)
                                  setMessage(e.target.value)
                                  updatedValues[index].update = true
                                  setInputid('1')
                                  handleTextChange()
                                }}
                              />
                              <p>
                                Words remaining: {maxWords - message.trim().length} / {maxWords}
                              </p>
                            </div>
                          </td>
                          <td colSpan={3}></td>
                        </tr>
                      ) : (
                        ''
                      )}
                    </React.Fragment>
                  )
                })}
            </tbody>
          </table>
        </div>


        <div
          className="user__detail__popup__Customer"
          style={{
            display: NotificationUpdated,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="admin_registerd__pop">Notification Updated Successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: NotificationDeleted,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="admin_registerd__pop">Notification moved to Trash.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: NotificationAdded,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="admin_registerd__pop">Notification added Successfully.</p>
          </div>
        </div>
        {/* <Pagination
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
            display: 'flex',
            justifyContent: 'flex-start',
            paddingTop: '10px',
          }}
        /> */}

        {/* troes table */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '25px',
            marginRight: '10px',
          }}
        >
          <p className="emporia_troes">TROes Notification</p>

          <div style={{ marginTop: '-10px' }}>
            <Button
              type="primary"
              id="button"
              className="btncsv"
              onClick={() => createNewTroesNotification()}
              style={{ display: 'flex', gap: '10px' }}
            >
              <img src={AddNotification} alt="frame" style={{ width: '22px', height: '15px' }} />
              Add New TROes Notification
            </Button>
          </div>
        </div>
        <div
          className='table_wrap_second'
        >
          <table className="table table-hover NotificationTable">
            <thead className="">
              <tr>
                <th className="t_Name px-2 global_th">S.No.</th>
                <th className="t_Name px-2 global_th"></th>
                <th className="t_Name px-2 global_th"></th>
                <th className="t_Name px-2 global_th">Notification Id</th>
                <th className="t_Name px-2 global_th">Notification Type</th>
                <th className="t_Name px-2 global_th">Source Trigger</th>
                <th className="t_Name px-2 global_th">Event Trigger</th>
                <th className="t_Name px-2 global_th">Installation</th>
                <th className="t_Name px-2 global_th">Start</th>
                <th className="t_Name px-2 global_th">Stop</th>
                <th className="t_Name px-2 global_th">Time</th>
                <th className="t_Name px-2 global_th">Action</th>
              </tr>
            </thead>
            <tbody style={{ background: '#fff' }}>
              {currentPostsTroes &&
                currentPostsTroes.map((item, index) => {
                  const displayedIndex = indexOfFirstPage + index + 1
                  let color
                  if (item.status === 1) {
                    color = 'green'
                  } else if (item.status === 0) {
                    color = 'red'
                  } else if (item.status === 2) {
                    color = 'blue'
                  } else {
                    color = 'yellow'
                  }
                  return (
                    <React.Fragment key={index}>
                      <tr className="trSelect" style={{ position: 'relative' }}>
                        <td className="px-2">{displayedIndex}</td>
                        <td className="px-2">
                          <input
                            type="checkbox"
                            style={{
                              appearance: 'none',
                              backgroundColor: `${color}`,
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              marginTop: '10px',
                            }}
                          />
                        </td>
                        <td className="px-2">
                          {expandedRowsTroes[index] ? (
                            <MinusOutlined
                              onClick={() => checkShrinkTroes(index)}
                              style={{ color: 'blue' }}
                            />
                          ) : (
                            <PlusOutlined
                              onClick={() => checkExpandTroes(index)}
                              style={{ color: 'blue' }}
                            />
                          )}
                        </td>
                        <td>
                          {item.notification_id === null ? (
                            <input
                              placeholder="Notification Id"
                              value={editableValuesTroes[index].notification_id}
                              onFocus={() => setIsInputActive(true)} // Set the input as active when focused
                              onBlur={(e) => {
                                handleMapping(item.id, e.target.value)
                                setIsInputActive(false)
                              }}
                              onChange={(e) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].update = true
                                setNotificationId(e.target.value)
                                setInputid('0')
                              }}
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          ) : (
                            <input
                              placeholder="Notification Id"
                              value={item.notification_id}
                              readOnly
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {item.notification_type === 0 ? (
                            <input
                              placeholder="Notification Type"
                              value="Conditional"
                              readOnly
                              style={{ border: 'none', padding: '4px', width: '100px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Select
                              style={{ width: 150 }}
                              value={
                                (editableValuesTroes[index].notification_type === 0
                                  ? 'Conditional'
                                  : '') ||
                                (editableValuesTroes[index].notification_type === 1
                                  ? 'Un-Conditional'
                                  : '') ||
                                (editableValuesTroes[index].notification_type === 2
                                  ? 'Un-Cond. daily'
                                  : '') ||
                                editableValuesTroes[index].notification_type
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].notification_type = value
                                if (
                                  updatedValues[index].notification_type === 0 ||
                                  updatedValues[index].notification_type === 2
                                ) {
                                  updatedValues[index].startDate = '1895-01-01 00:00:00'
                                  updatedValues[index].endDate = '1895-01-01 00:00:00'
                                  setStartDate('1895-01-01 00:00:00')
                                  setStopDate('1895-01-01 00:00:00')
                                }
                                setEditableValuesTroes(updatedValues)
                                setnotification_type(value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              options={[
                                {
                                  value: 0,
                                  label: 'Conditional',
                                },
                                {
                                  value: 1,
                                  label: 'Un-Conditional',
                                },
                                {
                                  value: 2,
                                  label: 'Un-Conditional Daily',
                                },
                              ]}
                            />
                          )}
                        </td>
                        <td className="px-2">
                          <Select
                            style={{ width: 120 }}
                            value={editableValuesTroes[index].source_trigger}
                            onChange={(value) => {
                              const updatedValues = [...editableValues]
                              updatedValues[index].source_trigger = value
                              setEditableValuesTroes(updatedValues)
                              setSourceTrigger(value)
                              updatedValues[index].update = true
                              setInputid('1')
                            }}
                            options={[
                              {
                                value: 'TROes',
                                label: 'TROes',
                              },
                            ]}
                          />
                        </td>
                        <td>
                          {editableValuesTroes[index].notification_type === 0 ? (
                            <Select
                              style={{ width: 170 }}
                              value={
                                editableValuesTroes[index].eventtriggername === null
                                  ? editableValuesTroes[index].event_trigger
                                  : editableValuesTroes[index].eventtriggername
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].event_trigger = value
                                setEditableValuesTroes(updatedValues)
                                setEventTrigger(value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              options={eventTroes.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                            />
                          ) : (
                            <input
                              placeholder="Event trigger"
                              value={
                                editableValuesTroes[index].notification_type === 0
                                  ? editableValuesTroes[index].eventtriggername
                                  : editableValuesTroes[index].event_trigger
                              }
                              onChange={(e) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].event_trigger = e.target.value
                                setEditableValuesTroes(updatedValues)
                                setEventTrigger(e.target.value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          )}
                        </td>
                        <td className="px-2">
                          {editableValuesTroes[index].notification_type === 0 ? (
                            <Select
                              style={{ width: 170 }}
                              value={
                                editableValuesTroes[index].location_id === 0
                                  ? 'All Locations'
                                  : editableValuesTroes[index].location_id
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].location_id = value
                                setEditableValuesTroes(updatedValues)
                                setLocationId(value)
                                updatedValues[index].update = true
                                setInputid('1')
                              }}
                              options={[
                                {
                                  value: 0,
                                  label: 'All Locations',
                                },
                              ]}
                            />
                          ) : (
                            <Select
                              style={{ width: 170 }}
                              value={
                                editableValuesTroes[index].location_id === 0
                                  ? 'All Locations'
                                  : editableValuesTroes[index].location_id
                              }
                              onChange={(value) => {
                                const updatedValues = [...editableValuesTroes]
                                updatedValues[index].location_id = value
                                updatedValues[index].update = true
                                setEditableValuesTroes(updatedValues)
                                setLocationId(value)
                                setInputid('1')
                              }}
                              options={[
                                {
                                  value: 0,
                                  label: 'All Locations',
                                },
                                ...locate.map((item) => ({
                                  value: item.id,
                                  label: item.location,
                                })),
                              ]}
                            />
                          )}
                        </td>

                        <td className="px-2">
                          {item.notification_type === 0 || item.notification_type === 2 ? (
                            <input
                              placeholder="24/7"
                              value={
                                editableValuesTroes[index].startDate == '1895-01-01 00:00:00'
                                  ? '24/7'
                                  : ''
                              }
                              readOnly
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Space direction="vertical" size={12} className="removeIcon">
                              <DatePicker
                                showTime
                                format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                                onChange={(value) => {
                                  if (value) {
                                    setStartDate(value.format('YYYY-MM-DD hh:mm:ss'))
                                    const updatedValues = [...editableValuesTroes]
                                    updatedValues[index].startDate =
                                      value.format('YYYY-MM-DD hh:mm:ss')
                                    setEditableValuesTroes(updatedValues)
                                    updatedValues[index].update = true
                                    setInputid('1')
                                  } else {
                                    setStartDate(null)
                                  }
                                }}
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                                value={
                                  editableValuesTroes[index].startDate
                                    ? moment(editableValuesTroes[index].startDate)
                                    : ''
                                }
                              />
                            </Space>
                          )}
                        </td>
                        <td className="px-2">
                          {editableValuesTroes[index].notification_type === 0 ||
                          editableValuesTroes[index].notification_type === 2 ? (
                            <input
                              placeholder="24/7"
                              value={
                                editableValuesTroes[index].endDate == '1895-01-01 00:00:00'
                                  ? '24/7'
                                  : ''
                              }
                              readOnly
                              style={{ border: 'none', padding: '4px' }}
                              className="inputRender"
                            />
                          ) : (
                            <Space direction="vertical" size={12} className="removeIcon">
                              <DatePicker
                                showTime
                                format="YYYY-MM-DD hh:mm:ss" // Use 'A' for AM/PM indicator
                                value={
                                  editableValuesTroes[index].endDate
                                    ? moment(editableValuesTroes[index].endDate)
                                    : ''
                                }
                                onChange={(value) => {
                                  if (value) {
                                    setStopDate(value.format('YYYY-MM-DD hh:mm:s'))
                                    const updatedValues = [...editableValuesTroes]
                                    updatedValues[index].endDate =
                                      value.format('YYYY-MM-DD hh:mm:ss')
                                    setEditableValuesTroes(updatedValues)
                                    updatedValues[index].update = true
                                    setInputid('1')
                                  } else {
                                    setStopDate(null)
                                  }
                                }}
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                              />
                            </Space>
                          )}
                        </td>
                        <td className="px-2">
                          {/* <input
                            type="time"
                            value={editableValuesTroes[index].message_time}
                            onChange={(e) => {
                              const updatedValues = [...editableValuesTroes]
                              updatedValues[index].message_time = e.target.value
                              updatedValues[index].update = true
                              setEditableValuesTroes(updatedValues)
                              setmessage_time(e.target.value)
                              setInputid('1')
                            }}
                            style={{ border: 'none', padding: '4px' }}
                            className="inputRender"
                          /> */}
                          <td className="px-2">
                            {editableValuesTroes[index].notification_type === 0 ||
                            editableValuesTroes[index].notification_type === 2 ? (
                              <input
                                type="time"
                                value={editableValuesTroes[index].message_time}
                                readOnly
                                style={{ border: 'none' }}
                                className="inputRender"
                              />
                            ) : (
                              <input
                                type="time"
                                value={editableValuesTroes[index].message_time}
                                onChange={(e) => {
                                  const updatedValues = [...editableValuesTroes]
                                  updatedValues[index].message_time = e.target.value
                                  updatedValues[index].update = true
                                  setEditableValuesTroes(updatedValues)
                                  setmessage_time(e.target.value)
                                  setInputid('1')
                                }}
                                style={{ border: 'none' }}
                                className="inputRender"
                              />
                            )}
                          </td>
                        </td>
                        <td className="px-2">
                          {editableValuesTroes[index].update ? (
                            <Tooltip title="Update">
                              <button
                                className="actionbtn updateBtn"
                                onClick={(e) => {
                                  if (inputid === '0') {
                                    const updatedValues = [...editableValuesTroes]
                                    updatedValues[index].notification_id = notificationId
                                    setEditableValues(updatedValues)
                                  }
                                  updateTroesData(item.id, notificationId)
                                }}
                              >
                                <SaveOutlined style={{ color: 'blue' }} />
                              </button>
                            </Tooltip>
                          ) : (
                            <button className="actionbtn updateBtn" style={{ opacity: '0' }}>
                              <SaveOutlined style={{ color: 'blue' }} />
                            </button>
                          )}
                          {editableValuesTroes[index].notification_type === 0 ? (
                            <Tooltip title="">
                              <button
                                className="actionbtn"
                                style={{ paddingLeft: '10px', color: 'red', cursor: 'not-allowed' }}
                              >
                                <DeleteOutlined />
                              </button>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Delete">
                              <button
                                className="actionbtn"
                                style={{ paddingLeft: '10px', color: 'red' }}
                                onClick={() => onDeleteNotification(item.id)}
                              >
                                <DeleteOutlined />
                              </button>
                            </Tooltip>
                          )}
                        </td>
                        {isInputActive && editableValuesTroes[index].update ? (
                          <div
                            style={{
                              position: 'absolute',
                              background: 'white',
                              left: '30px',
                              top: '-65px',
                              border: '1px solid black',
                            }}
                          >
                            <span>
                              <b>Note:</b> Notification ID should be in this format
                            </span>
                            <br />
                            <span>Ex: TR-001...TR-010... </span>
                          </div>
                        ) : (
                          ''
                        )}
                      </tr>
                      {openRowIndexTroes === index && showMessageTroes ? (
                        <tr>
                          <td colSpan={4}></td>
                          <td colSpan={1}>Message:</td>
                          <td colSpan={4}>
                            <div>
                              <TextArea
                                placeholder="Notification Message..."
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                                value={editableValuesTroes[index].message}
                                onChange={(e) => {
                                  const updatedValues = [...editableValuesTroes]
                                  updatedValues[index].message = e.target.value
                                  setEditableValuesTroes(updatedValues)
                                  setMessage(e.target.value)
                                  updatedValues[index].update = true
                                  setInputid('1')
                                  handleTextChange()
                                }}
                              />
                              <p>
                                Words remaining: {maxWords - message.trim().length} / {maxWords}
                              </p>
                            </div>
                          </td>
                          <td colSpan={3}></td>
                        </tr>
                      ) : (
                        ''
                      )}
                    </React.Fragment>
                  )
                })}
            </tbody>
          </table>
        </div>
        {/* <Pagination
          onChange={handleTroesPagination}
          pageSize={postPerPage}
          total={troesTotal}
          current={Troespage}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRenderTroes}
          style={{
            paddingLeft: '12px',
            display: 'flex',
            justifyContent: 'flex-start',
            paddingTop: '10px',
          }}
        /> */}
      </div>
    </>
  )
}

export default Notification
