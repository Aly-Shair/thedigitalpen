import React, { useId, forwardRef } from "react";

const Select = forwardRef(({
    label,
    options = [],
    className = '',
    ...props
}, ref) => {
  const id = useId();
  return (
    <div className="input-group mb-3">
      {
        label && <label className={`input-group-text ${className}`} htmlFor={id}>
            {label}
        </label>
      }
      <select className="form-select" id={id} ref={ref} {...props}>
        
        {
            options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))
        }
      </select>
    </div>
  );
});


export default Select;