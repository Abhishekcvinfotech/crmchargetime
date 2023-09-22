import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Graph.css'
import offline from '../../assets/images/offline.svg'
import clock from '../../assets/images/clock.svg'
import datePicker from '../../assets/images/datePicker.svg'
import chargingOne from '../../assets/images/chargingOne.svg'
import starOne from '../../assets/images/starOne.svg'
import Battery from '../../assets/images/Battery.svg'
import withGap from '../../assets/images/withGap.svg'
import { troesAPiTwo } from 'src/api'
import { useParams } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Graph() {
  const [statusCheck, setStatusCheck] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [totalDtaUsed, setTotalDtaUsed] = useState([])
  const [yearlyUsuage, setYearlyUsusage] = useState([])
  const [currentPackage, setCurrentPackage] = useState('')
  const [previousPackage, setPreviousPackage] = useState('')

  const [weeklyUsageData, setWeeklyUsageData] = useState([])

  const [chartData, setChartData] = useState({
    datasets: [],
  })
  const [weeklyData, setWeeklyData] = useState({
    datasets: [],
  })

  let { id } = useParams()

  useEffect(() => {
    axios
      .get(`${troesAPiTwo}/sevenusage?cust_id=${id}`)
      .then((res) => {
        console.log(res.data, 'res')
        setWeeklyUsageData(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get(`${troesAPiTwo}/trasactiondetails?cust_id=${id}`)
      .then((res) => {
        console.log(res.data, 'yyy')
        setCustomerName(res.data[0].cust_name)
        setTotalDtaUsed(res.data)
        setCurrentPackage(res.data[0].item_name)
        setPreviousPackage(res.data[1].item_name)
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    axios
      .get(`${troesAPiTwo}/yearlyusage`)
      .then((res) => {
        console.log(res, 'res')
        setYearlyUsusage(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const moreUsusage = weeklyUsageData?.reduce((item, val) => +val.daily_uses + item, 0)
  const totalUsed = totalDtaUsed?.reduce((item, val) => +val.kwh_unit + item, 0)
  const yEARMonths = yearlyUsuage?.reduce((item, val) => +val.daily_uses + item, 0)

  const chart = () => {
    let empSal = []
    let empAge = []
    let dailyUsed = []
    axios
      .get(`${troesAPiTwo}/usage`)
      .then((data) => {
        const res = JSON.parse(data.data)
        setStatusCheck(res.charger_on)
        dailyUsed.push(parseInt(res.total_used_kWhs / 1000))
        return res
      })
      .then((res) => {
        for (const dataObj of res.usagePerPeriodList) {
          empSal.push(parseInt(dataObj.usage / 1000))
          empAge.push(dataObj.date)
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: `Daily Usage : ${dailyUsed}wh`,
              data: empSal,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
              color: ['rgba(75, 112, 305, 0.6)'],
              borderWidth: 4,
            },
          ],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const chartTwo = () => {
    let empWeekly = []
    let empDate = []

    axios
      .get(`${troesAPiTwo}/sevenusage?cust_id=${id}`)
      .then((res) => {
        for (const dataObj of res.data) {
          empWeekly.push(parseInt(dataObj.daily_uses))
          empDate.push(dataObj.date.slice(0, 10))
        }
        setWeeklyData({
          labels: empDate,

          datasets: [
            {
              label: `Weekly Usage : ${Math.round(moreUsusage)}kWh`,
              data: empWeekly,
              backgroundColor: ['#6218ff'],
              borderWidth: 4,
            },
          ],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    chart()
  }, [])
  useEffect(() => {
    chartTwo()
  }, [moreUsusage])

  return (
    <>
      <div className="main_offline__one">
        <div className="customer_offline">
          <p className=" custmer__padd">{customerName}</p>
          <p className="offline__online">
            <img src={offline} alt="frame" className="for_img_offlne" />{' '}
            {statusCheck == true ? 'Online' : 'Offline'}
          </p>
        </div>
        <div>
          <p className="with_iconn">
            <img src={clock} alt="frame" className="circle_outline_one" />
            Last Online: 4hrs ago
          </p>
        </div>
      </div>
      <div className="mainDiv_of_One">
        <div className="sub_main">
          <div className="sub_main__two">
            <p className="date_of_activation">01/12/2022</p>

            <p className="member_services">Member Since</p>
          </div>
          <p className="calendar_name">
            <img src={datePicker} alt="frame" className="date_picker_frame" />
          </p>
        </div>
        <div className="sub_main__before">
          <div className="sub_main__two">
            <p className="date_of_activation">{currentPackage ? currentPackage : 'No package'}</p>

            <p className="member_services">Current Package</p>
          </div>
          <p className="calendar_name">
            <img src={chargingOne} alt="frame" className="date_picker_frame" />
          </p>
        </div>
        <div className="sub_main__Times">
          <div className="sub_main__two">
            <p className="date_of_activation">{previousPackage ? previousPackage : 'No Package'}</p>

            <p className="member_services">Previous Package</p>
          </div>
          <p className="calendar_name">
            <img src={starOne} alt="frame" className="date_picker_frame" />
          </p>
        </div>
        <div className="sub_main__preType">
          <div className="sub_main__two">
            <p className="date_of_activation">{Math.round(totalUsed - yEARMonths)}kWh</p>

            <p className="member_services">Remaining Usage</p>
          </div>
          <p className="calendar_name">
            <img src={Battery} alt="frame" className="date_picker_frame" />
          </p>
        </div>
        <div className="sub_main___reverse">
          <div className="sub_main__two">
            <p className="date_of_activation">14kWh</p>

            <p className="member_services">Rollover Units</p>
          </div>
          <p className="calendar_name">
            <img src={withGap} alt="frame" className="date_picker_frame" />
          </p>
        </div>
      </div>

      <div className="for_all_data">
        <div className="for_showing_usees">
          <p className="uses_usage">Usage</p>
        </div>
        <div className="for_graphing_Whole">
          <div className="graph_chart_one">
            <Bar style={{ color: 'red' }} data={chartData} />
          </div>
          <div className="graph_chart_Two">
            <Bar data={weeklyData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Graph
