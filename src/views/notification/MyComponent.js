import React, { useState } from 'react'
import { TimePicker } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'

const MyComponent = ({ editableValues, index, data }) => {
  const [message_time, setMessageTime] = useState(null)

  const handleTimeChange = (time) => {
    if (time) {
      const selectedTimeMoment = moment(time)
      data(selectedTimeMoment.format('HH:mm:ss'))
      setMessageTime(selectedTimeMoment.format('HH:mm:ss'))
    } else {
      setMessageTime(null)
    }
  }
  const disabledDateEnd = (current) => {
    return current && current < moment().startOf('day')
  }
  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  const disabledDateTimeEnd = (current) => {
    if (current) {
      const currentMoment = moment()
      const selectedMoment = moment(current)

      if (selectedMoment.isSame(currentMoment, 'day')) {
        return {
          disabledHours: () => range(0, currentMoment.hour()),
          disabledMinutes: (hour) =>
            hour === currentMoment.hour() ? range(0, currentMoment.minute()) : [],
          disabledSeconds: (hour, minute) =>
            hour === currentMoment.hour() && minute === currentMoment.minute()
              ? range(0, currentMoment.second())
              : [],
        }
      }
    }
    return {}
  }

  return (
    <td className="px-2">
      <TimePicker
        value={message_time ? moment(message_time, 'HH:mm:ss') : null}
        onChange={handleTimeChange}
        format="HH:mm:ss"
        placeholder="Select Time"
        disabledDate={disabledDateEnd}
        disabledTime={disabledDateTimeEnd}
      />
    </td>
  )
}

export default MyComponent
