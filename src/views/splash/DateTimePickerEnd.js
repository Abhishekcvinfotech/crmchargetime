import React, { useState,useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const DateTimePickerEnd = ({data,formSubmitted}) => {
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  
 

  const handleDateTimeChange = (dateTime) => {
    setSelectedEndDateTime(dateTime);
    
  };
  const disabledDateEnd = (current) => {
    return current && current < moment().startOf('day');
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTimeEnd = (current) => {
    if (current) {
      const currentMoment = moment();
      const selectedMoment = moment(current);
  
      if (selectedMoment.isSame(currentMoment, 'day')) {
        return {
          disabledHours: () => range(0, currentMoment.hour()),
          disabledMinutes: (hour) =>
            hour === currentMoment.hour() ? range(0, currentMoment.minute()) : [],
          disabledSeconds: (hour, minute) =>
            hour === currentMoment.hour() &&
            minute === currentMoment.minute()
              ? range(0, currentMoment.second())
              : [],
        };
      }
    }
    return {};
  };
  
  useEffect(() => {
    data(moment(selectedEndDateTime).format('YYYY-MM-DD HH:mm:ss'))
  }, [selectedEndDateTime])
  const key = formSubmitted ? Date.now() : null
  useEffect(() => {
    if (formSubmitted) {
        setSelectedEndDateTime(null)
      
    }
  }, [formSubmitted]);


  return (
    <>
      <div key={key}>
        <DatePicker
           showTime={{
            defaultValue: moment('00:00:00', 'HH:mm:ss'),
          }}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateTimeChange}
          value={selectedEndDateTime ? moment(selectedEndDateTime) : null}
          placeholder="Select Date and Time"
           disabledDate={disabledDateEnd}
           disabledTime={disabledDateTimeEnd}
        />
      </div>
    </>
  );
};

export default DateTimePickerEnd;