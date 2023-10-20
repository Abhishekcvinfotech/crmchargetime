import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const DateTimePickerStart = ({ data, formSubmitted }) => {
  const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);

  const handleDateTimeChange = (dateTime) => {
    setSelectedStartDateTime(dateTime);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = (current) => {
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
    data(
      selectedStartDateTime
        ? moment(selectedStartDateTime).format('YYYY-MM-DD HH:mm:ss')
        : null
    );
  }, [selectedStartDateTime, data]);

  useEffect(() => {
    if (formSubmitted) {
      setSelectedStartDateTime(null);
    }
  }, [formSubmitted]);

  const key = formSubmitted ? Date.now() : null;

  return (
    <>
      <div key={key}>
        <DatePicker
          showTime={{
            defaultValue: moment('00:00:00', 'HH:mm:ss'),
          }}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateTimeChange}
          value={selectedStartDateTime ? moment(selectedStartDateTime) : null}
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          placeholder="Select Start Date and Time "
        />
      </div>
    </>
  );
};

export default DateTimePickerStart;