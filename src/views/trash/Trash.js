
import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import { Button, Drawer, Spin, Radio, Popover, Tooltip } from 'antd'
import '../universal.css'
import './trash.css'
import axios, { Axios } from 'axios'
import { troesAPi } from '../../api'
import { Pagination } from 'antd'
import {
  DeleteOutlined,
  StopOutlined,
  PlusOutlined,
  MinusOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  FieldTimeOutlined,
  UserOutlined,
  SettingOutlined,
  ClearOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { Input, Select } from 'antd'
import { DatePicker, Space } from 'antd'
import Restore from '../../assets/images/restore.png'
import { CListGroup } from '@coreui/react'

const { TextArea } = Input

const Trash = () => {
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showMessageTroes, setShowMessageTroes] = useState(false)
  const [notificationId, setNotificationId] = useState('Ao-001')
  const [sourceTrigger, setSourceTrigger] = useState('Emporia')
  const [eventTrigger, setEventTrigger] = useState()
  const [startDate, setStartDate] = useState()
  const [stopDate, setStopDate] = useState()
  const [Data, setData] = useState([])
  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')
  const [openRowIndex, setOpenRowIndex] = useState(null)
  const [openRowIndexTroes, setOpenRowIndexTroes] = useState(null)
  const [message, setMessage] = useState('')
  const [notificationRestored, setNotificationRestored] = useState('none')
  const [notificationDeleted, setNotificationDeleted] = useState('none')
  const [emporiaData, setEmporiaData] = useState([])
  const [totTrashNotification, settotTrashNotification] = useState('')
  const maxWords = 500

  const [expandedRows, setExpandedRows] = useState([])
  const [expandedRowsTroes, setExpandedRowsTroes] = useState([])
  const [postPerPageForEmporia, setPostPerPageForEmporia] = useState([10])
  const [totalEmporia, setTotalEmporia] = useState('')

  const [pageEmporia, setPageEmporia] = useState(1)

  const toggleRowExpansion = (index) => {
    const newExpandedRows = [...expandedRows]
    newExpandedRows[index] = !newExpandedRows[index]
    setExpandedRows(newExpandedRows)
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
  const toggleRowExpansionTroes = (index) => {
    const newExpandedRows = [...expandedRowsTroes]
    newExpandedRows[index] = !newExpandedRows[index]
    setExpandedRowsTroes(newExpandedRows)
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
  const getData = (e) => {
    axios
      .get(`${troesAPi}/gettrashnotification`)
      .then((res) => {
        setData(res.data?.result.Emporia)
        setTotal(res.data.result.Emporia?.length)
        setEmporiaData(res.data?.result.TROes)
        setTotalEmporia((res.data?.result.TROes).length)
        settotTrashNotification((res.data.result.Emporia?.length)+(res.data?.result.TROes).length)
      })
      .catch((err) => console.log(err))
  }
  

  // emporia pagination start

  const handlePaginationEmporia = (value) => {
    setPageEmporia(value)
  }

  const indexOfLastPageEmporia = pageEmporia * postPerPageForEmporia
  const indexOfFirstPageEmporia = indexOfLastPageEmporia - postPerPageForEmporia
  const currentPostsEmporia = emporiaData?.slice(indexOfFirstPageEmporia, indexOfLastPageEmporia)
  const onShowSizeChangeEmporia = (current, pageSize) => {
    setPostPerPageForEmporia(pageSize)
  }
  const itemRenderEmporia = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>
    }
    if (type === 'next') {
      return <a>Next</a>
    }

    return originalElement
  }

  //emporia pagination end
  const handlePagination = (value) => {
    setPage(value)
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = Data?.slice(indexOfFirstPage, indexOfLastPage)
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

  const restoreNotification = async (id) => {
    setLoading(true)
    if (window.confirm('Do you really want to restore this notification!')) {
      const response = axios
        .post(`${troesAPi}/restoretrashnotification/${id}`)
        .then(() => {
          setLoading(false)
          setNotificationRestored('block')
          // setData((prevData) => prevData.filter((item) => item.id !== id))
          getData()
          setTimeout(() => {
            setNotificationRestored('none')
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

  const onDeleteNotification = async (id) => {
    setLoading(true)
    if (window.confirm('Do you really want to delete this notification permanently!')) {
      const response = axios
        .delete(`${troesAPi}/deletenotification/${id}`)
        .then(() => {
          setLoading(false)
          setNotificationDeleted('block')
          // setData((prevData) => prevData.filter((item) => item.id !== id))
          getData()
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
  useEffect(() => {
    getData()
  }, [])
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
            position: 'absolute',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        ''
      )}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="all_customer_of_page" style={{ marginTop: '-13px' }}>
            Deleted Notifications
          </h2>
          <p style={{ paddingBottom: '10px', textAlign: 'center',fontWeight:"bolder" }}>
            Total Notifications : {totTrashNotification} <br />
          </p>
        </div>
        <div style={{ position: 'relative', backgroundColor: '#fff', padding: '30px 10px' }}>
          <div style={{ display: 'flex' }}>
            <Link to="/notification" style={{ paddingLeft: '40px !important' }}>
              <button id="button" style={{ gap: '10px' }}>
                <RollbackOutlined />
                Back to App Notifications
              </button>
            </Link>
          </div>
        </div>

        {/* hero content */}
        <div
          className="td_part"
          style={{ marginTop: '10px', overflowX: 'auto', whiteSpace: 'noWrap' }}
        >
          <div style={{ padding: '10px 0px 13px 0px', margin: 'auto' }}>
            <p className="text">Emporia Notifications</p>
          </div>
          <table className="table table-hover">
            <thead className="">
              <tr>
                <th className="t_Name px-2 global_th">S.No.</th>
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
                 
                  const displayedIndex = indexOfFirstPage + index + 1
                  return (
                    <React.Fragment key={index}>
                      <tr className="trSelect">
                        <td className="px-2">{displayedIndex}</td>
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
                        
                        <td className="px-2">{item.notification_id}</td>
                        <td className="px-2">{(item. notification_type === 0
                                  ? 'Conditional'
                                  : '') ||
                                (item. notification_type === 1
                                  ? 'Un-Conditional'
                                  : '')
                              }</td>
                        <td className="px-2">{item.source_trigger}</td>
                        <td className="px-2">{item.notification_type === 0?item.eventtriggername :item.event_trigger}</td>
                        <td className="px-2">{item.locationname}</td>
                        <td className="px-2">{item.startDate}</td>
                        <td className="px-2">{item.endDate}</td>
                        <td className="px-2">{item.message_time}</td>
                        <td className="px-2">
                          <Tooltip title="Restore">
                            <button
                              className="actionbtn"
                              style={{ paddingLeft: '5px', color: 'red', padding:'1px'  }}
                              onClick={() => restoreNotification(item.id)}
                            >
                              <img
                                src={Restore}
                                alt="restore"
                                width={'16px'}
                                height={'16px'}
                                style={{ marginTop: '6px' }}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <button
                              className="actionbtn"
                              style={{ paddingLeft: '10px', color: 'red', padding:'4px'  }}
                              onClick={() => onDeleteNotification(item.id)}
                            >
                              <DeleteOutlined className='delete_btn_global'/>
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                      {openRowIndex === index && showMessage ? (
                        <tr>
                          <td colSpan={2}></td>
                          <td colSpan={1}>Message:</td>
                          <td colSpan={4}>
                            <div>
                              <TextArea
                                placeholder="Notification Message..."
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                                value={message}
                              />
                              <p>
                                Words remaining: {maxWords - message.trim().length} / {maxWords}
                              </p>
                            </div>
                          </td>
                          <td colSpan={4}></td>
                        </tr>
                      ) : (
                        ''
                      )}
                    </React.Fragment>
                  )
                })}
            </tbody>

            
          </table>
          <Pagination
          onChange={handlePagination}
          pageSize={postPerPage}
          total={total}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
          //style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'flex-start' }}
        />
        <div style={{ padding: '10px 0px 13px 0px',margin:"auto" }}>
              <p className="text">TROes Notifications</p>
            </div>
          <table className="table table-hover">
            
            <thead className="">
              <tr>
                <th className="t_Name px-2 global_th">S.No.</th>
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
              {currentPostsEmporia &&
                currentPostsEmporia.map((item, index) => {
                 
                  const displayedIndexEmporia = indexOfFirstPageEmporia + index + 1
                  return (
                    <React.Fragment key={index}>
                      <tr className="trSelect">
                        <td className="px-2">{displayedIndexEmporia}</td>
               

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
                       
                        <td className="px-2">{item.notification_id}</td>
                        <td className="px-2">{(item. notification_type === 0
                                  ? 'Conditional'
                                  : '') ||
                                (item. notification_type === 1
                                  ? 'Un-Conditional'
                                  : '') ||
                                  (item. notification_type === 2
                                  ? 'Un-Conditional Daily'
                                  : '')
                              }</td>
                        <td className="px-2">{item.source_trigger}</td>
                        <td className="px-2">{item.notification_type === 0?item.eventtriggername :item.event_trigger}</td>
                        <td className="px-2">{item.locationname === null? 'All Locations': item.locationname}</td>
                        <td className="px-2">{item.startDate=== '1895-01-01 00:00:00'? '24/7': item.startDate}</td>
                        <td className="px-2">{item.endDate=== '1895-01-01 00:00:00'? '24/7': item.endDate}</td>
                        <td className="px-2">{item.message_time}</td>
                        <td className="px-2">
                          <Tooltip title="Restore">
                            <button
                              className="actionbtn"
                              style={{ paddingLeft: '5px', color: 'red', padding:'1px' }}
                              onClick={() => restoreNotification(item.id)}
                            >
                              <img
                                src={Restore}
                                alt="restore"
                                width={'16px'}
                                height={'16px'}
                                style={{ marginTop: '6px' }}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <button
                              className="actionbtn"
                              style={{ paddingLeft: '10px', color: 'red', padding:'4px'  }}
                              onClick={() => onDeleteNotification(item.id)}
                            >
                              <DeleteOutlined className='delete_btn_global' />
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                      {openRowIndexTroes === index && showMessageTroes ? (
                        <tr>
                          <td colSpan={2}></td>
                          <td colSpan={1}>Message:</td>
                          <td colSpan={4}>
                            <div>
                              <TextArea
                                placeholder="Notification Message..."
                                autoSize={{
                                  minRows: 2,
                                  maxRows: 6,
                                }}
                                value={message}
                              />
                              <p>
                                Words remaining: {maxWords - message.trim().length} / {maxWords}
                              </p>
                            </div>
                          </td>
                          <td colSpan={4}></td>
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
            display: notificationRestored,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <UserSwitchOutlined
            style={{
              display: 'block',
              color: '#fff',
              fontWeight: 'bolder',
              paddingRight: '10px',
              marginTop: '-5px',
              fontSize: '18px',
            }}
          /> */}
            <p className="admin_registerd__pop">Notification Restored Successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
          style={{
            display: notificationDeleted,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <UserSwitchOutlined
            style={{
              display: 'block',
              color: '#fff',
              fontWeight: 'bolder',
              paddingRight: '10px',
              marginTop: '-5px',
              fontSize: '18px',
            }}
          /> */}
            <p className="admin_registerd__pop">Notification Deleted permanently.</p>
          </div>
        </div>
      </div>
      <div>
      <Pagination
          onChange={handlePaginationEmporia}
          pageSize={postPerPageForEmporia}
          total={totalEmporia}
          current={pageEmporia}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChangeEmporia}
          itemRender={itemRenderEmporia}
          style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'flex-start' }}
        />
        
      </div>
    </>
  )
}

export default Trash
