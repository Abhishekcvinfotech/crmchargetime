import React, { useEffect } from 'react'
import './partner.css'
import '../universal.css'
import right_arrow from '../../assets/images/right_arrow.svg'
import export_img from '../../assets/images/export_img.svg'

import location_tag from '../../assets/images/location_tag.svg'
import { troesAPi } from '../../api'
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
// import { ExportToCsv } from 'csv-export'
import { CSVLink } from 'react-csv'
import { IoIosClose } from 'react-icons/io'
import { useState } from 'react'
import { Spin, Modal, Button, Tooltip, Popconfirm, message, Pagination } from 'antd'
import axios from 'axios'
import { useRef } from 'react'
import Excelicon from '../../assets/images/excelicon.svg'
import { color } from '@mui/system'

import CheckgreenCircle from '../../assets/images/CheckgreenCircle.svg'
import Redcircle from '../../assets/images/Redcircle.svg'

const Partner = () => {
  const [ide, setIde] = useState('')

  const [partnerForCreate, setPartnerForCreate] = useState(false) // add modal handle
  const [isPartnerModal, setIsPartnerModal] = useState(false) // update modal handle
  const [isPartnerDelete, setIsPartnerDelete] = useState(false) // delete modal handle

  // bottom popup start

  const [partnerAdmit, setPartnerAdmit] = useState(false)
  const [partnerUpdate, setPartnerUpdate] = useState(false)
  const [partnerDelete, setPartnerDelete] = useState(false)

  // bottom popup end

  const [deleted, setDeleted] = useState(false)
  const [allPartnerData, setAllPartnerData] = useState([])
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)

  //for counting Length of assigned, active  state hook start

  const [deviceAssignedLength, setDeviceAssignedLength] = useState('')
  const [deviceInstalledLength, setDeviceInstalledLength] = useState('')
  const [deviceActiveLength, setDeviceActiveLength] = useState('')

  //for counting Length of assigned, active  state hook end

  // for post modal start

  const [name, setName] = useState('')
  const [partner_id, setParnerId] = useState('')
  const [main_poc, setMainPoc] = useState('')
  const [poc_email, setPocEmail] = useState('')
  const [poc_phone, setPocPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  // const [image, setImage] = useState('')

  const [data, setData] = useState([])

  const [value, setValue] = useState('')
  const [partner, setPartner] = useState([])
  const [filterData, setFilterData] = useState('')
  const [note, setNote] = useState('block')
  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')
  const [imageOne, setImageOne] = useState(null)
  //show popup modal start
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalGetData, setModalGetData] = useState('')
  const [refresh, setrefresh] = useState(false)

  // const clearFileInput = () => {
  //  setImage('')
  // };
  const handleOk = (e) => {
    setIsModalOpen(false)
    setValue((checked) => !checked)
  }
  const handleCancel = (e) => {
    setIsModalOpen(false)
    setValue(!e.target.checked)
  }

  //show popup modal end

  const getAllData = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/partnerdetails`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        setAllPartnerData(res.data.partnerdetails)
        setTotal(res.data.partnerdetails.length)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const onChangedModal = (e, ide) => {
    setIde(ide)
    setIsModalOpen(true)
    setValue(e.target.value)

    axios
      .get(`${troesAPi}/popuppartner/${ide}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      })
      .then((res) => {
        setModalGetData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //for post modal end

  // export csv file start

  const csvDownloadRef = useRef(null)
  const fetchData = (e) => {
    setLoading(true)
    setIsModalOpen(false)
    setValue((checked) => !checked)
    axios
      .get(`${troesAPi}/partnerusage/${ide}`)
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

  // export csv file end

  const handleMobile = (e) => {
    const limit = 10
    setPocPhone(e.target.value.slice(0, limit))
  }
  const handleZipcode = (e) => {
    const limit = 6
    setZip(e.target.value.slice(0, limit))
  }

  const [image, setImage] = useState(null)
  const handleImage = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.onload = () => {
        const { width, height } = image
        if (
          width > 1000 ||
          height > 1000 ||
          file.size >= 1000000 ||
          (file.type !== 'image/Jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
        ) {
          alert('Image dimensions should not exceed 1000x1000 pixels.')
          event.target.value = null
          setNote('block')
        } else {
          setImage(event.target.files[0])
          setNote('none')
        }
      }
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateImage = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = new Image()
      image.onload = () => {
        const { width, height } = image
        if (
          width > 1000 ||
          height > 1000 ||
          file.size >= 1000000 ||
          (file.type !== 'image/Jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
        ) {
          alert('Image dimensions should not exceed 1000x1000 pixels.')
          event.target.value = null
          setNote('block')
        } else {
          setImage(event.target.files[0])
          setNote('none')
        }
      }
      image.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const fileAddInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const updatePartnerModal = (id, imageName) => {
    setNote('none')
    setIsPartnerModal((data) => !data)
    const file = new File([], imageName, { type: 'image/jpeg' })
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    fileInputRef.current.files = dataTransfer.files
    fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const ref = useRef()
  async function createPartnerData(e) {
    e.preventDefault()
    setLoading(true)

    if (
      name &&
      partner_id &&
      main_poc &&
      poc_email &&
      poc_phone &&
      address &&
      state &&
      zip &&
      image
    ) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('partner_id', partner_id)
      formData.append('main_poc', main_poc)
      formData.append('poc_email', poc_email)
      formData.append('poc_phone', poc_phone)
      formData.append('address', address)
      formData.append('state', state)
      formData.append('zip', zip)
      formData.append('image', image)

      try {
        const result = await fetch(`${troesAPi}/partnerregister`, {
          method: 'POST',
          mode: 'cors',
          body: formData,
        })

        const data = await result.json()

        if (data.error) {
          setPartnerAdmit(false)
          alert(data.message)
        } else {
          setPartnerAdmit(true)
          setTimeout(() => {
            setPartnerAdmit(false)
          }, 5000)
        }
        setrefresh((data) => !data)
        setLoading(false)

        setPartnerForCreate(false)
        setTimeout(function () {
          setNote('block')
        }, 1000)
        getAllData()
        ref.current.value = ''
      } catch (error) {
        console.error('Error:', error)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }
  useEffect(() => {
    setName('')
    setParnerId('')
    setMainPoc('')
    setPocEmail('')
    setPocPhone('')
    setAddress('')
    setState('')
    setZip('')
    setImage('')
    setImageOne('')
  }, [partnerForCreate])

  async function updatePartner(e) {
    // e.preventDefault();
    setLoading(true)
    setTimeout(function () {
      setNote('block')
    }, 1000)

    if (name && partner_id && main_poc && poc_email && poc_phone && address && state && zip) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('partner_id', partner_id)
      formData.append('main_poc', main_poc)
      formData.append('poc_email', poc_email)
      formData.append('poc_phone', poc_phone)
      formData.append('address', address)
      formData.append('state', state)
      formData.append('zip', zip)
      formData.append('image', image)
      try {
        let result = await fetch(`${troesAPi}/partner/${id}`, {
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: formData,
        })
        await result.json()
        setPartnerUpdate(true)
        setLoading(false)
        setIsPartnerModal(false)
        setTimeout(() => {
          setPartnerUpdate(false)
        }, 2000)
        setrefresh((data) => !data)
        getAllData()
      } catch (error) {
        console.error('Error occurred while updating:', error)
        setLoading(false)
      }
    } else {
      alert('Invalid details')
      setLoading(false)
    }
  }
  useEffect(() => {
    setImage('')
    setImageOne('')
  }, [refresh])
  const deletePartner = async (id) => {
    setLoading(true)

    const response = axios
      .delete(`${troesAPi}/partnerdelete/${id}`)
      .then((res) => {
        setDeleted((data) => !data)
        setPartnerDelete(true)
        setIsPartnerDelete(false)
        setLoading(false)
        setTimeout(() => {
          setPartnerDelete(false)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllData()
  }, [deleted])

  const getAllPartner = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/selectpartner`)
      .then((res) => {
        setPartner(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  useEffect(() => {
    getAllPartner()
  }, [])

  const handleChange = (e) => {
    setFilterData(e.target.value)
  }

  const handleFilter = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/filterpartner?name=${filterData}`)
      .then((res) => {
        setAllPartnerData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  //add modal start
  const addPartnerModalOpen = () => {
    setPartnerForCreate(true)
  }

  const cancelAddPartnerModalOpen = () => {
    setPartnerForCreate(false)
    // clearFileInput();
    ref.current.value = ''
    setImage('')
    setImageOne('')
  }
  // add modal end

  // update modal start

  const cancelupdatePartners = () => {
    setIsPartnerModal(false)
    setTimeout(function () {
      setNote('block')
    }, 1000)
  }
  // update modal end

  // delete modal start
  const openDeleteModal = () => {
    setIsPartnerDelete((data) => !data)
  }
  const cancelDeleteModalPopup = () => {
    setIsPartnerDelete(false)
  }
  // delete modal end
  //length of assigned active function start

  const onChangedDeviceAssignedLength = (id) => {
    axios
      .get(`${troesAPi}/partnerassign/${id}`)
      .then((res) => {
        setDeviceAssignedLength(res.data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const onChangedDeviceInstalleedLength = (id) => {
    axios
      .get(`${troesAPi}/partnerinstalled/${id}`)
      .then((res) => {
        setDeviceInstalledLength(res.data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const onChangedDeviceActiveLength = (id) => {
    axios
      .get(`${troesAPi}/partneractive/${id}`)
      .then((res) => {
        setDeviceActiveLength(res.data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const cancel = (e) => {
    console.log(e)
    //message.error('Click on No')
  }

  // pagination Start

  const handlePagination = (value) => {
    setPage(value)
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = allPartnerData?.slice(indexOfFirstPage, indexOfLastPage)
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

  // pagination end

  //length of assigned active function end

  const textOne = <span> Partner Report</span>
  const textTwo = <span> Device Assigned</span>
  const textThree = <span> Device Installed</span>
  const textFour = <span> Device Active</span>
  return (
    <>
      <div>
        {loading ? (
          <div className="loading_part">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}
        <Modal
          title="Partner Report"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          
        >
          <p className="partner_name">Partner Name : {Object.keys(modalGetData)}</p>
          <table className="table theadPadding_remove">
            <thead className="" style={{paddingLeft : '10px'}}>
              <th>Device ID</th>
              <th style={{ textAlign: 'center' }}>Device Usage</th>
              <th style={{ textAlign: 'center' }}>User Name</th>
            </thead>
            <tbody>
              {Object.values(modalGetData).map((item, ind) =>
                item.map((itemm, ind) => {
                  return (
                    <tr key={ind}>
                      <td> {itemm.device_id}</td>
                      <td style={{ textAlign: 'center' }}> {itemm.device_usage}</td>
                      <td style={{ textAlign: 'center' }}> {itemm.user_name}</td>
                    </tr>
                  )
                }),
              )}
            </tbody>

          </table>
          <div className='pricingbutton_wrap'> 
          <Button
              style={{ borderRadius: '6px' }}
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => fetchData()}
            >
              Export Report
            </Button>
            <Button style={{ borderRadius: '6px' }} key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              style={{ borderRadius: '6px' }}
              key=""
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              OK
            </Button>
            </div>
        </Modal>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className='parent_wrap'
        >
          <p className="partner__acount">Partners </p>

          <div className="filter_users">
            <div>
              <button id="add_partner" onClick={addPartnerModalOpen} style={{ gap: '5px' }}>
                <img src={right_arrow} alt="edit" style={{ width: '22px', height: '15px' }} />
                Add Partner
              </button>
            </div>
          </div>
        </div>
        <div className="main_div_filters_partners">
          <CSVLink
            data={data}
            // headers={headers}
            filename={`${Object.keys(modalGetData)}_Report.csv`}
            target="_blank"
            ref={csvDownloadRef}
          />
        </div>

        <div>
          {partnerForCreate && (<div className="modal-backdrop" onClick={cancelAddPartnerModalOpen} >
          </div>

          )}



          <div
            className="show__notShow_partner"
            style={{
              display: partnerForCreate ? 'block' : 'none',
            }}
          >
            <div id="create_partner__edit">

              <p>Add Partner</p>
              <IoIosClose className="sortcross" onClick={cancelAddPartnerModalOpen} />
            </div>


            <form onSubmit={createPartnerData}>
              <div id="form__partner__update">
                <label className="label__Partner" style={{ paddingTop: '20px' }}>
                  Name
                </label>
                <input
                  className="input__partner"
                  type="text"
                  name="name"
                  value={name}
                  required
                  placeholder="Enter Partner name"
                  onChange={(e) => setName(e.target.value)}
                  minLength={3}
                />

                <label className="label__Partner">Partner ID</label>
                <input
                  className="input__partner"
                  type="text"
                  name="partner_id"
                  value={partner_id}
                  placeholder="Enter Partner ID"
                  onChange={(e) => setParnerId(e.target.value)}
                  required
                />

                <label className="label__Partner">Main POC</label>
                <input
                  className="input__partner"
                  type="text"
                  name="main_poc"
                  value={main_poc}
                  placeholder="Enter Main POC"
                  onChange={(e) => setMainPoc(e.target.value)}
                  required
                />
                <label className="label__Partner">POC Email</label>
                <input
                  className="input__partner"
                  type="text"
                  name="poc_email"
                  value={poc_email}
                  placeholder="Enter Partner Email"
                  onChange={(e) => setPocEmail(e.target.value)}
                  required
                />
                <label className="label__Partner">POC Phone </label>
                <input
                  className="input__partner"
                  type="number"
                  name="poc_phone"
                  value={poc_phone}
                  placeholder="Enter Partner Contact"
                  onChange={handleMobile}
                  // onChange={(e) => setPocPhone(e.target.value)}
                  onKeyDown={(evt) =>
                    (evt.key === '-' || evt.key === 'e' || evt.key === 'E' || evt.key === '.') &&
                    evt.preventDefault()
                  }
                  required
                />
                <label className="label__Partner">Address</label>
                <input
                  className="input__partner"
                  type="text"
                  name="address"
                  value={address}
                  placeholder="Enter Partner Address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label className="label__Partner">State</label>
                <input
                  className="input__partner"
                  type="text"
                  name="state"
                  value={state}
                  placeholder="Enter State Name"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
                <label className="label__Partner">ZIP</label>
                <input
                  className="input__partner"
                  type="number"
                  name="zip"
                  value={zip}
                  placeholder="Enter ZIP Code"
                  onChange={handleZipcode}
                  // onChange={(e) => setZip(e.target.value)}
                  onKeyDown={(evt) =>
                    (evt.key === '-' || evt.key === 'e' || evt.key === 'E' || evt.key === '.') &&
                    evt.preventDefault()
                  }
                  required
                />
                <label className="label__Partner">Partner logo</label>

                <input
                  type="file"
                  required
                  accept=".png, .jpg, .jpeg"
                  style={{ width: '240px' }}
                  onChange={handleImage}
                  ref={ref}
                />

                <p style={{ color: 'red', fontSize: '11px', padding: '1px 10px', display: note }}>
                  Note: Please select only Image file( eg: .png, .jpg, .jpeg)
                  <br />
                  Max File size: 1MB allowed
                </p>

                <div className="locate_side" >

                  <button
                    onClick={cancelAddPartnerModalOpen}
                    className="cancel__create__partner"
                    id="not_ShowCancel"
                  >
                    Cancel
                  </button>


                  <button type="submit" className="create_new__partner">
                    Add
                  </button>

                </div>
              </div>
            </form>
          </div>

        </div>

        <div>   {isPartnerModal && (
          <div className="modal-backdrop" onClick={cancelupdatePartners} >
          </div>
        )}

          <div
            className="show__notShow_partner"
            style={{
              display: isPartnerModal ? 'block' : 'none',
            }}
          >
            <div id="create_partner__edit">
              <p>Edit Partner</p>
              <IoIosClose className="sortcross" onClick={cancelupdatePartners} />
            </div>

            <div id="form__partner__update">
              <label className="label__Partner" style={{ paddingTop: '20px' }}>
                Name
              </label>
              <input
                className="input__partner"
                type="text"
                name="name"
                value={name}
                placeholder="Enter Partner name"
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className="label__Partner">Partner ID</label>
              <input
                className="input__partner"
                type="text"
                name="partner_id"
                value={partner_id}
                placeholder="Enter Partner ID"
                onChange={(e) => setParnerId(e.target.value)}
                required
              />

              <label className="label__Partner">Main POC</label>
              <input
                className="input__partner"
                type="text"
                name="main_poc"
                value={main_poc}
                placeholder="Enter Main POC"
                required
                onChange={(e) => setMainPoc(e.target.value)}
              />
              <label className="label__Partner">POC Email</label>
              <input
                className="input__partner"
                type="text"
                name="poc_email"
                value={poc_email}
                placeholder="Enter Partner Email"
                required
                onChange={(e) => setPocEmail(e.target.value)}
              />
              <label className="label__Partner">Partner Contact</label>
              <input
                className="input__partner"
                type="number"
                name="poc_phone"
                value={poc_phone}
                placeholder="Enter Partner Contact"
                required
                // onChange={(e) => setPocPhone(e.target.value)}
                onChange={handleMobile}
              />
              <label className="label__Partner">Address</label>
              <input
                className="input__partner"
                type="text"
                name="address"
                value={address}
                placeholder="Enter Partner Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="label__Partner">State</label>
              <input
                className="input__partner"
                type="text"
                name="state"
                value={state}
                placeholder="Enter Partner State"
                required
                onChange={(e) => setState(e.target.value)}
              />
              <label className="label__Partner">ZIP</label>
              <input
                className="input__partner"
                type="number"
                name="zip"
                value={zip}
                placeholder="Enter ZIP Code"
                required
                onChange={handleZipcode}
              // onChange={(e) => setZip(e.target.value)}
              />
              <label className="label__Partner">Partner logo</label>

              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ width: '240px' }}
                onChange={(event) => handleUpdateImage(event)}
                ref={fileInputRef}
              />

              <p style={{ color: 'red', fontSize: '11px', padding: '1px 10px', display: note }}>
                Note: Please select only Image file( eg: .png, .jpg, .jpeg)
                <br />
                Max File size: 1MB allowed
              </p>
              <div className="locate_side">

                <button
                  onClick={cancelupdatePartners}
                  className="cancel__create__partner"
                  id="not_ShowCancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="create_new__partner"
                  onClick={() => updatePartner(id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>

        </div>


        <div> {isPartnerDelete && (

          <div className="modal-backdrop" onClick={cancelDeleteModalPopup} >   </div>

        )}

          <div
            className="show__notShow_partner_delete"
            style={{
              display: isPartnerDelete ? 'block' : 'none',
            }}
          >
            <div id="confirm__delete_partner">
              <p>Confirm Delete</p>
            </div>
            <div id="delete__partner">
              <p>Are you sure you want to delete location </p>
              <p style={{ fontWeight: 'bolder', color: 'black' }} > {name}</p>
              <p style={{marginBottom:'24px'}}>This process is Irreversible</p>
              <div className='delete_modal_buttons'>
                <button
                  onClick={cancelDeleteModalPopup}
                  className="cancel__create__partner"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePartner(id)}
                  type="submit"
                  className="delete_new__partner"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        </div>


        <div className="table_wrap" style={{ overflowX: 'auto', whiteSpace: 'noWrap' }}>
          <table className="table table-hover">
            <thead className="">
              <tr>
                <th className="th_Name px-3">S.No.</th>
                <th className="th_Name px-3">
                  File
                </th>
                <th className="th_Name px-3">Name</th>
                <th className="th_Name px-3">Partner ID</th>
                <th className="th_Name px-3">Main POC</th>
                <th className="th_Name px-3">POC Email</th>
                <th className="th_Name px-3">POC Phone</th>
                <th className="th_Name px-3">Address</th>
                <th className="th_Name px-3">State</th>
                <th className="th_Name px-3">ZIP</th>
                <th className="th_Name px-3">logo</th>
                <th className="th_Name px-3">Devices Assigned</th>
                <th className="th_Name px-3">Devices Installed</th>
                <th className="th_Name px-3">Devices Active</th>
                <th className="th_Name px-3">Action</th>
              </tr>
            </thead>
            <tbody style={{ background: '#fff' }}>
              {currentPosts &&
                currentPosts.map((item, ind) => {
                  const displayedIndex = indexOfFirstPage + ind + 1
                  return (
                    <tr key={ind}>
                      <td className="px-4">{displayedIndex}</td>
                      <td>
                        <div onClick={(e) => onChangedModal(e, item.id)} value={value}>
                          <Tooltip placement="topLeft" title={textOne}>
                            <img
                              src={Excelicon}
                              alt="upload_img"
                              style={{
                                marginLeft: '5px',
                                cursor: 'pointer',
                              }}
                            />
                          </Tooltip>
                        </div>
                      </td>
                      <td className="px-3 ">{item.name}</td>
                      <td className="px-3 ">{item.partner_id}</td>
                      <td className="px-3 ">{item.main_poc}</td>
                      <td className="px-3 ">{item.poc_email}</td>
                      <td className="px-3 ">{item.poc_phone}</td>
                      <td className="px-3 ">{item.address}</td>
                      <td className="px-3 ">{item.state}</td>
                      <td className="px-3 ">{item.zip}</td>
                      <td className="px-3" style={{ textAlign: 'center' }}>
                      {/* <td className="px-3" style={{ textAlign: 'center'}}>{item.path ? <img src={`https://troes.io/Admin/public/${item.path}`} alt="" height={'30px'} width={'30px'} /> : '-'}</td> */}
                      <td className="px-3" style={{ textAlign: 'center'}}>{item.path ? <img src={`https://tro.tentoptoday.com/Development/public/${item.path}`} alt="" height={'30px'} width={'30px'} /> : '-'}</td>

                      </td>

                      {/* <td className="px-3 ">{`${item.path}!== null `?<img src={`${troesAPi}/${item.path}`} alt="" height={'30px'} width={'30px'}/> : {'-'}}</td> */}
                      <td className="px-5 text-center">
                        <Popconfirm
                          title={`Devices Assigned : ${deviceAssignedLength}`}
                          //description="Are you sure to delete this task?"
                          onClick={(e) => onChangedDeviceAssignedLength(item.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Tooltip placement="bottomLeft" title={textTwo}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Popconfirm>
                      </td>
                      <td className="px-5 text-center">
                        <Popconfirm
                          title={`Devices Installed : ${deviceInstalledLength}`}
                          //description={`Length :- ${deviceInstalledLength}`}
                          onClick={(e) => onChangedDeviceInstalleedLength(item.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Tooltip placement="bottomLeft" title={textThree}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Popconfirm>
                      </td>
                      <td className="px-5 text-center">
                        <Popconfirm
                          title={`Devices Active : ${deviceActiveLength}`}
                          //description={`Length :- ${deviceActiveLength}`}
                          onClick={(e) => onChangedDeviceActiveLength(item.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Tooltip placement="bottomLeft" title={textFour}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Popconfirm>
                      </td>
                      <td className="px-3 text-center">
                        <button
                          onClick={() => {
                            setName(item.name)
                            setParnerId(item.partner_id)
                            setMainPoc(item.main_poc)
                            setPocEmail(item.poc_email)
                            setPocPhone(item.poc_phone)
                            setAddress(item.address)
                            setState(item.state)
                            setZip(item.zip)
                            setImageOne(item.imagename)

                            updatePartnerModal(
                              setId(item.id),
                              item.imagename !== null ? item.imagename : 'No file chosen',
                            )
                          }}
                          style={{ border: 'none', background: 'none' }}
                        >
                          <img src={editPen} alt="edit" className="editn_btn_global" />
                        </button>{' '}
                        &nbsp; &nbsp;
                        <button
                          onClick={() => {
                            openDeleteModal(setId(item.id), setName(item.name))
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
        <div
          className="user__detail__popup__Customer_noti"
          style={{
            display: partnerAdmit ? 'block' : 'none',
          }}
        >


          <div>
            <p className="admin_registerd__pop_noti">
              {' '}
              <img src={CheckgreenCircle} alt="Cyber Vision infotech" />{' '}
              <span>New Partner added successfully.</span>{' '}
            </p>
          </div>

        </div>
        <div
          className="user__detail__popup__Customer_noti"
          style={{
            display: partnerUpdate ? 'block' : 'none',
          }}
        >

          <div>
            <p className="admin_registerd__pop_noti">
              {' '}
              <img src={CheckgreenCircle} alt="Cyber Vision infotech" />{' '}
              <span>Partner information updated.</span>{' '}
            </p>
          </div>
        </div>
        <div
          className="user__detail__popup__Admin userdeletmodal"
          style={{
            display: partnerDelete ? 'block' : 'none',
          }}
        >

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            <img src={Redcircle} alt="Cyber Vision infotech " />
            <span className="admin_registerd__pop userdeletmodal_margin "> Partner has been deleted.</span>
          </div>

        </div>

        <div className='pagination'>

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
              justifyContent: 'flex-start',
              marginBottom: '24px',
              marginTop: '48px',
            }}
          />
        </div>

      </div>
    </>
  )
}

export default Partner
