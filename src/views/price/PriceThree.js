import React from 'react'
import './PriceThree.css'
import Trash from "../../assets/images/avatars/Trash.svg"
import Pencil from "../../assets/images/avatars/Pencil.svg"


const PriceThree = () => {
  return (
    <>
      <div className='price_management'>
        <h2 className='pr_text'>Price Management</h2>
        <button className="customer_add_button">
            <span className="plusicon">+</span>
            <span>Add New Plan</span>
          </button>
      </div>

       <div className="splash_middle_div">
          <div className="splash_wrapper">
            {/* <label className="select_text">Select Installation:</label> */}
            <select id="select_option__value">
              
                <option value="">Select Installation</option>
              
            </select>
          </div>
          </div>

      <div className="main_kwh_mieq_div">
        
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
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
          <div className="installation_base">
            <p className='kwh_key' style={{paddingTop:"12px"}}>Vandenberg Family</p>
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
            <div className="price_with_dollar">
              <p className='kwh_Total'>Total</p>
              <p className='dollar_part dollar_total'>$12.00/month</p>
            </div>
          </div>
          <div className='edit_delete_btn'>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Pencil} alt='edit' />
                <p className='edit_p'>Edit</p>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={Trash} alt='delete' />
                <p className='delete_p'>Delete</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default PriceThree
