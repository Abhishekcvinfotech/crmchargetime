import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import refresh from '../../assets/images/refresh.svg'
import { troesAPi } from '../../api'

import import_one from '../../assets/images/import_one.svg'
import check_sign from '../../assets/images/check_sign.svg'
import filter_bar from '../../assets/images/filter_bar.svg'
import six_dots from '../../assets/images/six_dots.svg'
import ep_pricetag from '../../assets/images/ep_pricetag.svg'
import assigned from '../../assets/images/assigned.svg'

import { Button, Spin, message, Space, Select, Switch, Modal, Pagination, Radio } from 'antd'
import { EyeFilled, EyeInvisibleOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons'
import './AssetTwo.css'
const AssetTwo = () => {
  //manish part start
  const [partOne, setPartOne] = useState([])

  // manish part end
  const [assetData, setAssetData] = useState([])
  const [changBackgroundAll, setChangeBackgroundAll] = useState(true)
  const [changBackgroundAssigned, setChangeBackgroundAssigned] = useState(false)
  const [changBackgroundUnAssigned, setChangeBackgroundUnAssigned] = useState(false)
  const [filtritemHide, setFilterItemHide] = useState(false)
  const [name, setName] = useState([])
  const [deletedd, setDeletedd] = useState(false)

  const [showTrue, setShowTrue] = useState(false)
  const [list, setList] = useState([])

  const [id, setId] = useState('')
  const [showTable, setShowTable] = useState('')
  const [myStyle, setMyStyle] = useState({})
  const [isAssetsDelete, setisAssetsDelete] = useState(false)
  const [assetDataa, setAssetDataa] = useState('')
  const [isassetsShow, setisAssetsShow] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [userDelete, setUserDelete] = useState(false)

  const [bgColor, setBgColor] = useState(false)
  // state for update start

  // const [cust_id, setCustId] = useState('')

  const [idForAutoFill, setIdForAutoFill] = useState('')
  const [autoFillState, setAutoFillState] = useState('')
  const [autoFillZip, setAutoFillZip] = useState('')
  const [autoFillInstallation, setAutoFillInstallation] = useState('')
  const [autoFillPartner, setAutoFillPartner] = useState('')
  const [autoFillUserName, setAutoFillUserName] = useState('')
  const [autoFillUserEmail, setAutoFillUserEmail] = useState('')
  const [autoFillUserContact, setAutoFillUserContact] = useState('')

  const [autoCustomerEmail, setAutoCustomerEmail] = useState('')
  const [autoCustomerContact, setAutoCustomerContact] = useState('')
  const [allDataOfCustomer, setAllDataOfCustomer] = useState([])
  const [idForAllCustomer, setIdForAllCustomer] = useState('')
  const [idForDRMO, setIdforDRMO] = useState('')
  const [open, setOpen] = useState(false)
  const [addressOnSelect, setAddressOnSelect] = useState('')
  const [customerOnSelect, setCustomerOnSelect] = useState('')
  const [partnerData, setPartnerData] = useState([])
  const [forAddingClassPartner, setForAddingClassPartner] = useState('')

  // state for update end

  // state for pagination start

  // let num = exampleItems.map((item) => console.log(item.id, 'iyy'))
  // console.log(num, 'num')
  const [page, setPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const [total, setTotal] = useState()
  const [forIndexing, setForIndexing] = useState('')

  // state for pagination start
  //state for assign start

  const [cust_id, setCustId] = useState('')
  const [partner, setPartner] = useState('')
  const [cust_name, setCustName] = useState('')
  const [cust_email, setCustEmail] = useState('')
  const [cust_phone, setCustPhone] = useState('')
  const [device_state, setDeviceState] = useState('')
  const [device_zip, setDeviceZip] = useState('')
  const [installation, setInstallation] = useState('')
  const [deviceunit_state, setDeviceUnitState] = useState('')
  const [status, setStatus] = useState('')
  const [device_address, setDeviceAddress] = useState('')

  // state for assign end

  // location dropdown start

  const [locationDrop, setLocationDrop] = useState([])

  // location dropdown send

  // imports csv start
  const [messageApi, contextHolder] = message.useMessage()
  const [counter, setCounter] = useState(1)
  const [disabled, setDisabled] = useState(false)
  const inputRef = useRef(null)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'CSV File Uploaded Successfully!!',
      duration: 5,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
        textAlign: 'center',
        marginLeft: '70px',
      },
    })
  }
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'CSV File Uploaded not Successfully!!',
      duration: 5,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
        textAlign: 'center',
        marginLeft: '70px',
      },
    })
  }
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please select CSV File',
      duration: 5,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
        textAlign: 'center',
        marginLeft: '70px',
      },
    })
  }

  const [uploaded_file, setUploaded_file] = useState(null)

  const handleFileChange = (event) => {
    setUploaded_file(event.target.files[0])
    setBgColor((data) => !data)
  }
  const filereplace = () => {
    setTimeout(() => {
      inputRef.current.value = null
    }, 2000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setCounter(counter + 1)
    const formData = new FormData()
    formData.append('uploaded_file', uploaded_file)

    for (var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }
    if (uploaded_file !== null) {
      fetch(`${troesAPi}/importcsv`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'content-type': 'application/json' },
        body: formData,
      })
        .then((response) => {
          response.json()
          getAllAssetsData()
          success()
        })
        .then((data, e) => {
          if (data) {
            setUploaded_file((e.target.files[0] = ''))
          }
        })
        .catch((err) => {
          console.error('Error:', err)
          error()
        })
    } else if (counter === 1) {
      warning()
    }
    filereplace()
  }

  // imports csv end
  const getAllAssetsData = () => {
    axios
      .get(`${troesAPi}/devicedetails`)
      .then((res) => {
        let allData = res?.data
        setPartOne(res.data)
        setTotal(allData?.length)
        setForIndexing(allData?.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // pagination start
  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = partOne && partOne.slice(indexOfFirstPage, indexOfLastPage)

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

  const dragItem = useRef()
  const dragOverItem = useRef()
  const inputElement = useRef()

  const getModalData = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/getdevicesorting`)
      .then((res) => {
        setList(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  // var exampleItems = total.((i) => console.log(i, 'i'))
  // console.log(exampleItems, 'for')
  useEffect(() => {
    getAllAssetsData()
  }, [])

  // import csv start

  // import csv end

  const dragStart = (e, position) => {
    dragItem.current = position
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
  }

  const getData = () => {
    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setName(res.data.customers)
      })
      .catch((err) => console.log(err))
  }

  // let allData = name?.map((item) => <option key={item.state}>{item.state}</option>)

  useEffect(() => {
    getData()
  }, [])

  const getAssetData = (e) => {
    setLoading(true)
    axios
      .get(`${troesAPi}/devicedetails`)
      .then((res) => {
        setAssetData(res.data.devicedetail.datadetail)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const refreshAssetPage = () => {
    axios
      .get(`${troesAPi}/emporiadevice`)
      .then((res) => {
        alert(res.data.message)
        getAllAssetsData()
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      getAssetData()
    }, 1000)
  }

  const arrayData = list?.map((obj) => {
    return obj.device_name
  })
  const arrayDataOne = list?.map((obj) => {
    return obj.status
  })

  const drop = async (e) => {
    setList(arrayData)

    const copyListItems = [...list]

    const dragItemContent = copyListItems[dragItem.current]

    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null

    setList(copyListItems)

    let result = await fetch(`${troesAPi}/devicecolumnsorting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ device: copyListItems }),
    })
    result = await result.json()

    setDeleted((data) => !data)
  }

  useEffect(() => {
    getAssetData()
  }, [])

  const ButtonofAll = () => {
    setChangeBackgroundAll(true)
    setChangeBackgroundAssigned(false)
    setChangeBackgroundUnAssigned(false)
    getAllAssetsData()
  }
  const ButtonofAssigned = () => {
    setChangeBackgroundAssigned(true)
    setChangeBackgroundUnAssigned(false)
    setChangeBackgroundAll(false)
    setLoading(true)
    axios
      .get(`${troesAPi}/getassigndevice`)
      .then((res) => {
        setLoading(false)

        setPartOne(res.data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const ButtonofUnassigned = () => {
    setChangeBackgroundAssigned(false)
    setChangeBackgroundUnAssigned(true)
    setChangeBackgroundAll(false)
    setLoading(true)
    axios
      .get(`${troesAPi}/getunassigndevice`)
      .then((res) => {
        setPartOne(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const eyeFilledHandle = async (index, id, status, itemStatus) => {
    let result = await fetch(`${troesAPi}/devicestatusupdate/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status }),
    })
    setMyStyle((prevState) => ({
      ...myStyle,
      [index]: !prevState[index],
    }))

    setDeleted((data) => !data)
  }
  const getPartnerData = () => {
    axios
      .get(`${troesAPi}/selectpartner`)
      .then((res) => {
        setPartnerData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPartnerData()
  }, [])
  const handleChange = (e, ind) => {
    setForAddingClassPartner(`td_style_${ind}`)
    setPartner(e.target.value)
  }

  // Update PART start

  useEffect(() => {
    axios
      .get(`${troesAPi}/alldevicedetails`)
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Update PART end

  // DELETE PART
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

  useEffect(() => {
    getModalData()
  }, [showTable, deleted])
  useEffect(() => {
    getAssetData()
  }, [deleted, showTable])

  // DELETE PART

  const resetTable = () => {
    setLoading(true)
    axios
      .put(`${troesAPi}/resetdevicecoloumn`)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setDeleted((data) => !data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  //second part start
  useEffect(() => {
    axios
      .get(`${troesAPi}/selectdeviceaddress`)
      .then((res) => {
        setLocationDrop(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const onChange = (value, ind) => {
    setIdforDRMO(`td_style_${ind}`)
    setDeviceUnitState(value)
  }
  const onSearch = (value) => {
    console.log('search:', value)
  }

  const selectInstallation = (value, ind, e) => {
    setAddressOnSelect(e.label)
    setDeviceAddress(e.label)
    setLoading(true)
    setIdForAutoFill(`td_style_${ind}`)
    axios
      .get(`${troesAPi}/deviceaddress/${value}`)
      .then((res) => {
        setDeletedd((data) => !data)
        setAllDataOfCustomer(res.data.user_names)
        setAutoFillInstallation(res.data.location_details[0].location)
        setInstallation(res.data.location_details[0].location)
        setAutoFillState(res.data.location_details[0].state)
        setDeviceState(res.data.location_details[0].state)
        setAutoFillZip(res.data.location_details[0].ZIP_code)
        setDeviceZip(res.data.location_details[0].ZIP_code)
        //setAutoFillPartner(res.data.location_details[0].partner)
        //setPartner(res.data.location_details[0].partner)
        setAutoFillUserName(res.data.user_details[0].pwa_name)
        setCustName(res.data.user_details[0].pwa_name)
        setAutoFillUserEmail(res.data.user_details[0].pwa_email)

        setAutoFillUserContact(res.data.user_details[0].pwa_mobile)

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const selectCustomerName = (value, ind, e) => {
    setLoading(true)
    setIdForAllCustomer(`td_style_${ind}`)
    setCustomerOnSelect(e.label)
    setCustName(e.label)
    axios
      .get(`${troesAPi}/customerdetails/${value}`)
      .then((res) => {
        // setDeletedd((data) => !data)
        setAutoCustomerEmail(res.data.pwa_email)
        setCustEmail(res.data.pwa_email)
        setAutoCustomerContact(res.data.pwa_mobile)
        setCustPhone(res.data.pwa_mobile)
        setCustId(res.data.id)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  useEffect(() => {
    if (loading == true) {
      setAutoCustomerContact('')
      setAutoCustomerEmail('')
    }
  })

  const onChangeSwitch = (checked, ind) => {
    setIdForAutoFill(`td_style_${ind}`)
    setDisabled(!disabled)
    console.log(checked, 'ch')
    if (checked === true) {
      // setisAssetsShow(true)
      setStatus(1)
    } else {
      // setisAssetsShow(false)
      setStatus(0)
    }
  }

  async function updateDataOfAsset(
    id,
    device_id,
    unique_id,
    device_address,
    cust_id,
    partner,
    cust_name,
    cust_email,
    cust_phone,
    device_state,
    device_zip,
    installation,
    deviceunit_state,
    status,
  ) {
    alert('Are you sure want to Assigned')
    // e.preventDefault()
    setLoading(true)
    try {
      const item = {
        device_id,
        unique_id,
        device_address,
        cust_id,
        partner,
        cust_name,
        cust_email,
        cust_phone,
        device_state,
        device_zip,
        installation,
        action: 1,
        deviceunit_state,
        status: 1,
      }

      let result = await fetch(`${troesAPi}/assigndevice/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      console.log(result, 'result')
      await result.json()
      getAllAssetsData()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  async function updateDataOfAssetOne(id, device_id, unique_id) {
    setLoading(true)
    try {
      const item = {
        device_id,
        unique_id,
        device_address,
        cust_id,
        partner,
        cust_name,
        cust_email,
        cust_phone,
        device_state,
        device_zip,
        installation,
        action: 1,
        deviceunit_state,
        status: 1,
      }

      let result = await fetch(`${troesAPi}/assigndevice/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })

      await result.json()
      getAllAssetsData()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  async function unAssignedData(id) {
    setLoading(true)
    try {
      let result = await fetch(`${troesAPi}/unassigndevice/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(''),
      })

      console.log(result, 'rr')
      if (result) {
        setDisabled(!disabled)
        getAllAssetsData()
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    getAllAssetsData()
    onChangeSwitch()
  }, [deleted])
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
        {contextHolder}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p className="asset__management">Asset Management</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
            onClick={() => refreshAssetPage()}
          >
            <img src={refresh} alt="edit" style={{ width: '15px', paddingTop: '5px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="asset_refresh">Refresh Data</p>

              <p style={{ fontSize: '11px', marginTop: '-13px' }}>Last fetched 2hours ago</p>
            </div>
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
                {changBackgroundAll ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )}
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
                {changBackgroundAssigned ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )}
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
                {changBackgroundUnAssigned ? (
                  <img src={check_sign} alt="edit" className="right_arrow" />
                ) : (
                  ''
                )}
                Unassigned
              </button>
            </div>
            <div
              className="filter_bar_div"
              onClick={() => {
                setFilterItemHide(true)
                setShowTrue(true)
                setOpen(true)
              }}
            >
              <img src={filter_bar} alt="filter-bar" style={{ padding: '8px' }} />
            </div>
          </div>
          <div>
            {filtritemHide ? (
              <Modal
                title="Filter"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={300}
              >
                <div className="shown_in_table">
                  <h3 className="properties">Properties</h3>
                  <button onClick={resetTable} className="hide_all">
                    Reset Order
                  </button>
                </div>

                {list &&
                  list.map((item, index) => {
                    return (
                      <div
                        className="handle_dots_addres"
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={myStyle[`${index}`] ? '' : drop}
                        key={index}
                        draggable
                      >
                        <div className="address_dots">
                          <img src={six_dots} alt="dots-image" />
                          <p
                            className="address_text"
                            // style={{
                            //   textDecoration: myStyle[`${index}`] ? 'line-through' : 'none',
                            // }}
                          >
                            {item.device_name}
                          </p>
                        </div>

                        <button
                          className="eye_outlined"
                          id={item.id}
                          onClick={(e) => {
                            eyeFilledHandle(
                              index,
                              item.id,
                              myStyle[`${index}`] || item.status == 0 ? 1 : 0,
                              item.status,
                            )
                          }}
                          ref={inputElement}
                        >
                          {item.status == 0 ? <EyeInvisibleOutlined /> : <EyeFilled />}
                        </button>
                      </div>
                    )
                  })}
              </Modal>
            ) : (
              ''
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <input ref={inputRef} accept=".csv" type="file" onChange={handleFileChange} />
            <button
              className="import_report"
              style={bgColor ? { backgroundColor: '#1890ff' } : { backgroundColor: '#cc9ceb' }}
              type="submit"
            >
              Import CSV
              <img src={import_one} alt="edit" className="left_arrow" />
            </button>
          </form>
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
              <span style={{ fontWeight: 'bolder' }}>{assetDataa}</span>
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

        <div className="">
          <div className="main_div">
            <div className="first_div" style={{ overflowX: 'auto' }}>
              <table className="tabel table-hover">
                <thead>
                  <tr className="asset__acount">
                    <th className="th_style">
                      <Radio></Radio>
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
                      return (
                        <tr key={ind} style={{ borderBottom: '0.5px solid #CAC4D0' }}>
                          <td className="td_style">
                            <Radio></Radio>
                          </td>
                          <td className="td_style">{item.device_id}</td>
                          <td className="td_style">{item.unique_id}</td>
                          <td className={`td_style td_style_${ind}`}>
                            <Select
                              showSearch
                              style={{
                                width: 150,
                              }}
                              value={
                                `td_style_${ind}` === idForAutoFill && item.device_address === null
                                  ? addressOnSelect
                                  : item.device_address
                              }
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              onChange={(value, e) => selectInstallation(value, ind, e)}
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                  .toLowerCase()
                                  .localeCompare((optionB?.label ?? '').toLowerCase())
                              }
                              options={(locationDrop || []).map((d) => ({
                                value: d.id,
                                label: d.device_address,
                              }))}
                            />
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === idForAutoFill
                              ? autoFillState
                              : item.device_state}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === idForAutoFill ? autoFillZip : item.device_zip}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {`td_style_${ind}` === idForAutoFill
                              ? autoFillInstallation
                              : item.installation}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {item.partner === null ? (
                              <select
                                id="option__value_Location"
                                onChange={(e) => handleChange(e, ind)}
                                style={{ width: '130px', padding: '2px' }}
                              >
                                <option value="">Select Partner</option>
                                {partnerData &&
                                  partnerData.map((item, index) => {
                                    return (
                                      <option
                                        id="option__value_Partner"
                                        key={index}
                                        data-name={item.id}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </option>
                                    )
                                  })}
                              </select>
                            ) : (
                              <select
                                id="option__value_Location"
                                style={{ width: '130px', padding: '2px' }}
                              >
                                <option>{item.partner}</option>
                              </select>
                            )}
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            {allDataOfCustomer !== undefined ||
                            `td_style_${ind}` !== idForAutoFill ? (
                              <Select
                                showSearch
                                style={{
                                  width: 150,
                                }}
                                value={
                                  `td_style_${ind}` === idForAutoFill && item.pwa_name === null
                                    ? customerOnSelect
                                    : item.pwa_name
                                }
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange={(value, e) => selectCustomerName(value, ind, e)}
                                filterOption={(input, option) =>
                                  (option?.label ?? '').includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={(allDataOfCustomer || []).map((d) => ({
                                  value: d.id,
                                  label: d.pwa_name,
                                }))}
                              />
                            ) : (
                              autoFillUserName
                            )}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {allDataOfCustomer === undefined && `td_style_${ind}` === idForAutoFill
                              ? autoFillUserContact
                              : allDataOfCustomer !== undefined &&
                                `td_style_${ind}` === idForAllCustomer
                              ? autoCustomerContact
                              : item.pwa_mobile}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            {allDataOfCustomer === undefined && `td_style_${ind}` === idForAutoFill
                              ? autoFillUserEmail
                              : allDataOfCustomer !== undefined &&
                                `td_style_${ind}` === idForAllCustomer
                              ? autoCustomerEmail
                              : item.pwa_email}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            <Select
                              showSearch
                              placeholder="Select Unit State"
                              optionFilterProp="children"
                              value={
                                `td_style_${ind}` === idForDRMO && item.deviceunit_state === null
                                  ? deviceunit_state
                                  : item.deviceunit_state
                              }
                              onChange={(value) => onChange(value, ind)}
                              onSearch={onSearch}
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
                                `td_style_${ind}` === idForAutoFill
                                  ? disabled
                                  : +item?.status === 1
                                  ? () => setDisabled(disabled)
                                  : ''
                              }
                              onChange={(value) => onChangeSwitch(value, ind)}
                            />
                          </td>

                          <td className={`td_style td_style_${ind}`}>
                            {item.status === 1 ? (
                              <button
                                style={{ border: 'none', background: 'none' }}
                                onClick={() => unAssignedData(item.id)}
                              >
                                <UserAddOutlined size="large" style={{ color: 'green' }} />
                              </button>
                            ) : (
                              <button
                                style={{ border: 'none', background: 'none' }}
                                onClick={() =>
                                  deletedd
                                    ? updateDataOfAssetOne(item.id, item.device_id, item.unique_id)
                                    : updateDataOfAsset(
                                        item.id,
                                        item.device_id,
                                        item.unique_id,
                                        item.device_address,
                                        item.cust_id,
                                        item.partner,
                                        item.pwa_name,
                                        item.pwa_email,
                                        item.pwa_mobile,
                                        item.device_state,
                                        item.device_zip,
                                        item.installation,
                                        item.deviceunit_state,
                                        item.status,
                                      )
                                }
                              >
                                <UserAddOutlined size="large" style={{ color: 'red' }} />
                              </button>
                            )}
                          </td>
                          <td className={`td_style td_style_${ind}`}>
                            <button
                              onClick={() => {
                                openDeleteModal(setId(item.id), setName(item.name))
                              }}
                              style={{ border: 'none', background: 'none' }}
                            >
                              <DeleteOutlined
                                style={{
                                  color: 'red',
                                  fontWeight: 'bolder',
                                  fontSize: '18px',
                                }}
                              />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
        <Pagination
          onChange={handlePaginationOfAssets}
          pageSize={postPerPage}
          total={total}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
          style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'flex-start' }}
        />
      </div>
    </>
  )
}

export default AssetTwo
