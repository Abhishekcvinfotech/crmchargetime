import React, { useState, useEffect } from 'react'
import { Button, Checkbox, message, Spin } from 'antd'
import axios from 'axios'

import editPen from '../../assets/images/editPen.svg'
import ep_pricetag from '../../assets/images/ep_pricetag.svg'
import { useNavigate } from 'react-router-dom'
import { troesAPi } from '../../api'
import { troesAPiTwo } from '../../api'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import './price.css'
import '../universal.css'
import { object } from 'prop-types'

const Price = () => {
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
  const [forIndexing, setForIndexing] = useState('')
  const [forOnlyThree, setForOnlyThree] = useState(false)
  const [price_stripe_id, setPriceStripeId] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const handleSelect = (e) => {
    setLoading(true)

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
        setPlanData(res.data)
        setLoading(false)
        setForSelect(true)
        setForOnlyThree((data) => !data)
      })
      .catch((err) => {
        setLoading(false)

        setForSelect(false)
        // setForOnlyThree(false)
      })
  }

  const getPlanData = (e) => {
    setLoading(true)

    axios
      .get(`${troesAPi}/pricedetails?location=${location_id}`)
      .then((res) => {
        setPlanData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getPlanData()
  }, [])

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
  // console.log(typeof(location),'testing')
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
      totalSalexTax,
      price_stripe_id,
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
      // alert("Invalid details")
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
          price_stripe_id,
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
      let planned
      Object.keys(plans).map((k, index) => {
        planned = plans[k]?.length
        setForIndexing(planned)
      })

      if (planned < 3 || planned == undefined) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }

    handleLength()
  }, [forIndexing, forOnlyThree, deleted, loading])
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
        setForOnlyThree((data) => !data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getPlanData()
  }, [deleted])

  // const totalSalesPrice = () => {
  //   let pr = (total_price / 100) * salesTax
  //   let numAll = +pr + +total_price
  //   return numAll
  // }
  // totalSalesPrice()

  const totalPrice = (decimalPlaces = 0) => {
    let pr = (total_price / 100) * salesTax
    let numAll = +pr + +total_price
    var p = Math.pow(10, decimalPlaces)
    setTotalSalesTax(Math.round(numAll * p) / p)
  }

  return (
    <>
      <div className="admin__page" style={{ position: 'relative' }}>
        {loading ? (
          <div className='loading_part'
            
          >
            <Spin size="large"  />
          </div>
        ) : (
          ''
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p className="price__acount">Price Management</p>
        </div>
        <div style={{ background: '#fff' }}>
          <div style={{ padding: '20px 20px' }}>
            <Button
              disabled={disabled}
              onClick={handleClicked}
              className={disabled ? 'plan_new_Add_One' : 'plan_new_Add'}
             
            >
              Add New Plan
              <img
                className={disabled ? 'admin__black_One' : 'admin__black'}
                src={ep_pricetag}
                alt="logo"
              />
            </Button>

            <br />
            {disabled ? (
              <p style={{ color: 'red', paddingLeft: '5px' }}>
                Only three packages per location are allowed.
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div
          className="show__notShow"
          style={{
            display: isShown ? 'block' : 'none',
          }}
        >
          <form onSubmit={signUp}>
            <div className="create_Location__packag">
              <p>Add new package</p>
            </div>

            <div id="add__Item">
              <p className="nameEmail__Price">Installation Name</p>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                readOnly={true}
                value={location}
                required
              />

              {/* <p className="nameEmail__Price">Location Id</p> */}
              <input
                className="locate__input"
                type="hidden"
                name=""
                id=""
                readOnly={true}
                value={location_id}
                required
              />

              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorlocation}</span>
              <p className="nameEmail__Price">Stripe Product Name</p>
              <input
                className="locate__input"
                type="text"
                name="package_name"
                value={package_name}
                placeholder="Eg. Base Package - 4"
                onChange={(e) => setPackgagename(e.target.value)}
                required
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorpackage}</span>
              <p className="nameEmail__Price">Price Stripe Id</p>
              <input
                className="locate__input"
                type="text"
                name="package_name"
                value={price_stripe_id}
                placeholder="Eg. price_1MeEKLJPfbfzje02KlUzPDgD"
                onChange={(e) => setPriceStripeId(e.target.value)}
                required
              />

              <p className="nameEmail__Price">kWh</p>
              <input
                className="locate__input"
                type="number"
                name="kwh"
                value={kwh}
                placeholder="kWh"
                onChange={(e) => setKwh(e.target.value)}
                required
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorkwh}</span>

              <p className="nameEmail__Price">Mi Eq</p>
              <input
                className="locate__input"
                type="number"
                name="mi_eq"
                value={mi_eq}
                placeholder="Eg. 2000"
                onChange={(e) => setMieq(e.target.value)}
                required
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errormiq}</span>

              <p className="nameEmail__Price">$/Mi</p>
              <input
                className="locate__input"
                type="number"
                name="dollar_mi"
                value={dollar_mi}
                placeholder="Eg. 2000"
                onChange={(e) => setDollar(e.target.value)}
                required
              />
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errordollar}</span>
              <p className="nameEmail__Price">Price</p>
              <input
                className="locate__input"
                type="number"
                name="price"
                value={total_price}
                placeholder="Eg.$149"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <p className="nameEmail__Price">Sales Tax</p>
              <input
                className="locate__input"
                type="text"
                name=""
                id=""
                readOnly={true}
                value={salesTax}
                required
              />
              <div className="total_pr_local">
                <p className="functioned_p" onClick={() => totalPrice(2)}>
                  Check Total Price
                </p>
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
              <span style={{ color: 'red', paddingLeft: '11px' }}>{errorprice}</span>
              <div className="locate_side" style={{ paddingLeft: '10px' }}>
                <button
                  type="submit"
                  className="create_new__location"
                  onClick={signUp}
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
          <div className="create_Location__edit_one">
            <p>Edit Plan</p>
          </div>

          <div id="form__admin__Price">
            <p className="nameEmail__Price">Installation Name</p>
            <input
              type="text"
              name=""
              id=""
              readOnly={true}
              value={location}
              className="locate__input"
            />
            <span style={{ color: 'red', paddingLeft: '11px' }}>{errorlocation}</span>
            <p className="nameEmail__Price">Package Name</p>
            <input
              className="locate__input"
              type="text"
              name="package_name"
              value={package_name}
              placeholder="Eg. Base Package - 4"
              onChange={(e) => setPackgagename(e.target.value)}
            />
            <p className="nameEmail__Price">Price Stripe Id</p>
            <input
              className="locate__input"
              type="text"
              name="package_name"
              value={price_stripe_id}
              placeholder="Eg. price_1MeEKLJPfbfzje02KlUzPDgD"
              onChange={(e) => setPriceStripeId(e.target.value)}
            />

            <p className="nameEmail__Price">kWh</p>
            <input
              className="locate__input"
              type="number"
              name="kwh"
              value={kwh}
              placeholder="kWh"
              onChange={(e) => setKwh(e.target.value)}
            />

            <p className="nameEmail__Price">Mi Eq</p>
            <input
              className="locate__input"
              type="number"
              name="mi_eq"
              value={mi_eq}
              placeholder="Eg. 2000"
              onChange={(e) => setMieq(e.target.value)}
            />
            <p className="nameEmail__Price">$/Mi</p>
            <input
              className="locate__input"
              type="number"
              name="dollar_mi"
              value={dollar_mi}
              placeholder="Eg. 2000"
              onChange={(e) => setDollar(e.target.value)}
            />

            <p className="nameEmail__Price">Price</p>
            <input
              className="locate__input"
              type="number"
              name="price"
              value={total_price}
              placeholder="Eg.$149"
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="nameEmail__Price">Sales Tax</p>
            <input
              className="locate__input"
              type="text"
              name=""
              id=""
              readOnly={true}
              value={salesTax}
            />
            <div className="total_pr_local">
              <p className="functioned_p" onClick={() => totalPrice(2)}>
                Check Total Price
              </p>
              <p className="ttl__ssl_tx">${totalSalexTax}</p>
            </div>
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
          <div className="confirm__delete">
            <p>Confirm Delete</p>
          </div>
          <div className="delete__admin">
            <p>Are you sure you want to delete the location</p>
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

        <div className="">
          <div className="location_wrapper">
            <label className="for_respn" style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Select Installation:
            </label>
            <select id="option__value" onChange={handleSelect}>
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
            <br />
            {forSelect ? '' : <span className="plezz_select">Please select location</span>}
          </div>

          <div className="" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%' }}>
              <thead className="location__information">
                <th scope="col" className="packag_kwh_Location">
                  No.
                </th>
                <th scope="col" style={{ paddingLeft: '5px' }} className="packag_kwh_Location">
                  Installation Name
                </th>
                <div className="for_heading_table">
                  <th scope="col" className="packag_kwh_mi">
                    Package Name
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    kWh
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    Mi Eq
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    $/Mi
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    Price
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    Sales Tax
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    Total Price
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    API ID
                  </th>
                  <th scope="col" className="packag_kwh_mi">
                    Actions
                  </th>
                </div>
              </thead>

              <tbody style={{ background: '#fff' }}>
                {Object.keys(plans).map((k, index) => {
                  return (
                    <tr key={index}>
                      <td>0{index + 1}</td>
                      <td>{k}</td>
                      {plans[k].map((item, index) => {
                        return (
                          <div className="main_kwh" key={index}>
                            <td className="text-start ">{item.package_name}</td>
                            <td className="text-end px-3 ">{item.kwh}</td>
                            <td className="text-center px-1  ">{item.mi_eq}</td>
                            <td className=" text-start px-3 ">{item.dollar_mi}</td>
                            <td className=" text-center px-0  ">${item.total_price}</td>
                            <td className=" text-start px-3">{item.salesTax}%</td>
                            <td>${item.totalSalexTax}</td>
                            <td className=" text-start px-2">
                              <input
                                name="roomRent"
                                type="text"
                                value={item.price_stripe_id}
                                className="forBalancing_stripe"
                                //onChange={(e) => handleroom(e, item.price_stripe_id)}
                              />
                            </td>
                            <td className="text-end">
                              <button
                                onClick={() => {
                                  setPrice(item.total_price)
                                  setPackgagename(item.package_name)
                                  setDollar(item.dollar_mi)
                                  setKwh(item.kwh)
                                  setMieq(item.mi_eq)
                                  setTotalSalesTax(item.totalSalexTax)
                                  setPriceStripeId(item.price_stripe_id)
                                  updateAdminID(SetRowData(item), setId(item.id))
                                }}
                                style={{ border: 'none', paddingRight: '7px', background: 'none' }}
                              >
                                <img src={editPen} alt="edit" style={{ width: '20px' }} />
                              </button>
                              <button
                                onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
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
                          </div>
                          // <div className="main_kwh" key={index}>
                          //   <td>{item.package_name}</td>
                          //   <td className=" ">{item.kwh}</td>
                          //   <td className=" ">{item.mi_eq}</td>
                          //   <td className="  ">{item.dollar_mi}</td>
                          //   <td className="   ">${item.total_price}</td>
                          //   <td className=" ">{item.salesTax}%</td>
                          //   <td>${item.totalSalexTax}</td>
                          //   <td className="">
                          //     <button
                          //       onClick={() => {
                          //         setPrice(item.total_price)
                          //         setPackgagename(item.package_name)
                          //         setDollar(item.dollar_mi)
                          //         setKwh(item.kwh)
                          //         setMieq(item.mi_eq)
                          //         setTotalSalesTax(item.totalSalexTax)
                          //         updateAdminID(SetRowData(item), setId(item.id))
                          //       }}
                          //       style={{ border: 'none', paddingRight: '7px', background: 'none' }}
                          //     >
                          //       <img src={editPen} alt="edit" style={{ width: '20px' }} />
                          //     </button>
                          //     <button
                          //       onClick={() => deleteLocated(SetRowData(item), setId(item.id))}
                          //       style={{ border: 'none', background: 'none' }}
                          //     >
                          //       <DeleteOutlined
                          //         style={{
                          //           color: 'red',
                          //           fontWeight: 'bolder',
                          //           fontSize: '18px',
                          //         }}
                          //       />
                          //     </button>
                          //   </td>
                          // </div>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="user__detail__popup__Price"
          style={{
            display: userAdmit ? 'block' : 'none',
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
                height: '15px',
                objectFit: 'contain',
              }}
            />
            <p className="admin_registerd__pop">New package added successfully.</p>
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
            <p className="admin_registerd__pop">Package information updated.</p>
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
            <p className="admin_registerd__pop">Package has been deleted.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Price
