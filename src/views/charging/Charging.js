import React from 'react'
import axios, { Axios } from 'axios'
import './Charging.css'
import '../universal.css'
import { Button, Drawer, Spin, Pagination, Modal } from 'antd'
import { useState, useEffect } from 'react'
import actionEdit from '../../assets/images/actionEdit.svg'
import actionDelete from '../../assets/images/actionDelete.svg'
import right_arrow from '../../assets/images/right_arrow.svg'
import editPen from '../../assets/images/editPen.svg'
import { troesAPi } from '../../api'
import { DeleteOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'
import CheckgreenCircle from '../../assets/images/CheckgreenCircle.svg'
import Redcircle from '../../assets/images/Redcircle.svg'

const Charging = () => {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [partnerData, setPartnerData] = useState([])
  const [partner, setPartner] = useState([])
  const [partner_id, setPartnerid] = useState([])
  const [locateData, setLocateData] = useState([])
  const [locationId, setLocationId] = useState('')
  const [installation, setInstallation] = useState('')
  const [kwh, setKWh] = useState('')
  const [rate, setRate] = useState('')
  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [userAdded, setUserAdded] = useState('none')
  const [userDelete, setUserDelete] = useState(false)
  const [userUpdated, setUserUpdated] = useState('none')
  const [background, setbackground] = useState(false)
  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')
  const [modal2Open, setModal2Open] = useState(false)
  const [modal21pen, setModal21pen] = useState(false);

  const showDrawer = () => {
    setOpen(true)
  }
  const back = () => {
    setOpen(false)
    setKWh('')
    setRate('')
    setPartner('')
    setInstallation('')
  }
  const onClose = () => {
    setOpen(false)
  }

  const cancel = (e) => {
    console.log(e)
  }
  const showEditDrawer = () => {
    setEditOpen(true)
  }
  const Editback = () => {
    setEditOpen(false)
    setKWh('')
    setRate('')
    setPartner('')
    setInstallation('')
  }
  const onEditClose = () => {
    setEditOpen(false)
  }
  const getPartnerData = (e) => {
    // setLoading(true)
    axios
      .get(`${troesAPi}/allpartner`)
      .then((res) => {
        setPartnerData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPartnerData()
  }, [])

  const getData = (e) => {
    axios
      .get(`${troesAPi}/partnerchargedetails`)
      .then((res) => {
        setData(res.data)
        setTotal(res.data.length)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [])

  const getLocationData = (e) => {
    axios
      .get(`${troesAPi}/partnerinstallation`)
      .then((res) => {
        setLocateData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getLocationData()
  }, [])

  const onDeleteUser = async (id) => {
    setLoading(true)
    if (window.confirm('Are you sure? The charging rate will get deleted permanently!!')) {
      const response = axios
        .delete(`${troesAPi}/partner_charge_rate_delete/${id}`)
        .then(() => {
          setLoading(false)
          setUserDelete(true)
          getLocationData()
          setData((prevData) => prevData.filter((item) => item.id !== id))
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

  const handleSelected = (e) => {
    setPartner('')
    setPartnerid('')
    setLocationId(e.target.selectedOptions[0].getAttribute('data-name'))
    setInstallation(e.target.value)
    axios
      .get(
        `${troesAPi}/installation_partner/${e.target.selectedOptions[0].getAttribute('data-name')}`,
        {
          mode: 'cors',
        },
      )
      .then((res) => {
        setPartner(res.data.partner)
        setPartnerid(res.data.partner_id)
      })
      .catch((err) => console.log(err))
  }

  async function addRate(e) {
    e.preventDefault()
    setLoading(true)
    if (installation && partner_id && partner && kwh && rate) {
      try {
        let result = await fetch(`${troesAPi}/partnercharge`, {
          method: 'post',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
            installation,
            partner_id,
            partner,
            kwh,
            rate,
          }),
        })
        let res = await result.json()
        setOpen(false)
        if (res.error) {
          alert(res.message)
          setUserAdded('none')
        } else {
          setUserAdded('block')
          getData()
          setLoading(false)
          setKWh('')
          setRate('')
          setPartner('')
          setInstallation('')
          getLocationData()
          setTimeout(() => {
            setUserAdded('none')
          }, 5000)
        }
      } catch (err) {
        console.log(err)
        setOpen(false)
      }
    } else {
      alert('Please select Installation and create charging rate again. ')
      setLoading(false)
    }
  }
  useEffect(() => {
    setKWh('')
    setRate('')
    setPartner('')
    setInstallation('')
  }, [])

  async function onSub(e) {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await fetch(`${troesAPi}/partner_charge_rate_edit/${id}`, {
        method: 'put',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ kwh, rate }),
      })
      let res = await result.json()
      setEditOpen(false)
      setUserUpdated('block')
      setLoading(false)
      setKWh('')
      setRate('')
      setPartner('')
      setInstallation('')
      getData()

      setTimeout(() => {
        setUserUpdated('none')
      }, 5000)
    } catch (err) {
      console.log(err)
      setEditOpen(false)
      getData()
    }
  }
  const handleSelect = (e) => {
    setLoading(true)
    if (e.target.value !== 'all') {
      axios
        .get(`${troesAPi}/partnerfilter/${e.target.selectedOptions[0].getAttribute('data-name')}`, {
          mode: 'cors',
        })
        .then((res) => {
          setData(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
        })
    } else {
      getData()
      setLoading(false)
    }
  }

  // pagination Start

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
      <div className="charge_btn_wrp">
        <p className="finance_bold_text">Charging Rates</p>
        <div>
          <button type="primary" id="charging_rates_btn" onClick={() => setModal2Open(true)}>
            <span>
              {' '}
              <img src={right_arrow} alt="edit" />{' '}
            </span>

            <span>Create Rate</span>
          </button>

          {
            <Modal
              title="Create Rate"
              width={400}
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}

            >
              <div className="modal_form">
                <form className="form" onSubmit={addRate}>
                  <div>
                    <label
                      className="htmlFor_respn"
                      style={{ marginRight: '10px', fontWeight: '600' }}
                    >
                      Select Installation:
                    </label>
                    <select value={installation} onChange={handleSelected}>
                      <option value="">Select installation from choices:</option>
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
                    <label
                      className="htmlFor_respn"
                      style={{ marginRight: '10px', fontWeight: '600' }}
                    >
                      Partner:
                    </label>
                    <input
                      type="text"
                      value={partner}
                      onChange={(e) => setPartner(e.target.value)}
                      required

                    />
                    <input
                      type="hidden"
                      value={partner_id}
                      onChange={(e) => setPartnerid(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="startDate" style={{ fontWeight: '600' }}>
                      kWh
                    </label>
                    <input
                      type="number"
                      value={kwh}
                      required
                      onChange={(e) => setKWh(e.target.value)}
                      placeholder="Enter kWh"
                      onKeyDown={(evt) =>
                        (evt.key === '-' || evt.key === 'e' || evt.key === 'E') &&
                        evt.preventDefault()
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" style={{ fontWeight: '600' }}>
                      ($) Rate
                    </label>
                    <input
                      type="number"
                      value={rate}
                      required
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="Enter ($) Rate"
                      onKeyDown={(evt) =>
                        (evt.key === '-' || evt.key === 'e' || evt.key === 'E') &&
                        evt.preventDefault()
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '10px',
                      paddingTop: '10px',
                    }}
                    className='create_wap_btn'
                  >


                    <button className="btn_cancel" onClick={() => { back(); setModal2Open(false) }} type="button">
                      Cancel
                    </button>

                    <button type='submit' className="btn__createrate" required>
                      Create Rate
                    </button>

                  </div>
                </form>
              </div>
            </Modal>
          }
        </div>
      </div>
      <div className="finance_partner_select" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="finance_wrapper">
          <select id="option__value_charging_rate" onChange={handleSelect}>
            <option value="all">{`Select partner  from choices`}</option>
            <option value="all">All Partners</option>
            {partnerData &&
              partnerData.map((item, index) => {
                return (
                  <option key={index} data-name={item.id} value={item.name}>
                    {item.name}
                  </option>
                )
              })}
          </select>
        </div>

        {/* <Drawer
          title="Create Rate"
          placement="right"
          onClose={onClose}
          open={open}
          style={{ zIndex: '9991' }}
          className="drawer"
        >
          <div className="modal_form">
            <form className="form" onSubmit={addRate}>
              <label className="htmlFor_respn" style={{ marginRight: '10px', fontWeight: '600' }}>
                Select Installation:
              </label>
              <select value={installation} onChange={handleSelected}>
                <option value="">Select installation from choices:</option>
                {locateData &&
                  locateData.map((item, index) => {
                    return (
                      <option key={index} data-name={item.id} value={item.location}>
                        {item.location}
                      </option>
                    )
                  })}
              </select>
              <label className="htmlFor_respn" style={{ marginRight: '10px', fontWeight: '600' }}>
                Partner:
              </label>
              <input
                type="text"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                required
                readOnly
              />
              <input
                type="hidden"
                value={partner_id}
                onChange={(e) => setPartnerid(e.target.value)}
              />
              <label htmlFor="startDate" style={{ fontWeight: '600' }}>
                kWh
              </label>
              <input
                type="number"
                value={kwh}
                required
                onChange={(e) => setKWh(e.target.value)}
                placeholder="Enter kWh"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              <label htmlFor="endDate" style={{ fontWeight: '600' }}>
                ($) Rate
              </label>
              <input
                type="number"
                value={rate}
                required
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter ($) Rate"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderTop: '2px dotted darkgrey',
                  paddingTop: '10px',
                }}
              >
                <button className="btn2" required>
                  Create Rate
                </button>
                <button className="btn_cancel" onClick={back} type="button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Drawer> */}

        <div
          className="user__detail__popup__Customer_success"
          style={{
            display: userAdded,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <UserAddOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            /> */}

            <p className="admin_registerd__pop_noti">  <span>  <img src={CheckgreenCircle} alt="Cyber Vision infotech" /> </span><span> Rate Updated Successfully.  </span></p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer_deleted"
          style={{
            display: userDelete ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <DeleteOutlined
              style={{
                display: 'block',
                color: '#fff',
                fontWeight: 'bolder',
                paddingRight: '10px',
                marginTop: '-5px',
                fontSize: '18px',
              }}
            /> */}


            <p className="admin_registerd__pop_noti">  <span>     <img src={Redcircle} alt="Cyber Vision infotech " /> </span><span> Rate has been deleted.  </span></p>
          </div>
        </div>
        {/* //edit code */}

        {/* <Drawer
          title="Update Rate"
          placement="right"
          onClose={onEditClose}
          open={editOpen}
          style={{ zIndex: '9991' }}
          className="drawer"
        > 
           <div className="modal_form">
            <form className="form" onSubmit={(e) => onSub(e)}>
              <label className="htmlFor_respn" style={{ marginRight: '10px', fontWeight: '600' }}>
                Installation
              </label>
              <input type="text" value={installation} readOnly />
              <label className="htmlFor_respn" style={{ marginRight: '10px', fontWeight: '600' }}>
                Partner
              </label>
              <input type="text" value={partner} readOnly />
              <label htmlFor="startDate" style={{ fontWeight: '600' }}>
                kWh
              </label>
              <input
                type="number"
                value={kwh}
                required
                onChange={(e) => setKWh(e.target.value)}
                placeholder="Enter kWh"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              <label htmlFor="endDate" style={{ fontWeight: '600' }}>
                ($) Rate
              </label>
              <input
                type="number"
                value={rate}
                required
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter ($) Rate"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderTop: '2px dotted darkgrey',
                  paddingTop: '10px',
                  gap: '10px',
                }}
              >
                <button className="btn2" required>
                  Update Rate
                </button>
                <button className="btn_cancel" type="button" onClick={Editback}>
                  Cancel
                </button>
              </div>
            </form>
          </div> 
       </Drawer>  */}




        <Modal
          title="Update Rate"
          centered
          // open={modal21pen}

          onClose={onEditClose}
          open={editOpen}

        // onOk={() => setModal21pen(false)}
        // onCancel={() => setModal21pen(false)}
        >

          <div className="modal_form">
            <form className="form" onSubmit={(e) => onSub(e)}>
              <label className="htmlFor_respn" >
                Installation
              </label>
              <input type="text" value={installation} readOnly />
              <label className="htmlFor_respn" >
                Partner
              </label>
              <input type="text" value={partner} readOnly />
              <label htmlFor="startDate" >
                kWh
              </label>
              <input
                type="number"
                value={kwh}
                required
                onChange={(e) => setKWh(e.target.value)}
                placeholder="Enter kWh"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              <label htmlFor="endDate" >
                ($) Rate
              </label>
              <input
                type="number"
                value={rate}
                required
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter ($) Rate"
                onKeyDown={(evt) =>
                  (evt.key === '-' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()
                }
              />
              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderTop: '2px dotted darkgrey',
                  paddingTop: '10px',
                  gap: '10px',
                }}
              >
                <button className="btn2" required>
                  Update Rate
                </button>
                <button className="btn_cancel" type="button" onClick={Editback}>
                  Cancel
                </button>
              </div> */}


              <div className="create_wap_btn">
                <button class="btn_cancel" type="button" onClick={Editback} >Cancel</button>
                <button type="submit" class="btn__createrate" required >  Update Rate</button>
              </div>
            </form>
          </div>

        </Modal>




        <div
          className="user__detail__popup__Customer_success"
          style={{
            display: userUpdated,
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
            <p className="admin_registerd__pop_noti">  <span><img src={CheckgreenCircle} alt="Cyber Vision infotech" /> </span><span> Rate Updated Successfully.  </span></p>
          </div>
        </div>
      </div>
      <div className="table_wraper">
        <table className="table table-hover">
          <thead className="">
            <tr>
              <th className=" global_th">S.No.</th>
              <th className=" px-3 global_th">Partner</th>
              <th className=" px-3 global_th">Installation</th>
              <th className=" px-3 global_th">kWh</th>
              <th className=" px-3 global_th">($) Rate</th>
              <th className=" px-3 global_th">Action</th>
            </tr>
          </thead>
          <tbody style={{ background: '#fff' }}>
            {currentPosts &&
              currentPosts.map((item, index) => {
                const displayedIndex = indexOfFirstPage + index + 1
                return (
                  <tr key={index}>
                    <td className="px-4">{displayedIndex}</td>
                    <td className="px-3">{item.partner}</td>
                    <td className="px-3">{item.installation}</td>
                    <td className="px-3">{item.kwh}</td>
                    <td className="px-3">${item.rate}</td>
                    <td className="px-4">
                      <button
                        className="actionBtn"
                        onClick={() => {
                          setKWh(item.kwh)
                          setRate(item.rate)
                          setPartner(item.partner)
                          setInstallation(item.installation)
                          setEditOpen(true)
                          setId(item.id)
                        }}
                        style={{ border: 'none', paddingRight: '5px', background: 'none' }}
                      >
                        <img src={editPen} alt="edit" className="editn_btn_global" />

                      </button>{' '}
                      &nbsp; &nbsp;
                      <button
                        className="actionBtn"
                        onClick={() => onDeleteUser(item.id)}
                        style={{ color: 'red' }}
                      >
                        <DeleteOutlined className="delete_btn_global" />
                      </button>
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
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          />
        </div>
      </div>
    </>
  )
}
export default Charging
