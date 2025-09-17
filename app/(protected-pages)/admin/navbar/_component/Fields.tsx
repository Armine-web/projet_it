'use client';
import { Select } from 'antd';
import { useState } from 'react';

export default function Fields() {

  const [selectLang, setSelectLang] = useState('')
  
  const handleChange = (value: string) => {
      setSelectLang(value);

    };

  return (
    <div>
        <Select
          defaultValue="en"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'am', label: 'Armenian' },
            { value: 'ru', label: 'Russian' },
            { value: 'en', label: 'English' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />

        {selectLang === 'en' && <div>ennnnnn</div>}

        {selectLang === 'ru' && <div>ruuu</div>}

        {selectLang === 'am' && <div>ammm</div>}
        
    </div>
  )
}

