import * as React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface PropTypes {
  selected: Date;
  onChange: (newValue: any) => void;
  label: string;
  width: string;
}

const DatePickerApp: React.FC<PropTypes> = ({
  onChange,
  selected,
  label,
  width,
}) => {
  return (
    <div className="flex w-[300px] ml-2 mb-2">
      <DatePicker
        className={`w-[${width}] border-[2px] pt-4 pb-4 pl-2 pr-2 border-gray-300 rounded-md`}
        onChange={onChange}
        showTimeSelect
        selected={selected}
        dateFormat={`yyyy-MM-dd\', as \'h:mm:ss a`}
        placeholderText={label}
      />
    </div>
  );
};

export default DatePickerApp;
