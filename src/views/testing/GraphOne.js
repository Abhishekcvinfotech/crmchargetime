import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { troesAPiTwo } from 'src/api'

const GraphOne = () => {
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])
  const [forLine, setForLine] = useState([])
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({})

  const [forRefresh, setForRefresh] = useState(false)
  const moreUsusage = data?.reduce((item, val) => +val + item, 0)

  const chartwoOne = () => {
    const age = []
    const salary = []
    axios
      .get(`${troesAPiTwo}/sevenusage?cust_id=229`)
      .then((res) => {
        res.data.map((item) => {
          age.push(+item.daily_uses)
          salary.push(item.date.slice(0, 10))
        })
        setCategory(salary)
        setData(age)
        setForLine([88, 99, 56])

        setSeries([
          {
            name: 'Total Kwh',
            type: 'column',
            data: data,
          },
          {
            name: 'Total wh',
            type: 'line',
            data: forLine,
          },
        ])
        setOptions({
          chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: category,

          yaxis: [
            {
              title: {
                text: 'Total  Kwh',
              },
            },
            {
              opposite: true,
              title: {
                text: 'Total wh ',
              },
            },
          ],
        })
        setForRefresh(true)
      })

      .catch((err) => {
        console.log(err)
      })
  }

  // const [options, setOptions] = useState({
  //   chart: {
  //     height: 350,
  //     type: 'line',
  //   },
  //   stroke: {
  //     width: [0, 4],
  //   },
  //   dataLabels: {
  //     enabled: true,
  //     enabledOnSeries: [1],
  //   },
  //   labels: category,

  //   yaxis: [
  //     {
  //       title: {
  //         text: 'Total  Kwh',
  //       },
  //     },
  //     {
  //       opposite: true,
  //       title: {
  //         text: 'Total wh ',
  //       },
  //     },
  //   ],
  // })
  // let dataOne = []
  // data.map((item) => {
  //   dataOne.push(item)
  // })

  // console.log(dataOne, 'dta')

  // const [series, setSeries] = useState([
  //   {
  //     name: 'Total Kwh',
  //     type: 'column',
  //     data: dataOne,
  //   },
  //   {
  //     name: 'Total wh',
  //     type: 'line',
  //     data: forLine,
  //   },
  // ])

  useEffect(() => {
    chartwoOne()
  }, [forRefresh])
  // useEffect(() => {}, [dataOne])

  // useEffect(() => {
  //   if (dataOne !== []) {
  //     console.log(dataOne, 'vvvvvvvvvvvvvvvvvv')
  //     setForRefresh(true)
  //   }
  // }, [dataOne])
  return (
    <>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </>
  )
}
export default GraphOne
