import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import refresh from '../../assets/images/refresh.svg'
import { troesAPi } from '../../api'
import { DeleteOutlined } from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
import import_one from '../../assets/images/import_one.svg'
import check_sign from '../../assets/images/check_sign.svg'
import filter_bar from '../../assets/images/filter_bar.svg'
import six_dots from '../../assets/images/six_dots.svg'
import ep_pricetag from '../../assets/images/ep_pricetag.svg'
import { Button, Spin, message, Space } from 'antd'
import { EyeFilled, CloseCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import './Asset.css'
const Asset = () => {
  const [assetData, setAssetData] = useState([])
  const [changBackgroundAll, setChangeBackgroundAll] = useState(true)
  const [changBackgroundAssigned, setChangeBackgroundAssigned] = useState(false)
  const [changBackgroundUnAssigned, setChangeBackgroundUnAssigned] = useState(false)
  const [filtritemHide, setFilterItemHide] = useState(false)
  const [name, setName] = useState([])

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
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)

  const [bgColor, setBgColor] = useState(false)
  // state for update start
  const [device_id, setDeviceId] = useState('')
  const [cust_id, setCustId] = useState('')
  const [partner, setPartner] = useState('')
  const [device_address, setDeviceAddress] = useState('')
  const [device_state, setDeviceState] = useState('')
  const [deviceunit_state, setDeviceUnitState] = useState('')
  const [status, setStatus] = useState('')
  const [action, setAction] = useState('')
  const [device_zip, setDeviceZip] = useState('')

  // state for update end

  // imports csv start
  const [messageApi, contextHolder] = message.useMessage()
  const [counter, setCounter] = useState(1)

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
  }

  // imports csv end

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
    getAssetData()
  }
  const ButtonofAssigned = () => {
    setChangeBackgroundAssigned(true)
    setChangeBackgroundUnAssigned(false)
    setChangeBackgroundAll(false)
    setLoading(true)
    axios
      .get(`${troesAPi}/devicedetails?status&action=0`)
      .then((res) => {
        setLoading(false)

        setAssetData(res.data.devicedetail.datadetail)
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
      .get(`${troesAPi}/devicedetails?status&action=1`)
      .then((res) => {
        setAssetData(res.data.devicedetail.datadetail)
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

  // Update PART start
  const updateAssetsID = (item) => {
    console.log(item, 'kkk')
    setisAssetsShow((current) => !current)
    setDeleted((data) => !data)
  }
  const cancelupdateAssets = () => {
    setisAssetsShow((current) => !current)
  }

  useEffect(() => {
    axios
      .get(`${troesAPi}/alldevicedetails`)
      .then((res) => {
        console.log(res.data, 'ooo')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  async function updateAssets(e) {
    setisAssetsShow((current) => !current)
    setLoading(true)
    const item = {
      device_id,
      cust_id,
      partner,
      device_address,
      device_state,
      deviceunit_state,
      status,
      action,
      device_zip,
    }
    if (
      device_id &&
      cust_id &&
      partner &&
      device_address &&
      device_state &&
      deviceunit_state &&
      status &&
      action &&
      device_zip
    ) {
      let result = await fetch(`${troesAPi}/deviceupdate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      await result.json()
      setDeleted((data) => !data)
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      //getLocationData()
    } else {
      setLoading(true)

      setTimeout(() => {
        alert('Invalid details')
        setLoading(false)
      }, 2000)
    }
  }

  // Update PART end

  // DELETE PART
  const deleteAssets = () => {
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
    updateAssetsID()
    getModalData()
  }, [showTable, deleted])
  useEffect(() => {
    updateAssetsID()
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
              }}
            >
              <img src={filter_bar} alt="filter-bar" style={{ padding: '8px' }} />
            </div>
            {filtritemHide ? (
              <div style={{ cursor: 'pointer' }} onClick={() => setFilterItemHide(false)}>
                <CloseCircleOutlined style={{ width: '30px' }} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            {filtritemHide ? (
              <div className="filterBar_position">
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
                              console.log(item.status, 'object'),
                            )
                          }}
                          ref={inputElement}
                        >
                          {item.status == 0 ? <EyeInvisibleOutlined /> : <EyeFilled />}
                        </button>
                      </div>
                    )
                  })}
              </div>
            ) : (
              ''
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <input accept=".csv" type="file" onChange={handleFileChange} />
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
            display: isassetsShow ? 'block' : 'none',
          }}
        >
          <div id="create_assets__edit">
            <p>Edit Assets</p>
          </div>

          <div id="form__asset__update">
            <p className="nameEmail__Location" style={{ paddingTop: '20px' }}>
              Device Id
            </p>
            <input
              className="locate__input"
              type="text"
              name="device_id"
              value={device_id}
              placeholder="Ex. Submarine Base"
              onChange={(e) => setDeviceId(e.target.value)}
            />

            <p className="nameEmail__Location">User Id</p>
            <input
              className="locate__input"
              type="text"
              name="cust_id"
              value={cust_id}
              placeholder="Ex. New London"
              readOnly={true}
              //onChange={(e) => setCustId(e.target.value)}
            />

            <p className="nameEmail__Location">Partner</p>
            <input
              className="locate__input"
              type="text"
              name="partner"
              value={partner}
              placeholder=" 111222"
              onChange={(e) => setPartner(e.target.value)}
            />
            <p className="nameEmail__Location">Device Address</p>
            <input
              className="locate__input"
              type="text"
              name="device_address"
              value={device_address}
              placeholder="7%"
              onChange={(e) => setDeviceAddress(e.target.value)}
            />
            <p className="nameEmail__Location">Device State</p>
            <input
              className="locate__input"
              type="text"
              name="device_state"
              value={device_state}
              placeholder="7%"
              onChange={(e) => setDeviceState(e.target.value)}
            />
            <p className="nameEmail__Location">Device Unit State</p>
            <input
              className="locate__input"
              type="text"
              name="deviceunit_state"
              value={deviceunit_state}
              placeholder="7%"
              onChange={(e) => setDeviceUnitState(e.target.value)}
            />
            <p className="nameEmail__Location">Status</p>
            <input
              className="locate__input"
              type="text"
              name="status"
              value={status}
              placeholder="7%"
              onChange={(e) => setStatus(e.target.value)}
            />
            <p className="nameEmail__Location">Action</p>
            <input
              className="locate__input"
              type="text"
              name="action"
              value={action}
              placeholder="7%"
              onChange={(e) => setAction(e.target.value)}
            />
            <p className="nameEmail__Location">Device ZIP</p>
            <input
              className="locate__input"
              type="number"
              name="device_zip"
              value={device_zip}
              placeholder="7%"
              onChange={(e) => setDeviceZip(e.target.value)}
            />

            <div className="locate_side" style={{ paddingLeft: '10px' }}>
              <button
                type="submit"
                className="create_new__location"
                onClick={() => updateAssets(id)}
              >
                Update
              </button>
              <Button
                onClick={cancelupdateAssets}
                className="cancel__create__location"
                id="not_ShowCancel"
              >
                Cancel
              </Button>
            </div>
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
            <div className="first_div">
              <table className="table_part">
                <thead>
                  <tr className="asset__acount">
                    <th className="th_style">S.No.</th>
                    <th className="th_style">Device ID</th>
                    <th className="th_style">Unique ID</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {assetData &&
                    assetData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="td_style">{index + 1}</td>
                          <td className="td_style">{item[0]}</td>
                          <td className="td_style">{item[1]}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <div className="second_div">
              <table className="table_part">
                <thead>
                  <tr className="asset__acount">
                    <th
                      className="th_style"
                      style={arrayDataOne[0] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[0] == 0 ? '' : arrayData[0]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[1] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[1] == 0 ? '' : arrayData[1]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[2] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[2] == 0 ? '' : arrayData[2]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[3] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[3] == 0 ? '' : arrayData[3]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[4] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[4] == 0 ? '' : arrayData[4]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[5] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[5] == 0 ? '' : arrayData[5]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[6] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[6] == 0 ? '' : arrayData[6]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[7] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[7] == 0 ? '' : arrayData[7]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[8] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[8] == 0 ? '' : arrayData[8]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[9] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[9] == 0 ? '' : arrayData[9]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[10] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[10] == 0 ? '' : arrayData[10]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[11] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[11] == 0 ? '' : arrayData[11]}
                    </th>
                    <th
                      className="th_style"
                      style={arrayDataOne[12] == 0 ? { display: 'none' } : { display: '' }}
                    >
                      {arrayDataOne[12] == 0 ? '' : arrayData[12]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assetData &&
                    assetData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td
                            className="td_style"
                            style={item[2] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[2]}
                          </td>
                          <td
                            className="td_style"
                            style={item[3] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[3]}
                          </td>
                          <td
                            className="td_style"
                            style={item[4] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[4]}
                          </td>
                          <td
                            className="td_style"
                            style={item[5] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[5]}
                          </td>
                          <td
                            className="td_style"
                            style={item[6] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[6]}
                          </td>
                          <td
                            className="td_style"
                            style={item[7] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[7]}
                          </td>
                          <td
                            className="td_style"
                            style={item[8] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[8]}
                          </td>
                          <td
                            className="td_style"
                            style={item[9] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[9]}
                          </td>
                          <td
                            className="td_style"
                            style={item[10] == 'notUse' ? { display: 'none' } : { display: '' }}
                          >
                            {item[10]}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <div className="third-div">
              <table className="table_part">
                <thead>
                  <tr className="asset__acount">
                    <th className="th_style">Status</th>
                    <th className="th_style">Action</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff' }}>
                  {assetData &&
                    assetData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="td_style">{item[11] == 0 ? 'Active' : 'InActive'}</td>
                          <td className="td_style">{item[12] == 0 ? 'Assigned' : 'UnAssigned'}</td>
                          <td className="td_style">
                            <button
                              className="update__Location"
                              onClick={() => {
                                setisAssetsShow((current) => !current)
                                setDeviceId(item[0]?.join(''))
                                setDeviceAddress(item[10] == 'notUse' ? '' : item[10]?.join(''))
                                setDeviceState(item[4] == 'notUse' ? '' : item[4]?.join(''))
                                setPartner(item[15] == 'notUse' ? '' : item[15]?.join(''))
                                setDeviceUnitState(item[6] == 'notUse' ? '' : item[6]?.join(''))
                                setCustId(item[9] == 'notUse' ? '' : item[9]?.join(''))
                                setDeviceZip(item[14] == 'notUse' ? '' : item[14]?.join(''))
                                setAction(item[12]?.join(''))
                                setStatus(item[11]?.join(''))
                                setId(item[13])
                              }}
                            >
                              <img src={editPen} alt="edit" style={{ width: '20px' }} />
                            </button>
                          </td>
                          <td className="td_style">
                            <button
                              className="delte__table"
                              onClick={() => deleteAssets(setAssetDataa(item[0]), setId(item[13]))}
                            >
                              {/* <img src={deletePage} alt="delete" /> */}
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
            display: userUpdate ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={ep_pricetag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="admin_registerd__pop">Assests information updated.</p>
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
      </div>
    </>
  )
}

export default Asset
