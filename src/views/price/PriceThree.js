import React, { useState, useEffect } from 'react'
import './PriceThree.css'
import Trash from '../../assets/images/avatars/Trash.svg'
import Pencil from '../../assets/images/avatars/Pencil.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { troesAPi } from '../../api'
import { Button, Checkbox, message, Spin, Modal, notification } from 'antd'
import coupon from '../../assets/images/coupon.svg'
import { IoMdClose } from 'react-icons/io'

const PriceThree = () => {
  const [isShown, setIsShown] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [plans, setPlanData] = useState([])

  const [loading, setLoading] = useState(false)
  const [isadminShow, setisAdminShow] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [id, setId] = useState('')

  const [errorlocation, setLocationError] = useState('')
  const [errorkwh, setKwhError] = useState('')
  const [errormiq, setMiqError] = useState('')

  const [errorpackage, setPackageError] = useState('')
  const [errorprice, setPriceError] = useState('')
  const [errordollar, setDollarError] = useState('')
  const [isadminDelete, setisAdminDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [package_name, setPackgagename] = useState('')
  const [mi_eq, setMieq] = useState('')
  const [kwh, setKwh] = useState('')
  const [dollar_mi, setDollar] = useState('')
  const [total_price, setPrice] = useState('')
  const [totalSalexTax, setTotalSalesTax] = useState('')

  const [location, setLocation] = useState('')

  const [location_id, setLocation_id] = useState('')
  const [salesTax, setSalexTax] = useState('')
  const [forSelect, setForSelect] = useState(false)
  const [userAdmit, setUserAdmit] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [userDelete, setUserDelete] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [price_stripe_id, setPriceStripeId] = useState('')
  const [eyeOutlinedOne, setEyeOutlinedOne] = useState(false)
  const [salesTaxTwo, setSalesTaxTwo] = useState('')

  const [voucher_name, setVoucherName] = useState('')
  const [stripe_voucher_id, setVoucherID] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showInputField, setShowInputField] = useState(false)
  const [coupanData, setCoupanData] = useState([])
  const [coupon_name, setCoupanName] = useState('')
  const [stripe_coupon_id, setCouponId] = useState('')
  const [getLocationId, setGetLocationId] = useState()
  const [couponDelete, setCouponDelete] = useState(false)
  const [messageCouponId, setMessageCouponId] = useState('')
  const [messageCouponPromotion, setMessageCouponPromotion] = useState('')
  const [indexUpdate, setIndexUpdate] = useState('')
  const [addSplas, setAddSplash] = useState(false)
  const [updateSplash, setUpdateSplash] = useState(false)
  const [deleteSplash, setDeleteSplash] = useState(false)
  const forIndexFunction = (ind) => {
    setIndexUpdate(`ind_${ind}`)
  }
  const handleUIModal = () => {
    setShowInputField(!showInputField)
  }
  const getCouponData = () => {
    axios
      .get(`${troesAPi}/coupondetails/${getLocationId}`)
      .then((res) => {
        setCoupanData(res.data)
      })
      .catch((err) => console.log(err))
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const postData = {
    coupon_name: coupon_name,
    getLocationId: getLocationId,
    stripe_coupon_id: stripe_coupon_id,
    package_name: package_name,
  }

  const handleOk = () => {
    setLoading(true)
    let errorOccurred = false

    if (coupon_name === '') {
      setMessageCouponId('Please select Coupon ID')
      errorOccurred = true
    } else {
      setMessageCouponId('')
    }

    if (stripe_coupon_id === '') {
      setMessageCouponPromotion('Please select Coupon Promotion Code')
      errorOccurred = true
    } else {
      setMessageCouponPromotion('')
    }

    if (errorOccurred) {
      return
    }

    axios
      .post(`${troesAPi}/addcoupon`, postData)
      .then((res) => {
        console.log(res.data.success)
        if (res.data.success === 'Your Coupon is successfully added') {
          setCouponDelete((data) => !data)
          setCoupanName('')
          setCouponId('')
          setLoading(false)
          setAddSplash(true)
          setTimeout(() => {
            setAddSplash(false)
          }, 2000)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const deleteCoupon = async (id) => {
    setLoading(true)

    const response = axios
      .delete(`${troesAPi}/coupondelete/${id}`)
      .then((res) => {
        setCouponDelete((data) => !data)

        setLoading(false)
        setDeleteSplash(true)
        setTimeout(() => {
          setDeleteSplash(false)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  useEffect(() => {
    getCouponData()
  }, [couponDelete, isModalOpen])

  const handleCellEdit = (e, ind, property, data) => {
    // Update only the specific field in the editedData state
    const newText = e.target.innerText || data
    if (property === 'coupon_name') {
      setCoupanName(newText)
    } else if (property === '') {
      setCoupanName(data)
    } else if (property === 'stripe_coupon_id') {
      setCouponId(newText)
    } else {
      setCouponId(data)
    }
  }

  const updateCouponPart = async (id, name, nameId) => {
    console.log(package_name, 'package_name')
    setLoading(true)
    // Check if there is edited data
    const formData = new FormData()
    if (coupon_name !== null && coupon_name !== '') {
      formData.append('coupon_name', coupon_name)
    } else {
      formData.append('coupon_name', name)
    }
    if (stripe_coupon_id !== null && stripe_coupon_id !== '') {
      formData.append('stripe_coupon_id', stripe_coupon_id)
    } else {
      formData.append('stripe_coupon_id', nameId)
    }

    try {
      let result = await fetch(`${troesAPi}/couponupdate/${id}`, {
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: formData,
      })
      const res = await result.json()
      setLoading(false)
      setUpdateSplash(true)
      setTimeout(() => {
        setUpdateSplash(false)
      }, 2000)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const handleSelect = (e) => {
    setLoading(true)
    setForSelect(true)

    setLocation(e.target.value)

    setLocation_id(e.target.selectedOptions[0].getAttribute('data-name'))
    setSalexTax(e.target.selectedOptions[0].getAttribute('data-value'))
    //alert(e.target.selectedOptions[0].getAttribute('data-name'))

    axios
      .get(
        `${troesAPi}/pricedetails?location=${e.target.selectedOptions[0].getAttribute(
          'data-name',
        )}`,
      )
      .then((res) => {
        setPlanData(res.data.customers)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)

        setForSelect(false)
      })
  }

  const getPlanData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/pricedetails?location=${location_id}`)
      .then((res) => {
        setPlanData(res.data.customers)
        setLoading(false)
        setEyeOutlinedOne(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  const halndleEyeOutle = () => {
    setEyeOutlinedOne(true)
  }

  useEffect(() => {
    getPlanData()
  }, [deleted])

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
  async function signUp(e) {
    setLoading(true)
    setIsShown((current) => !current)
    e.preventDefault()

    setLocationError('')
    setKwhError('')
    setMiqError('')
    setPackageError('')
    setPriceError('')

    if (location == '') setLocationError('Please select location')
    if (kwh == '') setKwhError('Please enter value')
    if (mi_eq == '') setMiqError('Please enter value')
    if (package_name == '') setPackageError('Please enter value')
    if (total_price == '') setPriceError('Please enter value')
    if (dollar_mi == '') setDollarError('Please enter value')

    const item = {
      location,
      package_name,
      mi_eq,
      kwh,
      total_price,
      location_id,
      dollar_mi,
      salesTax,
      salesTaxTwo,
      totalSalexTax,
      price_stripe_id,
      voucher_name,
      stripe_voucher_id,
    }

    if (
      (package_name && dollar_mi && mi_eq && kwh && total_price && location,
      salesTax,
      totalSalexTax,
      price_stripe_id)
    ) {
      let result = await fetch(`${troesAPi}/price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(item),
      })
      // result = await result.json()

      setUserAdmit(true)
      setLoading(false)

      setTimeout(() => {
        setUserAdmit(false)
      }, 2000)

      getPlanData()
    } else {
      setIsShown(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    setDollar('')
    setMieq('')
    setKwh('')
    setPackgagename('')
    setPrice('')
    setPriceStripeId('')
  }, [isShown])
  async function updateAdmin(e) {
    setLoading(true)

    setisAdminShow((current) => !current)
    if (
      package_name &&
      mi_eq &&
      kwh &&
      total_price &&
      dollar_mi &&
      salesTax &&
      totalSalexTax &&
      price_stripe_id
    ) {
      let result = await fetch(`${troesAPi}/priceupdate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          package_name,
          mi_eq,
          kwh,
          total_price,
          dollar_mi,
          salesTax,
          totalSalexTax,
          salesTaxTwo,
          price_stripe_id,
          voucher_name,
          stripe_voucher_id,
        }),
      })
      await result.json()
      setUserUpdate(true)
      setLoading(false)
      setTimeout(() => {
        setUserUpdate(false)
      }, 2000)

      getPlanData()
    } else {
      alert('invalid details')
      setLoading(false)
    }
  }

  const handleClicked = (event) => {
    setIsShown((current) => !current)
    
  }

  useEffect(() => {
    const handleLength = () => {
      let planned = plans?.length

      if (planned < 3) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    handleLength()
  }, [plans, deleted])
  const cancelCreate = (e) => {
    setIsShown((current) => !current)
  }

  const updateAdminID = (e, id) => {
    if (forSelect && location !== '') {
      setisAdminShow((current) => !current)
    } else {
      alert('Please select Installation')
    }
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
    setisAdminDelete((current) => !current)

    const response = axios
      .delete(`${troesAPi}/price/${id}`)
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

  const totalPrice = (decimalPlaces = 0) => {
    let pr = (total_price / 100) * salesTax
    // let numAll = +pr + +total_price
    var p = Math.pow(10, decimalPlaces)
    let numAll = Math.round(pr * p) / p
    setSalesTaxTwo(numAll)

    let addingData = (+numAll + +total_price).toFixed(2)
    setTotalSalesTax(addingData)
  }
  return (
    <>
      <div className="price_management">
        {loading ? (
          <div className="loading_part">
            <Spin size="large" />
          </div>
        ) : (
          ''
        )}
        <Modal title="Coupon" open={isModalOpen} onOk={ handleOk} onCancel={handleCancel}>
          {loading ? (
            <div className="loading_part">
              <Spin size="large" />
            </div>
          ) : (
            ''
          )}

          <button id="universalButton" onClick={handleUIModal}>
            Add Coupon
          </button>
          {showInputField && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // gap: '10px',
                margin: '10px 0px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100px',
                  padding: '10px 0px',
                }}
              >
                <p className="strip_coupon_data">Coupon ID</p>
                <input
                  className="strip_coupon_input"
                  type="text"
                  name="coupon_name"
                  value={coupon_name}
                  placeholder="Voucher ID"
                  onChange={(e) => setCoupanName(e.target.value)}
                />
                <div>
                  <p style={{ color: 'red' }}>{messageCouponId}</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100px',
                  padding: '10px 0px',
                }}
              >
                <p className="strip_coupon_data">Coupon Promotion Code</p>
                <input
                  className="strip_coupon_input"
                  type="text"
                  name="stripe_coupon_id"
                  value={stripe_coupon_id}
                  placeholder="Voucher Name"
                  onChange={(e) => setCouponId(e.target.value)}
                />
                <div>
                  <p style={{ color: 'red' }}>{messageCouponPromotion}</p>
                </div>
              </div>
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>Coupon ID</th>
                <th>Coupon Promotion Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupanData && coupanData.length > 0 ? (
                coupanData.map((res, ind) => (
                  <tr key={ind}>
                    {res.coupon_id !== null && res.coupon_promotion_code !== null && (
                      <>
                        <td
                          className={`ind_${ind}`}
                          onClick={() => forIndexFunction(ind)}
                          contentEditable
                          onInput={(e) => handleCellEdit(e, ind, 'coupon_name', res.coupon_id)}
                        >
                          {res.coupon_id}
                        </td>
                        <td
                          className={`ind_${ind}`}
                          onClick={() => forIndexFunction(ind)}
                          contentEditable
                          onInput={(e) =>
                            handleCellEdit(e, ind, 'stripe_coupon_id', res.coupon_promotion_code)
                          }
                        >
                          {res.coupon_promotion_code}
                        </td>
                        <td className={`ind_${ind}  `}>
                          <div style={{ display: 'flex' }}>
                            {indexUpdate == `ind_${ind}` ? (
                              <button
                                className={` td_${ind} `}
                                style={{ border: 'none', width: '20px', backgroundColor: '#fff' }}
                                onClick={() =>
                                  updateCouponPart(res.id, res.coupon_id, res.coupon_promotion_code)
                                }
                              >
                                <SaveOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                              </button>
                            ) : (
                              <button
                                className={` td_${ind} `}
                                style={{ visibility: 'hidden', width: '20px' }}
                                onClick={() =>
                                  updateCouponPart(res.id, res.coupon_id, res.coupon_promotion_code)
                                }
                              >
                                <SaveOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                              </button>
                            )}

                            <button
                              style={{
                                border: 'none',
                                backgroundColor: '#fff',
                                paddingLeft: '10px',
                                width: '20px',
                              }}
                              onClick={() => deleteCoupon(res.id)}
                            >
                              <DeleteOutlined className="delete_btn_global" />{' '}
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div
            className="user__modal__Popup"
            style={{
              display: addSplas ? 'block' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={coupon}
                alt="logo"
                style={{
                  paddingRight: '10px',
                  display: 'block',
                  marginTop: '-2px',
                  height: '15px',
                  objectFit: 'contain',
                }}
              />
              <p className="admin_registerd__pop">Coupon added successfully.</p>
            </div>
          </div>
          <div
            className="user__modal__Popup"
            style={{
              display: updateSplash ? 'block' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={coupon}
                alt="logo"
                style={{
                  paddingRight: '10px',
                  display: 'block',
                  marginTop: '-2px',
                  height: '15px',
                  objectFit: 'contain',
                }}
              />
              <p className="admin_registerd__pop">Coupon updated successfully.</p>
            </div>
          </div>
          <div
            className="user__modal__Popup"
            style={{
              display: deleteSplash ? 'block' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={coupon}
                alt="logo"
                style={{
                  paddingRight: '10px',
                  display: 'block',
                  marginTop: '-2px',
                  height: '15px',
                  objectFit: 'contain',
                }}
              />
              <p className="admin_registerd__pop">Coupon deleted successfully.</p>
            </div>
          </div>
        </Modal>
        <h2 className="pr_text">Price Management</h2>
        <button className="customer_add_button" style={{cursor:"pointer"}}  onClick={handleClicked}>
          <span className="plusicon">+</span>
          <span>Add New Plan</span>
        </button>
      </div>

      <div className="splash_middle_div">
        <div className="splash_wrapper">
          {/* <label className="select_text">Select Installation:</label> */}
          <select id="select_option__value" onChange={handleSelect}>
            <option value="">Select Installation</option>
            {locationData &&
              locationData.map((item, index) => {
                return (
                  <option
                    key={index}
                    data-name={item.id}
                    value={item.location}
                    data-value={item.salesTax}
                  >
                    {item.location}
                  </option>
                )
              })}
          </select>
        </div>
      </div><div>
      {isShown && (
              <div className="modal-backdrop" onClick={() => setIsShown(false)}>
                {/* Backdrop content (if needed) */}
              </div>
            )}
     
      
            <div
              className="show__notShow modalscroll"
              style={{
                display: isShown ? 'block' : 'none',
              }}
            >
 <form onSubmit={signUp}>
            <div className="create_Location__packag">
            <label>Add New Package</label>
                  <IoMdClose className="crossicon" onClick={cancelCreate} />
            </div>

            <div id="form__admin_admin">
              <label className="nameEmail__Price" >Location Name</label>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                placeholder='Location Name'
                readOnly={true}
                value={location}
              />
              {/* <p className="nameEmail__Price">Location Id</p> */}
              <input
                className="locate__input"
                type="hidden"
                name=""
                id=""
                readOnly={true}
                value={location_id}
              />

              <p style={{ color: 'red',  }}>{errorlocation}</p>
              <label className="nameEmail__Price">Product Name</label>
              <input
                className="locate__input"
                type="text"
                name="package_name"
                value={package_name}
                placeholder="Eg. Base Package - 4"
                onChange={(e) => setPackgagename(e.target.value)}
              />
              <p style={{ color: 'red' }}>{errorpackage}</p>

              <label className="nameEmail__Price">Stripe Product ID </label>
              <input
                className="locate__input"
                type="text"
                name="product_desc"
                value={price_stripe_id}
                placeholder="Product Description"
                onChange={(e) => setPriceStripeId(e.target.value)}
              />

              <label className="nameEmail__Price">Coupon Promotion Code</label>
              <input
                className="locate__input"
                type="text"
                name="voucher_name"
                value={voucher_name}
                placeholder="Eg. Voucher Name"
                onChange={(e) => setVoucherName(e.target.value)}
              />
              <label className="nameEmail__Price">kWh</label>
              <input
                className="locate__input"
                type="number"
                name="kwh"
                value={kwh}
                placeholder="kWh"
                onChange={(e) => setKwh(e.target.value)}
              />
              <p style={{ color: 'red', paddingLeft: '11px' }}>{errorkwh}</p>

              <label className="nameEmail__Price">Mi Eq</label>
              <input
                className="locate__input"
                type="number"
                name="mi_eq"
                value={mi_eq}
                placeholder="Eg. 2000"
                onChange={(e) => setMieq(e.target.value)}
              />
              <p style={{ color: 'red', paddingLeft: '11px' }}>{errormiq}</p>

              <label className="nameEmail__Price">$/Mi</label>
              <input
                className="locate__input"
                type="number"
                name="dollar_mi"
                value={dollar_mi}
                placeholder="Eg. 2000"
                onChange={(e) => setDollar(e.target.value)}
              />
              <p style={{ color: 'red', paddingLeft: '11px' }}>{errordollar}</p>
              <label className="nameEmail__Price">Price ($)</label>
              <input
                className="locate__input"
                type="number"
                name="price"
                value={total_price}
                placeholder="Eg.$149"
                onChange={(e) => setPrice(e.target.value)}
              />

              <label className="nameEmail__Price">Sales Tax</label>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                readOnly={true}
                value={salesTax + '%'}
              />

              <input type="hidden" className="locate__input" value={salesTaxTwo} />
              <div className="total_pr_local">
                <label className="functioned_p" onClick={() => totalPrice(2)}>
                  Check Total Price
                </label>
                <p className="ttl__ssl_tx">${totalSalexTax}</p>
              </div>
              {/* <p className="nameEmail__Price">Total Price/month</p>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                readOnly={true}
                value={totalSalesPrice}
              /> */}
              <span
                style={{ color: 'red', paddingLeft: '11px', display: 'block', marginTop: '-10px' }}
              >
                {errorprice}
              </span>
              <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
              <button
                  onClick={cancelCreate}
                  className="cancel__create__location"
                  id="not_ShowCancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="create_new__location"
                  onClick={signUp}
                // disabled={disabled}
                >
                  Add
                </button>
                
              </div>
            </div>
          </form>

            </div>
            </div>
      <div className="main_kwh_mieq_div">
        {plans &&
          plans.map((item, index) => {
            return (
              <div key={index} className="main_kwh_mieq_div">
                <div className="kwh_row">
                  <div className="kwh_row_one">
                    <div className="kwh_column">
                      <p className="kwh_key">kwh</p>
                      <p className="kwh_value">{item.kwh}</p>
                    </div>
                    <div className="kwh_column">
                      <p className="kwh_key">Mi Eq</p>
                      <p className="kwh_value">{item.mi_eq}</p>
                    </div>
                    <div className="kwh_column">
                      <p className="kwh_key">$/MI</p>
                      <p className="kwh_value">{item.dollar_mi}</p>
                    </div>
                  </div>
                  <hr className="card_line"></hr>
                  <div className="installation_base">
                    <p className="kwh_key">{item.location}</p>
                    <p className="kwh_value">{item.package_name}</p>
                  </div>
                  <div className="price_main_div">
                    <div className="price_with_dollar">
                      <p className="kwh_key">Price</p>
                      <p className="dollar_part">${item.total_price}</p>
                    </div>
                    <div className="price_with_dollar">
                      <p className="kwh_key">Salex Tax</p>
                      <p className="dollar_part">${item.salesTaxTwo}</p>
                    </div>
                    <div className="hr_padding">
                      <hr className="hr_opacity" />
                    </div>
                    <div className="price_with_dollar total_wrap">
                      <p className="kwh_Total">Total</p>
                      <p className="dollar_part dollar_total">
                        Total: ${(+item.total_price + +item.salesTaxTwo).toFixed(2)} /month
                      </p>
                    </div>
                  </div>
                  <div className="edit_delete_btn">
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' , cursor:'pointer'}}
                      onClick={() => {
                        setGetLocationId(item.location_id)
                        // setLocation(item.location)
                        setPrice(item.total_price)
                        setPackgagename(item.package_name)
                        setDollar(item.dollar_mi)
                        setKwh(item.kwh)
                        setMieq(item.mi_eq)
                        setTotalSalesTax(item.totalSalexTax)
                        setSalesTaxTwo(item.salesTaxTwo)
                        setPriceStripeId(item.price_stripe_id)
                        setVoucherID(item.stripe_voucher_id)
                        setVoucherName(item.voucher_name)
                        updateAdminID(SetRowData(item), setId(item.id))
                      }}
                    >
                      <img src={Pencil} alt="edit" />
                      <p className="edit_p">Edit</p>
                    </div>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '8px',cursor:'pointer' }}
                      onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
                    >
                      <img src={Trash} alt="delete" />
                      <p className="delete_p">Delete</p>
                    </div>
                  </div>
                </div>

                {/* <div className="kwh_row">
          <div className="kwh_row_one">
            <div className="kwh_column">
              <p className="kwh_key">kwh</p>
              <p className="kwh_value">200</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">Mi Eq</p>
              <p className="kwh_value">~500</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">$/MI</p>
              <p className="kwh_value">0.11</p>
            </div>
          </div>
          <hr className='card_line'></hr>
          <div className="installation_base">
            <p className='kwh_key'>Vandenberg Family</p>
            <p className="kwh_value">Base Package 1</p>
          </div>
          <div className="price_main_div">
            <div className="price_with_dollar">
              <p className='kwh_key'>Price</p>
              <p className='dollar_part'>$50.66</p>
            </div>
            <div className="price_with_dollar">
              <p className='kwh_key'>Salex Tax</p>
              <p className='dollar_part'>$12.00</p>
            </div>
            <div className="hr_padding">
              <hr className='hr_opacity' />
            </div>
            <div className="price_with_dollar total_wrap">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center", gap:'8px'}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center" , gap:'8px'}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div>


        <div className="kwh_row">
          <div className="kwh_row_one">
            <div className="kwh_column">
              <p className="kwh_key">kwh</p>
              <p className="kwh_value">200</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">Mi Eq</p>
              <p className="kwh_value">~500</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">$/MI</p>
              <p className="kwh_value">0.11</p>
            </div>
          </div>
          <hr className='card_line'></hr>
          <div className="installation_base">
            <p className='kwh_key'>Vandenberg Family</p>
            <p className="kwh_value">Base Package 1</p>
          </div>
          <div className="price_main_div">
            <div className="price_with_dollar">
              <p className='kwh_key'>Price</p>
              <p className='dollar_part'>$50.66</p>
            </div>
            <div className="price_with_dollar">
              <p className='kwh_key'>Salex Tax</p>
              <p className='dollar_part'>$12.00</p>
            </div>
            <div className="hr_padding">
              <hr className='hr_opacity' />
            </div>
            <div className="price_with_dollar total_wrap">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center", gap:'8px'}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center" , gap:'8px'}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div>


        <div className="kwh_row">
          <div className="kwh_row_one">
            <div className="kwh_column">
              <p className="kwh_key">kwh</p>
              <p className="kwh_value">200</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">Mi Eq</p>
              <p className="kwh_value">~500</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">$/MI</p>
              <p className="kwh_value">0.11</p>
            </div>
          </div>
          <hr className='card_line'></hr>
          <div className="installation_base">
            <p className='kwh_key'>Vandenberg Family</p>
            <p className="kwh_value">Base Package 1</p>
          </div>
          <div className="price_main_div">
            <div className="price_with_dollar">
              <p className='kwh_key'>Price</p>
              <p className='dollar_part'>$50.66</p>
            </div>
            <div className="price_with_dollar">
              <p className='kwh_key'>Salex Tax</p>
              <p className='dollar_part'>$12.00</p>
            </div>
            <div className="hr_padding">
              <hr className='hr_opacity' />
            </div>
            <div className="price_with_dollar total_wrap">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center", gap:'8px'}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center" , gap:'8px'}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div>


        <div className="kwh_row">
          <div className="kwh_row_one">
            <div className="kwh_column">
              <p className="kwh_key">kwh</p>
              <p className="kwh_value">200</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">Mi Eq</p>
              <p className="kwh_value">~500</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">$/MI</p>
              <p className="kwh_value">0.11</p>
            </div>
          </div>
          <hr className='card_line'></hr>
          <div className="installation_base">
            <p className='kwh_key'>Vandenberg Family</p>
            <p className="kwh_value">Base Package 1</p>
          </div>
          <div className="price_main_div">
            <div className="price_with_dollar">
              <p className='kwh_key'>Price</p>
              <p className='dollar_part'>$50.66</p>
            </div>
            <div className="price_with_dollar">
              <p className='kwh_key'>Salex Tax</p>
              <p className='dollar_part'>$12.00</p>
            </div>
            <div className="hr_padding">
              <hr className='hr_opacity' />
            </div>
            <div className="price_with_dollar total_wrap">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center", gap:'8px'}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center" , gap:'8px'}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div>


        <div className="kwh_row">
          <div className="kwh_row_one">
            <div className="kwh_column">
              <p className="kwh_key">kwh</p>
              <p className="kwh_value">200</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">Mi Eq</p>
              <p className="kwh_value">~500</p>
            </div>
            <div className="kwh_column">
              <p className="kwh_key">$/MI</p>
              <p className="kwh_value">0.11</p>
            </div>
          </div>
          <hr className='card_line'></hr>
          <div className="installation_base">
            <p className='kwh_key'>Vandenberg Family</p>
            <p className="kwh_value">Base Package 1</p>
          </div>
          <div className="price_main_div">
            <div className="price_with_dollar">
              <p className='kwh_key'>Price</p>
              <p className='dollar_part'>$50.66</p>
            </div>
            <div className="price_with_dollar">
              <p className='kwh_key'>Salex Tax</p>
              <p className='dollar_part'>$12.00</p>
            </div>
            <div className="hr_padding">
              <hr className='hr_opacity' />
            </div>
            <div className="price_with_dollar total_wrap">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center", gap:'8px'}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center" , gap:'8px'}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div> */}
              </div>
            )
          })}
        ;
      </div>
    </>
  )
}

export default PriceThree
