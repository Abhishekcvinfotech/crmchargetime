import React, { useState, useEffect } from 'react'
import './Splash.css'
import { TimePicker, Button, Spin, Select, Pagination } from 'antd'
import DateTimePickerStart from './DateTimePickerStart'
import DateTimePickerEnd from './DateTimePickerEnd'
import TextArea from 'antd/lib/input/TextArea'
import Mockup from '../../assets/images/Mockup.png'
import { CloseOutlined } from '@mui/icons-material'
import '../universal.css'
import axios from 'axios'
import { troesAPi } from 'src/api'
import { DeleteOutlined, MessageOutlined, SaveOutlined } from '@ant-design/icons'
import editPen from '../../assets/images/editPen.svg'
import { CListGroup } from '@coreui/react'
import partnerrate from '../../assets/images/partnerrate.svg'
import AddMessage from '../../assets/images/addMessage.svg'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { BsEyeFill } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

const Splash = () => {
  const [startDateTime, setStartDateTime] = useState(null)

  const [endDateTime, setEndDateTime] = useState(null)

  const [messageModal, setMessageModal] = useState(false)
  const [clearDateTime, setClearDateTime] = useState(false)
  const [mobileSplash, setMobileSplash] = useState(false)
  const [inputText, setInputText] = useState('')
  const [locationData, setLocationData] = useState([])
  const [location_id, setLocation_id] = useState(null)
  const [allSplshData, setAllSplashData] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetDateTime, setResetDateTime] = useState(false)
  const [hardRefresh, setHardRefresh] = useState(false)

  const [addedSplash, setAddedSplash] = useState(false)
  const [updatedSplash, setUpdatedSplah] = useState(false)
  const [deleteSplash, setDeleteSplash] = useState(false)
  const [indexMatch, setIndexMatch] = useState('')
  const [inputMessage, setInputMessage] = useState('')
  const [updateModal, setUpdateModal] = useState(false)
  const [indexUpdate, setIndexUpdate] = useState('')
  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')

  const getLocationData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/location`)
      .then((res) => {
        setLocationData(res.data.customers)

        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  const handleInputChange = (e) => {
    const { value } = e.target

    if (value?.length <= 1000 && value?.length >= 0) {
      setInputText(value)
    }
  }
  const handleInputChangeForUpdate = (e) => {
    const { value } = e.target

    if (value?.length <= 1000 && value?.length >= 0) {
      setInputText(value)
    }
  }

  const handleSelect = (e) => {
    setLocation_id(e.target.selectedOptions[0].getAttribute('data-name'))
  }

  const getAllSplashData = () => {
    setLoading(true)
    axios
      .get(`${troesAPi}/getsplash`)
      .then((res) => {
        setAllSplashData(res.data.message)
        setTotal(res.data.message?.length)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllSplashData()
  }, [resetDateTime, deleted])
  const addSplahFunction = async (e) => {
    setHardRefresh(true)
    const formData = new FormData()
    formData.append('startDate', startDateTime)
    formData.append('location_id', location_id)
    formData.append('endDate', endDateTime)
    formData.append('message', inputText)
    if (startDateTime && location_id && endDateTime && inputText) {
      try {
        let result = await fetch(`${troesAPi}/addsplash`, {
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: formData,
        })
        const res = await result.json()
        if (res.message == 'Splash Screen Add Successfully') {
          setUpdatedSplah(true)
          setTimeout(() => {
            setUpdatedSplah(false)
          }, 2000)
        } else {
          alert(res.message)
          getAllSplashData()
        }
        setClearDateTime(true)
        setHardRefresh(false)
        setResetDateTime((data) => !data)
        setLoading(false)
        setInputText('')
      } catch (err) {
        setResetDateTime(false)
        console.log(err)
        setLoading(false)
      }
    } else {
      alert('Invalid Details')
    }
  }
  const handleCellEdit = (e, ind, property, data) => {
    const newText = e.target.innerText || data
    if (property === 'location') {
      setLocation_id(newText)
    } else if (property === '') {
      setLocation_id(data)
    } else if (property === 'startDate') {
      setStartDateTime(newText)
    } else if (property === 'endDate') {
      setEndDateTime(newText)
    }
  }
  const forIndexFunction = (ind) => {
    setIndexUpdate(`ind_${ind}`)
  }

  const updateSplash = async (id, location, startDate, endDate, message) => {
    setLoading(true)
    const formData = new FormData()
    if (startDateTime !== null && startDateTime !== 'Invalid date') {
      formData.append('startDate', startDateTime)
    } else {
      formData.append('startDate', startDate)
    }

    if (location_id !== null && location_id !== undefined) {
      formData.append('location_id', location_id)
    } else {
      formData.append('location_id', location)
    }

    if (endDateTime !== null && endDateTime !== 'Invalid date') {
      formData.append('endDate', endDateTime)
    } else {
      formData.append('endDate', endDate)
    }

    if (inputText !== null && inputText !== undefined && inputText !== '') {
      formData.append('message', inputText)
    } else {
      formData.append('message', message)
    }

    try {
      let result = await fetch(`${troesAPi}/updatesplash/${id}`, {
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: formData,
      })
      const res = await result.json()

      if (res.message == 'Splash Screen Update Successfully') {
        setUpdatedSplah(true)
        setTimeout(() => {
          setUpdatedSplah(false)
        }, 2000)
      } else {
        alert(res.message)
      }
      setHardRefresh(false)
      setResetDateTime((data) => !data)
      setDeleted((data) => !data)
      setLoading(false)
      setInputMessage(null)
    } catch (err) {
      setResetDateTime(false)
      console.log(err)
      setLoading(false)
    }
  }
  const deleteSplashData = (id) => {
    setLoading(true)
    if (window.confirm('Are you sure? Message is deleted permanently? ')) {
      axios
        .delete(`${troesAPi}/deletesplash/${id}`)
        .then((res) => {
          setLoading(false)
          setDeleted((data) => !data)
          setDeleteSplash(true)
          setTimeout(() => {
            setDeleteSplash(false)
          }, 2000)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    } else {
      setLoading(false)
    }
  }
  // useEffect(() => {
  //   getAllSplashData()
  // }, [deleted])

  const handleLocation = (value, e, label, ind) => {
    setIndexMatch(`ind_${ind}`)
    setLocation_id(value)
    setIndexUpdate(`ind_${ind}`)
  }

  // pagination Start

  const handlePagination = (value) => {
    setPage(value)
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = allSplshData?.slice(indexOfFirstPage, indexOfLastPage)
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        {loading ? (
          <div className="loading_part">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}

        <div className="splash_text_wrap">
          <p className="para_splash">Splash Screen </p>

          <div>
            <button
              className="add_mesage_btn"
              onClick={() => setMessageModal(true)}
              style={{ display: 'flex', gap: '10px' }}
            >
              <span className="plus_sign">+</span>
              <span>Add Messages</span>
            </button>
          </div>
        </div>
        {mobileSplash ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              zIndex: '1',
              maxWidth: '100%',
              top: '0px',
              // background:'red',
              width: '100%',
            }}
          >
            <div style={{ position: 'absolute', top: '25px', zIndex: '2' }}>
              <button className="close_btn_splash" onClick={() => setMobileSplash(false)}>
                <CloseOutlined style={{ color: '#fff' }} />
              </button>
            </div>
            <div style={{ width: '400px', position: 'relative' }}>
              <img
                src={Mockup}
                alt="edit"
                style={{ objectFit: 'cover', width: '100%', overflow: 'hidden' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '310px',
                  left: '100px',
                  width: '210px',
                  wordWrap: 'break-word',
                  overflowY: 'auto',
                  height: '280px',
                }}
              >
                <p>{inputText !== null ? inputText : ''}</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="splash_middle_div">
          <div className="splash_wrapper">
            {/* <label className="select_text">Select Installation:</label> */}
            <select id="select_option__value" onChange={handleSelect}>
              {hardRefresh ? (
                <option value="">Select Installation</option>
              ) : (
                <>
                  <option value="">Select Installation</option>
                  {locationData &&
                    locationData.map((item, index) => {
                      return (
                        <option key={index} data-name={item.id} value={item.location}>
                          {item.location}
                        </option>
                      )
                    })}
                </>
              )}
            </select>
          </div>
          {/* <div className='datepickerwrap'> */}

          {/* <label className="select_text">Select  Start Date</label> */}
          <div
            className="time-picker-container"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <DateTimePickerStart data={setStartDateTime} formSubmitted={clearDateTime} />
          </div>

          {/* </div> */}

          {/* <div className='datepickerwrap'> */}

          {/* <label className="select_text">Select End Date</label> */}
          <div
            className="time-picker-container"
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <DateTimePickerEnd data={setEndDateTime} formSubmitted={clearDateTime} />
          </div>

          {/* </div> */}

          {messageModal ? (


            <div>

        <div className="modal-backdrop" ></div>
            <div
              className="add_message_modal"
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                }}
              >
                <div className="messagemodal_heading">
                  <h5>Add Message </h5>
                  <IoMdClose
                    className="crossicon"
                    onClick={() => {
                      setMessageModal(false), setUpdateModal(false)
                      //setInputText('')
                    }}
                  />
                </div>
                <hr className="cretaecustomerline"></hr>

                <TextArea
                  size="sm"
                  className="modaltextarea"
                  rows={6}
                  cols={3}
                  name="Solid"
                  placeholder="Try to put text minimum than 1000 words."
                  variant="outlined"
                  value={inputText}
                  style={{ borderRadius: '6px' }}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className="word_renamings">
                  Words remaining: {1000 - inputText?.length + '/' + '1000'}
                </p>
                <div className="modal_btn_wrap">
                  <button
                    className="preview_btn"
                    onClick={() => {
                      setMobileSplash(true), setMessageModal(false)
                    }}
                  >
                    <BsEyeFill />
                    <span> Preview</span>
                  </button>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    <button
                      // id="universalButton"
                      className="modal_send_message"
                      onClick={() => {
                        setMessageModal(false),
                          addSplahFunction(),
                          setClearDateTime((data) => !data),
                          setInputText('')
                      }}
                    >
                      <span>Send Message</span>
                    </button>
                    <button
                      // id="universalButton"
                      className="modal_cancel_btn"
                      onClick={() => {
                        setMessageModal(false), setInputText('')
                      }}
                    >
                      <span> Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>

          ) : (
            ''
          )}
          {updateModal ? (

<div>

        <div className="modal-backdrop" ></div>

            <div
              className='edit_message_modal'
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                }}
              >
                <div className="messagemodal_heading">
                  <h5>Add Message </h5>
                  <IoMdClose
                    className="crossicon"
                    onClick={() => {
                      setMessageModal(false)
                      //setInputText('')
                    }}
                  />
                </div>
                <hr className="cretaecustomerline"></hr>
                <TextArea
                  className="modaltextarea"
                  size="sm"
                  rows={6}
                  cols={3}
                  name="Solid"
                  placeholder="Try to put text minimum than 1000 words."
                  variant="outlined"
                  value={inputText}
                  style={{ borderRadius: '6px' }}
                  onChange={(e) => handleInputChangeForUpdate(e)}
                />
                <p className="word_renamings">
                  Words remaining: {1000 - inputText?.length + '/' + '1000'}
                </p>
                <div className="modal_btn_wrap">
                  <button
                    className="preview_btn"
                    onClick={() => {
                      setMobileSplash(true), setMessageModal(false), setUpdateModal(false)
                    }}
                  >
                    <BsEyeFill />
                    <span> Preview</span>
                  </button>
                  <button
                    className="modal_cancel_btn"
                    onClick={() => {
                      setMessageModal(false), setUpdateModal(false)
                      //setInputText('')
                    }}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>

            </div>
          ) : (
            ''
          )}
        </div>
        <div  className='table_parent'>
          <div className="table_wrapper">
            <table className="table table-hover" style={{ position: 'relative' }}>
              <thead className="splash__information">
                <tr>
                  <th className=" global_th">S.No.</th>
                  <th className="text-left global_th" style={{ width: '350px' }}>
                    Installation
                  </th>
                  <th className="text-left global_th">Start Date</th>
                  <th className="text-left global_th">End Date</th>
                  <th className="text-center global_th">Message</th>
                  <th className="text-left global_th">Action</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff' }}>
                {currentPosts &&
                  currentPosts?.map((item, ind) => {
                    const displayedIndex = indexOfFirstPage + ind + 1
                    return (
                      <tr>
                        <td className="px-4">{displayedIndex}</td>

                        <td className={`ind_${ind} text-left`}>
                          <div className="my-select-container">
                            <Select
                              showSearch
                              style={{ width: '300px' }}
                              value={`ind_${ind}` == indexMatch ? location_id : item.location}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              onChange={(value, e, label) => handleLocation(value, e, label, ind)}
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={((locationData && locationData) || []).map((d) => ({
                                value: d.id,
                                label: d.location,
                              }))}
                            />
                          </div>
                        </td>
                        <td
                          className={` ind_${ind} text-left`}
                          contentEditable
                          onBlur={(e) => handleCellEdit(e, ind, 'startDate', item.startDate)}
                          onClick={() => forIndexFunction(ind)}
                        >
                          {item.startDate}
                        </td>
                        <td
                          className={` ind_${ind} text-left`}
                          onClick={() => forIndexFunction(ind)}
                          contentEditable
                          onBlur={(e) => handleCellEdit(e, ind, 'endDate', item.endDate)}
                        >
                          {item.endDate}
                        </td>

                        <td className={` ind_${ind} text-center`}>
                          <button
                            className="actionbtn"
                            style={{ backgroundColor: '#fff', border: 'none' }}
                            onClick={() => {
                              setInputText(item?.message),
                                setUpdateModal(true),
                                setIndexUpdate(`ind_${ind}`)
                            }}
                          >
                            <BiSolidMessageSquareAdd className="mesageicon" />
                          </button>
                        </td>
                        <td className={` ind_${ind} text-left`}>
                          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {indexUpdate == `ind_${ind}` ? (
                              <button
                                className={`update__table_one  actionbtn td_${ind} `}
                                style={{ paddingRight: '10px' }}
                                onClick={() =>
                                  updateSplash(
                                    item.id,
                                    item.location_id,
                                    item.startDate,
                                    item.endDate,
                                    item.message,
                                  )
                                }
                              >
                                {/* <img src={editPen} alt="edit" style={{ width: '20px' }} /> */}
                                <SaveOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                              </button>
                            ) : (
                              <button
                                className={`update__table_one  actionbtn td_${ind}  `}
                                // className={`update__table  actionbtn td_${ind} `}
                                style={{ visibility: 'hidden', paddingRight: '10px' }}
                                onClick={() =>
                                  updateSplash(
                                    item.id,
                                    item.location_id,
                                    item.startDate,
                                    item.endDate,
                                    item.message,
                                  )
                                }
                              >
                                {/* <img src={editPen} alt="edit" style={{ width: '20px' }} /> */}
                                <SaveOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                              </button>
                            )}
                            <button
                              className="delte__table_one actionbtn "
                              onClick={() => deleteSplashData(item.id)}
                            >
                              {/* <DeleteOutlined className="delete_btn_global" /> */}
                              <MdDeleteForever className="delete_icon" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            <div className="pagination_wrap">
              <Pagination
                onChange={handlePagination}
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
          </div>
        </div>
        <div
          className="global__popup__div"
          style={{
            display: addedSplash ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={partnerrate}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                height: '15px',
                objectFit: 'contain',
              }}
            />
            <p className="global_popup__text">Splash Screen added successfully.</p>
          </div>
        </div>
        <div
          className="global__popup__div"
          style={{
            display: updatedSplash ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={partnerrate}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="global_popup__text">Splash Screen updated.</p>
          </div>
        </div>
        <div
          className="global__popup__div"
          style={{
            display: deleteSplash ? 'block' : 'none',
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
            <p className="global_popup__text">Splash Data has been deleted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Splash
