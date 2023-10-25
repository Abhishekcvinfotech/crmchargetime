import React from 'react'
import "./logfile.css"
import "../universal.css"
import { FiSearch } from 'react-icons/fi'
const LogFile = () => {
  return (
    <div>
      <div id='log__part'>
        <span className='log_file_span'>Log File</span>
        <span className='log_length'>(99)</span>
      </div>
      <div className='second_mainDiv_logFile' style={{position:"relative"}}>
        <div className='filter_log'>
        <div className='searchplaceholder'>
                <FiSearch className="fiseachicon" />
                <input
                  type="text"
                  id="searchBox"
                  placeholder="Search Customer"
                  // onChange={searchHandle}
                  style={{ background: '#fff' }}
                />
              </div>
        </div>
      </div>
      <div className='table_wrapper'>
      <div style={{overflowX:"auto"}}>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>S.No.</th>
            <th>Date</th>
            <th>Error</th>
            <th>User</th>
            <th>IP Address</th>
            <th>Type</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>12-05-23</td>
              <td>logging not successfully</td>
              <td>Manish</td>
              <td>127.00.0.1</td>
              <td>Desktop</td>
              <td>manish@cvinfotech.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>12-05-23</td>
              <td>logging not successfully</td>
              <td>Manish</td>
              <td>127.00.0.1</td>
              <td>Desktop</td>
              <td>manish@cvinfotech.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>12-05-23</td>
              <td>logging not successfully</td>
              <td>Manish</td>
              <td>127.00.0.1</td>
              <td>Desktop</td>
              <td>manish@cvinfotech.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>12-05-23</td>
              <td>logging not successfully</td>
              <td>Manish</td>
              <td>127.00.0.1</td>
              <td>Desktop</td>
              <td>manish@cvinfotech.com</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default LogFile
