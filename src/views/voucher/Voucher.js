import React from 'react'
import './Voucher.css'
import { Button, Drawer, Spin } from 'antd'
import axios, { Axios } from 'axios'
import { useState, useEffect } from 'react'
import { troesAPi } from '../../api'
import { DeleteOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons'

const Voucher = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState('none')
  const [partnerData, setPartnerData] = useState([])
  const [startDate, setStartDate] = useState([])
  const [endDate, setEndDate] = useState([])
  const [voucher, setVouchers] = useState([])
  const [partner, setPartner] = useState('')
  const [userAdded, setUserAdded] = useState('none')
  const [userDelete, setUserDelete] = useState(false)
  const [Data, setData] = useState([])


  const [check, setCheck] = useState('example')


  const showDrawer = () => {
    setOpen(true)
  }
  const back = () => {
    setOpen(false)
    setPartner('')
    setStartDate('')
    setEndDate('')
    setVouchers('')
  }
  const onClose = () => {
    setOpen(false)
    setPartner('')
    setStartDate('')
    setEndDate('')
    setVouchers('')
  }
  const onOpen = () => {
    setReportOpen('block')
    setCheck('example')
  }
  const cancel_report = () => {
    setCheck('example2')
    setTimeout(() => {
      setReportOpen('none')
    }, 450)
  }

  const getData = (e) => {
    axios
      .get(`${troesAPi}/partnerchargedetails`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [])

  const onDeleteUser = async (id) => {
    setLoading(true)
    if (window.confirm('Are you sure? The Voucher will get deleted permanently!!')) {
      const response = axios
        .delete(`${troesAPi}/partner_charge_rate_delete/${id}`)
        .then(() => {
          setLoading(false)
          setUserDelete(true)
          getData()
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
  useEffect(() => {
    getData()
  }, [])

  const getPartnerData = (e) => {
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

  async function addRate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await fetch(`${troesAPi}/partnercharge`, {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          partner,
          startDate,
          endDate,
          voucher,
        }),
      })
      let res = await result.json()
      setOpen(false)
      if (res.error) {
        alert(res.message)
        setUserAdded('none')
      } else {
        setUserAdded('block')
        // getData()
        setLoading(false)
        setPartner('')
        setStartDate('')
        setEndDate('')
        setVouchers('')
        setTimeout(() => {
          setUserAdded('none')
        }, 5000)
      }
    } catch (err) {
      console.log(err)
      setOpen(false)
    }
  }
  useEffect(() => {
    setPartner('')
    setStartDate('')
    setEndDate('')
    setVouchers('')
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
      <div>
        <h2 className="pageName">Vouchers</h2>
        <div className="main_div_createVoucher">
          <div className="createVoucher">
            <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-between' }}>
              <Button type="primary" className="btn" onClick={showDrawer}>
                Create Voucher
              </Button>
              <div>
                <Button type="primary" className="btn" onClick={onOpen}>
                  Generate Report
                </Button>
                <div
                  className="reportmodal"
                  style={{
                    display: reportOpen,
                    border: '0.2px solid grey',
                    padding: '10px',
                    position: 'absolute',
                    background: 'white',
                    right: '175px',
                    top: '160px',
                    borderRadius: '8px',
                    boxShadow: '6px 6px 5px 0px rgba(154 150 150 / 75%)',
                    animationName: check,
                    animationDuration: '0.5s',
                  }}
                >
                  <form className="form">
                    <p onClick={cancel_report} className="cancelReport">
                      X
                    </p>
                    <label
                      className="htmlFor_respn"
                      style={{ marginRight: '10px', fontWeight: '600' }}
                    >
                      Select Partner:
                    </label>
                    <select
                      id="option__value"
                      value={partner}
                      onChange={(e) => setPartner(e.target.value)}
                    >
                      <option value="">{`Select partner  from choices`}</option>
                      {partnerData &&
                        partnerData.map((item, index) => {
                          return (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          )
                        })}
                    </select>
                    <label htmlFor="startDate" style={{ fontWeight: '600' }}>
                      Start Date
                    </label>
                    <input type="date" required />
                    <label htmlFor="endDate" style={{ fontWeight: '600' }}>
                      End Date
                    </label>
                    <input type="date" required />
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
                        Generate Report
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="filter__vOucher">
              <div className="forAlignment_Account">
                <div className="forChanging_color" style={{ background: 'blue' }}></div>
                <button
                  className="btn_for_Link"
                  // style={{ fontWeight: fontWeight2, color: fontred2, borderBottom: borderred2 }}
                  // onClick={registerdAccount}
                >
                  Used
                </button>
              </div>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'yellow',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  // style={{ fontWeight: fontWeight4, color: fontred4, borderBottom: borderred4 }}
                  // onClick={inActivee}
                >
                  Un-Used
                </button>
              </div>
              <div className="forAlignment_Account">
                <div
                  className="forChanging_color"
                  style={{
                    background: 'green',
                  }}
                ></div>
                <button
                  className="btn_for_Link"
                  // style={{ fontWeight: fontWeight3, color: fontred3, borderBottom: borderred3 }}
                  // onClick={activeAccount}
                >
                  Active
                </button>
              </div>
              <div className="forAlignment_Account">
                <div className="forChanging_color" style={{ background: 'red' }}></div>
                <button
                  className="btn_for_Link"
                  // style={{ fontWeight: fontWeight5, color: fontred5, borderBottom: borderred5 }}
                  // onClick={AccountSuspended}
                >
                  Suspended
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="td_part"
          style={{ marginTop: '10px', overflowX: 'auto', whiteSpace: 'noWrap' }}
        >
          <table className="table table-hover">
            <thead className="">
              <tr>
                <th className="t_Name px-3">Voucher Code</th>
                <th className="t_Name px-3">Partner</th>
                <th className="t_Name px-3">Customer</th>
                <th className="t_Name px-3">Start Date</th>
                <th className="t_Name px-3">End Date</th>
                <th className="t_Name px-3">Action</th>
              </tr>
            </thead>
            <tbody style={{ background: '#fff' }}>
              {Data &&
                Data.map((item, index) => {
                  return (
                    <tr>
                      <td className="px-3"></td>
                      <td className="px-3">{item.partner}</td>
                      <td className="px-3"></td>
                      <td className="px-3"></td>
                      <td className="px-3"></td>
                      <td className="px-3" style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="actionBtn"
                          onClick={() => onDeleteUser(item.id)}
                          style={{ color: 'red', border: 'none', background: 'white' }}
                        >
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <Drawer
          title="Create Voucher"
          placement="right"
          onClose={onClose}
          open={open}
          style={{ zIndex: '9991' }}
        >
          <div className="modal_form">
            <form className="form" onSubmit={addRate}>
              <label className="htmlFor_respn" style={{ marginRight: '10px', fontWeight: '600' }}>
                Select Partner:
              </label>
              <select
                id="option__value"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
              >
                <option value="">Select Partner</option>
                {partnerData &&
                  partnerData.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    )
                  })}
              </select>
              <label htmlFor="startDate" style={{ fontWeight: '600' }}>
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="endDate" style={{ fontWeight: '600' }}>
                End Date
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <label htmlFor="address" style={{ fontWeight: '600' }}>
                Number Of Vouchers
              </label>
              <input
                type="number"
                placeholder="Number of Vouchers "
                required
                value={voucher}
                onChange={(e) => setVouchers(e.target.value)}
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
                <button className="btn2">Create Voucher</button>
                <button type="button" className="btn_cancel" onClick={back}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Drawer>
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
            <p className="admin_registerd__pop">Voucher Added Successfully.</p>
          </div>
        </div>
        <div
          className="user__detail__popup__Customer"
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
            <p className="admin_registerd__pop">Voucher has been deleted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Voucher
