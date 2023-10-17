import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Spin,
  message,
  Space,
  Select,
  Switch,
  Modal,
  Pagination,
  Radio,
  Popconfirm,
  Checkbox,
  Tooltip,
  notification,
  Empty,
} from 'antd'
import {
  UserAddOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  MinusCircleOutlined,
  PoweroffOutlined,
  CopyOutlined,
  CopyFilled,
} from '@ant-design/icons'
import { troesAPi } from '../../api'
import axios from 'axios'
import refresh from '../../assets/images/refresh.svg'
import check_sign from '../../assets/images/check_sign.svg'
import './AssetTwo.css'
import '../universal.css'
import import_one from '../../assets/images/import_one.svg'
import FrameTwo from '../../assets/images/FrameTwo.svg'
import WrongDetails from '../../assets/images/wrongDetails.svg'
import wrong_detailsicon from '../../assets/images/wrong_detailsicon.svg'
import MatchCustomer from '../../assets/images/match_customer.svg'
import Emporia_data from '../../assets/images/Emporia_data.svg'
import { WrongLocation } from '@mui/icons-material'
import partiallymatched_1 from '../../assets/images/partiallymatched_1.svg'
import { CListGroup } from '@coreui/react'
import useCopy from 'use-copy'
import { FaUserGroup } from 'react-icons/fa6';
import { CSVLink } from 'react-csv'
import Excelicon from '../../assets/images/excelicon.svg'
import { BsCloudDownload } from 'react-icons/bs'
const AssetTwo = () => {

  //condition for assigned start
  const [conditionAssigned, setConditionAssigned] = useState(false)
  //condition for assigned end
  //all map method data state start
  const [allllAssetDataInTable, setAllAssetDataInTable] = useState([])
  const [deviceAddressOption, setDeviceAddressOption] = useState([])
  const [indexForUnit, setIndexForUnit] = useState('')

  //all map method data state end

  //when we click on device address all data should populated start

  const [selectedDeviceAddress, setselectedDeviceAddress] = useState('')
  const [autoFillState, setAutoFillState] = useState('')
  const [autoFillZip, setAutoFillZip] = useState('')
  const [autoFillInstallation, setAutoFillInstallation] = useState('')
  const [autoFillPartner, setAutoFillPartner] = useState('')
  const [autoFillCustomerName, setAutoFillCustomerName] = useState('')
  const [autoFillCustomerPhone, setAutoFillCustomerPhone] = useState('')
  const [autoFillCustomerEmail, setAutoFillCustomerEmail] = useState('')
  const [autoFillCustomerUnitState, setAutoFillCustomerUnitState] = useState('')
  const [autoFillIndex, setAutoFillIndex] = useState('')
  const [autoFillIndexForCustomer, setAutoFillIndexForCustomer] = useState('')

  const [cust_idd, setCustId] = useState('')
  const [flag_status, setFlagStatus] = useState('')
  //when we click on device address all data should populated end

  const [partner, setPartner] = useState('')
  const [addingClass, setAddingClass] = useState('')
  const [forTrue, setForTrue] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switcherOn, setSwitcherOn] = useState('')
  const [toggle, setToggle] = useState(false)
  const [forSelectAllCheckBox, setforSelectAllCheckBox] = useState([])
  const [cursor, setCursor] = useState('pointer')

  // when We have to assign on the basis of map method end

  // when partial match happens start

  const [loopingCustomerName, setLoopingCustomerName] = useState([])

  // when partial match happens end

  // state for pagination start

  const [page, setPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)
  const [total, setTotal] = useState()
  const [forIndexing, setForIndexing] = useState('')
  const [forLoader, setForLoader] = useState(false)

  // state for pagination end

  // Basic Modal start

  const [userDelete, setUserDelete] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [status, setStatus] = useState('')
  const [id, setId] = useState('')
  const [isAssetsDelete, setisAssetsDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  const [uploaded_file, setUploaded_file] = useState(null)
  const [modalTitle, setModalTitle] = useState(null)
  const [bgColor, setBgColor] = useState(false)
  const [counter, setCounter] = useState(1)
  // Basic Modal end

  //  assigned button && unAssigned button start

  const [changBackgroundAll, setChangeBackgroundAll] = useState(true)
  const [changBackgroundAssigned, setChangeBackgroundAssigned] = useState(false)
  const [changBackgroundUnAssigned, setChangeBackgroundUnAssigned] = useState(false)
  const [device_address_id, setDeviceAddressId] = useState('')
  // assigned button && unAssigned button end
  const [wronDetailsData, setWrongDetailsData] = useState([])
  const [indexingForToggle, setIndexingForToggle] = useState('')
  const [refreshColor, setRefreshColor] = useState(false)
  const [peopleInfo, setPeopleInfo] = useState([])
  const [refreshPlay, setRefreshPlay] = useState(false)
  const [csvTextColor, setcsvTextColor] = useState('transparent')
  const [csvwidth, setcsvwidth] = useState('136px')
  const [turnedOn, setTurnedON] = useState(false)
  const [turnedOff, setTurnedOFF] = useState(false)
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false)
  const [data, setData] = useState([])
  const [dataColorText, setDataColorText] = useState(true)
  const [Wrongdata, setWrongData] = useState([])
  const [requiredAssigned, setRequiredAssigned] = useState('all')
  const [matchDisable, setMatchDisable] = useState(true)

  //checkAll start

  const [csvWrongData, setCsvWrongData] = useState([])

  const [selectAll, setSelectAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState([])
  const [selectedData, setSelectedData] = useState()
  const [colorForCopy, setColorForCopy] = useState(false)
  const [colorIndex, setColorIndex] = useState('')
  const [copied, copy, setCopied] = useCopy(selectedData)

  const [uniqueId, setUniqueId] = useState()
  const [uniqueshow, setUniqueShow] = useState(false)
  const [uniquecopied, uniquecopy, setUniqueCopied] = useCopy(uniqueId)
  const [multipledata, setMultipleData] = useState([])
  const [show, setShow] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const copyUniqueText = () => {
    uniquecopy()
    setTimeout(() => {
      setUniqueCopied(false)
    }, 1000)
    setTimeout(() => {
      setUniqueShow(false)
    }, 1000)
  }

  const copyText = () => {
    copy()
    setTimeout(() => {
      setCopied(false)
    }, 1000)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  const handleCheckboxChange = (event, itemId) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setCheckedItems([...checkedItems, itemId])
    } else {
      const updatedItems = checkedItems.filter((item) => item !== itemId)
      setCheckedItems(updatedItems)
    }
  }

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked
    setSelectAll(isChecked)

    if (isChecked) {
      const allItemIds = forSelectAllCheckBox?.map((item) => item.device_id)
      setCheckedItems(allItemIds)
    } else {
      setCheckedItems([])
    }
  }
  //checkAll end
  const getAllAssetsData = () => {
    axios
      .get(`${troesAPi}/devicedetails`)
      .then((res) => {
        let allData = res?.data
        setAllAssetDataInTable(res.data)
        setforSelectAllCheckBox(res.data)
        setTotal(allData?.length)
        setForIndexing(allData?.length)
        setForTrue(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const playData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('device_ids[]', checkedItems)
      let result = await fetch(`${troesAPi}/device_charger_multipleON`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        mode: 'no-cors',
        body: formData,
      })
      setTurnedON(true)
      setTimeout(() => {
        setTurnedON(false)
      }, 5000)
      setRefreshPlay((data) => !data)
      let res = await result.json()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const pauseData = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('device_ids[]', checkedItems)

      let result = await fetch(`${troesAPi}/device_charger_multipleOFF`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        mode: 'no-cors',
        body: formData,
      })
      setTurnedOFF(true)
      if (result) {
        setTimeout(() => {
          setTurnedOFF(false)
        }, 5000)
      }
      setRefreshPlay((data) => !data)
      let res = await result.json()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
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
  // csv wrong upload notification
  const openNotificationCsvWrong = () => {
    notification.open({
      description: '❌ Please upload a valid file format!!',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }

  const selectDeviceAddress = () => {
    axios
      .get(`${troesAPi}/selectdeviceaddress`)
      .then((res) => {
        setDeviceAddressOption(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAllAssetsData()
  }, [refreshPlay])
  useEffect(() => {
    selectDeviceAddress()
  }, [])

  const importCSVFunc = () => {
    setLoading(true)

    axios
      .get(`${troesAPi}/devicedetailsonclick/${requiredAssigned}`)
      .then((res) => {
        // setCSvData(res.data)
        setAllAssetDataInTable(res?.data)

        // setForDataOfPartial(res.data.data)
        setForTrue(false)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const selectDeviceAddressFunction = (value, ind, e) => {
    let str = e.label
    setDeviceAddressId(e.value)
    let strData =
      str.substring(0, str.indexOf('(')) + str.substring(str.lastIndexOf(')') + 1, str.length)

    setselectedDeviceAddress(strData)
    setAddingClass('clickdata_yesm')

    setAutoFillIndex(`td_style_${ind}`)
    setConditionAssigned(true)

    axios
      .get(`${troesAPi}/deviceaddress/${value}`)
      .then((res) => {
        setAutoFillState(res.data.location_details.state)
        setAutoFillZip(res.data.location_details.ZIP_code)
        setAutoFillInstallation(res.data.location_details.location)
        setAutoFillPartner(res.data.location_details.partner)

        ///setLoopingCustomerName(res.data.user_names)
        if (!res.data.user_names) {
          setAutoFillCustomerName('')
          setAutoFillCustomerPhone('')
          setAutoFillCustomerEmail('')
          setCustId('')

          // forLooping customer name start
          setLoopingCustomerName('')

          // forLooping customer name end
        } else if (res.data.user_names[0].pwa_name && !res.data.user_names[0].pwa_mobile) {
          setAutoFillCustomerName('')
          setAutoFillCustomerPhone('')
          setAutoFillCustomerEmail('')
          setCustId('')
          setFlagStatus(1)
          setLoopingCustomerName(res.data.user_names)
        } else {
          setAutoFillCustomerName(res.data.user_names[0].pwa_name)
          setAutoFillCustomerPhone(res.data.user_names[0].pwa_mobile)
          setAutoFillCustomerEmail(res.data.user_names[0].pwa_email)
          setCustId(res.data.user_names[0].id)
          setFlagStatus(0)
          // forLooping customer name start
          //setLoopingCustomerName(res.data.user_names)
          // forLooping customer name end
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const selectCustomerName = (value, ind) => {
    //setAutoFillIndex(`td_style_${ind}`)
    setAutoFillIndexForCustomer(`td_style_${ind}`)
    axios
      .get(`${troesAPi}/customerdetails/${value}`)
      .then((res) => {
        setAutoFillCustomerName(res.data.pwa_name)
        setAutoFillCustomerPhone(res.data.pwa_mobile)

        setAutoFillCustomerEmail(res.data.pwa_email)

        setCustId(res.data.id)
        setFlagStatus(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChangeSwitch = (checked, ind, status) => {
    setAutoFillIndex(`td_style_${ind}`)
    setDisabled(!disabled)
    if (checked === true) {
      // setisAssetsShow(true)
      setStatus(1)
    } else {
      // setisAssetsShow(false)
      setStatus(0)
    }
  }
  const handleChange = (e, ind) => {
    setPartner(e.target.value)
  }
  const onChange = async (value, ind, e, id) => {
    setLoading(true)
    setIndexForUnit(`td_style_${ind}`)
    //setAutoFillIndex(`td_style_${ind}`)
    //setAutoFillIndexForCustomer(`td_style_${ind}`)
    setAutoFillCustomerUnitState(e.value)

    let result = await fetch(`${troesAPi}/updateunitstate/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ deviceunit_state: e.value }),
    })
    let res = await result.json()
    if (res.success) {
      alert(res.success)
      // getAllAssetsData()
      setLoading(false)
    }
  }

  async function AssignedDataOnhandleSelect(id, deviceId, uniqueId) {
    // console.log(autoFillCustomerName,"object")
    if (
      id &&
      deviceId &&
      uniqueId &&
      selectedDeviceAddress &&
      autoFillState &&
      autoFillZip &&
      autoFillInstallation &&
      partner &&
      autoFillCustomerName &&
      autoFillCustomerEmail
    ) {
      const conf = confirm('Are you sure you would like to change')
      if (conf == true) {
        setLoading(true)
        try {
          let result = await fetch(`${troesAPi}/assigndevice/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
              device_id: deviceId,
              unique_id: uniqueId,
              device_address: selectedDeviceAddress,
              partner: partner,
              cust_name: autoFillCustomerName,
              cust_email: autoFillCustomerEmail,
              cust_phone: autoFillCustomerPhone,
              device_state: autoFillState,
              device_zip: autoFillZip,
              installation: autoFillInstallation,
              deviceunit_state: autoFillCustomerUnitState,
              cust_id: cust_idd,
              action: 1,
              status: 1,
              flag_status: flag_status,
              device_address_id: device_address_id,
            }),
          })
          await result.json()
          getAllAssetsData()
          setDeleted((data) => !data)
          if (result) {
            setDisabled(true)
          }
          setLoading(false)
        } catch (err) {
          setLoading(false)
          console.log(err)
        }
      } else {
        setLoading(false)
      }
    } else {
      alert('Please fill up neccessary details')
    }
  }
  async function AssignedDataOnMapMethod(
    id,
    device_id,
    unique_id,
    device_address,
    device_state,
    device_zip,
    installation,
    partner,
    cust_name,
    cust_phone,
    cust_email,
    deviceunit_state,
    custId,
  ) {
    if (
      id &&
        device_id !== null &&
        unique_id !== null &&
        device_address !== null &&
        device_state !== null &&
        device_zip !== null &&
        installation !== null &&
        partner !== null &&
        autoFillCustomerName
        ? autoFillCustomerName
        : cust_name !== null && autoFillCustomerEmail
          ? autoFillCustomerEmail
          : cust_email !== null
    ) {
      setLoading(true)
      const conf = confirm('Are you sure you would like to change')
      if (conf == true) {
        try {
          let result = await fetch(`${troesAPi}/assigndevice/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
              device_id: device_id,
              unique_id: unique_id,
              device_address: device_address,
              partner: partner,
              cust_name: autoFillCustomerName ? autoFillCustomerName : cust_name,
              cust_email: autoFillCustomerEmail ? autoFillCustomerEmail : cust_email,
              cust_phone: autoFillCustomerPhone ? autoFillCustomerPhone : cust_phone,
              device_state: device_state,
              device_zip: device_zip,
              installation: installation,
              deviceunit_state: autoFillCustomerUnitState,
              cust_id: cust_idd ? cust_idd : custId,
              action: 1,
              status: 1,
              flag_status: flag_status,
              device_address_id: device_address_id,
            }),
          })
          await result.json()
          // getAllAssetsData()

          if (requiredAssigned === 'all') {
            window.location.reload(false)
          } else if (requiredAssigned === 'unassigned') {
            setAutoFillCustomerEmail('')
            setAutoFillCustomerName('')
            setAutoFillCustomerPhone('')
            ButtonofUnassigned()
          }
          setDeleted((data) => !data)
          if (result) {
            setDisabled(true)
          }
          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
      } else {
        console.log('cancelled')
        setLoading(false)
      }
    } else {
      alert('Please fill up neccessary details')
    }
  }
  useEffect(() => {
    // getAllAssetsData()
  }, [deleted])

  const cancel = (e) => {
    console.log(e)
  }

  async function unAssignedData(id, custIde) {
    setLoading(true)
    const conf = confirm('Are you sure you would like to change')
    if (conf == true) {
      try {
        let result = await fetch(`${troesAPi}/unassigndevice/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
            device_id: '',
            unique_id: '',
            device_address: '',
            partner: '',
            cust_name: '',
            cust_email: '',
            cust_phone: '',
            device_state: '',
            device_zip: '',
            installation: '',
            deviceunit_state: '',
            cust_id: custIde,
            action: 0,
            status: 0,
          }),
        })

        if (result) {
          setAutoFillCustomerEmail('')
          setAutoFillCustomerName('')
          setAutoFillCustomerPhone('')
          setDisabled(false)
          // getAllAssetsData()
          setLoading(false)
          if (requiredAssigned === 'all') {
            getAllAssetsData()
          } else if (requiredAssigned === 'assigned') {
            ButtonofAssigned()
          } else {
            ButtonofUnassigned()
          }
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    } else {
      console.log('cancelled')
      setLoading(false)
    }
  }
  const openDeleteModal = () => {
    setisAssetsDelete((current) => !current)
  }
  const cancelDeleteAssets = () => {
    setisAssetsDelete((current) => !current)
  }
  const deleteAsseted = (id) => {
    setisAssetsDelete((current) => !current)
    setLoading(true)

    axios
      .delete(`${troesAPi}/devicedestroy/${id}`)
      .then((res) => {
        setDeleted((data) => !data)
        getAllAssetsData()
        setUserDelete(true)
        setLoading(false)
        setTimeout(() => {
          setUserDelete(false)
        }, 2000)
      })

      .catch((err) => {
        setLoading(true)
        console.log(err)
      })
  }

  const refreshAssetPage = () => {
    axios
      .get(`${troesAPi}/emporiadevice`)
      .then((res) => {
        alert(res.data.message)
        selectDeviceAddress()
        getAllAssetsData()
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // assigned button && unAssigned button start
  const handlePagination = (value) => {
    setPage(value)
  }
  const ButtonofAll = () => {
    selectCustomerName()
    setChangeBackgroundAll(true)
    setChangeBackgroundAssigned(false)
    setChangeBackgroundUnAssigned(false)
    handlePagination((value) => setPage(1))
    getAllAssetsData()
    setRequiredAssigned('all')
    setMatchDisable(true)
  }
  const ButtonofAssigned = () => {
    selectCustomerName()
    setLoading(true)
    setChangeBackgroundAssigned(true)
    setChangeBackgroundUnAssigned(false)
    setChangeBackgroundAll(false)
    setRequiredAssigned('assigned')
    setMatchDisable(false)

    axios
      .get(`${troesAPi}/getassigndevice`)
      .then((res) => {
        setLoading(false)
        setTotal(res.data?.length)
        setDataColorText(true)
        if (res?.data) {
          setAllAssetDataInTable(res.data)
        }
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        console.log(err)
        setDataColorText(false)
        setLoading(false)
      })
  }
  const ButtonofUnassigned = () => {
    setChangeBackgroundAssigned(false)
    setChangeBackgroundUnAssigned(true)
    setChangeBackgroundAll(false)
    setLoading(true)
    setRequiredAssigned('unassigned')
    setMatchDisable(true)
    axios
      .get(`${troesAPi}/getunassigndevice`)
      .then((res) => {
        setTotal(res.data?.length)
        setAllAssetDataInTable(res?.data)
        setLoading(false)
        handlePagination((value) => setPage(1))
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  // assigned button && unAssigned button end

  // import csv start

  const handleFileChange = (event) => {
    setUploaded_file(event.target.files[0])
    setModalTitle(event.target.files[0])
    setBgColor((data) => !data)
    setcsvTextColor('black')
    setcsvwidth('210px')
  }
  const filereplace = () => {
    setTimeout(() => {
      inputRef.current.value = null
      setcsvTextColor('transparent')
      setcsvwidth('136px')
    }, 2000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setCounter(counter + 1)

    const formData = new FormData()
    formData.append('uploaded_file', uploaded_file)

    if (uploaded_file !== null && uploaded_file.type === 'text/csv') {
      fetch(`${troesAPi}/importcsv`, {
        method: 'POST',
        mode: 'cors',
        // headers: { 'content-type': 'text/html' },
        body: formData,
      })
        .then((response) => {
          openNotification()
          getAllAssetsData()
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error: ' + response.status)
          }
        })
        .then((data) => {
          if (data.notValid && data.notValid.length > 0) {
            data.notValid.forEach((record) => {
              setCsvWrongData(data.notValid)
            })
          }
          setUploaded_file(null)
        })
        .catch((err) => {
          console.error('Error:', err)
          openNotification('error', 'An error occurred while uploading the file.')
        })

      setIsCsvModalOpen(true)
    } else {
      openNotificationCsvWrong()
    }
    filereplace()
  }

  const handleCsvOk = () => {
    setIsCsvModalOpen(false)
  }
  const handleCsvCancel = () => {
    setIsCsvModalOpen(false)
  }
  //import csv end
  // pagination start
  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts =
    allllAssetDataInTable && allllAssetDataInTable.slice(indexOfFirstPage, indexOfLastPage)

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
  const handlePaginationOfAssets = (value) => {
    setPage(value)
  }

  // pagination end
  const text = <span> Delete Location</span>
  const textOne = <span> Turn Device(s) On</span>
  const textTwo = <span> Turn Device(s) Off</span>

  const emporiaColor = <span>Emporia</span>
  const csvcolor = <span>CSV</span>

  const showModal = () => {
    setIsModalOpen(true)
    axios
      .get(`${troesAPi}/wrong_asset_details`)
      .then((res) => {
        setWrongDetailsData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const deleteDeviceAddress = (id) => {
    axios
      .get(`${troesAPi}/asset_address_delete/${id}`)
      .then((res) => {
        if (res) {
          getAllAssetsData()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function sendingStatus(e, deviceId, status, ind) {
    e.preventDefault()
    setForLoader(true)
    setRefreshColor((data) => !data)
    setIndexingForToggle(`toggle_style_${ind}`)
    const formData = new FormData()
    formData.append('charger_on', toggle)
    formData.append('device_id', deviceId)
    try {
      const response = await fetch(`${troesAPi}/device_charger_ONOFF`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors',
        body: formData,
      })

      const result = await response.json()
      setForLoader(true)
      setTimeout(() => {
        setForLoader(false)
      }, 7000)
      showModal()
    } catch (error) {
      console.error('An error occurred while toggling device charger:', error)
      setForLoader(false)
    }
  }
  useEffect(() => {
    axios
      .get(`${troesAPi}/wrong_asset_details`)
      .then((res) => {
        setWrongDetailsData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [refreshColor])
  const textFour = <span>Click to copy</span>
  const clickForCopy = (stae, e, ind, itemId) => {
    setColorIndex(`td_style_${ind}`)
    setSelectedData(stae)
    copy()
    if (e.detail == 2) {
      setColorForCopy((data) => !data)
    }
  }

  const csvMultipleDownloadRef = useRef(null)

  const multipleCsv = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('device_ids', checkedItems)

    if (checkedItems.length === 0) {
      alert('Please Select Device ID(s)!')
      setLoading(false)
    } else {
      try {
        const response = await fetch(`${troesAPi}/deviceusagemultiple`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ device_ids: checkedItems }),
        })
          .then(function (respons) {
            return respons.text()
          })
          .then((data) => {
            setMultipleData(data)
            setTimeout(() => {
              csvMultipleDownloadRef.current.link.click()
            }, 500)
            setLoading(false)
          })

        // Process the CSV data
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  }

  const csvWrongDownloadRef = useRef(null)
  const csvWrongExport = async (id, deviceId) => {
    setLoading(true)
    let result = await fetch(`${troesAPi}/deviceusage/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ device_id: deviceId }),
    })
      .then(function (response) {
        return response.text()
      })
      .then((data) => {
        setWrongData(data)
        setTimeout(() => {
          csvWrongDownloadRef.current.link.click()
        }, 500)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err, 'error')
        setLoading(false)
      })
  }

  return (
    <>
      <div className="asset__page">
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1000',
              position: 'fixed',
              left: '750px',
              top: '350px',
            }}
          >
            <Spin size="large" style={{ fontSize: '30px' }} />
          </div>
        ) : (
          ''
        )}
        <Modal
          // centered
          // id='wrongDetails_modal'
          title="Wrong Emporia Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={900}
          bodyStyle={{ height: '400px', overflowX:'auto' ,padding:'24px' }}  
        >
          

          <table className="table" >
            <thead>
              {/* <img
                src={Excelicon}
                alt="upload_img"
                style={{
                  width: '20px',
                  marginLeft: '15px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              /> */}
              <th className="px-3">File</th>

              <th className="px-3">Device ID</th>
              <th >Device Address</th>
              <th >Issue</th>
              <th >ON/OFF</th>
            </thead>
            <tbody>
              {forLoader ? (
                <div className="spinner-border text-warning loader_class" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                ''
              )}

              {wronDetailsData &&
                wronDetailsData.map((item, ind) => {
                  return (
                    <tr key={ind}>
                      <td>
                        <div onClick={() => csvWrongExport(item.id, item?.device_id)}>
                          <img
                            src={Excelicon}
                            alt="upload_img"
                            style={{
                              width: '20px',
                              // marginTop: '-7px',
                              marginLeft: '8px',
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      </td>
                      <td> {item.device_id}</td>
                      <td><div style={{width:'200px'}}> {item.device_address}</div></td>
                      <td> {item.issue}</td>

                      <td className={`toggle_style_${ind}`}>
                        <form onSubmit={sendingStatus}>
                          <button
                            className="toggle_class"
                            type="submit"
                            style={
                              item?.status === 1
                                ? { color: 'green', paddingLeft: '15px' }
                                : { color: 'red', paddingLeft: '15px' }
                            }
                            onClick={(e) =>
                              sendingStatus(e, item.device_id, item.status, setToggle(!toggle))
                            }
                          >
                            <PoweroffOutlined />
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table> 
           
        </Modal>
        {/* <CSVLink
            data={data}
            // headers={headers}
            filename="AssetReport.csv"
            target="_blank"
            ref={csvDownloadRef}
          /> */}
        <CSVLink
          data={Wrongdata}
          // headers={headers}
          filename="AssetWrongReport.csv"
          target="_blank"
          ref={csvWrongDownloadRef}
        />
        <CSVLink
          data={multipledata}
          // headers={headers}
          filename="AssetReport.csv"
          target="_blank"
          ref={csvMultipleDownloadRef}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          <p className="asset__management">Asset Management</p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '16px',
              marginRight:'24px'

            }}
          >

            <button
              className='matchEmporia'
              onClick={matchDisable ? importCSVFunc : ''}
              style={{ cursor: matchDisable ? 'pointer' : 'no-drop', }}
            >    <FaUserGroup className='fauser_btn hovering_effect' /> 

              <span className='hovering_effect '>Match Customer</span>
            </button>

            <button
              className='matchEmporia'

              onClick={() => refreshAssetPage()}
            >
              <ReloadOutlined className='fauser_btn hovering_effect' />
              {/* <img src={Emporia_data} alt="frame" style={{ width: '22px', height: '15px' }} /> */}
              <span className='hovering_effect'> Emporia Data</span>
            </button>
            {/* <button
              className="wrong_details"
              onClick={showModal}
              style={{ display: 'flex', gap: '10px', borderRadius: '6px' }}
            >
              <img src={WrongDetails} alt="frame" style={{ width: '22px', height: '15px' }} />
              Wrong Details
            </button> */}


          </div>
        </div>
        <div className="for_uploading">
          <div className="handle_filter_bar">
            <div className="mainDiv_assigned_unassigned">
              <button
                onClick={() => ButtonofAll()}
                //className="btn_of_assigned_All"
                className="btn1"
                style={
                  changBackgroundAll
                    ? {
                      backgroundColor: '#3A72DE',
                      color: '#fff',
                      backgroundImage: `url=(/)`,
                    }
                    : { backgroundColor: '#fff' }
                }
              >
                {/* {changBackgroundAll ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )} */}
                All
              </button>
              <button
                onClick={() => ButtonofAssigned()}
                //className="btn_of_assigned"
                className="btn_mid"
                style={
                  changBackgroundAssigned
                    ? { backgroundColor: '#3A72DE', color: '#fff' }
                    : { backgroundColor: '#fff' }
                }
              >
                {/* {changBackgroundAssigned ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )} */}
                Assigned
              </button>
              <button
                onClick={() => ButtonofUnassigned()}
                //className="unAssi_gned"
                className="btn3"
                style={
                  changBackgroundUnAssigned
                    ? { backgroundColor: '#3A72DE', color: '#fff' }
                    : { backgroundColor: '#fff' }
                }
              >
                {/* {changBackgroundUnAssigned ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )} */}
                Unassigned
              </button>
            </div>
            <div className="mainDiv_on_off">
              <form onSubmit={playData}>
                <Popconfirm
                  title="Turn Device(s) On?"
                  onConfirm={playData}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip placement="bottom" title={textOne}>
                    <button className="play__button">
                      <PoweroffOutlined />
                    </button>
                  </Tooltip>
                </Popconfirm>
              </form>

              <form>
                <Popconfirm
                  title="Turn Device(s) Off? "
                  onConfirm={pauseData}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip placement="bottom" title={textTwo}>
                    <button className="pause__button">
                      <PoweroffOutlined />
                    </button>
                  </Tooltip>
                </Popconfirm>
              </form>
            </div>
            <div>
              <button
                style={{
                  display: 'flex',
                  gap: '5px',
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                }}
                onClick={() => multipleCsv()}
              >
                <img src={Excelicon} alt="" style={{ width: '22px' }} />
                Report
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
           <div id="file_uplaoder_modal">

                <button type="submit" className="import_report"  onClick={() => setModal2Open(true)}>
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
                  <form onSubmit={handleSubmit} >
              <input
                ref={inputRef}
                accept=".csv"
                type="file"
                onChange={handleFileChange}
                style={{ width: csvwidth, color: csvTextColor , height:'40px'}}
                required
                id="assetimport"
              />


              {/* <button
                className="import_report"
                style={bgColor ? { backgroundColor: '#1890ff' } : { backgroundColor: '#cc9ceb' }}
                type="submit"
              >
                <img src={import_one} alt="edit" style={{ width: '15px' }} />
                Import CSV
              </button> */}
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

            {/* <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '6px' }}>
              <input
                ref={inputRef}
                accept=".csv"
                type="file"
                onChange={handleFileChange}
                style={{ width: csvwidth, color: csvTextColor }}
                required
              />
              <button
                className="import_report"
                style={bgColor ? { backgroundColor: '#1890ff' } : { backgroundColor: '#cc9ceb' }}
                type="submit"
              >
                <img src={import_one} alt="edit" style={{ width: '15px' }} />
                Import CSV
              </button>
            </form> */}
            {isCsvModalOpen && csvWrongData?.length > 0 ? (
              <Modal
                title={`${modalTitle?.name} (Uploaded)`}
                open={isCsvModalOpen}
                onOk={handleCsvOk}
                onCancel={handleCsvCancel}
              >
                <div style={{ display: 'flex' }}>
                  <h6>Rows not inserted :</h6>
                  {csvWrongData.map((item, index) => {
                    return (
                      <div style={{ display: 'flex', gap: '5px' }} key={index}>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                          {(index ? ', ' : '') + item.Row_No}{' '}
                        </p>
                      </div>
                    )
                  })}
                </div>
                {csvWrongData.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>
                        <b> Row:</b> {item.Row_No} <br /> <b>Reason:</b>
                        {item.Errors.map((item, ind) => {
                          return (
                            <p key={ind} className="p_wrong_csv">
                              -{item}
                            </p>
                          )
                        })}
                      </p>
                    </div>
                  )
                })}
              </Modal>
            ) : (
              ''
            )}
            {/* <button
              id="universalButton"
              onClick={matchDisable ? importCSVFunc : ''}
              style={{ cursor: matchDisable ? 'pointer' : 'no-drop', display: 'flex', gap: '10px' }}
            >
              <img src={MatchCustomer} alt="frame" style={{ width: '22px', height: '15px' }} />
              Match Customer
            </button> */}

            <button
              className="wrong_details"
              onClick={showModal}
              style={{ display: 'flex', gap: '10px', borderRadius: '6px' }}
            >
              <img src={wrong_detailsicon} alt="frame" style={{ width: '22px', height: '15px' }} />
             <span> Wrong Details</span>
            </button>

          </div>
        </div>
        <div className="asset_wrap">
          <div className="main_div">
            <div className="first_div" style={{ overflowX: 'auto' }}>
              <table className="table table-hover">
                <thead>
                  <tr className="asset__acount">
                    {/* <th className="th_style">
                  <img
                    src={Excelicon}
                    alt="upload_img"
                    style={{
                      width: '20px',
                      marginTop: '-7px',
                      // marginLeft: '4px',
                      cursor: 'pointer',
                    }}
                  />
                </th> */}
                    <th className="th_style">S.No.</th>
                    <th className="th_style">
                      {/* <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{
                      appearance: 'none',
                      backgroundColor: 'white',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                    }}
                  /> */}
                    </th>

                    <th className="th_style">{/* <Radio></Radio> */}</th>
                    <th className="th_style">{/* <input type="radio" /> */}</th>
                    <th className="th_style">
                      <Tooltip title="Select All">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </Tooltip>
                    </th>
                    <th className="th_style">Device ID</th>
                    <th className="th_style">Unique ID</th>
                    <th className="th_style">Device Address</th>
                    <th className="th_style">State</th>
                    <th className="th_style">ZIP</th>
                    <th className="th_style">Installation</th>
                    <th className="th_style">Partner</th>
                    <th className="th_style">Name</th>
                    <th className="th_style">Phone</th>
                    <th className="th_style">Email</th>
                    <th className="th_style">Unit State</th>
                    <th className="th_style">Status</th>
                    <th className="th_style">Assigned/UnAssigned</th>
                    <th className="th_style">Action</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {currentPosts &&
                    currentPosts.map((item, ind) => {
                      const displayedIndex = indexOfFirstPage + ind + 1

                      let colors
                      if (item.charger_status === 1) {
                        colors = 'green'
                      } else {
                        colors = 'red'
                      }
                      let datacolor
                      if (item.filestatus === 8) {
                        datacolor = 'blue'
                        {
                          /* setDataColorText('this device is come from Emporia') */
                        }
                      } else if (item.filestatus === 7) {
                        datacolor = 'yellow'
                        {
                          /* setDataColorText('this device is come from CSV') */
                        }
                      } else {
                        datacolor = 'green'
                      }

                      return (
                        <tr
                          key={ind}
                          style={
                            item.match_type === 1
                              ? { background: '#B6D7A8' }
                              : item.match_type === 2
                                ? { background: '#FFF5BF' }
                                : {}
                          }
                          className="bg-prmary tr_class"
                        >
                          <td className="px-3">{displayedIndex}</td>
                          {/* <td>
                        <div onClick={() =>csvExport(item.id,item?.device_id)}>
                            <img
                              src={Excelicon}
                              alt="upload_img"
                              style={{
                                width: '20px',
                                marginTop: '-7px',
                                marginLeft: '8px',
                                cursor: 'pointer',
                              }}
                            />
                        </div>
                      </td> */}
                          <th className="td_style">
                            <Tooltip title={item.filestatus === 8 ? emporiaColor : csvcolor}>
                              <input
                                type="radio"
                                style={{
                                  appearance: 'none',
                                  backgroundColor: `${datacolor}`,
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                }}
                              />
                            </Tooltip>
                          </th>
                          <td className="td_style">
                            {item.flag_status === 1 ? (
                              <div style={{ position: 'relative' }}>
                                {' '}
                                <span className="deviceflag_div" style={{ cursor: 'pointer' }}>
                                  <img src={partiallymatched_1} alt="partial" />
                                </span>
                                <span className="device_hover">
                                  Device partially matched with customer address
                                </span>
                              </div>
                            ) : (
                              ''
                            )}
                          </td>
                          <td className="td_style">
                            <Tooltip
                              title={item.charger_status === 1 ? 'Charger on' : 'Charger off'}
                            >
                              <input
                                style={{
                                  appearance: 'none',
                                  backgroundColor: `${colors}`,
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                }}
                                type="radio"
                              />
                            </Tooltip>
                          </td>
                          <td className="td_style">
                            <Tooltip title="Select to on/off device(s) or to generate a report">
                              <input
                                type="checkbox"
                                checked={checkedItems.includes(item.device_id)}
                                onChange={(event) => handleCheckboxChange(event, item.device_id)}
                              />
                            </Tooltip>
                          </td>

                          <td
                            className="td_style"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setShow(true)
                              setSelectedData(item?.device_id)
                            }}
                          >
                            <Tooltip placement="bottom" title={textFour}>
                              {item.device_id}
                            </Tooltip>
                          </td>

                          <td className="td_style">{item.unique_id}</td>
                          <td
                            className={`td_style td_style_${ind}`}
                            style={{ display: 'flex', alignItems: 'center', border: 'none' }}
                          >
                            <Select
                              showSearch
                              style={{
                                width: 300,
                              }}
                              value={item?.device_address[0]?.fill}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              onChange={(value, e) => selectDeviceAddressFunction(value, ind, e)}
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={(item.device_address || []).map((d) => ({
                                value: d.device_address_id,
                                label: d.sss,
                              }))}
                            />
                            {item?.device_address[0]?.fill ? (
                              <div>
                                <div
                                  className="minus_circle_css"
                                  onClick={
                                    item?.device_address[0]?.fill
                                      ? () => deleteDeviceAddress(item.id)
                                      : ''
                                  }
                                >
                                  <Tooltip placement="top" title={text}>
                                    <MinusCircleOutlined />
                                  </Tooltip>
                                </div>
                                <button
                                  style={{ border: 'none', background: 'none' }}
                                  onClick={() => {
                                    setUniqueShow(true)
                                    setUniqueId(item?.device_address[0]?.fill)
                                  }}
                                >
                                  <Tooltip placement="bottom" title={textFour}>
                                    <CopyOutlined />
                                  </Tooltip>
                                </button>
                              </div>
                            ) : (
                              ''
                            )}
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndex
                              ? autoFillState
                              : item.device_state}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndex ? autoFillZip : item.device_zip}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndex
                              ? autoFillInstallation
                              : item.installation}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndex ? autoFillPartner : item.partner}
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            <Select
                              showSearch
                              style={{
                                width: 300,
                              }}
                              value={
                                `td_style_${ind}` === autoFillIndexForCustomer ||
                                  `td_style_${ind}` === autoFillIndex
                                  ? autoFillCustomerName
                                  : item?.pwa_name[0].pwa_name_fill
                              }
                              onChange={(value) => selectCustomerName(value, ind)}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={
                                item.pwa_name[0].pwa_name_fill == null &&
                                  `td_style_${ind}` === autoFillIndex
                                  ? (loopingCustomerName || []).map((f) => ({
                                    value: f.id,
                                    label: f.pwa_name,
                                  }))
                                  : ((item && item.pwa_name) || []).map((d) => ({
                                    value: d.cust_id_sss,
                                    label: d.pwa_name_sss,
                                  }))
                              }
                            />
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndexForCustomer ||
                              `td_style_${ind}` === autoFillIndex
                              ? autoFillCustomerPhone
                              : item && item.pwa_mobile}
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndexForCustomer ||
                              `td_style_${ind}` === autoFillIndex
                              ? autoFillCustomerEmail
                              : item && item.pwa_email}
                          </td>
                          <td style={{ display: 'none' }} className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === autoFillIndex
                              ? cust_idd
                              : item.pwa_name[0].cust_id_fill}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            <Select
                              showSearch
                              placeholder="Select Unit State"
                              optionFilterProp="children"
                              value={
                                `td_style_${ind}` === indexForUnit
                                  ? autoFillCustomerUnitState
                                  : item.deviceunit_state
                              }
                              onChange={(value, e) => onChange(value, ind, e, item.id)}
                              style={{
                                width: 150,
                              }}
                              filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              options={[
                                {
                                  value: 'Installed',
                                  label: 'Installed',
                                },
                                {
                                  value: 'Inventoried',
                                  label: 'Inventoried',
                                },
                                {
                                  value: 'DRMO',
                                  label: 'DRMO',
                                },
                                {
                                  value: 'Deployed',
                                  label: 'Deployed',
                                },
                              ]}
                            />
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            <Switch
                              size="small"
                              checked={
                                `td_style_${ind}` === autoFillIndex
                                  ? disabled
                                  : +item?.status === 1
                                    ? () => setDisabled(disabled)
                                    : ''
                              }
                              disabled={+item?.status === 1 ? false : true}
                              onChange={
                                +item?.status === 1
                                  ? ''
                                  : (value) => onChangeSwitch(value, ind, item.status)
                              }
                            />
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {item.status === 1 ? (
                              <button
                                style={{ border: 'none', background: 'none' }}
                                onClick={() =>
                                  unAssignedData(item.id, item.pwa_name[0].cust_id_fill)
                                }
                              >
                                <UserAddOutlined size="large" style={{ color: 'green' }} />
                              </button>
                            ) : (
                              <button
                                style={{ border: 'none', background: 'none' }}
                                onClick={
                                  `td_style_${ind}` === autoFillIndexForCustomer ||
                                    `td_style_${ind}` === autoFillIndex ||
                                    item.pwa_name[0].pwa_name_fill
                                    ? () =>
                                      AssignedDataOnMapMethod(
                                        item.id,
                                        item.device_id,
                                        item.unique_id,
                                        item.device_address[0].fill,
                                        item.device_state,
                                        item.device_zip,
                                        item.installation,
                                        item.partner,
                                        item.pwa_name[0].pwa_name_fill,
                                        item.pwa_mobile,
                                        item.pwa_email,
                                        item.deviceunit_state,
                                        item.pwa_name[0].cust_id_fill,
                                      )
                                    : ''
                                }
                              >
                                <UserAddOutlined size="large" style={{ color: 'red' ,cursor:'default' }} />
                              </button>
                            )}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            <button
                              onClick={() => {
                                openDeleteModal(setId(item.id), setName(item.device_id))
                              }}
                              style={{ border: 'none', background: 'none' }}
                            >
                              <DeleteOutlined className="delete_btn_global" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>


          </div>
          <Pagination
            onChange={handlePaginationOfAssets}
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
              marginTop: '48px',
            }}
          />
        </div>
        {show ? (
          <div className="modal display-block">
            <section className="modal-main">
              <div className="App">
                <img src={FrameTwo} alt="frame" style={{ paddingRight: '10px' }} />
                <b style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  {' '}
                  Device id: &nbsp;&nbsp;&nbsp;
                </b>{' '}
                <p
                  style={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    margin: 'auto',
                  }}
                >
                  {selectedData}
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
                  copyText()
                }}
              >
                <CopyFilled style={{ color: 'blue' }} />
                {copied ? <span style={{ color: 'blue' }}>Copied</span> : 'Copy ID'}
              </button>
              <p
                style={{
                  color: 'white',
                  marginTop: '-10px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShow(false)
                }}
              >
                X
              </p>
            </section>
          </div>
        ) : (
          ''
        )}
        {uniqueshow ? (
          <div className="modal display-block">
            <section className="modal-main">
              <div className="App">
                <img src={FrameTwo} alt="frame" style={{ paddingRight: '10px' }} />
                <b style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  {' '}
                  Device Add.: &nbsp;&nbsp;&nbsp;
                </b>{' '}
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
                <CopyFilled style={{ color: 'blue' }} />
                {uniquecopied ? <span style={{ color: 'blue' }}>Copied</span> : 'Copy'}
              </button>
              <p
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
              </p>
            </section>
          </div>
        ) : (
          ''
        )}
        <div
          className="user__detail__popup__Price"
          style={{
            display: userDelete ? 'block' : 'none',
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
            <p className="admin_registerd__pop">Assets has been deleted.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: turnedOn ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="admin_registerd__pop">Device(s) have been turned on.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: turnedOff ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="admin_registerd__pop">Device(s) have been turned off.</p>
          </div>
        </div>
        <div
          className="show__notShow"
          style={{
            display: isAssetsDelete ? 'block' : 'none',
          }}
        >
          <div id="confirm__delete_location">
            <p>Confirm Delete</p>
          </div>
          <div id="delete__Location">
            <p>Are you sure you want to delete Device Id</p>
            <p style={{ marginTop: '-10px' }}>
              <span style={{ fontWeight: 'bolder' }}>{name}</span>
            </p>
            <p style={{ marginTop: '-10px' }}> This process is Irreversible</p>
            <div style={{ paddingLeft: '10px' }}>
              <button onClick={() => deleteAsseted(id)} type="submit" className="delete_new__admin">
                Delete
              </button>
              <button
                onClick={cancelDeleteAssets}
                className="cancel__create__location"
                type="submit"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AssetTwo
