import React, { useState, useEffect, message, useRef } from 'react'
import {
  AutoComplete,
  Button,
  Checkbox,
  Spin,
  Modal,
  Radio,
  Tooltip,
  Select,
  Pagination,
} from 'antd'
import axios from 'axios'
import {
  DeleteOutlined,
  UploadOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  FilterFilled,
} from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
import location_tag from '../../assets/images/location_tag.svg'
import export_img from '../../assets/images/export_img.svg'
import import_one from '../../assets/images/import_one.svg'
import sheet from '../../assets/images/sheets.png'
import { troesAPi } from '../../api'

import { CSVLink } from 'react-csv'
import { useNavigate } from 'react-router-dom'
import './location.css'
import '../universal.css'
import { notification } from 'antd'

const Location = () => {
  const [ide, setIde] = useState('')
  const [value, setValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isadminShow, setisAdminShow] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [id, setId] = useState('')
  const [isadminDelete, setisAdminDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [location, setLocation] = useState('')
  const [state, setState] = useState('')
  const [ZIP_code, setZipCode] = useState('')
  const [salesTax, setSalesTax] = useState('')
  const [userAdmit, setUserAdmit] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)
  const [name, setName] = useState([])
  const [partnerData, setPartnerData] = useState([])
  const [partner, setPartner] = useState('')
  const [modalGetRequest, setModalGetRequest] = useState([])
  const [bgColor, setBgColor] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  // const [messageApi, contextHolder] = message.useMessage()
  // const [counter, setCounter] = useState(1)
  const [isModalOpenForAddress, setIsModalOpenForAddress] = useState(false)
  const [isModalOpenForInventory, setIsModalOpenForInventory] = useState(false)
  const [dataforAddress, setDataForAddress] = useState([])
  const [installationName, setInstallationName] = useState('')
  const [inventryCount, setInventryCount] = useState('')
  const [deviceInfo, setDeviceInfo] = useState('')
  const [instalName, setInstalName] = useState('')
  const [data, setData] = useState([])
  const [csvTextColor, setcsvTextColor] = useState('transparent')
  const [csvwidth, setcsvwidth] = useState('136px')
  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')

  // himanshu code starts
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
  // himanshu code ends
  const handleOked = () => {
    setIsModalOpenForAddress(false)
  }
  const handleCanceled = () => {
    setIsModalOpenForAddress(false)
  }
  const handleOkedFor = () => {
    setIsModalOpenForInventory(false)
  }
  const handleCanceledFor = () => {
    setIsModalOpenForInventory(false)
  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const getLocationData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocationData(res.data.customers)
        setTotal(res.data.customers?.length)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [deleted])

  // const getData = () => {
  //   axios
  //     .get(`${troesAPi}/location`)
  //     .then((res) => {
  //       setName(res.data.customers)
  //       // setAssetData(res.data.devicedetail)
  //       // setLocationData(res.data.customers)
  //       // setLoading(false)
  //     })
  //     .catch((err) => console.log(err))
  // }
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
  const handleChange = (e) => {
    setPartner(e.target.value)
  }

  let allData = name?.map((item) => <option key={item.partner}>{item.partner}</option>)

  // useEffect(() => {
  //   getData()
  // }, [])

  async function signUp(e) {
    setLoading(true)
    setIsShown((current) => !current)
    e.preventDefault()

    const item = { location, partner, state, ZIP_code, salesTax }

    if ((location && partner && state && ZIP_code, salesTax)) {
      let result = await fetch(`${troesAPi}/locationregister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      result = await result.json()

      if (result.error) {
        alert('Location allready exists!!')
        setLoading(false)
      } else {
        setUserAdmit(true)
        setLoading(false)

        setTimeout(() => {
          setUserAdmit(false)
        }, 2000)

        getLocationData()
      }
    } else {
      alert('Invalid details')
      setLoading(false)
    }
  }

  useEffect(() => {
    setLocation('')
    setState('')
    setZipCode('')
    setSalesTax('')
  }, [isShown])
  async function updateAdmin(e) {
    // e.preventDefault()
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/update/${id}
    //homeApi}/update/${id}
    setisAdminShow((current) => !current)
    if (location && state && ZIP_code && salesTax) {
      let result = await fetch(`${troesAPi}/locationupdate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ location, partner, state, ZIP_code, salesTax }),
      })
      await result.json()
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      getLocationData()
    } else {
      alert('Invalid details')
      setLoading(false)
    }
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
  }
  const cancelCreate = (e) => {
    setIsShown((current) => !current)
  }

  const updateAdminID = (e, id) => {
    setisAdminShow((current) => !current)
  }

  const cancelCreateAdmin = (e) => {
    setisAdminShow((current) => !current)
  }
  const deleteLocated = () => {
    setisAdminDelete((current) => !current)
  }
  const cancelDeleteLocation = () => {
    setisAdminDelete((current) => !current)
  }
  const deleteLocation = async (id) => {
    setLoading(true)
    //https://pwacrm.tentoptoday.com/public/api/pwa_user/${id}
    //${homeApi}/admin/
    setisAdminDelete((current) => !current)

    const response = axios
      .delete(`${troesAPi}/location/${id}`)
      .then(() => {
        setDeleted((data) => !data)
        setUserDelete(true)
        setLoading(false)
        setTimeout(() => {
          setUserDelete(false)
        }, 2000)
      })
      .catch((err) => console.log(err))
  }

  const handleOk = (e) => {
    setIsModalOpen(false)
    setValue(!e.target.checked)
  }
  const handleCancel = (e) => {
    setIsModalOpen(false)
    setValue(!e.target.checked)
  }

  const onChangedModal = (e, ide) => {
    setIde(ide)
    setIsModalOpen(true)
    setValue(e.target.value)

    axios
      .get(`${troesAPi}/installationpopup/${ide}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        setModalGetRequest(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const toSeeDeviceAddress = (addresse) => {
    setInstallationName(addresse)
    setIsModalOpenForAddress(true)
    axios
      .get(`${troesAPi}/individualaddress/${addresse}`)
      .then((res) => {
        setDataForAddress(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const toSeeInventory = (addresse) => {
    setIsModalOpenForInventory(true)
    axios
      .get(`${troesAPi}/inventorydevice/${addresse}`)
      .then((res) => {
        setInventryCount(res.data.count)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(`${troesAPi}/activedevice/${addresse}`)
      .then((res) => {
        setDeviceInfo(res.data.count)
        // setInventryCount(res.data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [uploaded_file, setUploaded_file] = useState(null)

  const handleFileChange = (event) => {
    setUploaded_file(event.target.files[0])
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
    // setCounter(counter + 1)
    const formData = new FormData()
    formData.append('uploaded_file', uploaded_file)

    if (uploaded_file !== null && uploaded_file.type === 'text/csv') {
      fetch(`${troesAPi}/importdeviceaddress`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'content-type': 'application/json' },
        body: formData,
      })
        .then((response) => {
          response.json()

          // success()
        })
        .then((data, e) => {
          if (data) {
            setUploaded_file((e.target.files[0] = ''))
          }
        })
        .catch((err) => {
          console.error('Error:', err)
          // error()
        })
      openNotification()
    } else {
      openNotificationCsvWrong()
    }
    filereplace()
  }
  const text = <span>Addresses in this Installation</span>
  const textTwo = <span>Devices in this Installation</span>
  const textOne = <span>Installation Report</span>
  const csvDownloadRef = useRef(null)
  const fetchDataOfInstallation = () => {
    setLoading(true)
    setIsModalOpen(false)

    axios
      .get(`${troesAPi}/installationexport/${ide}`, { mode: 'no-cors' })
      .then(({ data }) => {
        setData(data)
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

  const selectInstallPartner = (value, e) => {
    setPartner(e.label)
  }
  const handleFilter = (e) => {
    setLoading(true)
    axios
      .get(`${troesAPi}/filterpartner?name=${partner}`)
      .then((res) => {
        setLocationData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  // pagination Start

  const handlePagination = (value) => {
    setPage(value)
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = locationData?.slice(indexOfFirstPage, indexOfLastPage)
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
    // if (type === 'page') {
    //   // Calculate the displayed page number based on current and postPerPage
    //   const displayedPageNumber = (current - 1) * postPerPage + 1
    //   return <a>{displayedPageNumber}</a>
    // }
    return originalElement
  }

  // pagination end

  return (
    <>
      <div className="admin__page" style={{ position: 'relative' }}>
        {loading ? (
          <div className="loading_part">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}

        <Modal
          title="Installation Report"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          contentClassName="custom-modal"
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => fetchDataOfInstallation()}
              style={{ borderRadius: '9px' }}
            >
              Export Report
            </Button>,
            <Button style={{ borderRadius: '9px' }} key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              style={{ borderRadius: '9px' }}
              key=""
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              OK
            </Button>,
          ]}
        >
          <p className="partner_name">Installation Name : {Object.keys(modalGetRequest)}</p>
          <table className="table theadPadding_remove">
            <thead>
              <th>Device ID</th>
              <th>Device Usage</th>
              <th style={{ textAlign: 'center' }}>User Name</th>
            </thead>
            <tbody>
              {Object.values(modalGetRequest).map((item, ind) =>
                item.map((itemm, ind) => {
                  return (
                    <tr key={ind}>
                      <td> {itemm.device_id}</td>
                      <td> {itemm.device_usage}</td>
                      <td style={{ textAlign: 'center' }}> {itemm.user_name}</td>
                    </tr>
                  )
                }),
              )}
            </tbody>
          </table>
        </Modal>

        <Modal
          title={`Installation : ${installationName} `}
          open={isModalOpenForAddress}
          onOk={handleOked}
          onCancel={handleCanceled}
        >
          <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Device Addresses</p>
          {dataforAddress &&
            dataforAddress.map((item, ind) => {
              return (
                <div key={ind}>
                  <p>
                    <span style={{ paddingRight: '5px' }}>{ind + 1}.</span>
                    {item.device_address}
                  </p>
                  <p>
                    <hr style={{ width: '99%', margin: 'auto' }} />
                  </p>
                </div>
              )
            })}
        </Modal>
        <Modal
          title={`Installation : ${instalName} `}
          open={isModalOpenForInventory}
          onOk={handleOkedFor}
          onCancel={handleCanceledFor}
        >
          <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Device information</p>
          <div>
            <p>Devices in Inventory : {inventryCount}</p>
            <p>Number of Active Devices : {deviceInfo}</p>
          </div>
        </Modal>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p className="location__acount">Installation Management</p>
          </div>

          <button onClick={handleClicked} id="universalButton" style={{ gap: '5px' }}>
            <img
              src={location_tag}
              alt="logo"
              style={{ width: '22px', height: '15px', marginTop: '-2px' }}
            />
            Add New Installation
          </button>
        </div>
        <p className="total__location">Total Installation : {locationData?.length}</p>

        <div>
          <div className="second_mainDiv_location">
            <div className="filter_partner">
              <div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select id="option__value_Location" onChange={handleChange}>
                    <option value="">All Partners</option>
                    {partnerData &&
                      partnerData.map((item, index) => {
                        return (
                          <option key={index} data-name={item.id} value={item.name}>
                            {item.name}
                          </option>
                        )
                      })}
                  </select>

                  <button id="universalButton" onClick={(e) => handleFilter(e)}>
                    <FilterFilled
                      style={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bolder',
                        display: 'block',
                        float: 'left',
                        paddingRight: '5px',
                      }}
                    />
                  </button>

                </div>
              </div>
              <form
                className="import_csv_class"
                onSubmit={handleSubmit}
                style={{ gap: '6px', display: 'flex' }}
              >
                <input
                  className="w-55 input_type_file"
                  ref={inputRef}
                  style={{ width: csvwidth, color: csvTextColor }}
                  accept=".csv"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <button
                  className="import_report"
                  style={bgColor ? { backgroundColor: '#1890ff' } : { backgroundColor: '#cc9ceb' }}
                  type="submit"
                >
                  <img src={import_one} alt="edit" style={{ width: '22px', height: '15px' }} />
                  Import Device Address
                </button>
              </form>
            </div>
          </div>
        </div>

        <CSVLink
          data={data}
          //headers={headers}
          filename={`${Object.keys(modalGetRequest)}_Report.csv`}
          target="_blank"
          ref={csvDownloadRef}
        />
        <div
          className="show__notShow"
          style={{
            display: isShown ? 'block' : 'none',
          }}
        >
          <form onSubmit={signUp}>
            <div id="create_Location">
              <p>Add new Installation</p>
            </div>

            <div id="form__admin__locate">
              <p className="nameEmail__Location" style={{ paddingTop: '20px' }}>
                Installation Name
              </p>
              <input
                className="locate__input"
                type="text"
                name="location"
                value={location}
                placeholder="Ex. Submarine Base"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <p className="nameEmail__Location partner_margin">Partner</p>
              <div className="">
                <Select
                  showSearch
                  style={{
                    width: 250,
                    marginLeft: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#ebebeb',
                    marginTop: '5px',
                    zIndex: 2,
                  }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  onChange={(value, e) => selectInstallPartner(value, e)}
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={(partnerData || []).map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
              </div>

              <p className="nameEmail__Location">State</p>
              <input
                className="locate__input"
                type="text"
                name="state"
                value={state}
                placeholder="Ex. New London"
                onChange={(e) => setState(e.target.value)}
                required
              />

              <p className="nameEmail__Location">Zip Code</p>
              <input
                className="locate__input"
                type="number"
                name="ZIP_code"
                value={ZIP_code}
                placeholder=" 111222"
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
              <p className="nameEmail__Location">Sales Tax</p>
              <input
                className="locate__input"
                type="number"
                name="salesTax"
                value={salesTax}
                placeholder=" 7%"
                onChange={(e) => setSalesTax(e.target.value)}
                required
              />

              <div className="locate_side" style={{ paddingLeft: '10px' }}>
                <button
                  type="submit"
                  className="create_new__location"
                  // onClick={signUp}
                  // disabled={disabled}
                >
                  Add
                </button>
                <Button
                  onClick={cancelCreate}
                  className="cancel__create__location"
                  id="not_ShowCancel"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="show__notShow"
          style={{
            display: isadminShow ? 'block' : 'none',
          }}
        >
          <div id="create_Location">
            <p>Edit Installation</p>
          </div>

          <div id="form__admin__locate">
            <p className="nameEmail__Location" style={{ paddingTop: '20px' }}>
              Installation Name
            </p>
            <input
              className="locate__input"
              type="text"
              name="location"
              value={location}
              placeholder="Ex. Submarine Base"
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="nameEmail__Location partner_margin">Partner</p>
            <div>
              <Select
                showSearch
                style={{
                  width: 250,
                  marginLeft: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#ebebeb',
                  marginTop: '5px',
                  zIndex: 2,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={(value, e) => selectInstallPartner(value, e)}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={(partnerData || []).map((d) => ({
                  value: d.id,
                  label: d.name,
                }))}
              />
            </div>

            <p className="nameEmail__Location">State</p>
            <input
              className="locate__input"
              type="text"
              name="state"
              value={state}
              placeholder="Ex. New London"
              onChange={(e) => setState(e.target.value)}
            />

            <p className="nameEmail__Location">Zip Code</p>
            <input
              className="locate__input"
              type="number"
              name="ZIP_code"
              value={ZIP_code}
              placeholder=" 111222"
              onChange={(e) => setZipCode(e.target.value)}
            />
            <p className="nameEmail__Location">Sales Tax</p>
            <input
              className="locate__input"
              type="number"
              name="salesTax"
              value={salesTax}
              placeholder="7%"
              onChange={(e) => setSalesTax(e.target.value)}
            />

            <div className="locate_side" style={{ paddingLeft: '10px' }}>
              <button
                type="submit"
                className="create_new__location"
                onClick={() => updateAdmin(id)}
                // disabled={disabled}
              >
                Update
              </button>
              <Button
                onClick={cancelCreateAdmin}
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
            display: isadminDelete ? 'block' : 'none',
          }}
        >
          <div id="confirm__delete_location">
            <p>Confirm Delete</p>
          </div>
          <div id="delete__Location">
            <p>Are you sure you want to delete location</p>
            <p style={{ marginTop: '-10px' }}>
              <span style={{ fontWeight: 'bolder' }}>{RowData.location}</span>
            </p>
            <p style={{ marginTop: '-10px' }}> This process is Irreversible</p>
            <div style={{ paddingLeft: '10px' }}>
              <button
                onClick={() => deleteLocation(id)}
                type="submit"
                className="delete_new__admin"
              >
                Delete
              </button>
              <button
                onClick={cancelDeleteLocation}
                className="cancel__create__location"
                type="submit"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <table className="table table-hover">
            <thead className="location__information">
              <tr>
                <th className="t_Name">S.No.</th>
                <th>
                  {/* <img
                    src={sheet}
                    alt="upload_img"
                    style={{
                      width: '20px',
                      marginTop: '-7px',
                      // marginLeft: '4px',
                      cursor: 'pointer',
                    }}
                  /> */}
                </th>

                <th className="t_Name">Name</th>
                <th className="t_Name">Device Address</th>
                <th className="t_Name">Device Info</th>
                <th className="t_Name">Partner</th>
                <th className="t_Name">State</th>
                <th className="t_Name">Zip Code</th>
                <th className="t_Name">Sales Tax(%)</th>
                <th className="t_Name">Date</th>
                <th className="t_Name text-center">Update</th>
                <th className="t_Name">Delete</th>
              </tr>
            </thead>

            <tbody style={{ background: '#fff' }}>
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
                  return (
                    <tr key={index}>
                      <td className="px-4">{displayedIndex}</td>
                      <td>
                        <div onClick={(e) => onChangedModal(e, item.id)} value={value}>
                          <Tooltip placement="topLeft" title={textOne}>
                            <img
                              src={sheet}
                              alt="upload_img"
                              style={{
                                width: '20px',
                                marginTop: '-7px',
                                // marginLeft: '4px',
                                cursor: 'pointer',
                              }}
                            />
                          </Tooltip>
                        </div>
                      </td>

                      <td>{item.location}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        className="px-5"
                        onClick={() => toSeeDeviceAddress(item.location)}
                        value={item.location}
                      >
                        <Tooltip placement="topLeft" title={text}>
                          <HomeOutlined />
                        </Tooltip>
                      </td>
                      <td
                        style={{ cursor: 'pointer' }}
                        className="px-5"
                        onClick={() => toSeeInventory(item.location, setInstalName(item.location))}
                        value={item.location}
                      >
                        <Tooltip placement="topLeft" title={textTwo}>
                          <InfoCircleOutlined />
                        </Tooltip>
                      </td>
                      <td>{item.partner}</td>

                      <td>{item.state}</td>
                      <td>{item.ZIP_code}</td>
                      <td>
                        {item.salesTax}
                        {item.salesTax ? '%' : ''}
                      </td>
                      <td>{numOfDaata}</td>

                      <td className="text-center">
                        <button
                          onClick={() => {
                            setLocation(item.location)
                            setPartner(item.partner)
                            setState(item.state)
                            setZipCode(item.ZIP_code)
                            setSalesTax(item.salesTax)
                            updateAdminID(SetRowData(item), setId(item.id))
                          }}
                          className="update__Location"
                        >
                          <img src={editPen} alt="edit" className="editn_btn_global" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete__Location__of"
                          onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
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

        <div
          className="user__detail__popup__location"
          style={{
            display: userAdmit ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={location_tag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                height: '15px',
                objectFit: 'contain',
              }}
            />
            <p className="admin_registerd__pop">New location added successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__location"
          style={{
            display: userUpdate ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={location_tag}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="admin_registerd__pop">Location information updated.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__location"
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
            <p className="admin_registerd__pop">Location has been deleted.</p>
          </div>
        </div>
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
            display: 'flex',
            marginTop: '10px',
            justifyContent: 'flex-start',
          }}
        />
      </div>
    </>
  )
}

export default Location
