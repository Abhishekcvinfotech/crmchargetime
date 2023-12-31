import React, { useEffect, useState, useRef } from 'react'
import './Finance.css'
import '../universal.css'
import { Button, DatePicker, Space, Spin, Modal, Pagination } from 'antd'
const { RangePicker } = DatePicker
import ep_pricetag from '../../assets/images/ep_pricetag.svg'
import italic_img from '../../assets/images/italic_img.svg'
import right_arrow from '../../assets/images/right_arrow.svg'
import { troesAPi } from '../../api'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import partnerd from '../../assets/images/partnerd.svg'
import sheet from '../../assets/images/sheets.png'

import { DeleteOutlined } from '@ant-design/icons'
const Finance = () => {
  const [startdate, setSelectedDates] = useState([])
  const [enddate, setDateTwo] = useState([])
  const [allPartnerData, setAllPartnerData] = useState([])
  const [getIdOfPartner, setIdOfPartner] = useState()
  const [allDataOfPartnerInvoice, setAllDataOfPartnerInvoice] = useState([])
  const [getDataOfPartnerInvoice, setDataOfPartnerInvoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [onSelectPartner, setOnSelectPartner] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [partnerName, setPartnername] = useState('')

  const [financeDelete, setFinanceDelete] = useState(false)
  const [reportGeneratePopup, setReportGeneratePopup] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [rangePickerKey, setRangePickerKey] = useState(0);

  //pagination start

  const [postPerPage, setPostPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')
  //pagination end

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleDateChange = (dates) => {
    const formattedDates = dates.map((date) => date.toISOString().substring(0, 10))
    setSelectedDates(formattedDates[0])
    setDateTwo(formattedDates[1])
  }

  const getAllPartnerData = () => {
    axios
      .get(`${troesAPi}/allpartner`)
      .then((res) => {
        setAllPartnerData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getAllPartnerData()
  }, [])
  const handlePartner = (e) => {
    setLoading(true)
   
    setPartnername(e.target.value)
    setIdOfPartner(e.target.selectedOptions[0].getAttribute('data-name'))
    axios
      .get(`${troesAPi}/partnerfilter/${e.target.selectedOptions[0].getAttribute('data-name')}`)
      .then((res) => {
        setOnSelectPartner(res?.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const rangePickerStyle = {
     padding: '9px',
    borderRadius: '9px'  // Adjust the padding value as needed
     }

  const downloadEndpoint = `${troesAPi}/partnerexport/${getIdOfPartner}`
  const handleFileDownload =async () => {
    setLoading(true)
    setRefreshing(true)
    const requestData = {
      startdate: startdate,
      enddate: enddate,
    }

    await axios
      .post(downloadEndpoint, requestData, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))
        const a = document.createElement('a')
        a.href = url
        a.download = `${partnerName}_Invoice_Report.csv`
        a.click()
        setLoading(false)
        URL.revokeObjectURL(url)
        setDeleted((data) => !data)
        setRefreshing(false)
        setRangePickerKey((prevKey) => prevKey + 1)
      })
      .catch((error) => {
        console.error('Error downloading the file:', error)
        setRefreshing(false)
      })
  }

  const getPartnerInvoiceData = () => {
    axios
      .get(`${troesAPi}/excelreport`)
      .then((res) => {
        setDataOfPartnerInvoice(res?.data)
        const nbaData = res.data
        setTotal(nbaData?.length)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPartnerInvoiceData()
  }, [deleted])
  const deleteFinance = async (id) => {
    setLoading(true)
    if (window.confirm('Are you sure? Partner Invoice Report will be deleted permanently? ')) {
     await axios
        .delete(`${troesAPi}/reportdelete/${id}`)
        .then((res) => {
         
          setFinanceDelete(true)
          setTimeout(() => {
            setFinanceDelete(false)
          }, 2000)
          setDeleted((data) => !data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }
  
  const showPartnerData = () => {
    if (partnerName !== '' && partnerName !== 'Select Partner') {
      setIsModalOpen(true)
    }
  }

  const handleExcel = (id) => {
    setLoading(true)
    axios
      .get(`${troesAPi}/download_saved_file/${id}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))

        const a = document.createElement('a')
        a.href = url
        a.download = `${partnerName}_Invoice_Report.csv`
        a.click()
        setLoading(false)
        URL.revokeObjectURL(url)
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error downloading the file:', error)
      })
  }
  

  // pagination Start

  const handlePagination = (value) => {
    setPage(value)
  }

  const indexOfLastPage = page * postPerPage
  const indexOfFirstPage = indexOfLastPage - postPerPage
  const currentPosts = getDataOfPartnerInvoice?.slice(indexOfFirstPage, indexOfLastPage)
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
      <div
        style={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <p className="finance_bold_text">Partner Invoice Report</p>

        <Button
            type="primary"
            id='universalButton'
            onClick={handleFileDownload}
            style={{height:'40px', display:'flex',  alignItems: 'center'}}
          >
          <img src={right_arrow} alt="edit"  style={{width:"22px",height:"15px",paddingRight:"4px"}} />
            Generate Report
            
          </Button>


      </div>
      <div>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1',
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
      </div>
      <div></div>
      <div className="finance_partner_select">
        <div className="finance_wrapper">
          <label className="for_finance_select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Select Partner:
          </label>

         <div className='icon-wrap'> 
          <select id="option__value_two_finanace" onChange={handlePartner}>
          {refreshing ? (
              <option value="loading">Select Partner</option>
            ) : (
              <>
                <option value="Select Partner">Select Partner</option>
                {allPartnerData?.map((item, ind) => {
                  return (
                    <option key={ind} data-name={item?.id}>
                      {item?.name}
                    </option>
                  )
                })}
              </>
            )}
          </select>


          <div style={{marginLeft:"5px"}} onMouseEnter={showPartnerData}>
            <img src={italic_img} alt="edit" style={{width:'16px'}} />
          </div>

          </div>

        </div>
        <div>
          <Modal
            title={`${partnerName}_Report`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {onSelectPartner?.length < 1 ? (
              <p style={{ textAlign: 'center' }}>No data found</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Installation</th>
                    <th>kWh</th>
                    <th>($)Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {onSelectPartner &&
                    onSelectPartner.map((item, ind) => {
                      return (
                        <tr key={ind}>
                          <td>{ind + 1}</td>
                          <td>{item?.installation}</td>
                          <td>{item?.kwh}</td>
                          <td>{item?.rate}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            )}
          </Modal>
        </div>
        <div>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={handleDateChange} style={rangePickerStyle} key={rangePickerKey}/>
          </Space>
        </div>
      </div>

      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <table className="table table-hover">
          <thead className="finance__information">
            <tr>
            <th>S.No.</th>
              <th>
                {/* <img
                  src={sheet}
                  alt="upload_img"
                  style={{
                    width: '20px',
                    cursor: 'pointer',
                  }}
                /> */}
              </th>
              <th>Name</th>
              <th style={{margin:'auto'}}>Interval</th>
              <th>Generated On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ background: '#fff' }}>
            {currentPosts &&
              currentPosts.map((item, ind) => {
               
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
                let numOfDaata = formatDate(new Date(item.created_time))
                const displayedIndex = indexOfFirstPage + ind + 1
                return (
                  <tr key={ind}>
                  <td className='px-4'>{displayedIndex}</td>
                  <td onClick={() => handleExcel(item.id,setPartnername(item.report_name))}>
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
                    </td>
                   

                    <td>{item?.report_name}</td>
                    <td>{item.start_date} to {item.end_date}</td>
                    <td>{numOfDaata}</td>
                    <td className='px-4'>
                      <button
                        className="delete__Location_Finance"
                        onClick={() => deleteFinance(item.id)}
                      >
                        <DeleteOutlined
                          className='delete_btn_global'
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div>
        <div
          className="finance__popup__Invoice"
          style={{
            display: financeDelete ? 'block' : 'none',
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
            <p className="dleted_text">Partner Invoice Report has been deleted.</p>
          </div>
        </div>
        <div
          className="finance__popup__Invoice"
          style={{
            display: reportGeneratePopup ? 'block' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={partnerd}
              alt="logo"
              style={{
                paddingRight: '10px',
                display: 'block',
                marginTop: '-5px',
                objectFit: 'contain',
                height: '15px',
              }}
            />
            <p className="dleted_text">Partner Invoice Report has been Downloaded.</p>
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
          style={{ paddingLeft: '12px', display: 'flex', justifyContent: 'flex-start' }}
        />
      </div>
    </>
  )
}

export default Finance
